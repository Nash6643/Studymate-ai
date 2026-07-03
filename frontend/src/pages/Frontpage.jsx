import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css'; 


function Frontpage() {
    const navigate = useNavigate();
    return (
        <div className="Frontpage-container">

            <div className="overlay">

                <h1>StudyMate AI</h1>

                <p>
                    Upload your notes. Ask questions.
                    Learn smarter with AI.
                </p>

                <button onClick={() => navigate('/home')}>
                    Get Started
                </button>

            </div>

        </div>
    );
}

export default Frontpage;