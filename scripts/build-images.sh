#!/usr/bin/env bash
# Regenerate the landing-page image sources in src/assets from scripts/sources.
# Astro then creates the WebP/AVIF variants (1x/2x/3x) at build time.
#
# Sources:
#   tjbb.jpeg  TJBB logo on white with drop shadow
#   tvbb.jpg   https://tvbb.info/wp-content/uploads/2014/12/LOGO.jpg
#   bg.png     background kick photo, already feathered/transparent
#
# Needs: uv, ImageMagick
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

uv run -q scripts/cutout_tjbb.py scripts/sources/tjbb.jpeg "$tmp/tjbb.png"
# +2px outline evens out the original, which is thinner on the left.
uv run -q scripts/cutout_white_bg.py scripts/sources/tvbb.jpg "$tmp/tvbb.png" 2

mkdir -p src/assets/logos
# ~3x the displayed width is enough; Lanczos keeps edges crisp.
magick "$tmp/tjbb.png" -filter Lanczos -resize 600x -define png:compression-level=9 -strip src/assets/logos/tjbb.png
magick "$tmp/tvbb.png" -filter Lanczos -resize 540x -define png:compression-level=9 -strip src/assets/logos/tvbb.png
# Displayed at 420px, so 2x. Mitchell is smooth and alpha-weighted (no dark fringes).
magick scripts/sources/bg.png -filter Mitchell -resize 840x -strip src/assets/bg.png
