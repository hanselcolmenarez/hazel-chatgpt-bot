import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import { Configuration, OpenAIApi } from 'openai';
import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv'; // Importa dotenv

dotenv.config(); // Carga las variables de entorno del archivo .env

export const textToSpeech = (text) => {
	if ('speechSynthesis' in window) {
		const synthesis = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(text);
		// Obtén las voces disponibles
		const voices = synthesis.getVoices();

		console.log("Lista de voces: ");
		for (let i = 0; i < voices.length; i++) {
			const option = document.createElement("option");
			option.textContent = `${voices[i].name} (${voices[i].lang})`;
			console.log(i + ".- " + option.textContent);
		}

		// Encuentra la voz de mujer en español (Spain)
		const spanishFemaleVoice = voices.find((voice) => voice.name === 'Microsoft Laura - Spanish (Spain) (es-ES)');

		if (spanishFemaleVoice) {
			utterance.voice = spanishFemaleVoice;
		} else {
			console.warn('No se encontró una voz de mujer en español (Spain).');
		}

		synthesis.speak(utterance);
	} else {
		console.error('La API de Text-to-Speech no es compatible con este navegador.');
	}
};

const App = () => {

	useEffect(() => {
		const video = document.getElementById('hazelmodel');
	
		const playVideo = () => {
		  video.play().catch((error) => {
			console.error('Error al reproducir el video:', error);
		  });
		};
	
		const handleClick = () => {
		  document.removeEventListener('click', handleClick);
		  playVideo();
		};
	
		document.addEventListener('click', handleClick);
	
		return () => {
		  document.removeEventListener('click', handleClick);
		};
	  }, []);

	const configuration = new Configuration({
		organization: process.env.REACT_APP_ORGANIZATION,
		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const generateResponse = async (newQuestion, setNewQuestion) => {
		setIsLoading(true);
		let options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 2048,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stream: false,
			logprobs: null,
			stop: ['/\\n'],
		};

		let completeOptions = {
			...options,
			prompt: newQuestion,
		};

		try {

			const cadenaTexto = completeOptions.prompt;
			const palabrasClave = ["es tu creador", "te creó", "Quien te creó"];
			const palabrasClave2 = ["crea una imagen", "dibuja", "genera una imagen", "muestra una imagen"];
			var palabraEncontrada = "";
			var palabraEncontradaComple = "";

			const foundKeywords = palabrasClave.filter(keyword => cadenaTexto.includes(keyword));
			const foundKeywords2 = palabrasClave2.filter(keyword => cadenaTexto.includes(keyword));

			console.log("Lo que buscas: " + cadenaTexto);

			if (foundKeywords2.length > 0 ){
				try {
					console.log("Entra a consultar en la API");

					const imageResponse = await openai.createImage({
					  prompt: cadenaTexto,
					  n: 1,
					  size: '512x512',
					});
			
					const imageUrl = imageResponse.data.data[0].url;
					setImageUrl(imageUrl);
					console.log("URL IMAGEN: " + imageResponse.data.data[0].url);
				  } catch (error) {
					// Manejo de errores
					if (error.response) {
						console.log("Error al crear imagen-status " + error.response.status);
						console.log("Error al crear imagen-data " + error.response.data);
					  } else {
						console.log("Error al crear imagen-mensaje " + error.message);
					  }
				  }
			} else {
				if (foundKeywords.length > 0) {
					console.log("Se encontraron las siguientes palabras clave:");
					foundKeywords.forEach(keyword => {
						console.log(`- ${keyword}`);
					});
					palabraEncontrada = ' Mi creador es el Ingeniero Hansel Colmenarez. Además,';
					palabraEncontradaComple = " Uso el modelo text-davinci-003 el cual es una versión específica del modelo de lenguaje GPT (Generative Pre-trained Transformer) desarrollado por OpenAI, conocido como GPT-3.5. He sido entrenada en una amplia variedad de datos textuales para desarrollar habilidades de procesamiento del lenguaje natural, como comprensión de lectura, generación de texto coherente y capacidad para responder preguntas.";
					console.log("Mensaje de éxito");
				} else {
					console.log("No se encontraron palabras clave para tex-davinci.");
				}
	
				const response = await openai.createCompletion(completeOptions);
	
				if (response.data.choices) {
					response.data.choices[0].text = palabraEncontrada + response.data.choices[0].text + palabraEncontradaComple;
					setStoredValues([
						{
							question: newQuestion,
							answer: response.data.choices[0].text,
						},
						...storedValues,
					]);
					setNewQuestion('');
				}				
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
					<div>
						<video id="hazelmodel" width="50%" height="50%">
							<source src="/video/Presentacion-Hazel.mp4" type="video/mp4" />
							Tu navegador no soporta el elemento de video.
						</video>
					</div>
				)}
			</div>

			<FormSection generateResponse={generateResponse} />

			<AnswerSection storedValues={storedValues} imageUrl={imageUrl}/>

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