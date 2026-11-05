<<<<<<< HEAD
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
=======
# Dawai-circle
A medicine discovery platform to search Jan Aushadhi medicines, explore listed prices, save medicine lists, and find nearby Jan Aushadhi Kendras.

# Dawai Circle 💊

**Find affordable medicines. Discover nearby Jan Aushadhi Kendras.**

Dawai Circle is a web-based medicine discovery platform designed to help users search for medicines available under the Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP), explore listed prices, create medicine lists, and locate nearby Jan Aushadhi Kendras.

The goal is to make affordable medicine information easier to access through a simple, user-friendly interface.

## ✨ Features

- 🔎 **Medicine Search** — Search medicines by name, salt, strength, brand, or product code.
- 💰 **Price Discovery** — View listed medicine prices.
- 📋 **Medicine List** — Save medicines and estimate the total cost of a list.
- 📍 **Kendra Finder** — Explore nearby Jan Aushadhi Kendras.
- 📤 **Share Medicine List** — Share your saved list to help confirm availability before visiting a store.
- 📱 **Responsive Design** — Designed for desktop and mobile users.

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- CSS

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
https://github.com/Aryankumar0to9/Dawai-circle.git
```

Navigate to the project directory:

```bash
cd dawai-circle
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🗺️ Project Roadmap

- [ ] Integrate verified Jan Aushadhi medicine catalogue and pricing data.
- [ ] Add real Kendra locations, contact details, and directions.
- [ ] Implement medicine availability confirmation.
- [ ] Add prescription image scanning and medicine name extraction.
- [ ] Add Hindi language and voice search support.
- [ ] Build a backend for user accounts and saved medicine lists.
- [ ] Improve search using fuzzy matching and synonyms.

## ⚠️ Disclaimer

Dawai Circle is an independent project and is not affiliated with or endorsed by the Pharmaceuticals & Medical Devices Bureau of India (PMBI) or the Government of India.

Medicine prices, availability, and Kendra details must be verified with an official source or the relevant store before making a purchase.

This platform is for informational purposes only. It does not provide medical advice or recommend medicine substitutions. Consult a qualified healthcare professional before changing any medication.

## 🤝 Contributions

Suggestions, bug reports, and contributions are welcome.

## 📄 License

This project is currently under development. A license will be added before public distribution.
>>>>>>> 8ca1bca65b8c730d2ceb91add91b858d105dd81a
