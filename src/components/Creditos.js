import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Menu from './Menu';

const Creditos = ({ logout }) => {
    const [showCredits, setShowCredits] = useState(false);

    const toggleCredits = () => {
        setShowCredits(!showCredits);
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <Menu logout={logout} />
            </div>
            <h1>Créditos</h1>
            <button onClick={toggleCredits}>Mostrar Créditos</button>
            <CSSTransition
                in={showCredits}
                timeout={300}
                classNames="credits"
                unmountOnExit
            >
                <div>
                    <p>Desarrollado por: Nombre del Desarrollador</p>
                    <p>Fecha de Creación: Fecha</p>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Creditos;
