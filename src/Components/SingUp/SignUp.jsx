import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser } from "firebase/auth";
import React, { useState } from "react";
import auth from "../FireBase/FireBase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errormessage, setErrorMessage] = useState("");
  const [sucess, setSucess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.ema.value;
    const password = event.target.pass.value;
    const terms = event.target.terms.checked;
    if(!terms){
      setErrorMessage(" Click the  checkBox")
      return;
    }

    setErrorMessage("");
    setSucess("");
    if (password.length < 6) {
      setSucess("password must be 6 carecter");
      return;
    }
    // All condition for password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("at least 6 carecter ,1 alphaber ,1 small letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((responsive) => {
        console.log(responsive);
        setSucess(true);
        // emal verification
        sendEmailVerification(auth,currentUser)
        .then(()=> {
          console.log('email verifaication sent')
        })
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setSucess(false);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto mt-5 shrink-0 shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Sing Up Now</h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="ema"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="pass"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className=" btn-xs absolute right-8 top-12"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
          <div className="form-control">
            <label className="label justify-start gap-5 cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text">Remember me</span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {sucess && <p className="text-green-500">{sucess}</p>}
      {errormessage && <p className="text-red-500">{errormessage}</p>}
      <p>Already Have an account : <Link className="underline text-blue-600 font-bold" to={'/login'}>Login</Link></p>
    </div>
  );
};

export default SignUp;
