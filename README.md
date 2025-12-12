# React Monorepo

This monorepo contains a collection of React applications and landing pages, managed with `pnpm` workspaces.

## Projects

### Applications (`apps/`)
- **[Todo App](./apps/todo-app)**: A feature-rich Todo application built with Next.js 16 and Tailwind CSS v4. [Live Demo](https://todo-app-mu-rouge.vercel.app/)
- **[Matrix Tasks](./apps/matrix-tasks)**: A task management app using the Eisenhower Matrix, built with Next.js 16. [Live Demo](https://matrix-tasks.vercel.app/)
- **[Text Utils](./apps/text-utils)**: A utility app for text manipulation, built with Next.js 16. [Live Demo](https://text-utils-two-kohl.vercel.app/)

### Landing Pages (`landing-pages/`)
- **[Positivus](./landing-pages/positivus)**: A digital marketing agency landing page built with Next.js 16. [Live Demo](https://positivus-ebon-one.vercel.app/)
- **[Refokus](./landing-pages/refokus)**: A creative agency landing page built with Next.js 16. [Live Demo](https://refokus-rouge.vercel.app/)

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
