# GrandGale Admin Dashboard

A Next.js admin dashboard for managing nested data (Projects -> Tasks -> Subtasks).

## Architecture

- **Framework**: Next.js (App Router) with TypeScript.
- **State Management**:
  - **Server State**: React Query (TanStack Query) handles data fetching, catching, and optimistic updates.
  - **UI State**: Zustand is used for client-side UI state (e.g., tracking open projects/tasks), avoiding prop drilling.
  - **Data Layer**: A simulated `MockDB` class in `lib/store/mockStore.ts` mimics a backend database, allowing for realistic async mutation patterns.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **Components**: Modular components split by feature (`projects`, `tasks`, `subtasks`) and shared UI (`components/ui`).

## Performance Considerations

- **React Query**: Provides automatic background refetching and stale-time management to minimize network requests.
- **Optimistic UI**: (Implemented via fast mock responses) The UI feels responsive. In a real scenario, we would implement true optimistic updates where the UI updates before the server responds.
- **Composition**: Components are small and focused, reducing unnecessary re-renders.

## Trade-offs & State Management

- **Why MockDB?**: Instead of a simple array, a class-based MockDB simulates async constraints and data integrity better, preparing the codebase for a real API integration.
- **State Normalization**: Data is currently nested. In a larger app, normalizing state (storing entities by ID) would be better to avoid deep updates, but for this scale, the nested approach is simpler and intuitive.

## Future Improvements

- **Drag and Drop**: Reordering tasks using `dnd-kit`.
- **Virtualization**: For large lists of tasks, `react-window` would improve performance.
- **Real Backend**: Replace `mockStore` and `service.ts` with Next.js API Routes and a database (PostgreSQL/Prisma).
- **Testing**: Add Unit/Integration tests with Vitest/Jest.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
