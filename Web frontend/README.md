# Weaver Frontend

A React application built with Vite, featuring user authentication, profile management, and responsive UI components. The frontend connects to a Python backend API for user data and service operations.

## Tech Stack

- **React 19** - UI library with latest features and improvements
- **Vite** - Next-generation frontend build tool with lightning-fast HMR
- **React Router 7** - Client-side routing for multi-page navigation
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **Vitest** - Unit and integration testing framework with UI mode
- **ESLint** - Code quality and consistency checks
- **MSW** - Mock Service Worker for API mocking in tests

## Project Structure

```
src/
├── BasePages/          # Authentication and core pages
│   ├── Home.jsx        # Landing page
│   ├── login.jsx       # Login page
│   ├── register.jsx    # Registration page
│   ├── Not_ready_page.jsx
│   └── AuthContext.jsx # Authentication context provider
├── UserPages/          # User-specific pages
│   ├── PersonalPage.jsx # User profile page
│   └── PageComponents/ # Reusable form components
│       ├── FieldEmail.jsx
│       ├── FieldPhone.jsx
│       ├── FieldImage.jsx
│       ├── FieldLink.jsx
│       ├── TextField.jsx
│       └── ModalField.jsx
├── _tests_/            # Test files
│   ├── mocks/          # Test mocks and server setup
│   └── *.test.jsx      # Component and integration tests
├── main.jsx            # Application entry point
├── router.jsx          # Route definitions
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run test:ui` | Run tests with Vitest UI |

## Features

- **User Authentication** - Login and registration with context-based state management
- **User Profiles** - Personalized user pages with editable fields
- **Form Components** - Reusable field components for email, phone, images, and links
- **Modal Fields** - Interactive modal-based field editing
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Comprehensive Testing** - Unit and integration tests with MSW mocking

## Testing

Tests are configured with Vitest and React Testing Library. Mock API responses are handled through MSW.

```bash
# Run tests once
npm run test

# Watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Interactive UI mode
npm run test:ui
```

## Code Quality

ESLint is configured to maintain code consistency and catch common issues:

```bash
npm run lint
```

## API Integration

The frontend connects to a Python backend API. Configure the API endpoint in your environment or component initialization.

## Routing

Routes are defined in `router.jsx`:

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/personalPage` - User profile page
- `/Not_ready` - Placeholder page

## Contributing

When developing new features:

1. Create components in the appropriate folder (`BasePages` or `UserPages`)
2. Add tests alongside your components
3. Follow ESLint rules
4. Use Tailwind CSS for styling
5. Keep components focused and reusable
