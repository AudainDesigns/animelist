import React, { useState, useEffect } from 'react';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


function AnimeToast({ message }) {
    const [showA, setShowA] = useState(true);

    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {
        setShowA(true);
    }, [message]);


    return (
        <>
            <ToastContainer className="p-3 top-0 start-0">
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img src="holder.js/20..." className="rounded me-2" alt="" />
                        <strong className="me-auto">Notice</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}


export default AnimeToast;