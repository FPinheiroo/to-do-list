import { useState } from "react";
import "./styles.css";

function App() {
  const [iteml, setItemL] = useState([]);
  const [inputT, setinputT] = useState("");
  const [inputTD, setinputTD] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAddItem() {
    const textovazio = inputT.trim();
    const descricaovazia = inputTD.trim();
    if (textovazio === "" || descricaovazia === "") return;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    if (editId) {
      const updatedItems = iteml.map((item) =>
        item.id === editId
          ? { ...item, itemLista: textovazio, itemDescricao: descricaovazia, itemData: formattedDate }
          : item
      );
      setItemL(updatedItems);
      setEditId(null);
    } else {
      let newItem = {
        id: Date.now(),
        itemLista: textovazio,
        itemDescricao: descricaovazia,
        itemData: formattedDate
      };
      setItemL([...iteml, newItem]);
    }

    setinputT("");
    setinputTD("");
  }

  function handleExcluirItem(item) {
    setItemL((prevList) => prevList.filter((lista) => lista.id !== item.id));
  }

  function handleEditItem(item) {
    setinputT(item.itemLista);
    setinputTD(item.itemDescricao);
    setEditId(item.id);
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
              <p>{item.itemDescricao}</p>
              <small>{item.itemData}</small>
            </div>
            <div className="item-buttons">
              <button className="del_task" onClick={() => handleExcluirItem(item)}>❌</button>
              <button className="edit_task" onClick={() => handleEditItem(item)}>✏️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
