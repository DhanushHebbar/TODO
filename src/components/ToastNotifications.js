import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message, type="info") => {
  toast(message, { type, position: "top-right", autoClose: 2500, pauseOnHover: true });
};
