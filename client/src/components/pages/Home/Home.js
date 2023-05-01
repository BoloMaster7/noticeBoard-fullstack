import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import { updateAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/userRedux';
import { updateData } from '../../../redux/userData';

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
    fetch(API_URL + '/api/ads').then((res) => {
      if (res.status === 200) {
        return res.json().then((ads) => {
          dispatch(updateAds(ads));
          setPending(false);
        });
      }
    });
  };

};

export default Home;