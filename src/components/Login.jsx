
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const [error, setError] = useState(""); // Error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      
      dispatch(addUser(res.data.data)); // Add user to Redux store
      navigate("/"); // Navigate to home
    } catch (err) {
     
      const errorMessage =
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName,lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res.data.data);
     
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch(err){
      const errorMessage =
      typeof err?.response?.data === "string"
        ? err.response.data
        : err?.response?.data?.message || "Something went wrong. Please try again.";
       setError(errorMessage);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm? "Login":"SignUp"}</h2>

        
         {!isLoginForm && <><label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">firstName:</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

        
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">lastName:</span>
            </div>
            <input
              type="text" 
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label> </>}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">EmaiId:</span>
            </div>
            <input
              type="text"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password:</span>
            </div>
            <input
              type="text"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Login Button */}
          <div className="card-actions justify-center">
            <button className="btn" onClick={isLoginForm ? handleLogin:handleSignUp}>
              {isLoginForm? "Login":"SignUp"}
            </button>
          </div>
          <p className="" onClick={()=>setIsLoginForm((value) => !value)}>{isLoginForm ? "New User ? SignUp" : "Exitising Account ? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
