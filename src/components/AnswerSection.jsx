import React from 'react'

const AnswerSection = ({ storedValues }) => {
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synthesis.speak(utterance);
        } else {
            console.error('La API de Text-to-Speech no es compatible con este navegador.');
        }
    };

    return (
        <>
            <hr className="hr-line" />
            {/* <div className="answer-section">
						<p className="question">{question}</p>
						<p className="answer">{answer}</p>
						<div className="copy-icon">
							<i className="fa-solid fa-copy"></i>
						</div>
					</div> */}
            <div className="answer-container">
                {storedValues.map((value, index) => {
                    const { question, answer } = value;

                    return (
                        <div className="answer-section" key={index}>
                            <p className="question">{question}</p>
                            <p className="answer">{answer}</p>
                            <div
                                className="copy-icon"
                                onClick={() => copyText(answer)}
                                onDoubleClick={() => textToSpeech(answer)}
                            >
                                <i className="fa-solid fa-copy"></i>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default AnswerSection