# Kochatelier – Website

Website for a cooking studio offering cooking classes, event location rental, and catering services.

## Tech Stack

| Area            | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Styling         | Tailwind CSS 4          |
| Language        | TypeScript              |
| UI Components   | shadcn/ui + Lucide      |
| Package Manager | npm                     |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production build   |
| `npm run lint`  | Run ESLint               |

## Project Structure

```
src/
├── app/           # Next.js App Router (pages & layouts)
├── components/
│   ├── ui/        # shadcn/ui base components
│   ├── atoms/     # Custom base elements
│   ├── molecules/ # Composite components
│   ├── organisms/ # Complex sections (Navbar, Footer, ...)
│   └── templates/ # Page layouts
├── lib/           # Utilities, constants, placeholder data
├── types/         # TypeScript interfaces
└── hooks/         # Custom React hooks
```

## Branching

| Branch      | Purpose               |
| ----------- | --------------------- |
| `main`      | Production-ready code |
| `develop`   | Integration / staging |
| `feature/*` | New features          |
| `fix/*`     | Bug fixes             |

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Documentation

- [`analyse.md`](./analyse.md) – Reference website analysis
- [`projekt-dokumentation.md`](./projekt-dokumentation.md) – Full project documentation
