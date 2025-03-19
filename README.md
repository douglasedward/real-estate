# Real Estate Management Platform

A production-grade real estate management application built with Next.js, Express, Prisma and PostgreSQL that connects property managers with potential tenants.

## Features

- **Dual User Roles**: Separate interfaces for property managers and tenants
- **Property Management**: List, edit, and manage rental properties
- **Application Processing**: Review and approve tenant applications
- **Lease Management**: Create and manage lease agreements
- **Tenant Dashboard**: Browse properties, save favorites, and submit applications
- **Geospatial Search**: Find properties by location using PostGIS
- **Secure Authentication**: User authentication via AWS Cognito

## Tech Stack

### Frontend

- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management with RTK Query
- **Tailwind CSS**: Utility-first CSS framework
- **AWS Amplify**: Authentication integration
- **Shadcn UI**: Component library

### Backend

- **Express.js**: Node.js web application framework
- **Prisma ORM**: Database access and migrations
- **PostgreSQL**: Relational database with PostGIS extension
- **JWT**: Token-based API authentication
- **AWS S3**: File storage for property images

## Database Schema

The application uses a relational database with the following main models:

- **Property**: Rental properties with details like price, amenities, and location
- **Manager**: Property managers who list and manage properties
- **Tenant**: Users who can browse, favorite, and apply for properties
- **Application**: Rental applications submitted by tenants
- **Lease**: Lease agreements between managers and tenants
- **Location**: Geospatial data for property locations

## Getting Started

### Prerequisites

- Node.js (v22+)
- PostgreSQL with PostGIS extension
- AWS account for Cognito and S3

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/real-estate-platform.git
cd real-estate-platform
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables

   - Create `.env` files in both client and server directories
   - Configure database connection, AWS credentials, and API endpoints

4. Set up the database

```bash
cd server
docker compose up -d
npx prisma migrate dev
npm run seed
```

5. Start the development servers

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend application
cd ../client
npm run dev
```

## Development

### Client Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/state`: Redux store and API queries
- `/src/types`: TypeScript type definitions

### Server Structure

- `/src/controllers`: Request handlers
- `/src/routes`: API route definitions
- `/src/middleware`: Authentication and validation middleware
- `/prisma`: Database schema and migrations

## License

This project is licensed under the ... - see the LICENSE file for details.
