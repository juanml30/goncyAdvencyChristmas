import React, { useState } from "react";
import "./App.css";

/* const listaDeRegalos = ["Medias", "Caramelos", "Vitel Tone"]; */

type FormElement = React.FormEvent<HTMLFormElement>;

interface listaDeRegalosProps {
    regalo: string;
}

function App(): JSX.Element {
    const [newRegalo, setNewRegalo] = useState<string>("");
    const [listaDeRegalos, setListaDeRegalos] = useState<listaDeRegalosProps[]>(
        []
    );

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addRegalo(newRegalo);
        setNewRegalo("");
    };

    function verificarRegalo(regalo: string): boolean {
        let resultado = true;
        if (regalo === "") {
            resultado = false;
        } else if (resultado) {
            listaDeRegalos.forEach((element) => {
                if (regalo === element.regalo) {
                    resultado = false;
                    return resultado;
                }
            });
        }
        return resultado;
    }

    const addRegalo = (regalo: string) => {
        if (verificarRegalo(regalo)) {
            const newListaRegalos: listaDeRegalosProps[] = [
                ...listaDeRegalos,
                { regalo },
            ];
            setListaDeRegalos(newListaRegalos);
        }
    };

    const deleteRegalo = (i: number) => {
        const newListaRegalos: listaDeRegalosProps[] = [...listaDeRegalos];
        if (i >= 0) {
            newListaRegalos.splice(i, 1);
            setListaDeRegalos(newListaRegalos);
        } else if (i === -1) {
            setListaDeRegalos([]);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Regalos</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setNewRegalo(e.target.value)}
                        value={newRegalo}
                    />
                    <button>Agregar</button>
                </form>
                <ul>
                    {listaDeRegalos.map(
                        (regalos: listaDeRegalosProps, i: number, any) => {
                            return (
                                <li key={i}>
                                    {regalos.regalo}{" "}
                                    <button onClick={() => deleteRegalo(i)}>
                                        x
                                    </button>
                                </li>
                            );
                        }
                    )}
                </ul>
                {listaDeRegalos.length === 0 ? (
                    <h1>Regala algo raton</h1>
                ) : (
                    React.Fragment
                )}
                <button onClick={() => deleteRegalo(-1)}>Borrar Todo</button>
            </div>
        </div>
    );
}

export default App;
