import { useState } from "react";
import "./styles.css";

function App() {
  const [iteml, setItemL] = useState([]);
  const [inputT, setinputT] = useState("");

  function handleAddItem() {
    const textovazio = inputT.trim()
    if (textovazio == "") return;

    let newItem = {
      id:Date.now(),
      itemLista: textovazio,
    }

    setItemL([...iteml, newItem]);
    setinputT("");
  }

  function handleExcluirItem(item){
    setItemL((prevList) => prevList.filter((lista)=> lista != item));
  }

  return (
    <div className="container">
      <div class="t">
        <input placeholder="Digite sua tarefa aqui!" id="to_do" type="text" value={inputT} onChange={(e) => setinputT(e.target.value)}/>
        <button id="add" onClick={handleAddItem}>Adicionar</button>
        <select id="filter">
          <option>Todas as Tarefas</option>
          <option>Data</option>
          <option>Concluidas</option>
          <option>Pendentes</option>
        </select>
      </div>
      <ul className="lista_a_fazer">{iteml.map((item) => (
          <li className="item" key={item.id}>
            {item.itemLista}
            <div className="item-buttons">
              <button className="del_task" onClick={() => handleExcluirItem(item)}>❌</button>
              <button className="edit_task">✏️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
