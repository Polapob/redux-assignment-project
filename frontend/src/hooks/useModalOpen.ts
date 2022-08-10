import { useEffect, useState, useCallback } from "react";

const useModalOpen = (open: boolean) => {
  const [modalOpen, setModalOpen] = useState<boolean>(open);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  return [modalOpen, closeModal] as const;
};

export default useModalOpen;
