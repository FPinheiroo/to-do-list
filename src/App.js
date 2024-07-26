import { useState } from "react";
import "./styles.css";

function App() {
  return (
    <div class="container">
      <input placeholder="Digite sua tarefa aqui !" id="to_do" type="text" />
      <button id="add">Adicionar</button>
      <select id="filter">
        <option>Todas as Tarefas</option>
        <option>Data</option>
        <option>Concluidas</option>
        <option>Pendentes</option>
      </select>
    </div>
  );
}

export default App;
