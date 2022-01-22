import React from "react";
import "./App.css";
import { List } from "./components/list/List";

const listaDeRegalos = ["Medias", "Caramelos", "Vitel Tone"];


function App() {
    return (
        <div className="App">
            <h1>Regalos</h1>
            <List list={listaDeRegalos}/>
        </div>
    );
}

export default App;
