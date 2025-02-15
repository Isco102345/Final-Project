import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { CartContext } from '../Context/CartContext.jsx';

export default function Checkout() {
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let { Checkout, cartId } = useContext(CartContext);

  let validationSchema = yup.object().shape({
    details: yup
      .string()
      .min(20, "Details must be at least 20 characters long")
      .required("Details is Required"),

    phone: yup
      .string()
      .matches(/^\d{11}$/, "Phone must be exactly 11 digits")
      .required("Phone is Required"),

    city: yup
      .string()
      .min(3, "City must be at least 3 characters long")
      .required("City is Required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: async () => await handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartId, url) {
    setisLoading(true);
    setApiError("");

    try {
      let response = await Checkout(cartId, url, formik.values);
      if (response.data && response.data.session && response.data.session.url) {
        window.location.href = response.data.session.url;
      } else {
        throw new Error("Invalid session URL");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setApiError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      {ApiError && (
        <div className='w-1/2 bg-red-600 font-bold mx-auto text-white rounded-lg p-3 mb-4'>
          {ApiError}
        </div>
      )}

      <h1 className='font-bold text-2xl text-emerald-600 my-3 text-center'>Checkout Now</h1>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="Enter Your Details"
          />
          {formik.errors.details && formik.touched.details && (
            <div className="p-2 mb-2 text-sm text-red-800 bg-red-50 rounded-lg">
              {formik.errors.details}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="Enter Your Phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-2 mb-2 text-sm text-red-800 bg-red-50 rounded-lg">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="Enter Your City"
          />
          {formik.errors.city && formik.touched.city && (
            <div className="p-2 mb-2 text-sm text-red-800 bg-red-50 rounded-lg">
              {formik.errors.city}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          disabled={isLoading}
        >
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Checkout"}
        </button>
      </form>
    </>
  );
}
