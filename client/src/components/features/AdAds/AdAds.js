import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { addAd, updateAds } from '../../../redux/adsRedux';
import { getUserId } from '../../../redux/userData';
import { getUser } from '../../../redux/userRedux';
import AdForm from '../AdForm/AdForm';

const AdAds = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('content', ad.content);
    fd.append('pubDate', ad.pubDdate);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('phoneNumber', ad.phoneNumber);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'POST',
      body: fd,
      credentials: 'include',
    };
    fetch(API_URL + `/ads`, options).then((res) => {
      if (res.status === 200) {
        dispatch(addAd(ad));
        dispatch(updateAds())
        navigate('/')
      }
    });
  };

  return <AdForm action={handleSubmit} actionText='Ad' userId={userId} />;
};

export default AdAds;