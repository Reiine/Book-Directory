import "./App.css";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Home />
      <ToastContainer autoClose={1000}/>

    </>
  );
}

export default App;
