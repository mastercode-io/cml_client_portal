import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CreditSearchForm.css'; // We'll create this file later for styling

/**
 * CreditSearchForm Component
 * 
 * This component renders a form for credit search with validation using Formik and Yup.
 * It includes fields for personal information and a confirmation checkbox.
 */
const CreditSearchForm = () => {
  // Initial form values
  const initialValues = {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    postalCode: '',
    addressLine: '',
    confirmationCheckbox: false
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(
        /^\+?[0-9]{10,15}$/,
        'Please enter a valid mobile number'
      ),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    postalCode: Yup.string()
      .required('Postal code is required')
      .matches(
        /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$|^[0-9]{5}(-[0-9]{4})?$/i,
        'Please enter a valid postal code'
      ),
    addressLine: Yup.string()
      .when('postalCode', {
        is: (postalCode) => postalCode && postalCode.length > 0,
        then: Yup.string().required('Address is required when postal code is provided'),
        otherwise: Yup.string()
      }),
    confirmationCheckbox: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions')
  });

  // Form submission handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Log form values to console (to be replaced with API call later)
    console.log('Form values:', values);
    
    // In a real application, we would call an API endpoint here
    // Example: checkUserExists(values.email).then(userExists => { ... })
    
    // Reset form and set submitting to false
    setTimeout(() => {
      setSubmitting(false);
      // resetForm(); // Uncomment to reset form after submission
      
      // Here we would handle redirection based on whether the user exists
      // If user exists: redirect to login page
      // If new user: create client and redirect to claims list
    }, 1000);
  };

  return (
    <div className="credit-search-form-container">
      <h2>Credit Search</h2>
      <p className="form-description">
        Please fill out the form below to check if you're eligible to make a claim.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="credit-search-form">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title">Title*</label>
              <Field as="select" id="title" name="title" className={errors.title && touched.title ? 'error-field' : ''}>
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            {/* First Name Field */}
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <Field 
                type="text" 
                id="firstName" 
                name="firstName" 
                className={errors.firstName && touched.firstName ? 'error-field' : ''}
              />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            {/* Middle Name Field (Optional) */}
            <div className="form-group">
              <label htmlFor="middleName">Middle Name (Optional)</label>
              <Field type="text" id="middleName" name="middleName" />
            </div>

            {/* Last Name Field */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <Field 
                type="text" 
                id="lastName" 
                name="lastName" 
                className={errors.lastName && touched.lastName ? 'error-field' : ''}
              />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            {/* Date of Birth Field */}
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <Field 
                type="date" 
                id="dateOfBirth" 
                name="dateOfBirth" 
                className={errors.dateOfBirth && touched.dateOfBirth ? 'error-field' : ''}
              />
              <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
            </div>

            {/* Mobile Field */}
            <div className="form-group">
              <label htmlFor="mobile">Mobile*</label>
              <Field 
                type="tel" 
                id="mobile" 
                name="mobile" 
                placeholder="e.g., +44 7123 456789" 
                className={errors.mobile && touched.mobile ? 'error-field' : ''}
              />
              <ErrorMessage name="mobile" component="div" className="error-message" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                className={errors.email && touched.email ? 'error-field' : ''}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            {/* Postal Code Field */}
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code*</label>
              <Field 
                type="text" 
                id="postalCode" 
                name="postalCode" 
                className={errors.postalCode && touched.postalCode ? 'error-field' : ''}
              />
              <ErrorMessage name="postalCode" component="div" className="error-message" />
            </div>

            {/* Address Line Field */}
            <div className="form-group">
              <label htmlFor="addressLine">Address Line*</label>
              <Field 
                type="text" 
                id="addressLine" 
                name="addressLine" 
                className={errors.addressLine && touched.addressLine ? 'error-field' : ''}
              />
              <ErrorMessage name="addressLine" component="div" className="error-message" />
              <small className="form-text">
                This field will be auto-populated in the future based on postal code lookup.
              </small>
            </div>

            {/* Confirmation Checkbox */}
            <div className="form-group checkbox-group">
              <div className="checkbox-container">
                <Field 
                  type="checkbox" 
                  id="confirmationCheckbox" 
                  name="confirmationCheckbox" 
                  className={errors.confirmationCheckbox && touched.confirmationCheckbox ? 'error-field' : ''}
                />
                <label htmlFor="confirmationCheckbox" className="checkbox-label">
                  I confirm that I have had a finance in the past 6 years and that I was not aware of a commission payment being made to the dealer. I have read and accept T&Cs and the privacy policy. I understand that in order for us to investigate any further, we will conduct a soft credit check through our provider ValidID and that this will not affect my credit score.
                </label>
              </div>
              <ErrorMessage name="confirmationCheckbox" component="div" className="error-message" />
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreditSearchForm;
