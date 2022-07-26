import { Box, Modal, ModalProps, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useModalOpen from "../../../hooks/useModalOpen";

interface ILoadingModalProps extends Omit<ModalProps, "children" | "sx"> {}
const LoadingModal = ({ open, ...restProps }: ILoadingModalProps) => {
  const [modalOpen, closeModal] = useModalOpen(open);
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      data-testid="modal-container"
      open={modalOpen}
      onClose={closeModal}
      {...restProps}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        "&:focus": {
          outline: "none",
          border: "none",
        },
      }}
    >
      <Box
        data-testid="modal-content"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "400px",
          padding: "3rem 0rem",
          backgroundColor: "white",
          rowGap: "2rem",
          borderRadius: "1rem",
          border: "none",
        }}
      >
        <CircularProgress size="120px" />
        <Typography sx={{ fontWeight: "bold", fontSize: "1.25rem", color: "black" }} data-testid="modal-text">
          Waiting for server processing.
        </Typography>
      </Box>
    </Modal>
  );
};
export default LoadingModal;
