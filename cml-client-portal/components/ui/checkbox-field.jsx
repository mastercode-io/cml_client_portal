import { Field, ErrorMessage } from "formik"

const CheckboxField = ({ label, name, required = false, className = "", errors, touched }) => {
  const hasError = errors[name] && touched[name]

  return (
    <div className={`form-field checkbox-field ${className}`}>
      <div className="checkbox-container">
        <Field
          type="checkbox"
          id={name}
          name={name}
          className={`form-checkbox ${hasError ? "form-checkbox-error" : ""}`}
        />
        <label htmlFor={name} className="checkbox-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      <ErrorMessage name={name} component="div" className="form-error" />
    </div>
  )
}

export default CheckboxField

