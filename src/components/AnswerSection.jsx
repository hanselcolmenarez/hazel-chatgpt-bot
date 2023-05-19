import React, { useEffect, useState } from 'react';
import { textToSpeech } from '../App.js';

const AnswerSection = ({ storedValues }) => {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const [lastAnswer, setLastAnswer] = useState('');



  useEffect(() => {
    // Leer la última respuesta generada automáticamente
    if (storedValues.length > 0) {
      const newAnswer = storedValues[0].answer;
      if (newAnswer !== lastAnswer) {
        textToSpeech(newAnswer);
        setLastAnswer(newAnswer);
      }
    }
  }, [storedValues, lastAnswer]);

  const copyAllText = () => {
    const allText = storedValues.map((value) => value.answer).join('\n');
    copyText(allText);
  };

  return (
    <>
      <hr className="hr-line" />
      <div className="answer-container">
        {storedValues.map((value, index) => {
          const { question, answer } = value;

          return (
            <div className="answer-section" key={index}>
              <p className="question">{question}</p>
              <p className="answer">{answer}</p>
              <div className="copy-icon" onClick={() => copyText(answer)}>
                <i className="fa-solid fa-copy"></i>
              </div>
            </div>
          );
        })}
        {storedValues.length > 0 && (
          <div className="copy-all-icon" onClick={copyAllText}>
            <i className="fa-solid fa-copy"></i>
          </div>
        )}
      </div>
    </>
  );
};

export default AnswerSection;
