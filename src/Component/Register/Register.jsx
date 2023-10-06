import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { useNavigate } from "react-router-dom"
// Formik
// YUP
export default function Register() {
  let [errMessage, setErrorMessage] = useState("")
  let [loading, setLoading] = useState(false)
  let nav = useNavigate()
  let baseUrl = "https://ecommerce.routemisr.com"
  let validationSchema = Yup.object({
    name: Yup.string().required("name Required").min(3, "min length 3").max(20, "max length 20"),
    email: Yup.string().required("Email Required").email("enter Valid Email"),
    password: Yup.string().required("Passowrd Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Passowrd"),
    rePassword: Yup.string().required("Confirm Password Requited").oneOf([Yup.ref("password")], "enter matched Password"),
    phone: Yup.string().required("phone Required").matches(/^01[1250][0-9]{8}$/, "Phone not Valid")
  })
  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },

    validationSchema,
    onSubmit: submitRegister
  })
  async function submitRegister(values) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, values).catch((err) => {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == "success") {
      nav('/login')
      setLoading(false)
    }

  }


  return (
    <div className='py-5'>
      <h2>Register Form</h2>
      {errMessage == "" ? null : <div className='alert alert-danger'>{errMessage}</div>}

 
      <form onSubmit={registerForm.handleSubmit}>
        <div className='my-2'>
          <label htmlFor="name">name</label>
          <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="text" className='form-control' name="name" id="name" />

          {registerForm.touched.name  && registerForm.errors.name? <p className='text-danger'>{registerForm.errors.name}</p> : ""}

        </div>
        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input  onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="email" className='form-control' name="email" id="email" />
          {registerForm.touched.email ? <p className='text-danger'>{registerForm.errors.email}</p> : ""}
        </div>
        <div className='my-2'>
          <label  htmlFor="password">password</label>
          <input  onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="password" className='form-control' name="password" id="password" />

          {registerForm.touched.password ? <p className='text-danger'>{registerForm.errors.password}</p> : ""}

        </div>
        <div className='my-2'>
          <label htmlFor="rePassword">re Password</label>
          <input  onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="password" className='form-control' name="rePassword" id="rePassword" />
          {registerForm.touched.rePassword ? <p className='text-danger'>{registerForm.errors.rePassword}</p> : ""}
        </div>
        <div className='my-2'>
          <label htmlFor="phone">phone</label>
          <input  onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="tel" className='form-control' name="phone" id="phone" />
          {registerForm.touched.phone ? <p className='text-danger'>{registerForm.errors.phone}</p> : ""}
        </div>
        {loading ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(registerForm.isValid && registerForm.dirty)} type='submit' className='btn btn-success ms-auto d-block'>Register</button>
        }

      </form>
    </div>
  )
}
