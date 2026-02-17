💸 Forex Doll x Brat 365 💸
Market analysis with a vibe shift.

A high-fidelity Forex dashboard built with Next.js 15, Tailwind CSS, and Recharts. This dashboard offers a dual-mode experience: start with the sophisticated, "Soft Doll" aesthetic and toggle into the high-octane "Brat" mode with custom audio, neon glitch effects, and obsidian-dark backgrounds.

✨ Features

Dual-Vibe UI: Seamlessly switch between a soft-pink "Doll" aesthetic and a lime-green "Brat" industrial theme.

Nuclear Dark Mode: A custom React side-effect that forces a black background over all global CSS overrides.

Dynamic Forex Data: Real-time relative performance tracking for USD, EUR, GBP, JPY, and more.

Glitch Engine: Custom CSS keyframes providing industrial jitter and neon flicker in Brat mode.

Responsive Analytics: Interactive charts with custom tooltips and step-line visualizations.

🛠 Tech Stack

Framework: Next.js 16 (App Router + Turbopack)

Styling: Tailwind CSS

Charts: Recharts

Icons: Lucide React

Deployment: Vercel

🚀 Getting Started

Clone the repo

Bash
git clone https://github.com/ashavab/full-stack-dashboard.git
Install dependencies

Bash
npm install
Run Development Server

Bash
npm run dev
💅 Vibe Configuration

The "Brat" mode is triggered via a useEffect that injects a high-specificity style tag into the document head, ensuring that the obsidian black background overrides even the most stubborn global CSS rules.
