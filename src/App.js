import { useState } from "react";
import "./styles.css";

function App() {
  const [iteml,setItemL]=useState([]);
  const [inputT,setinputT]=useState("");


  function handleAddItem(){
    setItemL([...iteml,inputT]);
    setinputT("");
  }

  return (
    <div class="container">
      <input placeholder="Digite sua tarefa aqui !" id="to_do" type="text" value={inputT} onChange={(e)=> setinputT(e.target.value)}/>
      <button id="add" onClick={handleAddItem}>Adicionar</button>
      <select id="filter">
        <option>Todas as Tarefas</option>
        <option>Data</option>
        <option>Concluidas</option>
        <option>Pendentes</option>
      </select>
      <ul className="lista_a_fazer">
        {iteml.map((item) => (
          <li className="item">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
