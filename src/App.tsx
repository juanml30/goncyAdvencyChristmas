import React, { useState } from "react";
import "./App.css";

/* const listaDeRegalos = ["Medias", "Caramelos", "Vitel Tone"]; */

type FormElement = React.FormEvent<HTMLFormElement>;

interface listaDeRegalosProps {
    regalo: string;
    cant: number;
    imgLink: string;
}

function App(): JSX.Element {
    const getLocalStorage = () => {
        console.log("Probando si puedo recuperar los datos");
        const newVar = localStorage.getItem("datos");
        if (newVar) {
            console.log(newVar);
            const transformNewVar = JSON.parse(newVar);
            console.log(transformNewVar);
            return transformNewVar;
        }
        return [];
    };
    const [newRegalo, setNewRegalo] = useState<string>("");
    const [imgLink, setImgLink] = useState<string>("");
    const [cant, setCant] = useState<number>(1);
    const [listaDeRegalos, setListaDeRegalos] =
        useState<listaDeRegalosProps[]>(getLocalStorage);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addRegalo(newRegalo, cant, imgLink);
        setNewRegalo("");
        setCant(1);
        setImgLink("");
    };

    const setLocalStorage = (lista: listaDeRegalosProps[]) => {
        console.log(listaDeRegalos);
        const listaString = JSON.stringify(lista);
        console.log(listaString);
        localStorage.setItem("datos", listaString);
    };

    function verificarRegalo(regalo: string, cant: number): boolean {
        let resultado = true;
        if (regalo === "") {
            resultado = false;
        } else if (resultado) {
            listaDeRegalos.forEach((element) => {
                if (regalo === element.regalo) {
                    resultado = false;
                    addCant(regalo, cant);
                    return resultado;
                }
            });
        }
        return resultado;
    }

    const addCant = (regalo: string, cant: number) => {
        const newListaRegalos: listaDeRegalosProps[] = [];
        listaDeRegalos.forEach((element) => {
            if (regalo === element.regalo) {
                element.cant += cant;
            }
            newListaRegalos.push(element);
        });
        setListaDeRegalos(newListaRegalos);
        setLocalStorage(newListaRegalos);
    };

    const addRegalo = (regalo: string, cant: number, imgLink: string) => {
        if (verificarRegalo(regalo, cant)) {
            const newListaRegalos: listaDeRegalosProps[] = [...listaDeRegalos];
            newListaRegalos.push({ regalo, cant, imgLink });
            setListaDeRegalos(newListaRegalos);
            setLocalStorage(newListaRegalos);
            getLocalStorage();
        }
    };

    const deleteRegalo = (i: number) => {
        const newListaRegalos: listaDeRegalosProps[] = [...listaDeRegalos];
        if (i >= 0) {
            newListaRegalos.splice(i, 1);
            setListaDeRegalos(newListaRegalos);
            setLocalStorage(newListaRegalos);
        } else if (i === -1) {
            setListaDeRegalos([]);
            setLocalStorage([]);
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
                        placeholder="Regalo"
                    />
                    <input
                        onChange={(e) => setImgLink(e.target.value)}
                        value={imgLink}
                        placeholder="Imagen"
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
                                    <img
                                        src={regalos.imgLink}
                                        alt=""
                                        width={20}
                                    />
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
