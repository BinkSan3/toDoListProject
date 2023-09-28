import "./App.css";
import { useState } from "react";

function App() {
  const [list, setList] = useState(["thing1", "thing2"]);
  const [inputText, setInputText] = useState("");
  const [archive, setArchive] = useState(["thing x"]);
  const [archiveVisibility, setArchiveVisibility] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleArchive = () => {
    setArchiveVisibility(!archiveVisibility);
  };
  const toggleEdit = (thisEdit) => {
    setEditing(!editing);
  };

  const addHandler = (event) => {
    event.preventDefault();

    let storedList = [...list];
    storedList.push(inputText);
    setList(storedList);

    setInputText("");
  };

  const removeHandler = (position) => {
    let storedList = [...list];
    let storedArchive = [...archive];
    storedArchive.push(storedList.splice(position, 1));
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
            <p key={index}>
              {toDo}
              <button onClick={() => toggleEdit(index)}>
                {editing ? "Save" : "Edit"}
              </button>
              <button onClick={() => removeHandler(index)}>-</button>
            </p>
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
                <p>{toDo}</p>
                <button></button>
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
