import "./App.css";
import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [archive, setArchive] = useState([]);
  const [archiveVisibility, setArchiveVisibility] = useState(false);

  const toggleArchive = () => {
    setArchiveVisibility(!archiveVisibility);
  };
  const toggleEdit = (thisEdit) => {
    let storedList = [...list];
    storedList[thisEdit].editing = !storedList[thisEdit].editing;
    setList(storedList);
  };

  const addHandler = (event) => {
    event.preventDefault();

    let storedList = [...list];
    storedList.push({ task: inputText, editing: false });
    setList(storedList);

    setInputText("");
  };

  const removeHandler = (position) => {
    let storedList = [...list];
    let storedArchive = [...archive];
    storedArchive.push(storedList.splice(position, 1)[0]);
    console.log(storedArchive);
    setList(storedList);
    setArchive(storedArchive);
  };
  const deletePerm = (position) => {
    let storedArchive = [...archive];
    storedArchive.splice(position, 1);
    setArchive(storedArchive);
  };

  const changeHandler = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      toggleEdit(index);
    }
  };

  const updateHandler = (event, index) => {
    let storedList = [...list];
    storedList[index].task = event.target.value;
    setList(storedList);
  };

  // const editHandler = () => {
  //   setEditing(true);
  // };
  // const saveHandler = () => {
  //   setEditing(false);
  // };

  return (
    <div className="App">
      <div className="toDoList">
        <form onSubmit={addHandler}>
          <input type="text" value={inputText} onChange={changeHandler}></input>
          <button type="submit">+</button>
        </form>
        {list.map((toDo, index) => {
          return (
            <div key={index} className="tasks">
              {toDo.editing ? (
                <input
                  type="text"
                  value={toDo.task}
                  onChange={(e) => updateHandler(e, index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                ></input>
              ) : (
                <p key={index}>{toDo.task}</p>
              )}

              <button onClick={() => toggleEdit(index)}>
                {toDo.editing ? "Save" : "Edit"}
              </button>
              <button onClick={() => removeHandler(index)}>-</button>
            </div>
          );
        })}
      </div>
      <button onClick={toggleArchive}>
        {archiveVisibility ? "Hide Archive" : "Show Archive"}
      </button>
      {archiveVisibility && (
        <div id="archive">
          <h2>ARCHIVED</h2>
          {archive.map((toDo, index) => {
            return (
              <div key={index}>
                <p>{toDo.task}</p>
                <button onClick={() => deletePerm(index)}>-</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
