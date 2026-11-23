# /// script
# dependencies = ["numpy", "pillow", "scipy"]
# ///
"""Remove a white background around a black-outlined logo.

Background = near-white pixels connected to the image border. Its rim pixels
are black anti-aliased over white, so they become black with alpha = darkness.

Optional third argument: extra black outline width in source pixels, for
logos whose outline gets too thin when shown small.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
stroke = float(sys.argv[3]) if len(sys.argv) > 3 else 0
rgb = np.asarray(Image.open(src).convert('RGB')).astype(float)
lum = rgb.mean(2)
bgish = rgb.min(2) > 90  # stops at the black outline
lab, _ = ndi.label(bgish)
border = np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])
bg = np.isin(lab, border[border > 0])
alpha = np.where(bg, 0.0, 1.0)
rim = bg & ndi.binary_dilation(~bg, iterations=3)
alpha[rim] = np.clip((255 - lum[rim]) / 255, 0, 1)
color = rgb.copy()
color[rim] = 0  # pure black, coverage carried by alpha
if stroke:
    dist = ndi.distance_transform_edt(alpha < 0.5)
    outer = np.clip(stroke + 0.5 - dist, 0, 1)
    color[outer > alpha] = 0
    alpha = np.maximum(alpha, outer)
m = alpha > 0.01
y0, y1 = np.nonzero(m.any(1))[0][[0, -1]]
x0, x1 = np.nonzero(m.any(0))[0][[0, -1]]
rgba = np.dstack([color, alpha * 255]).round().clip(0, 255).astype(np.uint8)[y0:y1 + 1, x0:x1 + 1]
Image.fromarray(rgba, 'RGBA').save(out)
print('saved', out, rgba.shape[1], 'x', rgba.shape[0])
