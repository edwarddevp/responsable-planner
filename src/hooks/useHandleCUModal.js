import React from 'react';
import {useDisclosure} from "./useDisclosure";

export const useHandleCUModal = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [itemToEdit, setItemToEdit] = React.useState({})

  React.useEffect(() => {
    if (itemToEdit?.id) {
      onOpen()
    }
  }, [itemToEdit])

  React.useEffect(() => {
    if (!isOpen) {
      setItemToEdit({})
    }
  }, [isOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    itemToEdit,
    setItemToEdit
  }
};
