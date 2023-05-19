import { useState } from 'react';
import React from 'react';


const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');

    return (
        <div className="form-section">
            <textarea
                rows="5"
                className="form-control"
                placeholder="Preguntame lo que sea..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            <button className="btn" onClick={() => generateResponse(newQuestion, setNewQuestion)}>
                Preguntame algo <span role="img" aria-label="robot">🤖</span>
            </button>
        </div>
    )
}

export default FormSection