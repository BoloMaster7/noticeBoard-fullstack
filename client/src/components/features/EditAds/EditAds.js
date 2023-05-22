import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { getAdById } from '../../../redux/adsRedux';
import AdForm from '../AdForm/AdForm';

const EditAds = () => {
  const adId = useParams();
  const id = adId.id;
  const navigate = useNavigate();

  const adData = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('content', ad.content);
    // fd.append('pubDate', ad.pubDate);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('phoneNumber', ad.phoneNumber);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(API_URL + '/ads/' + id, options).then((res) => {
      if (res.status === 200) {
        setTimeout(() => navigate('/'), 2000);
      }
    });
  };

  return (
    <AdForm
      action={handleSubmit}
      actionText='Edit'
      price={adData.price}
      title={adData.title}
      location={adData.location}
      content={adData.content}
      pubDate={adData.pubDate}
      image={adData.image}
      phoneNumber={adData.user.phoneNumber}
      id={id}
    />
  );
};

export default EditAds;