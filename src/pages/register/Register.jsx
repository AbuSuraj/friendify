import React, { useState } from 'react';
import './register.scss'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
      });
      const [err, setErr] = useState(null);
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post("http://localhost:5000/api/auth/register", inputs);
           
        } catch (err) {
          setErr(err?.response?.data);
        }
      };
    return (
        <div>
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    
                    <form>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                placeholder='name'
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                UserName
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    placeholder="Email"
              name="email"
              onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div> */}
                        <p className='py-4 text-red-500 text-xs'>{err && err}</p>
                        <div className="flex items-center justify-end mt-4">
                            <Link to="/login">
                                <button className="text-sm text-gray-600 underline hover:text-gray-900">Already registered?</button>
                            </Link>

                            <button
                            onClick={handleClick}
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;