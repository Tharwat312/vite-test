import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContextProvider'
import { FaSpinner } from "react-icons/fa";
import * as Yup from 'yup';
const Login = () => {
  const { setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigateUser = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email!").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
  })
  const callLoginAPI = async (userInputs) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, userInputs);
      console.log(data);
      setToken(data.token);
      localStorage.setItem("UserToken", JSON.stringify(data.token));
      setIsLoading(false);
      navigateUser("/");
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.msg);
    }
  }
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLoginAPI,
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={form.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  autoComplete="email"
                  placeholder='test@gmail.com'
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {form.errors.email && form.touched.email ? <p className='text-red-500 mt-2'>{form.errors.email}</p> : null};
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Test@123'
                  value={form.values.password}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {form.errors.password && form.touched.password ? <p className='text-red-500 mt-2'>{form.errors.password}</p> : null};
            </div>

            <div>
              <button
                disabled={!(form.isValid && form.dirty)}
                type="submit"
                className="disabled:opacity-60 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                {isLoading ? <FaSpinner className='text-xl icon-spin' /> : "Sign in"}
              </button>
              <button
                onClick={form.handleReset}
                type='reset' className='mt-3 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                Clear Inputs
              </button>
              <p className='text-red-500 mt-2'>{error}</p>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <NavLink to={"/register"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Register Now
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login