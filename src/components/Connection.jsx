import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connection = () => {

  const dispatch = useDispatch();
  const connection = useSelector((store)=>store.connection);

  const fetchConnection=async()=>{
  
    try
    {
    const res = await axios.get(BASE_URL+"/user/connections",{withCredentials: true});
    console.log(res.data.data);

    dispatch(addConnection(res.data.data));
  }
  catch(err){
    console.error(err);
  }


  }
  useEffect(()=>{
    fetchConnection();
  },[]);

  if(!connection) return;

  if(connection.length==0) return <h1>no connections found</h1>

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
      {connection.map((connection) => {

        const {firstName,lastName,about,photoUrl,age}=connection;

        return(

          <div className='m-3 p-3 rounded-lg bg-base-200'>
          
         <img alt='photo' className='w-20 h-20' src={photoUrl}/>
         <h2>{firstName+" "+lastName}</h2>
         <p>{about}</p>
        
       </div>
  
        )
     
      }
        
      )}
    </div>
  );

}


export default Connection

