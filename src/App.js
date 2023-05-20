import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import { Configuration, OpenAIApi } from 'openai';
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import dotenv from 'dotenv'; // Importa dotenv
dotenv.config(); // Carga las variables de entorno del archivo .env

export const textToSpeech = (text) => {
	if ('speechSynthesis' in window) {
		const synthesis = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(text);
		synthesis.speak(utterance);
	} else {
		console.error('La API de Text-to-Speech no es compatible con este navegador.');
	}
};

const App = () => {
	const configuration = new Configuration({
		organization: process.env.REACT_APP_ORGANIZATION,
		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorModalVisible, setErrorModalVisible] = useState(false);

	const generateResponse = async (newQuestion, setNewQuestion) => {
		setIsLoading(true);
		let options = {
			model: 'text-davinci-003',
			temperature: 0.3,
			max_tokens: 120,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stream: false,
			logprobs: null,
			stop: ['/'],
		};

		let completeOptions = {
			...options,
			prompt: newQuestion,
		};

		try {

			const response = await openai.createCompletion(completeOptions);

			if (response.data.choices) {
				setStoredValues([
					{
						question: newQuestion,
						answer: response.data.choices[0].text,
					},
					...storedValues,
				]);
				setNewQuestion('');
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				console.error('Error de autorización: No estás autorizado para realizar esta acción.');
				setErrorModalVisible(true);
			} else {
				console.error('Error desconocido:', error);
			}
		}
		setIsLoading(false);
	};

	return (
		<div>
			<div className="header-section">
				<h1>Hazel <span role="img" aria-label="robot">🤖</span></h1>
				{storedValues.length < 1 && (
					<p>
						Soy un sistema automatizado de preguntas y respuestas, diseñado para ayudarte
						en la búsqueda de información relevante. Te invito a preguntarme cualquier
						consultas que puedas tener, y haré todo lo posible para ofrecerte una
						Respuesta fiable. Por favor, ten en cuenta que soy una máquina y
						opero únicamente en base a algoritmos programados.
					</p>
				)}
			</div>

			<FormSection generateResponse={generateResponse} />

			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
			<Modal show={isLoading} backdrop="static" keyboard={false}>
				<Modal.Body>
					<div className="spinner-border" role="status">
						<span className="sr-only">Pensando...</span>
					</div>
				</Modal.Body>
			</Modal>
			<Modal show={errorModalVisible} onHide={() => setErrorModalVisible(false)} onShow={() => textToSpeech("No estás autorizado para realizar esta acción.")}>
				<Modal.Header closeButton>
					<Modal.Title>Error de autorización</Modal.Title>
				</Modal.Header>
				<Modal.Body>No estás autorizado para realizar esta acción.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setErrorModalVisible(false)}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default App;