import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js'
import axios from "axios"
import {toast} from "react-toastify"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanldleLogin = async(e) => {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        if(!password){
            setError("Please enter the password")
            return
        }

        setError("")

        // Login API

        try {
            dispatch(signInStart())

            const res = await axios.post(
                "http://localhost:3000/api/auth/signin",
                {email, password},
                {withCredentials: true}
            );

            if(res.data.success === false){
                toast.error(error.message)
                console.log(res.data);
                dispatch(signInFailure(res.data.message));
                return;
            }
            toast.success(res.data.message)
            dispatch(signInSuccess(res.data))
            navigate("/")
        } catch (error) {
            toast.error(error.message)
            dispatch(signInFailure(error.message))
        }
    }

    return (
    <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={hanldleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>

                <input type='text' 
                placeholder='Email' 
                className='input-box ' 
                value={email} 
                onChange={(e) =>setEmail(e.target.value)} 
                />

                <PasswordInput 
                value={password} 
                onChange={e => setPassword(e.target.value)} />

                {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

                <button type="submit" className="bg-[#2B85FF] text-white px-34 py-3 rounded">
                LOGIN
                </button>

                <p className="text-sm text-center mt-4">
                    Not registed yet? {" "}
                    <Link to={"/signup"}
                    className="font-medium text-[#2b85ff] underline">
                    Create an account
                    </Link>
                </p>

            </form>
        </div>
    </div>
    )
}

export default Login