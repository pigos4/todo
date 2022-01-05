import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderDataFromServer from "./HomeComponents/ComponentRendered";
import AddItemToList from "./HomeComponents/AddItemToList";
import './HomeComponents/style/home.css';
export const ThemeContext = React.createContext<any>(null);


console.log('hi')
function Home() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [reload,setReload]= useState('')
  const [itemAdded, setItemAdded]= useState('');
  useEffect(() => {
    axios.get("getrequest").then((itemRecived) =>
      setDataFromServer(itemRecived.data)
    );
  }, [reload, itemAdded]);

  return (
    <>
      <ThemeContext.Provider
        value={{
          reload: [reload, setReload],
          added: [itemAdded, setItemAdded]
        }}
      >
        <h1>To do list</h1>
        {reload}
        {console.log(itemAdded)}
        <AddItemToList />
        <RenderDataFromServer message={{ dataFromServer }} />
      </ThemeContext.Provider>
    </>
  );
}

export { Home };
