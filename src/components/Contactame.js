import React, { useState } from 'react';
import Menu from './Menu';

const Contactame = ({ logout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario de contacto
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Menu logout={logout} />
      </div>
      <h1>Contacto</h1>
      {isSubmitted ? (
        <div>
          <h2>¡Gracias por tu mensaje!</h2>
          <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Contactame;
