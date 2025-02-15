import React, { useContext, useState } from 'react';
import style from './ResetPassword.module.css';
import { useFormik } from 'formik'
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';


export default function ResetPassword() {

  let { userResetPassword, setuserResetPassword } = useContext(UserContext)
  let navigate = useNavigate()
  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleResetPassword(values) {

    setisLoading(true)
    setIsSuccess(false)
    setApiError("");

    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => {
        setisLoading(false)
        if (res.status == 200) {
          console.log(res)
          setIsSuccess(true);
          console.log(res.data)
          localStorage.setItem("userToken", res.data.token);
          setuserResetPassword(res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false)
        setApiError(res.response.data.message)
      })
  }



  let validationSchema = yup.object().shape({
    email: yup.string().email("Not Valid Email").required("Email is Required"),
    newPassword: yup.string().required("Password is Required").min(6, "Password Min length is 6"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  })

  return (
    <>
      {ApiError && <div className='w-1/2 bg-red-600 font-bold mx-auto text-white rounded-lg p-3 mb-4'>{ApiError}</div>}

      <h2 className='my-5 text-3xl font-bold text-left'>Reset your account password</h2>

      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="text-left block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="email" className="left-0 absolute text-sm text-gray-500 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>

          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" className="text-left block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="newPassword" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password</label>
          {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.newPassword}</span>
          </div> : null}
        </div>
        <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-left">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}
          </button>
      </form>
      {isSuccess && (
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Go to Home Page
        </button>
      )}
    </>
  );
}
