import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import auth from "../FireBase/FireBase";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
  const [sucess, setSucess] = useState(false);
  console.log(sucess)
  const [errorMessage, setErrorMessage] = useState("");
  const [showpassword, setshowPassword] = useState(false);
  

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    // name and photo url collect
    const name = event.target.name.value;
    const photo = event.target.photo.value;


    setErrorMessage("");
    setSucess("");
    // check checkBox
    if(!terms){
      setErrorMessage("pls click checkBox")
      return
    }
    if (password.length < 6) {
      setSucess("password must be 6 carecter or long");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("at least 6 carecter ,1 alphaber ,1 small letter");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSucess(true);
        // IMPORTANTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
        sendEmailVerification(auth.currentUser)
        .then(()=>{
        console.log("verificaton Sucess")
        })
        // update profile name and photo url
        const profile ={
          displayName:name,
          phototURL:photo,
        }
        updateProfile(auth.currentUser,profile)
        .then(()=>{
          console.log("update your profile")
        })
        .catch(error =>{
          console.log(error.message)
        })
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSucess(false);
      });
  };
  return (
    <div className="w-1/3 mx-auto">
      <h2 className="text-3xl mb-3">Register</h2>
      <form onSubmit={handleRegister}>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <input
            type="text"
            name="photo"
            className="grow"
            placeholder="Photo url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            className="grow"
            placeholder="Type Password: 3@Fc$MjK"
          />
          <button
            onClick={() => setshowPassword(!showpassword)}
            type="button"
            className="btn btn-xs"
          >
            {showpassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </label>
        {/* check box */}
        <div className="form-control">
          <label className="label justify-start gap-5 cursor-pointer">
          <input type="checkbox"name="terms" className="checkbox" />
            <span className="label-text">Remember me</span>
           
          </label>
        </div>
        <button className="btn btn-accent w-full my-3 hover:bg-blue-600 ">
          Register
        </button>
      </form>
      {errorMessage && (
        <p className="text-2xl font-bold text-red-600">{errorMessage}</p>
      )}
      {sucess && <p className="text-2xl font-bold text-green-500">Sing up sucess </p>}
    </div>
  );
};

export default Register;
