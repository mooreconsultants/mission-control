# Mission Control

Your OpenClaw Multi-Agent Team Dashboard

## Overview

Mission Control is a beautiful, real-time dashboard for visualizing and managing your autonomous multi-agent team in OpenClaw. See all 9 agents organized into 3 teams, their current status, and what they're working on.

## Features

- 🎯 **Agent Overview** — See all agents at a glance with their current status
- 📊 **Real-Time Status** — Online, Idle, Working, or Offline indicators
- 🏢 **Team Organization** — Agents grouped into Orchestrator, Operations, Content Pipeline, and Meta Layer
- 🎨 **Modern UI** — Dark-themed, responsive design with smooth animations
- 📱 **Mobile-Friendly** — Looks great on any device

## Team Structure

### Orchestrator (1)
- **Henry** — Chief of Staff, orchestrates all teams

### Operations (2)
- **Charlie** — Infrastructure Engineer
- **Ralph** — QA Manager / Foreman

### Content Pipeline (4)
- **Scout** — Trend Analyst
- **Quill** — Content Writer
- **Pixel** — Thumbnail Designer
- **Echo** — Social Media Manager

### Meta Layer (2)
- **Codex** — Lead Engineer
- **Violet** — Research Analyst

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Runtime:** Node.js
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mooreconsultants/mission-control.git
   cd mission-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Manual Deployment

1. **Push to GitHub** (already done)
   ```bash
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com
   - Click "New Project"
   - Import from GitHub: `mooreconsultants/mission-control`
   - Click "Deploy"

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

## Environment Variables

The dashboard supports the following environment variables:

- `NEXT_PUBLIC_OPENCLAW_API` — OpenClaw API endpoint for live agent data (default: `http://localhost:3000/api`)

Set these in your Vercel project settings or `.env.local` for local development.

## Future Enhancements

- [ ] Real-time agent status from OpenClaw API
- [ ] Live task history and logs
- [ ] Agent performance metrics
- [ ] Interactive agent cards with more details
- [ ] Dark/light theme toggle
- [ ] Webhook integration for agent status updates
- [ ] Historical data visualization
- [ ] Team communication feed

## Project Structure

```
mission-control/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── AgentCard.tsx    # Individual agent card component
│   │   └── TeamSection.tsx  # Team grouping component
│   └── data/
│       └── agents.ts        # Agent data and types
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── vercel.json            # Vercel deployment configuration
```

## Usage

The dashboard displays:

- **Total Agents** — Current count of all agents
- **Online** — Number of agents currently online
- **Working** — Number of agents actively working

Each agent card shows:
- Agent name and role
- Status indicator (online/idle/working/offline)
- Description of their responsibilities
- Current task (if working)
- Last active time

## Contributing

This is your personal dashboard. Feel free to modify:
- Agent data in `src/data/agents.ts`
- Colors and styling in Tailwind config
- Layout and components in `src/components/` and `src/app/`

## License

MIT

---

**Built with ❤️ for autonomous AI teams**

Powered by [OpenClaw](https://openclaw.ai)
