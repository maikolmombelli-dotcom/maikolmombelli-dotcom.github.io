# maikolmombelli-dotcom.github.io

Personal portfolio of **Maikol Mombelli**, a backend-focused software development student at ITS ICT Piemonte (Turin).

**Live site:** https://maikolmombelli-dotcom.github.io/

## Stack

Plain HTML, CSS and JavaScript — no framework, no build step. Hosted on GitHub Pages.

- Light/dark theme that follows the system setting and remembers the visitor's choice
- Responsive layout with a mobile menu
- Respects `prefers-reduced-motion`
- Open Graph / Twitter meta tags for link previews

## Structure

```
index.html            page content
style.css             styles and theme tokens
script.js             theme, mobile menu, reveal animations, marquee, lightbox
assets/icon/          favicon
assets/images/        portrait, project images, link-preview image (og-image.png)
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
