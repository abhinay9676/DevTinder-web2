import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import userCard from './userCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed || []); // Ensure feed is always an array
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
        console.log(res?.data);
        console.log("Updated Feed:", feed);
        dispatch(addFeed(res?.data|| []));
      } catch (err) {
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [dispatch]);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (

    feed &&
    <div className="h-85 flex justify-center my-10">
      {feed.length > 0 ? <UserCard user={feed[0]} /> : <p>No users found.</p>}
    </div>
  );
};

export default Feed;
