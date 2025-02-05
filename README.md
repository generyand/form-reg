# User Registration Desktop Application

A cross-platform desktop application built with Electron, React, and TypeScript for managing user registrations. The application features a modern UI with real-time updates and a PostgreSQL database backend.

## Features

- 🎯 Cross-platform desktop application (Windows, macOS, Linux)
- 🚀 Built with Electron, React, and TypeScript
- 💾 PostgreSQL database with Prisma ORM
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time updates using React Query
- 🔒 Secure database connections with connection pooling
- 🛠️ Full CRUD operations for user management

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or pnpm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/generyand/form-reg.git
cd form-reg
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up your environment variables by creating a `.env` file in the root directory:
```bash
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-direct-postgresql-connection-string"
VITE_API_URL="http://localhost:3000"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

## Development

To start the application in development mode:

```bash
npm run dev
# or
pnpm dev
```

## Building

To build the application for production:

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

## Project Structure

```
stud-reg/
├── src/
│   ├── main/           # Electron main process
│   ├── renderer/       # React frontend
│   ├── preload/        # Preload scripts
│   └── shared/         # Shared types and utilities
├── prisma/            # Database schema and migrations
└── resources/         # Application resources
```

## Technology Stack

- **Frontend**: React, TailwindCSS, React Query
- **Backend**: Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Desktop Framework**: Electron
- **Build Tools**: electron-vite, electron-builder
- **Language**: TypeScript

## Scripts

- `npm run dev` - Start the application in development mode
- `npm run build` - Build the application
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Electron team for the amazing framework
- React team for the frontend library
- Prisma team for the ORM
- TailwindCSS team for the styling framework
