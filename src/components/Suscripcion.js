import React from 'react';
import Menu from './Menu';

const Suscripcion = ({ logout }) => {
  const handleSubscribe = (plan) => {
    // Lógica para procesar la suscripción con PayPal
    console.log(`Se ha seleccionado el plan ${plan}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Menu logout={logout} />
      </div>
      <h1>Planes de Suscripción</h1>
      <div>
        <div>
          <h2>Bronce</h2>
          <p>Precio: $10/mes</p>
          <button onClick={() => handleSubscribe('Bronce')}>Suscribirse</button>
        </div>
        <div>
          <h2>Plata</h2>
          <p>Precio: $20/mes</p>
          <button onClick={() => handleSubscribe('Plata')}>Suscribirse</button>
        </div>
        <div>
          <h2>Oro</h2>
          <p>Precio: $30/mes</p>
          <button onClick={() => handleSubscribe('Oro')}>Suscribirse</button>
        </div>
      </div>
    </div>
  );
};

export default Suscripcion;
