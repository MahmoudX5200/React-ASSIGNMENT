import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {

    let Nav = useNavigate()
    let [erros, seterrors] = useState("")
    let baseUrl = "https://ecommerce.routemisr.com"
    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email")
    })
    let ForgetForm = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema,
        onSubmit: SendForgetApi
    })
    async function SendForgetApi(val) {

        let { data } = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, val).catch((err) => {
            console.log(err);
        })
        if (data.statusMsg == "success") {
            document.getElementById("resetForm").classList.remove("d-none")
            document.getElementById("forgetForm").classList.add("d-none")
        }
        console.log(data);
    }


    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required("resetCode Required").matches(/^[0-9]+$/, "must be only numbers")
    })
    let resetForm = useFormik({
        initialValues: {
            resetCode: ""
        },
        validationSchema: validationSchema2,
        onSubmit: sendResetCode
    })
    async function sendResetCode(val) {

        let { data } = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, val).catch((err) => {
            seterrors(err.response.data.message)
            console.log(err.response.data.message);
        })

        if (data.status == "Success") {
            // Reset
            
            Nav('/ResetPassword')
        }
        console.log(data);

    }

    return (
        <>

            <div id='forgetForm' className='my-5'>


                <form onSubmit={ForgetForm.handleSubmit}>
                    <label htmlFor="email">Enter Email</label>
                    <input onChange={ForgetForm.handleChange} onBlur={ForgetForm.handleBlur} type="text" name="email" id="email" className='form-control' />

                    {ForgetForm.touched.email ? <p className='text-danger'>{ForgetForm.errors.email}</p> : ""}
                    <button disabled={!(ForgetForm.isValid && ForgetForm.dirty)} className='btn btn-success'>Send</button>
                </form>
            </div>
            <div id='resetForm' className='my-3 d-none'>
                {erros ? <div className='alert alert-danger'>{erros}</div> : ""}
                <form onSubmit={resetForm.handleSubmit}>
                    <label htmlFor="resetCode">resetCode</label>
                    <input onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} type="text" name='resetCode' id='resetCode' className='form-control' />
                    {resetForm.touched.resetCode ? <p className='text-danger'>{resetForm.errors.resetCode}</p> : ""}
                    <button disabled={!(resetForm.dirty && resetForm.isValid)} className='btn btn-success'>Verify Code</button>

                </form>
            </div>


        </>
    )
}
