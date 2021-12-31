import React, { useEffect, useState } from "react";
import ax from "./axios/axios";
import RenderDataFromServer from "./HomeComponents/ComponentRendered";
import AddItemToList from "./HomeComponents/AddItemToList";
export const ThemeContext = React.createContext<any>(null);




console.log('hi')
function Home() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [reload,setReload]= useState('')
  useEffect(() => {
    ax.get("getrequest").then((itemRecived) =>
      setDataFromServer(itemRecived.data)
    );
  }, [reload]);

  return (
    <>
      <ThemeContext.Provider value={{ reload: [reload, setReload] }}>
        <h1>Todo</h1>{reload}
        <AddItemToList />
        <RenderDataFromServer message={{ dataFromServer }} />
        <input type="button" onClick={() => console.log(reload)}></input>
      </ThemeContext.Provider>
    </>
  );
}

export { Home };
