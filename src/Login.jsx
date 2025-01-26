import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [emailId,setEmailId] = useState("anil@gmail.com");
    const [password,setPassword] = useState("Anil@12344");
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const handleLogin=async()=>{
        try{
            const res=await axios.post("http://localhost:3000/login",{
                emailId,
                password,
               },
        {withCredentials: true}
        );
        
        console.log(res);
        dispatch(addUser(res.data));
        navigate("/");
    }
    catch(err){
            console.log(err);
        }
    }
         
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
           <label className="form-control w-full max-w-xs">
            <div className="label">
           <span className="label-text">EmailId:</span>
           </div>
          <input type="text" 
          value={emailId} 
           className="input input-bordered w-full max-w-xs" 
           onChange={(e)=>setEmailId(e.target.value)}
           />
         </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
         <span className="label-text">Password</span>
        </div>
        <input type="text"
        value={password} 
        className="input input-bordered w-full max-w-xs" 
        onChange={(e)=>setPassword(e.target.value)}
        />
   </label>
    <div className="card-actions justify-center">
      <button className="btn" onClick={handleLogin}>Login</button>
      </div>
     </div>
</div>
</div>
  )
}


export default Login
