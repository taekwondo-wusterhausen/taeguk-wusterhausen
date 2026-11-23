# /// script
# dependencies = ["numpy", "pillow", "scipy"]
# ///
"""Cut the TJBB logo out of its white background without the drop shadow.

Ring: least-squares ellipse fit (axis-aligned; the artwork is slightly
squashed) to the outer edge of the ring incl. its light bevel, rendered as an
anti-aliased shape. Outside the disk: keep only what is not
connected to the image border through light, unsaturated (shadow/white) pixels,
i.e. the black-outlined flags.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
rgb = np.asarray(Image.open(src).convert('RGB')).astype(float)
h, w, _ = rgb.shape
v = rgb.max(2)
sat = (rgb.max(2) - rgb.min(2))

# 1. Outer boundary of everything that is not pure white.
# 250, not lower: the ring's top bevel is nearly white (~240-248).
white = (rgb.min(2) > 250)
lab, _ = ndi.label(white)
border = np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])
outer_white = np.isin(lab, border[border > 0])
ys, xs = np.nonzero(~outer_white)
cy, cx = (ys.min() + ys.max()) / 2, (xs.min() + xs.max()) / 2
ang = np.arctan2(ys - cy, xs - cx)
r = np.hypot(ys - cy, xs - cx)
bins = np.round((ang + np.pi) / (2 * np.pi) * 720).astype(int) % 720
edge = np.zeros(720)
np.maximum.at(edge, bins, r)
theta = np.arange(720) / 720 * 2 * np.pi - np.pi
px, py = cx + edge * np.cos(theta), cy + edge * np.sin(theta)

def fit(px, py):
    # A x^2 + C y^2 + D x + E y = 1
    M = np.c_[px**2, py**2, px, py]
    (A, C, D, E), *_ = np.linalg.lstsq(M, np.ones(len(px)), rcond=None)
    cx, cy = -D / (2 * A), -E / (2 * C)
    k = 1 + A * cx**2 + C * cy**2
    return cx, cy, np.sqrt(k / A), np.sqrt(k / C)

def signed_dist(x, y, cx, cy, a, b):
    # Approximate distance to the ellipse, positive outside.
    rho = np.hypot((x - cx) / a, (y - cy) / b)
    return (rho - 1) * (a + b) / 2

# Outliers (flags, shadow) only stick out, so iteratively drop the points
# farthest outside the current circle.
ok = edge > 0
for _ in range(30):
    cx, cy, ra, rb = fit(px[ok], py[ok])
    res = signed_dist(px, py, cx, cy, ra, rb)
    thr = max(1.5, np.percentile(np.abs(res[ok]), 80))
    new_ok = (edge > 0) & (res < thr) & (res > -thr * 3)
    if (new_ok == ok).all():
        break
    ok = new_ok
print(f'ellipse: c=({cx:.1f},{cy:.1f}) a={ra:.1f} b={rb:.1f}, {ok.sum()}/720 angles, median |res| {np.median(np.abs(res[ok])):.2f}px')

yy, xx = np.mgrid[0:h, 0:w]
dist = signed_dist(xx, yy, cx, cy, ra, rb)
disk = np.clip(0.5 - dist, 0, 1)

# 2. Background/shadow connected to the border.
bgish = (v > 120) & (sat < 30)
lab, _ = ndi.label(bgish)
border = np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])
bg = np.isin(lab, border[border > 0])
fg = ~bg
fg = ndi.binary_fill_holes(fg)
# Drop specks (JPEG noise) outside the main shape.
lab2, n2 = ndi.label(fg)
sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
fg = np.isin(lab2, 1 + np.nonzero(sizes >= 500)[0])
# Soften the binary edge a little; final downscale does the real anti-aliasing.
fgs = ndi.gaussian_filter(fg.astype(float), 0.8)
outside = dist > 0
alpha = np.where(outside, np.maximum(disk, fgs), 1.0)
alpha = np.maximum(alpha, disk)

# Crop to content.
m = alpha > 0.01
y0, y1 = np.nonzero(m.any(1))[0][[0, -1]]
x0, x1 = np.nonzero(m.any(0))[0][[0, -1]]
rgba = np.dstack([rgb, alpha * 255]).round().clip(0, 255).astype(np.uint8)[y0:y1 + 1, x0:x1 + 1]
Image.fromarray(rgba, 'RGBA').save(out)
print('saved', out, rgba.shape[1], 'x', rgba.shape[0])
