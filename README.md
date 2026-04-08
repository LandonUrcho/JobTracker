# Job Tracker 📊

A modern web application to help you organize and track your job search. Monitor all your job applications, interview schedules, and opportunities in one centralized place.

## Features

- 📝 **Track Applications** - Keep detailed records of every job application
- 📅 **Schedule Interviews** - Manage interview dates and notes
- 📊 **View Dashboard** - See your job search progress at a glance
- 🎨 **Modern UI** - Clean and intuitive interface built with React and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with server-side rendering
- **Frontend**: [React 19](https://react.dev/) - UI library
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety
- **Linting**: [ESLint](https://eslint.org/) - Code quality tool

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** - Version 18.17 or later ([Download](https://nodejs.org/))
- **npm** - Version 9 or later (comes with Node.js)
- **Git** - For version control ([Download](https://git-scm.com/))

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- Next.js and React
- Tailwind CSS
- TypeScript
- ESLint

## Getting Started

### Development Mode

Run the development server with hot-reload:

```bash
npm run dev
```

The application will start at:
- **Local**: http://localhost:3000
- **Network**: Check terminal output for network address

The page will automatically reload when you make changes to files.

### Production Build

Create an optimized production build:

```bash
npm run build
```

### Start Production Server

Run the production build:

```bash
npm start
```

## Project Structure

```
job-tracker/
├── app/
│   ├── components/
│   │   └── Navigation.tsx          # Main navigation component
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard page
│   ├── jobs/
│   │   └── page.tsx               # Jobs listing page
│   ├── add-job/
│   │   └── page.tsx               # Add job form page
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home/landing page
│   └── globals.css                # Global styles
├── public/                         # Static assets
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── tailwind.config.mjs             # Tailwind CSS configuration
├── eslint.config.mjs               # ESLint configuration
└── README.md                       # This file
```

## Available Pages

### Home `/`
Landing page with overview of the application and call-to-action buttons.

### Dashboard `/dashboard`
View job search statistics including:
- Total applications count
- Number of interviews scheduled
- Offers received

### Jobs `/jobs`
List view of all your tracked job applications with filtering options.

### Add Job `/add-job`
Form to add a new job application with:
- Company name
- Job position
- Application date
- Current status
- Notes and details

### About `/about`
Information about the application and its features.

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## Development Workflow

### Making Changes

1. Make changes to files in the `app/` directory
2. The development server will automatically hot-reload
3. Check your browser at http://localhost:3000

### Creating New Pages

To create a new page:
1. Create a new folder in `app/` directory
2. Add a `page.tsx` file inside
3. Export a default React component
4. Optionally add to Navigation.tsx

Example:
```typescript
// app/settings/page.tsx
export default function Settings() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold">Settings</h1>
      </div>
    </div>
  );
}
```

### Styling

This project uses Tailwind CSS. Apply styles directly in JSX using utility classes:

```typescript
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click me
</button>
```

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, specify a different port:

```bash
npm run dev -- -p 3001
```

### Dependencies Installation Issues

Try clearing cache and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clean the build directory and rebuild:

```bash
rm -rf .next
npm run build
```

## Future Enhancements

- [ ] Database integration for data persistence
- [ ] User authentication and accounts
- [ ] Advanced filtering and search
- [ ] Email reminders for follow-ups
- [ ] Export reports (PDF, CSV)
- [ ] Dark mode support
- [ ] Mobile app version

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Commit with clear messages (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Open an issue on the repository
- Check existing documentation
- Review the Next.js documentation at https://nextjs.org/docs

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Version**: 0.1.0 (Beta)  
**Last Updated**: April 2026
