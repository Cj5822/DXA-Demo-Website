# DXA Demo Website

A modern React e-commerce demo application built with TypeScript, Vite, and Material-UI. This project demonstrates DXA (Digital Experience Analytics) custom dimensions integration and real-time event tracking.

## Overview

DXA Demo Website is a fully responsive, production-ready e-commerce platform featuring:

* Real-time analytics event tracking with DXA custom dimensions
* Dynamic product catalog with filtering and search
* Shopping cart and checkout flow
* Material-UI (MUI) component library for consistent design
* Client-side routing with React Router
* Single Page Application (SPA) architecture optimized for Vercel deployment

## Tech Stack

* **Frontend**: React 19 with TypeScript
* **Build Tool**: Vite 7 (HMR enabled)
* **UI Framework**: Material-UI (MUI) 7
* **Routing**: React Router DOM 6
* **Package Manager**: npm
* **Deployment**: Vercel

## Getting Started

### Prerequisites

* Node.js 18+
* npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:5173)
npm run dev
```

The development server includes:

* Hot Module Replacement (HMR)
* TypeScript strict type checking
* ESLint for code quality

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```text
src/
├── components/          # Reusable React components
│   ├── NavBar.tsx       # Navigation header
│   ├── Footer.tsx       # DXA Console footer with event tracking
│   ├── CartModal.tsx    # Shopping cart modal
│   └── ...
├── pages/               # Routed page components
│   ├── Home.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── Success.tsx
├── context/             # React Context providers
│   └── DXAContext.tsx   # Analytics tracking context
├── data/                # Static data
│   └── products.ts
├── theme/               # MUI theme configuration
│   └── theme.ts
├── App.tsx              # App component with routing
└── main.tsx             # React entry point
```

## Features

### DXA Analytics Integration

The application captures and displays custom dimensions in real time.

**Query Parameters**:

* `age=<number>` – User age demographic
* `channel=<string>` – Traffic source or campaign channel

**Example URLs**:

```text
http://localhost:5173/?age=25&channel=naver
http://localhost:5173/products?age=30&channel=email
```

**Console Display**:
Custom dimensions are displayed in the DXA Console footer with timestamped events. Open browser DevTools (F12) for detailed analytics logs.

### Single Page Application (SPA)

The application supports full SPA routing with proper fallback handling:

* Client-side navigation without page reloads
* Query parameter support across all routes
* Consistent routing in development and production

## Deployment

### Vercel Configuration

The project includes a `vercel.json` file to support SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deployment Steps

1. Push the repository to GitHub / GitLab
2. Connect the repository to Vercel
3. Vercel automatically runs:

   ```bash
   npm run build
   ```
4. The production build is deployed to Vercel’s edge network

## Available Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start development server with HMR      |
| `npm run build`   | Type check and build production bundle |
| `npm run lint`    | Run ESLint                             |
| `npm run preview` | Preview production build locally       |

## Code Quality

The project enforces best practices via ESLint:

* React and Hooks rules
* TypeScript strict mode
* Consistent formatting and safety checks

Run linting:

```bash
npm run lint
```

## Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

## Performance Optimizations

* **Vite**: Fast dev server and optimized builds
* **Code Splitting**: Route-based chunking
* **SPA Routing**: No full-page reloads
* **Lazy Loading**: Optimized MUI imports

## Troubleshooting

### 404 Errors on Page Reload

If reloading a non-root route (e.g. `/products`) causes a 404:

* **Development**: Ensure `appType: 'spa'` is set in `vite.config.ts`
* **Production**: Ensure `vercel.json` rewrite rules are present

### Custom Dimensions Not Displaying

1. Confirm query parameters exist in the URL (e.g. `?age=25&channel=naver`)
2. Check DevTools console for DXA logs
3. Ensure the DXA Console footer is visible

## Contributing

When contributing:

1. Maintain TypeScript strict mode
2. Run `npm run lint` before committing
3. Use clear, descriptive commit messages
4. Test both dev and production builds
5. Update README.md for new features

## License

Proprietary – DXA Demo Project

## Support

For issues or questions, please contact the development team or open an issue in the repository.
