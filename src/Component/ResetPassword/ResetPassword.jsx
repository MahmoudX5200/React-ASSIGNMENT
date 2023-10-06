import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
    let nav = useNavigate()
    let baseUrl = "https://ecommerce.routemisr.com"
    let validationSchema = Yup.object({
        email: Yup.string().required("Email Required").email("enter Valid Email"),
        newPassword: Yup.string().required("Passowrd Required").matches(/^[A-Z][a-z0-9]{3,16}$/, "enter Valid Passowrd"),
    })
    let ResetPasswordForm = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        validationSchema,
        onSubmit: ResetPassowrd

    })

    async function ResetPassowrd(val) {

        let { data } = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, val)
        console.log(data);
        if(data.token){
            nav('/login')
        }
    }
    return (
        <div>

            <form onSubmit={ResetPasswordForm.handleSubmit}>
                <label htmlFor="email">email</label>
                <input onChange={ResetPasswordForm.handleChange} type="email" className='form-control' name="email" id="email" />
                <p className='text-danger'>{ResetPasswordForm.errors.email}</p>
                <label htmlFor="newPassword">newPassword</label>
                <input onChange={ResetPasswordForm.handleChange} type="password" className='form-control' name="newPassword" id="newPassword" />
                <p className='text-danger'>{ResetPasswordForm.errors.newPassword}</p>
                <button className='btn btn-success'> Reset Password</button>
            </form>
        </div>
    )
}
