import React from 'react';

export const useDisclosure = (defaultValue = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultValue);

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen(isOpen => !isOpen)


  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
};
