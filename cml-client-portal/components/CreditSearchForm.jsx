"use client"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormField from "./ui/form-field"
import CheckboxField from "./ui/checkbox-field"
import { CustomButton } from "./ui/custom-button"
import "./CreditSearchForm.css"

const CreditSearchForm = () => {
  // Title options
  const titleOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" },
    { value: "Other", label: "Other" },
  ]

  // Initial form values
  const initialValues = {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
    postalCode: "",
    addressLine: "",
    confirmationCheckbox: false,
  }

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+?[0-9]{10,15}$/, "Please enter a valid mobile number"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$|^[0-9]{5}(-[0-9]{4})?$/i, "Please enter a valid postal code"),
    addressLine: Yup.string().when("postalCode", {
      is: (postalCode) => postalCode && postalCode.length > 0,
      then: Yup.string().required("Address is required when postal code is provided"),
      otherwise: Yup.string(),
    }),
    confirmationCheckbox: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  })

  // Form submission handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Log form values to console (to be replaced with API call later)
    console.log("Form values:", values)

    // In a real application, we would call an API endpoint here
    // Example: checkUserExists(values.email).then(userExists => { ... })

    // Reset form and set submitting to false
    setTimeout(() => {
      setSubmitting(false)
      // resetForm(); // Uncomment to reset form after submission

      // Here we would handle redirection based on whether the user exists
      // If user exists: redirect to login page
      // If new user: create client and redirect to claims list
    }, 1000)
  }

  return (
    <div className="credit-search-container">
      <div className="credit-search-card">
        <div className="card-header">
          <h2 className="card-title">Credit Search</h2>
          <p className="card-description">
            Please fill out the form below to check if you're eligible to make a claim.
          </p>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="credit-search-form">
              <div className="form-grid">
                <FormField
                  label="Title"
                  name="title"
                  as="select"
                  options={titleOptions}
                  required
                  errors={errors}
                  touched={touched}
                />

                <FormField label="First Name" name="firstName" required errors={errors} touched={touched} />

                <FormField
                  label="Middle Name"
                  name="middleName"
                  helpText="Optional"
                  errors={errors}
                  touched={touched}
                />

                <FormField label="Last Name" name="lastName" required errors={errors} touched={touched} />

                <FormField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  required
                  errors={errors}
                  touched={touched}
                />

                <FormField
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  placeholder="e.g., +44 7123 456789"
                  required
                  errors={errors}
                  touched={touched}
                />

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  errors={errors}
                  touched={touched}
                  className="span-full"
                />

                <FormField label="Postal Code" name="postalCode" required errors={errors} touched={touched} />

                <FormField
                  label="Address Line"
                  name="addressLine"
                  required
                  errors={errors}
                  touched={touched}
                  className="span-full"
                  helpText="This field will be auto-populated in the future based on postal code lookup."
                />

                <CheckboxField
                  label="I confirm that I have had a finance in the past 6 years and that I was not aware of a commission payment being made to the dealer. I have read and accept T&Cs and the privacy policy. I understand that in order for us to investigate any further, we will conduct a soft credit check through our provider ValidID and that this will not affect my credit score."
                  name="confirmationCheckbox"
                  required
                  errors={errors}
                  touched={touched}
                  className="span-full"
                />

                <div className="form-actions span-full">
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    Submit
                  </CustomButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreditSearchForm

