
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { Link, useNavigate } from "react-router-dom"
export default function Login({ saveUserData }) {
  let [errMessage, setErrorMessage] = useState("")
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()
  let baseUrl = "https://ecommerce.routemisr.com"
  let validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("enter Valid Email"),
    password: Yup.string().required("Passowrd Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Passowrd"),
  })
  let LoginForm = useFormik({
    initialValues: {

      email: "",
      password: "",
    },
    validate: () => { },
    validationSchema,
    onSubmit: submitLogin
  })
  async function submitLogin(values) {
    console.log(values);

    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, values).catch((err) => {
      setErrorMessage(err.response.data.message)
      console.log(err);
      setLoading(false)
    })
    if (data.message == 'success') {
      setLoading(false)
      localStorage.setItem("userToken", data.token)
      saveUserData(data.user)
      console.log(data.user);
      nav('/home')
    }
    console.log(data);
  }

  return (
    <div className='py-5'>
      <h2>Login Form</h2>
      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}

      <form onSubmit={LoginForm.handleSubmit}>

        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input onChange={LoginForm.handleChange} type="email" className='form-control' name="email" id="email" />
          <p className='text-danger'>{LoginForm.errors.email}</p>
        </div>
        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input onChange={LoginForm.handleChange} type="password" className='form-control' name="password" id="password" />
          <p className='text-danger'>{LoginForm.errors.password}</p>
        </div>

        <Link to='/ForgetPassword'>ForgetPassword ? ...</Link>
        {loading ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(LoginForm.isValid && LoginForm.dirty)} type='submit' className='btn btn-success ms-auto d-block'>Login</button>
        }

      </form>
    </div>
  )
}
