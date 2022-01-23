import React, { useState } from "react";
import "./App.css";

/* const listaDeRegalos = ["Medias", "Caramelos", "Vitel Tone"]; */

type FormElement = React.FormEvent<HTMLFormElement>;

interface listaDeRegalosProps {
    regalo: string;
    cant: number;
}

function App(): JSX.Element {
    const [newRegalo, setNewRegalo] = useState<string>("");
    const [cant, setCant] = useState<number>(1);
    const [listaDeRegalos, setListaDeRegalos] = useState<listaDeRegalosProps[]>(
        []
    );

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addRegalo(newRegalo, cant);
        setNewRegalo("");
        setCant(1);
    };

    function verificarRegalo(regalo: string, cant: number): boolean {
        let resultado = true;
        if (regalo === "") {
            resultado = false;
        } else if (resultado) {
            listaDeRegalos.forEach((element) => {
                if (regalo === element.regalo) {
                    resultado = false;
                    addCant(regalo,cant)
                    return resultado;
                }
            });
        }
        return resultado;
    }

    const addCant = (regalo: string, cant: number) => {
        const newListaRegalos: listaDeRegalosProps[]  = []
        listaDeRegalos.forEach((element) => {
            if (regalo === element.regalo) {
                element.cant += cant
            }
            newListaRegalos.push(element)
        });
        setListaDeRegalos(newListaRegalos)
    }

    const addRegalo = (regalo: string, cant: number) => {
        if (verificarRegalo(regalo, cant)) {
            const newListaRegalos: listaDeRegalosProps[] = [...listaDeRegalos];
            newListaRegalos.push({ regalo, cant });
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
                    <input
                        type="number"
                        name=""
                        id=""
                        value={cant}
                        onChange={(e) => setCant(parseInt(e.target.value))}
                    />
                    <button>Agregar</button>
                </form>
                <ul>
                    {listaDeRegalos.map(
                        (regalos: listaDeRegalosProps, i: number) => {
                            return (
                                <li key={i}>
                                    {regalos.regalo}
                                    {" X "}
                                    {regalos.cant}
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
