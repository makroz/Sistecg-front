import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import ListReport from "../components/ListReport";
import PopUp from "../components/PopUp";
import style from "../css/home.module.css";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("ADD");
  const [item, setItem] = useState(null);
  const [updateList, setUpdateList] = useState(0);
  const onClose = (reRender = false) => {
    setOpen(false);
    if (reRender) {
      setUpdateList(updateList + 1);
    }
  };
  const onOpen = (action = "ADD", item = null) => {
    setAction(action);
    setItem(item);
    setOpen(true);
  };

  return (
    <div className={style.home}>
      <Header />
      <h1 className={style.title}>Lista de Personas</h1>
      <ListReport key={updateList} onOpen={onOpen} />
      <div className={style.buttonDiv}>
        <Button onClick={(e) => onOpen()}>Crear Persona</Button>
      </div>
      {open && <PopUp onClose={onClose} action={action} item={item}></PopUp>}
    </div>
  );
};
export default Home;
