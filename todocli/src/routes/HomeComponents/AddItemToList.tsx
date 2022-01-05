import { useState, useContext, useEffect } from "react";
import ax from "../axios/axios";
import "./style/addItemToList.css";
import { ThemeContext } from "../Home";
export default function AddItemToList() {
  let ref: any = useContext(ThemeContext);

  const [inputs, setInputs] = useState<isSetInputs | any>({
    text: "",
    message: "",
  });
  const [subm, setSubm] = useState(true);
  useEffect(() => {}, [subm]);
  function sendPostRequest(data: object) {
    ax.post("postitem", data)
      .then((x: any) => {
        ref.reload[1](`${x.data} Added`);
      })
      .catch((err) => console.log(err));
  }
  interface isSetInputs {
    text: any;
    message: any;
  }
  console.log(setSubm);
  return (
    <form>
      <label className="message">
        <span>Message:</span>
        <input
          type="text"
          value={inputs.message}
          onChange={(e) =>
            setInputs({ message: e.target.value, text: inputs.text })
          }
        ></input>
      </label>
      <label className="text">
        <span>Text:</span>
        <input
          type="text"
          value={inputs.text}
          onChange={(e) =>
            setInputs({ text: e.target.value, message: inputs.message })
          }
        ></input>
      </label>
      <label htmlFor="submit" className="submit">
        <input
          type="button"
          id="submit"
          value="submit"
          onClick={(e) => {
            e.preventDefault();
            setInputs({
              text: "",
              message: "",
            });

            sendPostRequest(inputs);
          }}
        ></input>
      </label>
    </form>
  );
}
