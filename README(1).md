# Kila Siku — Daily Cyber Drip

A tiny offline-first PWA that delivers one cyber security concept and one interview question a day. Built for learning in small, consistent doses — on the bus, between tasks, wherever — instead of another bookmarked tutorial that never gets finished.

**Live:** https://lonyoriconsulting-maker.github.io/kila-siku/

## What it does

- One concept + one interview Q&A per day, deterministic by date (same content across all your devices)
- Optional "drill" — a 30-second exercise, tucked away so it's never mandatory
- Local streak counter
- Fully offline after first load, via service worker — no connectivity needed once installed
- Installable on Android home screen via Chrome's "Add to Home screen"

## Content

36 items rotating across six areas, cycling roughly every 5 weeks:

- Programming & Scripting
- Engineering Mathematics
- Digital Electronics
- Data Structures & OOP
- Computer Architecture
- Cyber Security Foundations

## Adding content

Open `content.js` and copy one `{ ... }` block in the `DRIPS` array, edit the fields, done. `drill` can be `null` if there's no exercise for that item.

## Stack

Plain HTML/CSS/JS, no build step, no dependencies, no CDN calls — kept offline-safe by design. Served as a static site via GitHub Pages.

---
Built by [LERO Systems / Consulting](https://lonyoriconsulting-maker.github.io/).
