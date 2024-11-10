import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../FireBase/FireBase';
import { Link } from 'react-router-dom';

const Login = () => {
  const emailref = useRef()



    const [sucess,setSucess] = useState(false)
    const [error,setError] = useState('')
    const handleLoging = event =>{
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        // connect to fireBae
        setSucess(false)
        setError('')
        
        signInWithEmailAndPassword(auth,email,password)
        .then(res =>{
            console.log(res.user)
            // add new Stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            if(!res.user.emailVerified){
                setError("Please Verify Your email")
            }else{
                setSucess(true)
            }

        })
        .catch(error =>{
            console.log(error.message)
            setError(error.message)
        })

    }
    // forget Password
    const handleForgerPass =()=>{
      console.log("forget pass",emailref.current.value)
      const email = emailref.current.value;
      if(!email){
        alert("invalid email")
      }else{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
          console.log("Password resent send email")
        })
      }
    }
    return (
          <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
            <form onSubmit={handleLoging} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input ref={emailref} type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label onClick={handleForgerPass} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {error && <p className='text-xl text-red-500'>{error}</p>}
            {sucess && <p className='text-xl text-blue-600'>User Login Sucessful</p>}
            <p>New to this wibsite Please <Link className="underline text-blue-600 font-bold" to={'/signUp'}>Sing Up</Link></p>
          </div>
          
    );
};

export default Login;