import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserRequest } from '../utils/requestSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleInterested = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });

      console.log(res.data.userId);
      dispatch(removeUserRequest(userId));;
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="User Photo" className="w-50 h-50" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <p>{`${age}, ${gender}`}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={() => handleInterested("ignore", _id)}>Ignore</button>
          <button className="btn btn-primary" onClick={() => handleInterested("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
