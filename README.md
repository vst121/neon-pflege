# Neon Pflege - Care Solution Finder

A beautiful Angular 18 Single Page Application (SPA) that helps seniors and their families find personalized care solutions through an interactive questionnaire wizard.

## Features

- **Step-by-Step Wizard**: Beautiful multi-step questionnaire interface
- **Three Main Sections**:
  1. Living Conditions - Residence type, living situation, home accessibility
  2. Mobility - Mobility level, walking aids, daily activities, transportation
  3. Health Needs - Medical conditions, medication management, personal care, cognitive support
- **Personalized Recommendations**: AI-powered recommendations based on responses including:
  - Home Help Services
  - Part-Time Care
  - Barrier-Free Bathroom modifications
  - Mobility Aids for seniors
- **Modern UI/UX**: Beautiful gradient designs, smooth animations, and responsive layout
- **Priority-Based Results**: Recommendations categorized by priority (High, Medium, Low)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:4200
```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/neon-pflege` directory.

## Project Structure

```
src/
├── app/
│   ├── wizard/
│   │   ├── steps/
│   │   │   ├── living-conditions-step.component.*
│   │   │   ├── mobility-step.component.*
│   │   │   └── health-needs-step.component.*
│   │   └── wizard.component.*
│   ├── results/
│   │   └── results.component.*
│   ├── wizard.service.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── styles.scss
└── main.ts
```

## Technology Stack

- **Angular 18**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with CSS variables
- **RxJS**: Reactive programming for state management

## Design Features

- Gradient backgrounds and modern color schemes
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Accessible form controls with visual feedback
- Card-based UI with hover effects
- Progress indicators and step navigation

## Development

The application uses Angular's standalone components architecture, making it lightweight and modern. All components are self-contained with their own templates and styles.

## License

This project is created for demonstration purposes.


