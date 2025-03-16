# Implementation Plan for Basic Client Portal Web-App

**Version:** 1.0  
**Date:** March 15, 2025

---

## 1. Project Setup

### 1.1. Tech Stack & Architecture
- **Frontend:**  
  - Use a modern JavaScript framework (e.g., React) for the client portal.  
  - Directly integrate with Zoho APIs (Zoho CRM/Creator and Zoho Sign) from the frontend to streamline communication.
  
- **Secure Actions:**  
  - For sensitive operations (such as OTP verification, client record creation, and document signing requests), call custom API endpoints implemented as Deluge functions within Zoho CRM. These functions will be exposed as secure REST endpoints.

- **Version Control:**  
  - Initialize a Git repository with the following structure:
    ```
    /src
      /frontend
      /tests
    ```

### 1.2. Environment & Dependencies
- **Frontend Dependencies:**  
  - React (via create-react-app or Vite)  
  - axios or fetch for HTTP requests  
  - react-router-dom for client-side routing  
  - Form libraries (Formik, Yup) for validation

- **Zoho Credentials:**  
  - Securely store Zoho API keys and OAuth tokens (if applicable) in environment variables, accessible from the frontend via secure build processes.

- **Custom API Endpoints:**  
  - Develop and deploy Deluge functions in Zoho CRM for secure actions. Configure endpoints and security (e.g., IP whitelisting, API key verification) as needed.

---

## 2. Data Modeling & Zoho Integration

### 2.1. Data Model in Zoho CRM/Creator
- Define modules/tables in Zoho for **Clients** and **Claims** with appropriate fields.
- Ensure the email field is unique for client identification.

### 2.2. Direct Frontend API Calls to Zoho
- **Non-Secure Actions:**  
  - For read-only or low-risk operations (e.g., retrieving claims for display), the frontend can call Zoho APIs directly.
  
- **Secure Actions via Custom Deluge Functions:**  
  - Use custom Deluge functions for operations like client creation, OTP generation, and document signing.
  - These functions are exposed as secure REST endpoints within Zoho CRM, which the frontend calls after proper authentication or validation.

### 2.3. API Integration Considerations
- Handle OAuth or API key-based authentication as required by Zoho.
- Implement error handling and retry logic for API calls.
- Document the endpoints (both direct Zoho endpoints and custom Deluge functions) for clarity and maintenance.

---

## 3. Authentication & OTP Flow

### 3.1. New vs. Existing User Check
- **Frontend Action:**  
  - When a user submits the credit search form, the frontend calls a custom Deluge endpoint (e.g., `/api/check-user`) to check if the email exists in Zoho CRM.
  
- **Flow:**  
  - If the email exists, redirect to the login (OTP) page.
  - If not, proceed with client creation through a secure custom API call.

### 3.2. OTP Generation & Verification
- **Generation:**  
  - Use a Deluge function endpoint (`/api/send-otp`) to generate and send an OTP via email/SMS.
  - The OTP and its expiration are managed securely on the backend (within Zoho).

- **Verification:**  
  - Provide a Deluge function endpoint (`/api/verify-otp`) that the frontend calls to validate the OTP.
  - On successful verification, a secure session token (or similar) is returned for further authenticated actions.

### 3.3. Session Management
- Use secure token storage (e.g., HTTP-only cookies or secure local storage) for managing session tokens generated upon successful OTP verification.

---

## 4. Frontend Implementation

### 4.1. Project Structure (React Example)
/src
/components
/CreditSearchForm.jsx
/ClaimsList.jsx
/Login.jsx
/Dashboard.jsx
/ClaimDetails.jsx
/services
/zohoApi.js      <– Centralize direct Zoho API calls
/delugeApi.js    <– For secure actions via Deluge endpoints
/App.jsx
/index.jsx

### 4.2. Routing
- Use `react-router-dom` to map the following routes:
  - `/` → Credit Search Page  
  - `/login` → Login/OTP Page  
  - `/claims` → Claims List Page  
  - `/dashboard` → Client Dashboard  
  - `/dashboard/claims/:claimId` → Claim Details Page

### 4.3. Component Responsibilities
- **CreditSearchForm:**  
  - Render form fields (Title, First Name, Last Name, DOB, Mobile, Email, Postal Code, Address Line, Confirmation Checkbox).
  - On submit, call `/api/check-user` via a custom Deluge endpoint to decide between client creation and login flow.

- **ClaimsList:**  
  - Fetch and display claims by calling a direct Zoho API endpoint for low-risk data retrieval.
  - Allow selection via checkboxes, then submit selection to a secure custom endpoint that triggers document signing via Zoho Sign.

- **Login (OTP) Page:**  
  - Handle OTP request and verification by calling custom Deluge endpoints (`/api/send-otp` and `/api/verify-otp`).

- **Dashboard:**  
  - Retrieve user data and claims (combining direct Zoho API calls and secure endpoints as needed) and provide navigation options.

### 4.4. Secure API Calls
- For sensitive actions, use the custom Deluge endpoints defined in Zoho CRM.
- Create a service module (e.g., `delugeApi.js`) to encapsulate calls, error handling, and token management.

---

## 5. Custom API Endpoints (Deluge Functions)

### 5.1. Developing Deluge Functions in Zoho CRM
- **Check User Endpoint (`/api/check-user`):**  
  - Accepts an email parameter and queries Zoho CRM to check for existing client records.

- **Client Creation Endpoint (`/api/create-client`):**  
  - Securely creates a new client record based on form data.

- **OTP Endpoints:**  
  - `/api/send-otp`: Generates and sends an OTP, storing it securely.
  - `/api/verify-otp`: Validates the OTP and returns a session token if valid.

- **Claims & Document Signing Endpoint (`/api/generate-docs`):**  
  - Accepts client ID and selected claims, triggers Zoho Sign integration, and returns a signing URL.

- **Additional Endpoints:**  
  - Other secure actions (e.g., updating claim statuses) can be handled via similar Deluge functions.

### 5.2. Security & Authentication
- Implement necessary security measures within the Deluge functions (e.g., API key checks, IP restrictions).
- Ensure endpoints validate inputs and handle errors robustly.

---

## 6. Testing & QA

### 6.1. Unit & Integration Testing
- Write unit tests for React components, especially forms and service modules.
- Test custom Deluge functions within Zoho CRM, ensuring they handle both successful and error cases.

### 6.2. End-to-End (E2E) Testing
- Use Cypress or Playwright to simulate complete user flows from credit search through OTP login to claim selection and document signing.

### 6.3. Security Testing
- Validate that custom endpoints properly enforce security measures (e.g., API key or token validation).
- Test OTP generation/verification to prevent brute force attempts.

### 6.4. Performance Testing
- Monitor API call latency (both direct Zoho API calls and custom Deluge endpoints) and adjust as needed.

---

## 7. Deployment Considerations

### 7.1. Hosting the Frontend
- Deploy the React application on platforms like Netlify, Vercel, or a similar static site host.

### 7.2. Deluge Functions in Zoho CRM
- Deploy and configure custom API endpoints in Zoho CRM.
- Ensure proper configuration of security settings and API credentials.

### 7.3. Environment Variables
- Securely manage Zoho API keys, OAuth tokens, and other sensitive configurations.

### 7.4. CI/CD Pipeline
- Implement a CI/CD process (using GitHub Actions, GitLab CI, etc.) to automate testing and deployment of the frontend.

### 7.5. Monitoring & Logging
- Set up monitoring for both the frontend (error logging, performance tracking) and the custom Deluge endpoints in Zoho CRM.

---

## Sample Prompts for Coding Agents

### For Frontend Components (React)
Please generate a React component for the CreditSearchForm that:
	•	Renders the form fields (Title, First Name, Last Name, DOB, Mobile, Email, Postal Code, Address Line, Confirmation Checkbox).
	•	On submit, calls a custom Deluge endpoint (/api/check-user) to check if the client exists.
	•	If the user exists, redirect to the OTP login page; otherwise, call /api/create-client to register the user.
	•	Include form validation using Formik and Yup.

### For Deluge API Endpoints
Please provide a sample Deluge function for Zoho CRM that acts as the /api/send-otp endpoint.
The function should:
	•	Accept an email or mobile number as input.
	•	Generate a 6-digit OTP.
	•	Send the OTP via the appropriate channel (email/SMS).
	•	Store the OTP with an expiration timestamp.
	•	Return a success response.

### For Secure API Calls Service Module
Create a JavaScript service module (delugeApi.js) that:
	•	Encapsulates calls to the custom Deluge endpoints (e.g., /api/create-client, /api/send-otp, /api/verify-otp, /api/generate-docs).
	•	Handles API key/token management.
	•	Implements error handling and response parsing.

---

## Summary

This implementation plan reflects the new integration strategy:

- **Direct Frontend Integration with Zoho APIs:**  
  - Low-risk actions (e.g., data retrieval) use direct API calls from the frontend.

- **Secure Operations via Custom Deluge Endpoints:**  
  - Sensitive actions (client creation, OTP handling, document signing initiation) are executed through secure, custom Deluge functions in Zoho CRM exposed as REST APIs.

- **Streamlined Architecture:**  
  - This approach minimizes a separate backend layer, leveraging Zoho’s capabilities directly while maintaining security through controlled custom endpoints.

- **Testing, Security, and Deployment:**  
  - Maintain robust testing (unit, integration, E2E) and deploy using modern CI/CD practices with secure management of credentials.

This plan is now ready to be provided to coding agents like Windsurf Cascade and Claude Sonet 3.5/3.7 for systematic code generation and integration.
