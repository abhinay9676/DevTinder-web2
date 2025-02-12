import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';


const EditProfile = ({user}) => {

      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [age, setAge] = useState(user.age);
      const [gender,setGender] = useState(user.gender);
      const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
      const[about,setAbout] = useState(user.about);
    //   const[skills,setSkills] = useState(user.skills);
    const[showtoast,setShowtoast] = useState(false);
    const[error,setError]=useState("");
      const dispatch = useDispatch();

     const saveProfile=async()=>{
        setError("");
        try{
         const res = await axios.patch(BASE_URL+"/profile/edit",
            {firstName,lastName,age,gender,about,photoUrl},{withCredentials: true});

            dispatch(addUser(res?.data?.data));
            setShowtoast(true);
            setTimeout(()=>{
                setShowtoast(false);
            },3000);

        }
        catch(err){
          setError(err.response.data);
        }
     }
        
      
     return (<><div className='flex justify-center my-10'>
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
    
              {/* Email Input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
    
              {/* Password Input */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text" 
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text" 
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <input
                  type="text" 
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              {/* <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills:</span>
                </div>
                <input
                  type="text" 
                  value={skills}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label> */}

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  type="text" 
                  value={about}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">PhotoUrl:</span>
                </div>
                <input
                  type="text" 
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
    
              {/* Error Message */}
               {/* <p className="text-red-500"></p>} */}
    
              {/* Login Button */}
              <div className="card-actions justify-center">
                <button className="btn" onClick={saveProfile}>
                  saveProfile 
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
            <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
        </div>
        </div>
         {showtoast && <div className="toast toast-top toast-center">
  
       <div className="alert alert-success">
         <span>Profile Saved Successfully.</span>
       </div>
</div>}
        </>
      );
  
}

export default EditProfile
