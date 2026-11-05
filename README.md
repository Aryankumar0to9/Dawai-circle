# Dawai Circle — Medicine Finder MVP

A responsive React + Vite prototype for discovering Jan Aushadhi medicines, saving medicine lists, and finding nearby Kendras.

## Included in this MVP
- Search a small sample medicine catalogue by medicine name, composition, strength, brand or code.
- Medicine detail modal.
- Save medicines to a visit list.
- Estimated list total.
- Share/copy list text to ask a Kendra about availability.
- Kendra finder screen with location permission UI.
- Responsive layout for desktop and mobile.
- Safety and data disclaimers.

## Important: Demo data only
All medicine catalogue values, prices, product codes and Kendra cards are sample data for interface prototyping. They are **not verified current PMBI data**, not live inventory, and not actual confirmed shop details. Replace them with verified official data before public launch. The store location search currently does not perform a real directory lookup.

Prescription scanning and AI handwriting recognition are marked as planned and are not implemented.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for deployment
```bash
npm run build
npm run preview
```

## Suggested next development steps
1. Replace `medicines` with a verified PMBI catalogue and cite its data source/update date.
2. Integrate an official/authorized Kendra directory, with verified phone/address/location.
3. Add actual geospatial lookup and map UI.
4. Add backend API and PostgreSQL/Supabase for saved lists and catalogue updates.
5. Add OCR/vision only after medicine matching and safety review are established.

## Safety
Do not recommend medication substitutions. Show exact composition, strength, form and pack size, and require professional confirmation where appropriate. Never label inventory as live unless the store has reliably updated it.
