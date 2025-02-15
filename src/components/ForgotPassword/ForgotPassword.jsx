import React, { useContext, useState } from 'react';
import style from './ForgotPassword.module.css';
import { useFormik } from 'formik'
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';


export default function ForgotPassword() {

  let { userForgotPassword, setuserForgotPassword } = useContext(UserContext)
  let navigate = useNavigate()
  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleForgotPassword(values) {

    setisLoading(true)
    setIsSuccess(false)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then((res) => {
        setisLoading(false)
        if (res.data.statusMsg == "success") {
          setIsSuccess(true);
          // console.log(res.data)
          localStorage.setItem("userToken", res.data.token);
          setuserForgotPassword(res.data.token)
        }
      })
      .catch((res) => {
        setisLoading(false)
        setApiError(res.response.data.message)
      })
  }



  let validationSchema = yup.object().shape({
    email: yup.string().email("Not Valid Email").required("Email is Required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  })

  return (
    <>
      {ApiError && <div className='w-1/2 bg-red-600 font-bold mx-auto text-white rounded-lg p-3 mb-4'>{ApiError}</div>}

      <h2 className='my-5 text-3xl font-bold text-left'>please enter your verification code</h2>

      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="email" className="absolute text-sm text-gray-500 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>

          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-left">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}
          </button>
        </div>
      </form>
      {isSuccess && (
              <div className="p-4 text-green-800 bg-green-50 rounded-lg mb-4">
                <p>✅ Reset code sent successfully! Check your email.</p>
              </div>
            )}

            {isSuccess && (
              <button
                type="button"
                onClick={() => navigate('/Verify')}
                className="mt-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                Go to Verification Page
              </button>
            )}
    </>
  );
}
