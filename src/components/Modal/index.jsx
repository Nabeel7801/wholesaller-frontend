import React from "react";
import { Modal as ModalMaterial } from "@material-ui/core";

const ModalComponent = ({ open, handleClose, children }) => {
  return (
    <ModalMaterial
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </ModalMaterial>
  );
};

export default ModalComponent;
