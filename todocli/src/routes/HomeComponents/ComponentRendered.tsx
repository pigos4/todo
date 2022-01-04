import  { useContext } from "react";
import ax from "../axios/axios";
import { ThemeContext } from "../Home";
import './style/componentRender.css';

interface mestext {
  id: string;
  message: string;
  text: string;
}
interface dataFromServer {
  dataFromServer: mestext[];
}

type AppProps = {
  message: dataFromServer;
};
const DeleteItem = (id: any) => {
  let ref: any = useContext(ThemeContext);

  const deleteItemAxios = (idd: any) => {
    ax.post("deleteitem", idd)
      .then((x: any) => {
        ref.reload[1](`${idd.id} Deleted`);
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={() => deleteItemAxios(id)}>Delete</button>;
};
let x=({ message }: AppProps) => {
  let messagesRendered = message.dataFromServer.map((data, i) => (
    <p key={i} id={data.id} className="items">
      <span className="messageToRender">messsage:</span>
      <span>{data.message}</span>
      <span>text:</span>
      <span>{data.text}</span>
      <DeleteItem  id= {data.id} />
    </p>
  ));
  return <>{messagesRendered}</>;
};
export default x;
