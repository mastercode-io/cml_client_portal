import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from './ui/form-field';
import CheckboxField from './ui/checkbox-field';
import DatePicker from './ui/date-picker';
import { CustomButton } from './ui/custom-button';
import valid8Service from '../services/valid8Service';
import './CreditSearchForm.css';

/**
 * CreditSearchForm Component
 * 
 * This component renders a form for credit search with validation using Formik and Yup.
 * It includes fields for personal information and a confirmation checkbox.
 */
const CreditSearchForm = () => {
  // State for address options
  const [addressOptions, setAddressOptions] = useState([{ value: '', label: 'Enter postal code first' }]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  // Title options
  const titleOptions = [
    { value: '', label: 'Select title' },
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Dr', label: 'Dr' },
    { value: 'Rev', label: 'Rev' },
  ];

  // Initial form values
  const initialValues = {
    title: '',
    firstName: '',
    middleName: '',
    surname: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    postalCode: '',
    addressLine: '',
    confirmationCheckbox: false
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string(),
    firstName: Yup.string().required('First name is required'),
    surname: Yup.string().required('Surname is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date('2003-12-31'), 'Date of birth cannot be after 2003-12-31'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .test('valid-mobile', 'Please enter a valid mobile number', function(value) {
        if (!value) return false;
        const strippedNumber = stripPhoneFormatting(value);
        // UK mobile numbers are typically 10-11 digits
        return strippedNumber.length >= 10 && strippedNumber.length <= 11;
      }),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    postalCode: Yup.string()
      .required('Postal code is required')
      .matches(
        /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$|^[0-9]{5}(-[0-9]{4})?$/i,
        'Please enter a valid postal code'
      ),
    addressLine: Yup.string().when('postalCode', {
      is: (postalCode) => postalCode && postalCode.length >= 3,
      then: () => Yup.string().required('Address is required'),
      otherwise: () => Yup.string(),
    }),
    confirmationCheckbox: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions')
  });

  // Function to fetch addresses by postal code
  const fetchAddressesByPostalCode = async (postalCode) => {
    if (!postalCode || postalCode.length < 3) {
      setAddressOptions([{ value: '', label: 'Enter postal code first' }]);
      return;
    }
    
    setIsLoadingAddresses(true);
    
    try {
      // Call Valid8 API to get addresses
      const addressList = await valid8Service.postcodeAddressLookup(postalCode);
      const formattedOptions = valid8Service.formatAddressOptions(addressList);
      setAddressOptions(formattedOptions);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddressOptions([{ value: '', label: 'Not valid postcode format' }]);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  // Function to format mobile number
  const formatMobileNumber = (value) => {
    if (!value) return value;
    
    // Remove any non-digit characters
    let phoneNumber = value.replace(/\D/g, '');
    
    // Format based on length
    if (phoneNumber.length <= 4) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
    } else {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 11)}`.trim();
    }
  };

  // Function to strip non-digit characters from phone number for validation
  const stripPhoneFormatting = (phoneNumber) => {
    if (!phoneNumber) return '';
    // Remove the +44 prefix and any non-digit characters
    return phoneNumber.replace(/^\+44\s*/, '').replace(/[^0-9]/g, '');
  };

  // Function to capitalize first letter of each word
  const capitalizeWords = (value) => {
    if (!value) return value;
    return value
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

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

  // Clear form handler
  const handleClearForm = (resetForm) => {
    resetForm();
    setAddressOptions([{ value: '', label: 'Enter postal code first' }]);
  };

  return (
    <div className="credit-search-container">
      <div className="credit-search-card">
        <div className="card-header">
          <h2 className="card-title">Credit Search Form</h2>
          <p className="card-description">Please fill in the form below to proceed with your credit search.</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue, resetForm }) => {
            // Effect to fetch addresses when postal code changes
            useEffect(() => {
              if (values.postalCode && values.postalCode.length >= 3) {
                fetchAddressesByPostalCode(values.postalCode);
              } else {
                setAddressOptions([{ value: '', label: 'Enter postal code first' }]);
              }
            }, [values.postalCode, setFieldValue]);
            
            return (
              <Form className="credit-search-form">
                <div className="form-grid">
                  {/* First row of fields */}
                  <div className="form-row">
                    <div className="form-col title-field">
                      <FormField
                        label="Title"
                        name="title"
                        as="select"
                        placeholder="Select title"
                        options={titleOptions}
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <div className="form-col dob-field">
                      <DatePicker
                        label="Date of Birth"
                        name="dateOfBirth"
                        required
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        minDate={new Date('1920-01-01')}
                        maxDate={new Date('2003-12-31')}
                      />
                    </div>
                  </div>

                  {/* Second row of fields */}
                  <div className="form-row">
                    <div className="form-col first-name-field">
                      <FormField
                        label="First Name"
                        name="firstName"
                        required
                        errors={errors}
                        touched={touched}
                        onBlur={(e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setFieldValue('firstName', capitalized);
                        }}
                      />
                    </div>
                    <div className="form-col mobile-field">
                      <FormField
                        label="Mobile"
                        name="mobile"
                        type="tel"
                        placeholder=""
                        required
                        errors={errors}
                        touched={touched}
                        onBlur={(e) => {
                          const formattedValue = formatMobileNumber(e.target.value);
                          setFieldValue('mobile', formattedValue);
                        }}
                      />
                    </div>
                  </div>

                  {/* Third row of fields */}
                  <div className="form-row">
                    <div className="form-col middle-name-field">
                      <FormField
                        label="Middle Name"
                        name="middleName"
                        placeholder="Optional"
                        errors={errors}
                        touched={touched}
                        onBlur={(e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setFieldValue('middleName', capitalized);
                        }}
                      />
                    </div>
                    <div className="form-col email-field">
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                  </div>

                  {/* Fourth row of fields */}
                  <div className="form-row">
                    <div className="form-col surname-field">
                      <FormField
                        label="Surname"
                        name="surname"
                        required
                        errors={errors}
                        touched={touched}
                        onBlur={(e) => {
                          const capitalized = capitalizeWords(e.target.value);
                          setFieldValue('surname', capitalized);
                        }}
                      />
                    </div>
                    <div className="form-col postal-code-field">
                      <FormField
                        label="Postal Code"
                        name="postalCode"
                        required
                        errors={errors}
                        touched={touched}
                        onBlur={(e) => {
                          // Convert to uppercase and trim
                          const postalCode = e.target.value.trim().toUpperCase();
                          setFieldValue('postalCode', postalCode);
                          
                          // Only fetch addresses if postal code has enough characters
                          if (postalCode && postalCode.length >= 3) {
                            fetchAddressesByPostalCode(postalCode);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Address field */}
                  <div className="form-full-width address-field">
                    <FormField
                      label="Address Line"
                      name="addressLine"
                      as="select"
                      placeholder="Select address"
                      options={addressOptions}
                      required
                      errors={errors}
                      touched={touched}
                      helpText={isLoadingAddresses ? "Loading addresses..." : "Enter a valid UK postal code to see available addresses"}
                    />
                  </div>

                  {/* Confirmation checkbox */}
                  <div className="form-full-width checkbox-field">
                    <CheckboxField
                      label="I confirm that I have had a finance in the past 6 years and that I was not aware of a commission payment being made to the dealer. I have read and accept T&Cs and the privacy policy. I understand that in order for us to investigate any further, we will conduct a soft credit check through our provider ValidID and that this will not affect my credit score."
                      name="confirmationCheckbox"
                      required
                      errors={errors}
                      touched={touched}
                      labelFirst={false}
                      className="checkbox-indent"
                    />
                  </div>

                  {/* Form actions */}
                  <div className="form-actions form-full-width">
                    <CustomButton
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      className="submit-button"
                    >
                      Search
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="secondary"
                      onClick={() => handleClearForm(resetForm)}
                      className="clear-button"
                    >
                      Clear
                    </CustomButton>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreditSearchForm;
