# CML Client Portal

## Overview

This client portal web application serves as the primary interface for new and returning clients to initiate credit searches, manage claims, and complete document signing through an integrated Zoho Sign workflow. The application leverages Zoho CRM/Creator for data storage and backend processes.

### Key Features

- **Streamlined Client Onboarding**: Direct first-time visitors to a credit search page where they can input details to create a new client record.
- **Efficient Claim Processing**: Allow clients to select claims via checkboxes and proceed with document signing.
- **Secure Access for Returning Users**: Route users with existing email records to a login page with OTP authentication via email or mobile.
- **Centralized Client Dashboard**: Provide a dashboard displaying the client's name, claims/requests, and current statuses, with easy navigation to claim details and account information.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces
- **React Router**: For client-side routing
- **Formik & Yup**: For form management and validation
- **Axios**: For HTTP requests to Zoho APIs

### Backend/Data Storage
- **Zoho CRM/Creator**: For storing client and claims data
- **Zoho Sign**: For document generation and signing
- **Custom Deluge Functions**: For secure operations (OTP verification, client creation, etc.)

## Project Structure

```
/
├── src/
│   ├── frontend/         # React application
│   │   ├── public/       # Static files
│   │   ├── src/          # React source code
│   │   │   ├── components/  # React components
│   │   │   ├── services/    # API services
│   │   │   ├── pages/       # Page components
│   │   │   └── utils/       # Utility functions
│   └── tests/            # Test files
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## Development Environment Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   cd src/frontend
   npm install
   ```

### Environment Setup

1. Create a `.env` file in the project root (if not already present):
   ```bash
   touch .env
   ```

2. Add the following environment variables to the `.env` file:
   ```
   REACT_APP_ZOHO_API_KEY=your_zoho_api_key_here
   REACT_APP_ZOHO_CLIENT_ID=your_zoho_client_id_here
   REACT_APP_ZOHO_CLIENT_SECRET=your_zoho_client_secret_here
   REACT_APP_API_BASE_URL=https://api.zoho.com/
   REACT_APP_ENV=development
   ```

3. Replace the placeholder values with your actual Zoho API credentials.

> **Note**: The `.env` file is included in `.gitignore` to prevent sensitive information from being committed to the repository.

### Running the Application

1. Start the development server:
   ```bash
   cd src/frontend
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Zoho Integration

### API Configuration

1. Create a Zoho Developer account and register your application to obtain API credentials.
2. Set up the required Zoho CRM modules for Clients and Claims.
3. Configure custom Deluge functions for secure operations (OTP verification, client creation, etc.).

### Authentication

The application uses Zoho OAuth for authentication. Make sure to configure the correct redirect URIs in your Zoho Developer Console.

## Testing

Run tests using the following command:

```bash
npm test
```

## Deployment

Build the application for production:

```bash
npm run build
```

Deploy the built files to your preferred hosting service (e.g., Netlify, Vercel, or a similar static site host).
