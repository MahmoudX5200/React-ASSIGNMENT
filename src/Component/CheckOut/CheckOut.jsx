import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'

export default function CheckOut() {
    let { id } = useParams()
    let { checkPayment } = useContext(CartContext)
    let ShippingForm = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: function (val) {
            PayShipping(val)
        }
    })
    async function PayShipping(val) {

        let { data } = await checkPayment(id, val)
        console.log(data);
        if (data.status == 'success') {
            window.location.href = data.session.url
        }
    }
    return (
        <div>
            <form onSubmit={ShippingForm.handleSubmit}>
                <label htmlFor="details">details</label>
                <input onChange={ShippingForm.handleChange} type="text" name="details" className='form-control' id="details" />

                <label htmlFor="phone">phone</label>
                <input onChange={ShippingForm.handleChange} type="tel" name="phone" className='form-control' id="phone" />

                <label htmlFor="city">city</label>
                <input onChange={ShippingForm.handleChange} type="text" name="city" className='form-control' id="city" />


                <button className='d-block w-100 btn btn-success'>Pay<i class="fa-brands fa-cc-visa"></i></button>

            </form>
        </div>
    )
}
