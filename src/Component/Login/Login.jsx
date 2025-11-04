import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from "react-router-dom"

export default function Login({ saveUserData }) {

  const [errMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const baseUrl = "https://ecommerce.routemisr.com"

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),

    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{3,16}$/, "Password must start with a capital letter and be 4-17 chars long")
  })

  // ✅ Submit Function
  async function submitLogin(values) {
    try {
      setLoading(true)
      setErrorMessage("")

      const { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, values)

      if (data.message === 'success') {
        localStorage.setItem("userToken", data.token)
        saveUserData(data.user)
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error?.response?.data?.message || "Login failed, please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Formik Setup
  const LoginForm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: submitLogin
  })

  return (
    <div className="py-5 w-75 mx-auto">
      <h2 className="mb-4 text-center">Login</h2>

      {errMessage && <div className="alert alert-danger text-center">{errMessage}</div>}

      <form onSubmit={LoginForm.handleSubmit}>
        <div className="my-3">
          <label htmlFor="email">Email</label>
          <input
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={LoginForm.values.email}
          />
          {LoginForm.touched.email && LoginForm.errors.email && (
            <p className="text-danger mt-1">{LoginForm.errors.email}</p>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={LoginForm.values.password}
          />
          {LoginForm.touched.password && LoginForm.errors.password && (
            <p className="text-danger mt-1">{LoginForm.errors.password}</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to='/ForgetPassword' className="text-decoration-none">
            Forgot Password?
          </Link>

          {loading ? (
            <button type="button" className="btn btn-success">
              <i className="fa-solid fa-spinner fa-spin"></i> Loading...
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(LoginForm.isValid && LoginForm.dirty)}
              className="btn btn-success"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
