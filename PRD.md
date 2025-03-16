# Product Requirements Document (PRD)
**Project:** Basic Client Portal Web-App  
**Version:** 0.2  
**Date:** March 15, 2025  

---

## 1. Overview
This document outlines the initial product requirements for a basic client portal web-app. The portal will serve as the primary interface for new and returning clients to initiate a credit search, manage claims, and complete document signing through an integrated Zoho Sign workflow. The application will leverage Zoho CRM/Creator for data storage and backend processes.

---

## 2. Objectives
- **Streamlined Client Onboarding:** Direct first-time visitors to a credit search page where they can input details to create a new client record.  
- **Efficient Claim Processing:** Allow clients to select claims via checkboxes and proceed with document signing.  
- **Secure Access for Returning Users:** Route users with existing email records to a login page with OTP authentication via email or mobile.  
- **Centralized Client Dashboard:** Provide a dashboard displaying the client's name, claims/requests, and current statuses, with easy navigation to claim details and account information.

---

## 3. Target Users
- **New Clients:** Visitors arriving at the credit search page who have not yet registered.  
- **Returning Clients:** Users with existing records who need secure access via OTP login.

---

## 4. Key Features & Functionality

### 4.1. Credit Search & Registration
**Credit Search Page**  
- **Purpose:** Quickly determine if a user has had finance in the last 6 years and whether they can claim.  
- **Form Fields & Flow (Based on Attached Description):**  
  1. **Title** (Dropdown)  
  2. **First Name** (Text)  
  3. **Middle Name** (Text, optional)  
  4. **Last Name** (Text)  
  5. **Date of Birth** (Date Picker)  
  6. **Mobile** (Text)  
  7. **Email** (Text, validated as email)  
  8. **Postal Code** (Text)  
  9. **Address Line** (Text, optional if address is looked up automatically after postal code, or required if no auto-lookup)  
  10. **Confirmation Checkbox:**  
     - “I confirm that I have had a finance in the past 6 years and that I was not aware of a commission payment being made to the dealer. I have read and accept T&Cs and the privacy policy. I understand that in order for us to investigate any further, we will conduct a soft credit check through our provider ValidID and that this will not affect my credit score.”  
- **Validation:**  
  - Mandatory fields: Title, First Name, Last Name, Date of Birth, Mobile, Email, Postal Code.  
  - Checkbox must be ticked to proceed.  
  - Email and phone formats must be valid.  
- **Submission Behavior:**  
  - On submission, a new client record is created in Zoho CRM/Creator if the email is not already in use.  
  - Additional business logic is triggered (e.g., verifying client eligibility).  
  - If the email already exists, the user is redirected to the **Login Page** (OTP-based).  
  - If new record creation is successful, the user is redirected to the **Claims List Page** to view and select relevant claims.  

### 4.2. Claims Management
- **Claims List Page:**  
  - Displays a list of claims with checkboxes for selection.  
  - Includes a clear call-to-action button that proceeds to the next step (document generation and signing via Zoho Sign).  

### 4.3. Existing User Login
- **Login Page:**  
  - If a submitted email is recognized, redirect the user here.  
  - Implements OTP verification sent to the user's email or mobile.  

### 4.4. Client Dashboard
- **Dashboard Overview:**  
  - Displays the client’s name and a list of claims/requests with current statuses.  
  - Each claim or related button is clickable, opening a detailed claim page.  
- **Navigation & Quick Actions:**  
  - **Icons Only Navigation:** Minimalistic approach with icons:  
    - Home (Dashboard)  
    - Account (Detailed user information)  
  - **Action Icons/Buttons:**  
    - Email Request  
    - Request a Callback  
    - Book a Meeting  

---

## 5. Technical Requirements

### 5.1. Backend
- **Data Storage:**  
  - Utilize Zoho CRM/Creator to store all client and claims data.  
- **Business Logic:**  
  - Execute relevant processes post client registration (e.g., verification, eligibility checks).  
- **Document Signing Integration:**  
  - Use Zoho Sign API for generating and signing documents.  

### 5.2. Frontend
- **User Interface:**  
  - Responsive, user-friendly design.  
  - Consistent UI elements across pages with minimal navigation (icons only).  
- **Form Validation:**  
  - Client-side and server-side validations for the credit search form.  
- **Security:**  
  - Implement secure OTP authentication for the login process.  

### 5.3. Integration & Dependencies
- **Third-Party Services:**  
  - Zoho CRM/Creator (backend)  
  - Zoho Sign (document signing)  
  - Email/SMS provider for OTP services  

---

## 6. User Flow

1. **First Time Visitor:**  
   - Arrives at the **Credit Search Page**.  
   - Fills out and submits the form after validation.  
   - New client record is created; additional business logic is executed.  
   - Redirected to the **Claims List Page** where they can select claims.  
   - Proceeds to document signing via the Zoho Sign integration.  

2. **Returning Client:**  
   - If the submitted email is recognized, the user is redirected to the **Login Page**.  
   - Completes OTP-based login (via email or mobile).  
   - Accesses the **Client Dashboard** which displays:  
     - Client name  
     - List of claims/requests with statuses  
     - Options to view claim details and manage account information  

3. **Dashboard Navigation:**  
   - **Home Icon:** Takes the user back to the dashboard.  
   - **Account Icon:** Opens detailed user information.  
   - **Action Icons:**  
     - Email Request  
     - Callback Request  
     - Book a Meeting  

---

## 7. Non-Functional Requirements
- **Performance:**  
  - Fast load times and efficient form submission processes.  
- **Security:**  
  - Robust OTP authentication.  
  - Secure handling of client data.  
- **Usability:**  
  - Simple, intuitive UI without unnecessary menus.  
- **Scalability:**  
  - Easy integration with Zoho services and potential for future expansion.  
- **Accessibility:**  
  - Compliant with web accessibility standards.  