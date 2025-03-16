import React from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 * FormField Component
 * 
 * This component renders a form field with label, input, and error message.
 * It supports different input types and select dropdowns.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the field
 * @param {string} props.name - Field name (used by Formik)
 * @param {string} props.type - Input type (default: 'text')
 * @param {string} props.as - Component type ('input', 'select', 'textarea')
 * @param {Array} props.options - Options for select dropdown
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether the field is required
 * @param {Object} props.errors - Formik errors object
 * @param {Object} props.touched - Formik touched object
 * @param {string} props.helpText - Help text to display below the field
 * @param {string} props.className - Additional CSS classes
 */
const FormField = ({
  label,
  name,
  type = 'text',
  as = 'input',
  options = [],
  placeholder = '',
  required = false,
  errors,
  touched,
  helpText,
  className = ''
}) => {
  const hasError = errors[name] && touched[name];
  
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {as === 'select' ? (
        <Field
          as="select"
          id={name}
          name={name}
          className={`form-select ${hasError ? 'form-input-error' : ''}`}
        >
          <option value="" disabled>{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : as === 'textarea' ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input ${hasError ? 'form-input-error' : ''}`}
          rows="4"
        />
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input ${hasError ? 'form-input-error' : ''}`}
        />
      )}
      
      {helpText && <small className="form-help-text">{helpText}</small>}
      <ErrorMessage name={name} component="div" className="form-error" />
    </div>
  );
};

export default FormField;
