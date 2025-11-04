import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {

  const [step, setStep] = useState("forget") // 👈 بدل ما نستخدم getElementById
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const baseUrl = "https://ecommerce.routemisr.com"

  // ✅ المرحلة الأولى: إرسال الإيميل
  const forgetSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email")
  })

  const ForgetForm = useFormik({
    initialValues: { email: "" },
    validationSchema: forgetSchema,
    onSubmit: sendForgetApi
  })

  async function sendForgetApi(values) {
    try {
      setLoading(true)
      setErrorMsg("")

      const { data } = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, values)
      if (data.statusMsg === "success") {
        setStep("reset")
      }
    } catch (error) {
      console.error(error)
      setErrorMsg(error?.response?.data?.message || "Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ المرحلة الثانية: إدخال كود الريست
  const resetSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^[0-9]+$/, "Must contain only numbers")
  })

  const ResetForm = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: resetSchema,
    onSubmit: sendResetCode
  })

  async function sendResetCode(values) {
    try {
      setLoading(true)
      setErrorMsg("")

      const { data } = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, values)
      if (data.status === "Success") {
        navigate('/ResetPassword')
      }
    } catch (error) {
      console.error(error)
      setErrorMsg(error?.response?.data?.message || "Invalid code, please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-5 w-75 mx-auto">
      {step === "forget" && (
        <>
          <h3 className="mb-3 text-center">Forgot Password</h3>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <form onSubmit={ForgetForm.handleSubmit}>
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control my-2"
              onChange={ForgetForm.handleChange}
              onBlur={ForgetForm.handleBlur}
              value={ForgetForm.values.email}
            />
            {ForgetForm.touched.email && ForgetForm.errors.email && (
              <p className="text-danger">{ForgetForm.errors.email}</p>
            )}

            <button
              disabled={!(ForgetForm.isValid && ForgetForm.dirty) || loading}
              className="btn btn-success mt-2"
              type="submit"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Send Code"}
            </button>
          </form>
        </>
      )}

      {step === "reset" && (
        <>
          <h3 className="mb-3 text-center">Enter Reset Code</h3>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <form onSubmit={ResetForm.handleSubmit}>
            <label htmlFor="resetCode">Reset Code</label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              className="form-control my-2"
              onChange={ResetForm.handleChange}
              onBlur={ResetForm.handleBlur}
              value={ResetForm.values.resetCode}
            />
            {ResetForm.touched.resetCode && ResetForm.errors.resetCode && (
              <p className="text-danger">{ResetForm.errors.resetCode}</p>
            )}

            <button
              disabled={!(ResetForm.isValid && ResetForm.dirty) || loading}
              className="btn btn-success mt-2"
              type="submit"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify Code"}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
