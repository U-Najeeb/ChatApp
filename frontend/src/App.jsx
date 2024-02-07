import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import { useState } from "react";
import SnackBarContext from "./context/SnackBarContext";
import Snackbar from "./components/Snackbar/Snackbar";
// import SetAvatar from "./pages/SetAvatar/setAvatar";

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  return (
    <>
    <SnackBarContext.Provider value={{snackbar, setSnackbar}}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/setAvatar" element ={<SetAvatar/>}/> */}
        <Route path="/" element={<Chat />} />
      </Routes>
      <Snackbar/>
    </SnackBarContext.Provider>
    </>
  );
}

export default App;
