# React Monorepo

This monorepo contains a collection of React applications and landing pages, managed with `pnpm` workspaces.

## Projects

### Applications (`apps/`)
- **[Todo App](./apps/todo-app)**: A feature-rich Todo application built with React and Vite.
- **[Matrix Tasks](./apps/matrix-tasks)**: A task management app using the Eisenhower Matrix, built with Next.js 16.
- **[Text Utils](./apps/text-utils)**: A utility app for text manipulation, built with Next.js 16.

### Landing Pages (`landing-pages/`)
- **[Positivus](./landing-pages/positivus)**: A digital marketing agency landing page built with React and Vite.
- **[Refokus](./landing-pages/refokus)**: A creative agency landing page built with React and Vite.

## Tech Stack
- **Package Manager**: `pnpm`
- **Styling**: Tailwind CSS v4
- **Frameworks**: React 19, Next.js 16, Vite

## Getting Started

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Run Development Servers**:
   You can run dev servers for individual projects:
   ```bash
   pnpm --filter <project-name> dev
   ```
   Example: `pnpm --filter todo-app dev`

3. **Build All Projects**:
   ```bash
   pnpm -r build
   ```
