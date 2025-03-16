import React from 'react';
import { useField } from 'formik';
import { ErrorMessage } from 'formik';

/**
 * CheckboxField Component
 * 
 * This component renders a checkbox field with label and error message.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the checkbox
 * @param {string} props.helpText - Help text for the checkbox
 * @param {boolean} props.required - Whether the field is required
 * @param {Object} props.errors - Formik errors object
 * @param {Object} props.touched - Formik touched object
 * @param {string} props.className - Additional CSS classes
 */
const CheckboxField = ({ label, helpText, required, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const { name } = field;
  const hasError = meta.touched && meta.error;

  return (
    <div className="checkbox-indent">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          {...field}
          {...props}
          id={name}
          className={`checkbox-input ${hasError ? 'error' : ''}`}
        />
        <label htmlFor={name} className="checkbox-label">
          {required && <span className="text-red-500">*</span>}
          {label}
        </label>
      </div>
      {helpText && <div className="help-text">{helpText}</div>}
      {hasError && (
        <div className="error-message">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default CheckboxField;
