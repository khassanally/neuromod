# Northwick Park Neuromodulation Service

A static website to attract psychiatrists to apply for practising privileges with the Northwick Park Neuromodulation Service (London North West University Healthcare NHS Trust).

## Treatments featured

- **rTMS** — Repetitive Transcranial Magnetic Stimulation
- **ECT** — Electroconvulsive Therapy
- **tDCS** — Transcranial Direct Current Stimulation

## Logo

The site uses `assets/logo.svg`, a vector recreation of the official logo (arched service name with central brain motif in `#94BDCE`). If you have the original PNG from the trust, replace or add it as `assets/logo.png` and update the `src` in `index.html`.

## Local preview

Open `index.html` in a browser, or serve locally:

```powershell
cd C:\Users\khass\Projects\northwick-neuromodulation
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Assets from your NeuroMod folder

Copy images from your local NeuroMod folder into `assets/`:

```powershell
cd C:\Users\khass\Projects\northwick-neuromodulation
.\scripts\copy-neuromod-assets.ps1 -Source "C:\path\to\NeuroMod"
```

Expected files after copying:

| Source (NeuroMod folder) | Destination |
|--------------------------|-------------|
| `logo.jpg` | `assets/logo.jpg` |
| rTMS image | `assets/rtms.jpg` |
| ECT image | `assets/ect.jpg` |
| tDCS image | `assets/tdcs.jpg` |

The CNWL trust logo is already at `assets/cnwl-logo.svg`. The hero uses a custom light neural-network illustration at `assets/hero-neural.svg`.

Team headshots are expected in `assets/people/` after copying from the `people` subfolder in your NeuroMod directory.

## Before publishing

1. Replace the placeholder contact email in the Apply section (`neuromodulation@nhs.net`).
2. Swap in the official logo PNG if available (`assets/logo.png`).
3. Confirm trust name, hospital address, and any required NHS branding guidelines.
4. Add real photography or trust-approved imagery if available.

## Structure

- `index.html` — Single-page site (About, Treatments, Why Join, Apply)
- `styles.css` — Clinical theme aligned to logo (`#94BDCE`, `#333333`, `#f8f9fa`)
- `script.js` — Mobile menu, footer year, header scroll shadow
- `assets/logo.svg` — Service logo (SVG fallback)

No build step or dependencies required.
