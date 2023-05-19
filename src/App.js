import { Configuration, OpenAIApi } from 'openai';

import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import { Modal, Spinner } from 'react-bootstrap';
import React from 'react';


import { useState } from 'react';

const App = () => {
	const configuration = new Configuration({
    organization: "org-Rnl4ioIFbwuX4nwJx5GsqNxF",
		apiKey: "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",
	});

	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);


	const generateResponse = async (newQuestion, setNewQuestion) => {
		setIsLoading(true);
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 300,
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
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="header-section">
				<h1>Hazel 🤖</h1>
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
				<Spinner animation="border" />
				<p>Cargando...</p>
			</Modal.Body>
			</Modal>
		</div>
	);
};

export default App;