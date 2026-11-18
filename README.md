# Borrowed Rentals

Designer looks, luxury streetwear and watches, rented for four days.
A pre-launch demand test: reservations are free and non-binding, and early reservations get 20% off at launch (Spring 2027).

**Team:** Jomar Mena, Sagar, Rhyon, Luis

| | |
|---|---|
| Website | https://borrowed-rentals.netlify.app |
| Instagram | https://www.instagram.com/borrowed.rentals.co/ |
| Project plan | https://docs.google.com/document/d/1jXYgDoA4ZmFZc-3QC9g4mtQ1GZbK_SKKQdS-mxyJq6o |

## How it fits together

```
Instagram (@borrowed.rentals.co)
   │  link in bio (tagged utm_source=ig)
   ▼
Website (Netlify)  ── /him · /her · /watches · home
   │  reserve form + email signup
   ▼
/api/submit  (Netlify Function, netlify/functions/submit.mjs)
   │  POST JSON
   ▼
Airtable automation  ──►  Reservations table  /  Email List table
                                    │
Google Analytics 4 (G-0BJMXHXVPB) ──┴──► Business dashboard
```

## Repository layout

| Path | What it is |
|---|---|
| `site/` | The live website: `index.html` (home), `him.html`, `her.html`, `watches.html`, `app.js` (catalog, sizing, reserve form), `styles.css` |
| `site/images/` | Product photos. A photo named `<item-slug>.jpg` appears on the site automatically; see `docs/photo-filenames.md` |
| `netlify/functions/submit.mjs` | Form backend: validates input and forwards it to Airtable |
| `netlify.toml` | Netlify build settings and the `/him`, `/her`, `/watches` routes |
| `airtable/` | Database tables, fields and the automation that receives form data |
| `marketing/instagram/` | The 9 grid posts in posting order, the story ad, and every caption (`captions.md`) |
| `marketing/brand/` | Profile picture |
| `marketing/reel/` | Reel end card and the Higgsfield shot list |
| `docs/` | Pitch deck and the photo filename list |

## Deploying

The site is hosted on Netlify (project `borrowed-rentals`). To deploy automatically from this repo:
Netlify → Project configuration → Build & deploy → **Link repository** → choose this repo.
Publish directory and functions directory are read from `netlify.toml`.

The form needs one environment variable in Netlify: `AIRTABLE_WEBHOOK_URL`
(the Airtable automation's webhook URL). It is deliberately **not** stored in this repo.

## Analytics

- **Google Analytics 4:** Measurement ID `G-0BJMXHXVPB`, installed on every page.
  Custom events: `view_item`, `view_collection`, `generate_lead`, `reserve_look`, `sign_up`, `cta_click`.
- **Reservation source:** every reservation stores its UTM source in Airtable, so Instagram traffic shows up as `ig / social`.

## Disclaimer

Student project. Brand names describe pieces the business plans to source; Borrowed is not affiliated with or endorsed by any brand named here.
