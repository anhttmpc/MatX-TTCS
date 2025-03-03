import { Alert, Snackbar } from "@mui/material";
import React, { useEffect } from "react";

const CustomizedAlert = ({ type, message }) => {
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    setAlert({ type, message });
  }, []);
  return (
    <Snackbar
      open={alert.message}
      autoHideDuration={6000}
      onClose={() => setAlert({ type: "", message: "" })}
    >
      <Alert severity={alert.type}>{alert.message}</Alert>
    </Snackbar>
  );
};

export default CustomizedAlert;
