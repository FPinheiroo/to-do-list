import { useState } from "react";
import "./styles.css";

function App() {
  const [iteml, setItemL] = useState([]);
  const [inputT, setinputT] = useState("");
  const [inputTD, setinputTD] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  function handleAddItem() {
    const textovazio = inputT.trim();
    const descricaovazia = inputTD.trim();
    if (textovazio === "" || descricaovazia === "") return;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    if (editId) {
      const updatedItems = iteml.map((item) =>
        item.id === editId
          ? { ...item, itemLista: textovazio, itemDescricao: descricaovazia, itemData: formattedDate }: item
      );
      setItemL(updatedItems);
      setEditId(null);
    } else {
      let newItem = {
        id: Date.now(),
        itemLista: textovazio,
        itemDescricao: descricaovazia,
        itemData: formattedDate,
        isCompleted: false
      };
      setItemL([...iteml, newItem].sort((a, b) => b.id - a.id));
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

  function handleToggleComplete(item) {
    const updatedItems = iteml.map((task) =>
      task.id === item.id ? { ...task, isCompleted: !task.isCompleted } : task);
    setItemL(updatedItems);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }
  function handleArchivedTask(item) {
    const updatedItems = iteml.map((task) =>
      task.id === item.id ? { ...task, isArchived: true } : task
    );
    setItemL(updatedItems);
  }

  const filteredItems = iteml.filter(item => {
    if (filter === "completed") {
      return item.isCompleted && !item.isArchived;
    } else if (filter === "todo") {
      return !item.isCompleted && !item.isArchived;
    } else if (filter === "archived") {
      return item.isArchived;
    } else {
      return !item.isArchived;
    }
  });

  return (
    <div className="container">
      <div class="t">
        <input placeholder="Digite sua tarefa aqui!" id="to_do" type="text" value={inputT} onChange={(e) => setinputT(e.target.value)}/>
        <input placeholder="Descrição aqui!" id="to_do_desc" type="text" value={inputTD} onChange={(e) => setinputTD(e.target.value)}/>
        </div>
      <div className="t2">
        <button id="add" onClick={handleAddItem}>
          {editId ? "Atualizar" : "Adicionar"}
        </button>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">Todas as Tarefas</option>
          <option value="completed">Concluidas</option>
          <option value="todo">Pendentes</option>
          <option value="archived">Arquivadas</option>
        </select>
        </div>
      <ul className="lista_a_fazer">
        {filteredItems.map((item) => (
          <li className={`item ${item.isCompleted ? 'completed' : ''}`} key={item.id}>
            <div>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggleComplete(item)}
              />
            </div>
            <div>
              <strong>{item.itemLista}</strong>
              <p>{item.itemDescricao}</p>
              <small>{item.itemData}</small>
            </div>
            <div className="item-buttons">
              <button className="del_task" onClick={() => handleExcluirItem(item)}>🗑️</button>
              <button className="edit_task" onClick={() => handleEditItem(item)}>✏️</button>
              <button className="archived_task" onClick={() => handleArchivedTask(item)}>📁</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
