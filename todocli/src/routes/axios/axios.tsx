import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "text/html",
  },
});
