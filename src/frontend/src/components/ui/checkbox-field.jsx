import React from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 * CheckboxField Component
 * 
 * This component renders a checkbox field with label and error message.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the checkbox
 * @param {string} props.name - Field name (used by Formik)
 * @param {boolean} props.required - Whether the field is required
 * @param {Object} props.errors - Formik errors object
 * @param {Object} props.touched - Formik touched object
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.labelFirst - Whether to show label before checkbox (default: true)
 */
const CheckboxField = ({
  label,
  name,
  required = false,
  errors,
  touched,
  className = '',
  labelFirst = true
}) => {
  const hasError = errors[name] && touched[name];
  
  return (
    <div className={`checkbox-field ${className}`}>
      {labelFirst ? (
        <>
          <label htmlFor={name} className="checkbox-label">
            {required && <span className="text-red-500">*</span>}
            {label}
          </label>
          <Field 
            type="checkbox" 
            id={name} 
            name={name} 
            className={`form-checkbox ${hasError ? 'form-checkbox-error' : ''}`}
          />
        </>
      ) : (
        <>
          <Field 
            type="checkbox" 
            id={name} 
            name={name} 
            className={`form-checkbox ${hasError ? 'form-checkbox-error' : ''}`}
          />
          <label htmlFor={name} className="checkbox-label">
            {required && <span className="text-red-500">*</span>}
            {label}
          </label>
        </>
      )}
      <ErrorMessage name={name} component="div" className="form-error" />
    </div>
  );
};

export default CheckboxField;
