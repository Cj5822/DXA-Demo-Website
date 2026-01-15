# DXA Demo Website

A modern React e-commerce demo application built with TypeScript, Vite, and Material-UI. This project demonstrates DXA (Digital Experience Analytics) custom dimensions integration and real-time event tracking.

## Overview

DXA Demo Website is a fully responsive, production-ready e-commerce platform featuring:
- Real-time analytics event tracking with DXA custom dimensions
- Dynamic product catalog with filtering and search
- Shopping cart and checkout flow
- Material-UI component library for consistent design
- Client-side routing with React Router
- Single Page Application (SPA) architecture optimized for Vercel deployment

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7 with Hot Module Replacement (HMR)
- **UI Framework**: Material-UI (MUI) 7
- **Routing**: React Router DOM 6
- **Package Manager**: npm
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

``ash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
``

### Development

``ash
# Start development server (runs on http://localhost:5173)
npm run dev
``

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript compilation with strict checking
- ESLint configuration for code quality

### Building for Production

``ash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
``

## Project Structure

``
src/
+-- components/         # Reusable React components
¦   +-- NavBar.tsx     # Navigation header
¦   +-- Footer.tsx     # DXA Console footer with event tracking
¦   +-- CartModal.tsx  # Shopping cart modal
¦   +-- ...
+-- pages/             # Page components (routed views)
¦   +-- Home.tsx
¦   +-- ProductList.tsx
¦   +-- ProductDetail.tsx
¦   +-- Cart.tsx
¦   +-- Checkout.tsx
¦   +-- Success.tsx
+-- context/           # React Context for state management
¦   +-- DXAContext.tsx # Analytics tracking context
+-- data/              # Static data
¦   +-- products.ts
+-- theme/             # Material-UI theme configuration
¦   +-- theme.ts
+-- App.tsx            # Main app component with routing
+-- main.tsx           # React DOM entry point
``

## Features

### DXA Analytics Integration

The application captures and displays custom dimensions in real-time:

**Query Parameters:**
- ?age=<number> - User age demographic
- ?channel=<string> - Traffic source/channel

**Example URLs:**
``
http://localhost:5174/?age=25&channel=naver
http://localhost:5174/products?age=30&channel=email
``

**Console Display:**
Custom dimensions are displayed in the DXA Console footer with timestamp-based event tracking. Open browser DevTools (F12) to view detailed analytics logs.

### Single Page Application (SPA)

The application is configured for SPA routing with proper fallback to index.html for all routes. This enables:
- Client-side navigation without page reloads
- Automatic route matching in development and production
- Support for query parameters across all routes

## Deployment

### Vercel Configuration

The project includes a ercel.json configuration file that handles SPA routing:

``json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
``

This ensures that all routes are properly served in production.

### Deployment Steps

1. Push code to your Git repository (GitHub, GitLab, etc.)
2. Connect repository to Vercel
3. Vercel automatically detects Node.js project and builds with 
pm run build
4. Production build is deployed to edge network

## Available Scripts

| Command | Description |
|---------|-------------|
| 
pm run dev | Start development server with HMR |
| 
pm run build | TypeScript type check + Vite production build |
| 
pm run lint | Run ESLint across all files |
| 
pm run preview | Preview production build locally |

## Code Quality

The project includes ESLint configuration for:
- React best practices
- TypeScript strict mode
- React Hooks rules
- Refresh component rules

Run linting:
``ash
npm run lint
``

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Vite**: Lightning-fast build tool with optimized chunking
- **Code Splitting**: Automatic route-based code splitting
- **SPA Routing**: Client-side navigation without full page reloads
- **Lazy Loading**: Material-UI components loaded on demand

## Troubleshooting

### 404 Errors on Page Reload

If you get a 404 error when reloading on non-root routes (e.g., /products):

**Development:** Ensure ppType: 'spa' is set in ite.config.ts ?

**Production (Vercel):** Ensure ercel.json contains the rewrite rules ?

### Custom Dimensions Not Displaying

1. Verify URL includes query parameters: /?age=10&channel=naver
2. Check browser console (F12) for [DXA Custom Dimensions] log message
3. Ensure DXA Console footer is visible (bottom of page)

## Contributing

When contributing to this project:

1. Maintain TypeScript strict mode compliance
2. Follow ESLint rules (run 
pm run lint)
3. Use meaningful commit messages
4. Test both development and production builds
5. Update README.md for new features

## License

Proprietary - DXA Demo Project

## Support

For issues or questions, please contact the development team or open an issue in the repository.
