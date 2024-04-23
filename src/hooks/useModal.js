import React, { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return {
    onOpen,
    onClose,
    isOpen,
  };
};

export default useModal;
