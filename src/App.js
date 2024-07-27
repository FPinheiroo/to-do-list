import { useState } from "react";
import "./styles.css";

function App() {
  const [iteml, setItemL] = useState([]);
  const [inputT, setinputT] = useState("");
  const [inputTD, setinputTD] = useState("");

  function handleAddItem() {
    const textovazio = inputT.trim();
    const descricaovazia = inputTD.trim();
    if (textovazio === "" || descricaovazia === "") return;

    let newItem = {
      id: Date.now(),
      itemLista: textovazio,
      itemDescricao: descricaovazia
    };

    setItemL([...iteml, newItem]);
    setinputT("");
    setinputTD("");
  }

  function handleExcluirItem(item) {
    setItemL((prevList) => prevList.filter((lista) => lista.id !== item.id));
  }

  return (
    <div className="container">
      <div class="t">
        <input placeholder="Digite sua tarefa aqui!" id="to_do" type="text" value={inputT} onChange={(e) => setinputT(e.target.value)}/>
        <input placeholder="Descrição aqui!" id="to_do_desc" type="text" value={inputTD} onChange={(e) => setinputTD(e.target.value)}/>
        </div>
        <div class="t2">
        <button id="add" onClick={handleAddItem}>Adicionar</button>
        <select id="filter">
          <option>Todas as Tarefas</option>
          <option>Data</option>
          <option>Concluidas</option>
          <option>Pendentes</option>
        </select>
      </div>
      <ul className="lista_a_fazer">
        {iteml.map((item) => (
          <li className="item" key={item.id}>
            <div>
              <strong>{item.itemLista}</strong>
              <p id="desc">{item.itemDescricao}</p>
            </div>
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
