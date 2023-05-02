import React, { useState, useEffect } from 'react'
import { Head } from '../Common/Header/Head.js';
import CryptoJS from 'crypto-js';

import Registration from './Registration.js';
import ModifyProfile from './ModifyProfile.js';


function AnimeProfile({ title, desc }) {

  const [isRegistered, setIsRegistered] = useState(localStorage.getItem('username') !== null);
  const [username, setUsername] = useState('');

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  //Username Description
  const decryptUsername = () => {
    const encryptedUsername = localStorage.getItem('username');
    const bytes = CryptoJS.AES.decrypt(encryptedUsername, 'my-secret-key');
    const decryptedUsername = bytes.toString(CryptoJS.enc.Utf8);
    setUsername(decryptedUsername);
  };

  const handleUpdateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  //Meta Information
  const metaData = {
    title: `${title}`,
    description: { desc },
    keywords: 'anime, airing',
    // cardImage: image.default
  }

  useEffect(() => {
    if (isRegistered) {
      decryptUsername();
    }
  }, [isRegistered]);

  return (
    <>
      <Head {...metaData} />


      <div>Profile</div>
      <div>
        {!isRegistered ? (
          <Registration onRegistration={handleRegistration} />
        ) : (

          <div>
            <p>Welcome back, {username}</p>
            <p>Update Details:</p>
            {/*<ModifyProfile onUpdate={handleUpdateUsername} />*/}

          </div>


        )}
      </div>

    </>
  );
};

export default AnimeProfile
