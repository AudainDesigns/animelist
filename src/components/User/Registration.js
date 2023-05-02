import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import CryptoJS from 'crypto-js';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  //const [nickname, setNickname] = useState('');


  //Reg Handeler
  const handleRegistration = (e) => {
    e.preventDefault();

    //sessionStorage.setItem('nickname',nickname);

    // Encrypt the username and password using AES encryption
    const encryptedUsername = CryptoJS.AES.encrypt(username, 'my-secret-key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'my-secret-key').toString();

    console.log(`UN: `, encryptedUsername, `PW: `, encryptedPassword);

    localStorage.setItem('username', encryptedUsername);
    localStorage.setItem('password', encryptedPassword);
    setRegistered(true);
  };

  if (registered) {
    return <div>You're now registered!</div>;
  }

  return (
    <Form onSubmit={handleRegistration}>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Username
        </InputGroup.Text>
        <Form.Control
          aria-label="UserName"
          aria-describedby="inputGroup-sizing-default"
          value={`${username}`}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Password
        </InputGroup.Text>
        <Form.Control
          aria-label="Password"
          aria-describedby="inputGroup-sizing-default"
          value={`${password}`}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Registration;