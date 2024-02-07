/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import "./SnackBar.scss";
import SnackBarContext from "../../context/SnackBarContext";

const Snackbar = () => {
  const { snackbar, setSnackbar } = useContext(SnackBarContext);
  const { open, message, severity } = snackbar;
  const handleClose = () => {
    setSnackbar({
      open: false,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose()
    }, 4 * 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      {open && (
        <div
        onClick={handleClose}
          style={{
            backgroundColor:
              severity === "success"
                ? "greenyellow"
                : severity === "info"
                ? "skyblue"
                : severity === "warning"
                ? "yellowgreen"
                : "red",
          }}
          className="snackbar--container"
        >
          <div className="snackbar">
            <div className="snackbar--text">
              <p className="text">{message}</p>
            </div>
          </div>
          <div className="timer"/>
        </div>
      )}
    </>
  );
};

export default Snackbar;
