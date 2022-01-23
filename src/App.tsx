import React, { useState } from "react";
import "./App.css";
/* import { List } from "./components/list/List"; */

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
        setNewRegalo('')
    };

    const addRegalo = (regalo: string) => {
        const newListaRegalos: listaDeRegalosProps[] = [
            ...listaDeRegalos,
            { regalo },
        ];
        setListaDeRegalos(newListaRegalos);
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Regalos</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setNewRegalo(e.target.value)} value={newRegalo} />
                    <button>Agregar</button>
                </form>
                <ul>
                    {listaDeRegalos.map(
                        (regalos: listaDeRegalosProps, i: number) => {
                            return <li key={i}>{regalos.regalo}</li>;
                        }
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;
