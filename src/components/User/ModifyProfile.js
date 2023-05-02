import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import CryptoJS from 'crypto-js';

const ModifyProfile = ({ onUpdate }) => {
    const [newUsername, setNewUsername] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();

        // Encrypt new username before saving it to localStorage
        const encryptedUsername = CryptoJS.AES.encrypt(newUsername, 'my-secret-key').toString();

        // Save the encrypted username to localStorage
        localStorage.setItem('username', encryptedUsername);

        // Call onUpdate with the new username as an argument
        if (!newUsername.trim()) {
            alert('Please enter a new username');
            return;
          } else {
        
          // Call the onUpdate function with the new username
          alert('You have updated your Username!');
          onUpdate(newUsername);
          }

    };


    return (
        <Form onSubmit={handleUpdate}>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Username
                </InputGroup.Text>
                <Form.Control
                    aria-label="UserName"
                    aria-describedby="inputGroup-sizing-default"
                    value={`${newUsername}`}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                />
            </InputGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ModifyProfile;