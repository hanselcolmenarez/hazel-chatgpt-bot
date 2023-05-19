import React, { useState } from 'react';

const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');

    const handleSpeechRecognition = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'es-ES'; // Establece el idioma del reconocimiento de voz

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setNewQuestion(transcript);

                // Ejecutar la acción generateResponse
                generateResponse(transcript, setNewQuestion);
            };

            recognition.start();
        } else {
            console.warn('El navegador no admite la API de reconocimiento de voz');
        }
    };

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
            <button className="btn" onClick={handleSpeechRecognition}>
                Iniciar reconocimiento de voz
            </button>
        </div>
    );
};

export default FormSection;
