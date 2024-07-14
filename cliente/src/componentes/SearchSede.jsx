import React, { useState, useEffect } from 'react';

const SearchSede = () => {
    const [ci, setCi] = useState('');
    const [nivel, setNivel] = useState('');
    const [result, setResult] = useState(null);
    const [resultsala, setResultsala] = useState(null);
    const [sedes, setSedes] = useState([]);
    const [ubicacion, setUbicacion] = useState(null);
    const [salas, setSala] = useState(null);

    useEffect(() => {
        if (nivel) {
           

            // Determina el archivo JSON a cargar basado en el nivel seleccionado
            const archivosJSON = {
                "Nivel Medio": "nivelmedio.json",
                "Primer y Segundo Ciclo": "segundo.json",
                "Inicial": "inicio.json",
            };
            const fileName = archivosJSON[nivel];

            fetch(`./${fileName}`)
                .then(response => response.json())
                .then(data => setSedes(data))
                .catch(error => console.error('Error cargando el archivo JSON:', error));
            
            salasver();
            limpiar(); // Reset all fields when the level is changed
        }
    }, [nivel]);

    const salasver = () => {
        const archivosSala = {
            "Nivel Medio": "sala.json",
            "Primer y Segundo Ciclo": "sala2.json",
            "Inicial": "sala3.json",
        };
        const salaFileName = archivosSala[nivel];

        fetch(`./${salaFileName}`)
            .then(response => response.json())
            .then(data => setSala(data))
            .catch(error => console.error('Error cargando el archivo JSON:', error));
    };
    const limpiar =()=>{
        setCi('');
      //  setNivel('');
        setResult(null);
        setUbicacion(null);
        setSedes([]);
        setResultsala(null);
        setSala(null);
    }
    const handleCancel = () => {
        setCi('');
        setNivel('');
        setResult(null);
        setUbicacion(null);
        setSedes([]);
        setResultsala(null);
        setSala(null);
    };

    const handleSearch = () => {
        const found = sedes.find(sede => 
            parseInt(ci) >= sede.ci_desde && 
            parseInt(ci) <= sede.ci_hasta
        );
        const foundSala = salas.find(sala => 
            parseInt(ci) === sala.cedula
        );

        if (found && foundSala) {
            setResult(found.sede);
            setUbicacion(found.ubicacion);
            setResultsala(foundSala.sala);
        } else {
            setResult('No se encontró la sede.');
            setResultsala(null);
            setUbicacion(null);
        }
    };

    return (
        <div>
            <h1 className="title is-3 is-spaced">Búsqueda de Sede de Evaluación</h1>
            <div className="field">
                <div className="control">
                    <div className="select is-large is-danger">
                        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                            <option value="">Seleccione el nivel</option>
                            <option value="Inicial">Inicial</option>
                            <option value="Primer y Segundo Ciclo">Primer y Segundo Ciclo</option>
                            <option value="Nivel Medio">Tercer Ciclo y Nivel Medio</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input
                        className="input is-large is-danger"
                        type="text"
                        placeholder="Ingrese su cédula"
                        value={ci}
                        onChange={(e) => setCi(e.target.value)}
                        disabled={!nivel}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-danger is-light is-medium" onClick={handleSearch} disabled={!nivel || !ci}>
                        Buscar
                    </button>
                    <button className="button is-warning is-light is-medium" onClick={handleCancel} disabled={!ci && !nivel}>
                        Cancelar
                    </button>
                </div>
            </div>
            {result && (
                <div>
                    <p className="subtitle is-5">Su sede de evaluación es: {result}</p>
                    <p className="subtitle is-5">Su sala es Nro: {resultsala}</p>
                    {ubicacion && (
                        <button className="button is-success" onClick={() => window.open(ubicacion, '_blank')}>
                            Abrir Ubicación
                        </button>
                    )}
                </div>
            )}
            <p className="subtitle is-8">Directora Departamental Mag. Perla Arguello</p>
        </div>
    );
};

export default SearchSede;
