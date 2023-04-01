import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { toggleNotfOff } from "../../store/actions/notifications";

const SimpleSnackbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    message,
    variant,
    open: openGlobal,
  } = useSelector((state) => state.notification);

  const handleClose = () => {
    setOpen(false);
    dispatch(toggleNotfOff());
  };

  useEffect(() => {
    openGlobal && setOpen(true);
  }, [openGlobal, variant, message]);

  return (
    <div>
      <Snackbar
        sx={{ height: "25%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        onClick={handleClose}
      >
        {openGlobal &&
        process.env.NODE_ENV !== "production" &&
        (variant === "error" || variant === "warning") ? (
          <Alert
            variant="filled"
            severity={variant}
            style={{ minWidth: "150px" }}
          >
            {message || variant || "something went wrong"}
          </Alert>
        ) : (
          <Alert
            variant="filled"
            severity={variant}
            style={{ minWidth: "150px" }}
          >
            {message || variant || "success"}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
