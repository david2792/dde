import React, { useState, useEffect } from 'react';

const SearchSede = () => {
    const [ci, setCi] = useState('');
    const [result, setResult] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [sedes, setSedes] = useState([]);
    const [salaResult, setSalaResult] = useState(null);
    const [salas, setSalas] = useState([]);

    // Cargar los datos del archivo JSON al cargar el componente
    useEffect(() => {
        fetch('./nivelmedio.json')
            .then(response => response.json())
            .then(data => setSedes(data))
            .catch(error => console.error('Error cargando el archivo nivelmedio.json:', error));

        fetch('./sala_nuevo.json')
            .then(response => response.json())
            .then(data => setSalas(data))
            .catch(error => console.error('Error cargando el archivo sala_nuevo.json:', error));
    }, []);

    // Función para buscar la sede y la sala en base al CI ingresado
    const handleSearch = () => {
        const foundSede = sedes.find(sede =>
            parseInt(ci) >= sede.ci_desde &&
            parseInt(ci) <= sede.ci_hasta
        );

        const foundSala = salas.find(sala =>
            parseInt(ci) === parseInt(sala.cedula)
        );

        if (foundSede && foundSala) {
            setResult(foundSede.sede);
            setUbicacion(foundSede.ubicacion);
            setSalaResult(foundSala.sala);
        } else{
            setUbicacion(null);
            setSalaResult('No se encontró la sala.');
            setResult('No se encontró la sede.');
        }
    };

    const handleCancel = () => {
        setCi('');
        setResult(null);
        setUbicacion(null);
        setSalaResult(null);
    };

    return (
        <div>
            <h1 className="title is-3 is-spaced">Búsqueda de Sede de Evaluación</h1>
            <div className="field">
                <div className="control">
                    <input
                        className="input is-large is-danger"
                        type="text"
                        placeholder="Ingrese su cédula"
                        value={ci}
                        onChange={(e) => setCi(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-danger is-light is-medium" onClick={handleSearch} disabled={!ci}>
                        Buscar
                    </button>
                    <button className="button is-warning is-light is-medium" onClick={handleCancel} disabled={!ci}>
                        Cancelar
                    </button>
                </div>
            </div>
            {result && (
                <div>
                    <p className="subtitle is-5">Su sede de evaluación es: {result}</p>
                    {ubicacion && (
                        <button className="button is-success" onClick={() => window.open(ubicacion, '_blank')}>
                            Abrir Ubicación
                        </button>
                    )}
                </div>
            )}
            {salaResult && (
                <div>
                    <p className="subtitle is-5">Su sala es: {salaResult}</p>
                </div>
            )}
            <p className="subtitle is-8">Desarrollado por: Lic. David Espinola Benitez</p>
        </div>
    );
};

export default SearchSede;

