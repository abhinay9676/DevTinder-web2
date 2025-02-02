import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";


const Request = () => {
  const dispatch = useDispatch();
  const request= useSelector((store) => store.request); 

  const reviewRequest=async(status,_id)=>{
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials: true});

    }
    catch(err){
      console.error(err);
    }
    
  }
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/pending", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  }

  useEffect(() => {
    fetchRequest();
    },[]);

    if(!request) return;

    if(request.length==0) return <h1>no connections found</h1>

    

  return (

    
    
    <div className='text-center my-10'>
      <h1 className='text-bold text-2xl'>Requests</h1>
      {request.map((request) => {

        const {firstName,lastName,about,photoUrl,age}=request.fromUserId;

        return(

          <div className='m-3 p-3 rounded-lg bg-base-200'>
          
         <img alt='photo' className='w-20 h-20' src={photoUrl}/>
         <h2>{firstName+" "+lastName}</h2>
         <p>{about}</p>
         <div>
       <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request._id)}>Ignored</button>
         <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",request._id)}>Accepted</button>
       </div>
        
       </div>
  
        )
     
      }
        
      )}
    </div>
  
  )
}


export default Request
