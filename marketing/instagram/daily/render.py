import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
from igqueue import QUEUE  # noqa

IMG = "/home/claude/borrowed-/site/images"
SRC = "/home/claude/borrowed-/marketing/instagram/06-royal-oak.jpg"
OUT = "/home/claude/borrowed-/marketing/instagram/daily"
os.makedirs(OUT, exist_ok=True)

GF = "/usr/share/fonts/truetype/google-fonts/"
SERIF_I = GF + "Lora-Italic-Variable.ttf"
SANS = GF + "Poppins-Regular.ttf"
SANS_M = GF + "Poppins-Medium.ttf"
SANS_L = GF + "Poppins-Light.ttf"
CREAM = (245, 240, 232)
TAN = (214, 187, 168)
MUTED = (150, 142, 132)
BTN = (243, 238, 232)
INK = (24, 20, 16)

wm_src = Image.open(SRC).convert("RGB").crop((62, 58, 262, 124))


def font(path, size, wght=None):
    f = ImageFont.truetype(path, size)
    if wght:
        try: f.set_variation_by_axes([wght])
        except Exception: pass
    return f


def bg(w, h):
    im = Image.new("RGB", (w, h), (22, 18, 15))
    top, bot = (30, 26, 21), (14, 12, 10)
    d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=tuple(int(top[i] * (1 - t) + bot[i] * t) for i in range(3)))
    return im


def tracked(d, xy, text, f, fill, track, anchor="l"):
    x, y = xy
    widths = [d.textlength(c, font=f) + track for c in text]
    total = sum(widths) - track
    if anchor == "m": x -= total / 2
    if anchor == "r": x -= total
    for c, w in zip(text, widths):
        d.text((x, y), c, font=f, fill=fill)
        x += w
    return total


def fit_label(d, xy, text, size, maxw, anchor="l"):
    track = size * 0.3
    while size > 12:
        f = font(SANS_M, size)
        w = sum(d.textlength(c, font=f) + track for c in text) - track
        if w <= maxw: break
        size -= 1; track = size * 0.3
    tracked(d, xy, text, font(SANS_M, size), TAN, track, anchor=anchor)


def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur)
    return lines


def wordmark(im, x, y, scale=1.0, center=False):
    wm = wm_src.resize((int(wm_src.width * scale), int(wm_src.height * scale)), Image.LANCZOS)
    # use luminance as alpha so it sits on any dark background
    alpha = wm.convert("L").point(lambda v: max(0, min(255, (v - 30) * 255 // 215)))
    layer = Image.new("RGB", wm.size, (251, 248, 242))
    if center: x = x - wm.width // 2
    im.paste(layer, (x, y), alpha)


def panel(im, box, slug):
    x0, y0, x1, y1 = box
    ph = Image.open(f"{IMG}/{slug}.jpg").convert("RGB")
    corner = ph.getpixel((3, 3))
    from PIL import ImageChops
    diff = ImageChops.difference(ph, Image.new("RGB", ph.size, corner)).convert("L").point(lambda v: 255 if v > 28 else 0)
    bb = diff.getbbox()
    if bb:
        m = 12
        ph = ph.crop((max(0, bb[0]-m), max(0, bb[1]-m), min(ph.width, bb[2]+m), min(ph.height, bb[3]+m)))
    pw, phh = x1 - x0, y1 - y0
    base = Image.new("RGB", (pw, phh), corner)
    r = min(pw / ph.width, phh / ph.height) * 0.88
    p = ph.resize((int(ph.width * r), int(ph.height * r)), Image.LANCZOS)
    base.paste(p, ((pw - p.width) // 2, (phh - p.height) // 2))
    im.paste(base, (x0, y0))


def price_line(d, x, y, rent, retail, size, anchor="l"):
    fp = font(SERIF_I, size, 400); fs = font(SANS_L, int(size * 0.42)); fr = font(SANS_L, int(size * 0.4))
    a = f"${rent:,}"; b = " / 4 days"; c = f"Retail ${retail:,}"
    wa, wb, wc = d.textlength(a, font=fp), d.textlength(b, font=fs), d.textlength(c, font=fr)
    total = wa + wb + 34 + wc
    if anchor == "m": x -= total / 2
    base = y + size * 0.82
    d.text((x, base), a, font=fp, fill=CREAM, anchor="ls")
    d.text((x + wa, base), b, font=fs, fill=CREAM, anchor="ls")
    cx = x + wa + wb + 34
    d.text((cx, base), c, font=fr, fill=MUTED, anchor="ls")
    d.line([(cx, base - size * 0.17), (cx + wc, base - size * 0.17)], fill=MUTED, width=2)


def button(d, cx_or_x, y, text, size, anchor="r", pad=(30, 22)):
    f = font(SANS_M, size)
    tw = sum(d.textlength(c, font=f) + size * 0.28 for c in text) - size * 0.28
    w, h = tw + pad[0] * 2, size + pad[1] * 2
    x = cx_or_x - w if anchor == "r" else cx_or_x - w / 2
    d.rectangle([x, y, x + w, y + h], fill=BTN)
    tracked(d, (x + pad[0], y + pad[1] - size * 0.18), text, f, INK, size * 0.28)


def feed(i, it):
    brand, piece, slug, rent, retail, tag, _, sec = it
    W, H = 1080, 1350
    im = bg(W, H); d = ImageDraw.Draw(im)
    wordmark(im, 70, 62)
    tracked(d, (1008, 82), "THE STREET EDIT", font(SANS_M, 19), TAN, 6, anchor="r")
    panel(im, (110, 150, 970, 870), slug)
    d.line([(72, 905), (1008, 905)], fill=(58, 52, 45), width=2)
    fit_label(d, (72, 930), f"{brand.upper()}  ·  {piece.upper()}", 21, 936)
    ft = font(SERIF_I, 78, 400)
    lines = wrap(d, tag, ft, 936)
    if len(lines) > 2:
        ft = font(SERIF_I, 64, 400); lines = wrap(d, tag, ft, 936)
    y = 985
    for ln in lines:
        d.text((70, y), ln, font=ft, fill=CREAM); y += int(ft.size * 1.12)
    price_line(d, 72, 1205, rent, retail, 62)
    button(d, 1008, 1210, "LINK IN BIO", 22)
    return im


def story(i, it):
    brand, piece, slug, rent, retail, tag, _, sec = it
    W, H = 1080, 1920
    im = bg(W, H); d = ImageDraw.Draw(im)
    wordmark(im, W // 2, 150, 1.35, center=True)
    tracked(d, (W / 2, 270), "TODAY'S PIECE", font(SANS_M, 22), TAN, 7, anchor="m")
    panel(im, (110, 340, 970, 1240), slug)
    fit_label(d, (W / 2, 1290), f"{brand.upper()}  ·  {piece.upper()}", 22, 900, anchor="m")
    ft = font(SERIF_I, 92, 400)
    lines = wrap(d, tag, ft, 900)
    if len(lines) > 2:
        ft = font(SERIF_I, 76, 400); lines = wrap(d, tag, ft, 900)
    y = 1345
    for ln in lines:
        d.text((W / 2, y), ln, font=ft, fill=CREAM, anchor="ma"); y += int(ft.size * 1.12)
    price_line(d, W / 2, y + 45, rent, retail, 60, anchor="m")
    button(d, W / 2, y + 160, "RESERVE FREE — LINK IN BIO", 24, anchor="m")
    tracked(d, (W / 2, y + 275), "PRE-LAUNCH · 20% OFF FOR EARLY RESERVATIONS", font(SANS_L, 19), MUTED, 5, anchor="m")
    return im


if __name__ == "__main__":
    only = sys.argv[1:] and int(sys.argv[1])
    for i, it in enumerate(QUEUE, 1):
        if only and i != only: continue
        feed(i, it).save(f"{OUT}/day{i:02d}-post.jpg", quality=92)
        story(i, it).save(f"{OUT}/day{i:02d}-story.jpg", quality=92)
    print("ok")
