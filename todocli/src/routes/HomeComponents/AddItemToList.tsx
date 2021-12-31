import react, { useEffect, useState } from "react";
import ax from "../axios/axios";
export default function AddItemToList(this: any) {
  const [respFromServer, setrespFromServer] = useState("");

  const [inputs, setInputs] = useState<isSetInputs | any>({
    text: "",
    message: "",
  });
  function sendPostRequest(data: object) {
    ax.post("postitem", data)
      .then((x: any) => {
        setrespFromServer(x);
      })
      .catch((err) => console.log(err));
  }
  interface isSetInputs {
    text: any;
    message: any;
  }
  return (
    <form>
      <label>
        Message:
        <input
          type="text"
          onChange={(e) =>
            setInputs({ message: e.target.value, text: inputs.text })
          }
        ></input>
      </label>
      <label>
        Text:
        <input
          type="text"
          onChange={(e) =>
            setInputs({ text: e.target.value, message: inputs.message })
          }
        ></input>
        
      </label>
      <label htmlFor="submit">
        <input
          type="submit"
          id="submit"
          onClick={() => sendPostRequest(inputs)}
        ></input>
      </label>
      
    </form>
  );
}
