import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../features/Loader/Loader';
import LineupAds from '../../features/LineupAds/LineupAds';
import SearchBar from '../../features/SearchBar/SearchBar';
import { API_URL } from '../../../config';
import { updateAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/userRedux';
import { updateData } from '../../../redux/userData';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    handleUpdate();
    if (user) {
      fetch(API_URL + '/auth/user/' + user.login).then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch(updateData(data._id));
          });
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    setPending(true);
    fetch(API_URL + '/ads').then((res) => {
      if (res.status === 200) {
        return res.json().then((ads) => {
          dispatch(updateAds(ads));
          setPending(false);
        });
      }
    });
  };

  return (
    <>
      <SearchBar />
      {pending && <Loader />}
      {!pending && <LineupAds />}
     
      <Link to="/adAds">add post</Link>
  
    </>
  );
};

export default Home;