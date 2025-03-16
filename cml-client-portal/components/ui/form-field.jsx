import { Field, ErrorMessage } from "formik"

const FormField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  as = "input",
  options = [],
  required = false,
  helpText,
  className = "",
  errors,
  touched,
}) => {
  const hasError = errors[name] && touched[name]

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {as === "select" ? (
        <Field as="select" id={name} name={name} className={`form-input ${hasError ? "form-input-error" : ""}`}>
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : as === "textarea" ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input form-textarea ${hasError ? "form-input-error" : ""}`}
        />
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input ${hasError ? "form-input-error" : ""}`}
        />
      )}

      <ErrorMessage name={name} component="div" className="form-error" />

      {helpText && <small className="form-help-text">{helpText}</small>}
    </div>
  )
}

export default FormField

