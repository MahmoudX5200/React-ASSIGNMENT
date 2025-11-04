import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  const { id } = useParams();
  const { checkPayment } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const ShippingForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.details) errors.details = "Details are required";
      if (!values.phone) errors.phone = "Phone number is required";
      else if (!/^(01)[0-9]{9}$/.test(values.phone))
        errors.phone = "Invalid phone number";
      if (!values.city) errors.city = "City is required";
      return errors;
    },
    onSubmit: (values) => PayShipping(values),
  });

  async function PayShipping(values) {
    try {
      setLoading(true);
      setErrorMsg("");
      const { data } = await checkPayment(id, values);
      console.log(data);
      if (data.status === "success") {
        window.location.href = data.session.url;
      } else {
        setErrorMsg("Payment failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded-4 shadow-sm">
          <h2 className="text-center text-success mb-4 fw-bold">
            <i className="fa-solid fa-credit-card me-2"></i> Checkout
          </h2>

          <form onSubmit={ShippingForm.handleSubmit}>
            {/* Details */}
            <div className="mb-3">
              <label htmlFor="details" className="form-label fw-semibold">
                Address Details
              </label>
              <input
                onChange={ShippingForm.handleChange}
                onBlur={ShippingForm.handleBlur}
                value={ShippingForm.values.details}
                type="text"
                name="details"
                id="details"
                className={`form-control ${
                  ShippingForm.errors.details && ShippingForm.touched.details
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. Apartment 5, Nile Street"
              />
              {ShippingForm.errors.details && ShippingForm.touched.details && (
                <div className="invalid-feedback">
                  {ShippingForm.errors.details}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                onChange={ShippingForm.handleChange}
                onBlur={ShippingForm.handleBlur}
                value={ShippingForm.values.phone}
                type="tel"
                name="phone"
                id="phone"
                className={`form-control ${
                  ShippingForm.errors.phone && ShippingForm.touched.phone
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. 01012345678"
              />
              {ShippingForm.errors.phone && ShippingForm.touched.phone && (
                <div className="invalid-feedback">
                  {ShippingForm.errors.phone}
                </div>
              )}
            </div>

            {/* City */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label fw-semibold">
                City
              </label>
              <input
                onChange={ShippingForm.handleChange}
                onBlur={ShippingForm.handleBlur}
                value={ShippingForm.values.city}
                type="text"
                name="city"
                id="city"
                className={`form-control ${
                  ShippingForm.errors.city && ShippingForm.touched.city
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. Cairo"
              />
              {ShippingForm.errors.city && ShippingForm.touched.city && (
                <div className="invalid-feedback">
                  {ShippingForm.errors.city}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="alert alert-danger text-center py-2">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 fw-semibold py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin me-2"></i> Processing...
                </>
              ) : (
                <>
                  Pay Now <i className="fa-brands fa-cc-visa ms-2"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
