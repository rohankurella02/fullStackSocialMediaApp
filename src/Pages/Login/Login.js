import React, { useState, useEffect } from 'react'
import './Login.css'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const d = useSelector(state => state.user);
  // console.log(d)

    // const handleSubmit = () => {
    //   console.log({email, password});
    // }

  useEffect(() => {
    if (d.isLoggedIn) {
      navigate('/')
    }
  }, [d.isLoggedIn])

    const onFormSubmit = (data) => {
      setData(data)
      console.log(data);
      dispatch(userLogin(data))
    }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socials</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socials.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="loginHeading">
              Log In
            </div>
            <form className='form' onSubmit={handleSubmit(onFormSubmit)} >
              <input type="email" placeholder="Email" {...register("email", { required: true })} className="loginInput" />
              {errors.email && <div className="error">Email is required</div>}
              <input type="password" placeholder="Password" {...register("password", { required: true })} className="loginInput" />
              {errors.password && <div className="error">Password is required</div>}
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginButton" type='submit' > <RiLoginBoxFill /> <span>Log In</span></button>
            </form>
            { d.isLoading && <div className="loading">Loading...</div>}
            <div className="registerYet">
              <span className="registerYetText">Don't have an account?</span>
              <span className="registerYetLink">Sign Up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login