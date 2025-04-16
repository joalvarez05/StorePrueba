// hooks/useNavbarAnimations.js
import { useState } from "react";

export function useNavbarAnimations() {
  // Estado del menú móvil
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileAnimatingIn, setIsMobileAnimatingIn] = useState(false);
  const [isMobileAnimatingOut, setIsMobileAnimatingOut] = useState(false);

  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Abrir/cerrar menú móvil con animaciones
  const toggleMobileMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsMobileAnimatingIn(true);
      }, 10);
    } else {
      setIsMobileAnimatingIn(false);
      setIsMobileAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsMobileAnimatingOut(false);
      }, 300);
    }
  };

  // Abrir modal con animación
  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => {
      setIsAnimatingIn(true);
    }, 10);
  };

  // Cerrar modal con animación
  const handleClose = () => {
    setIsAnimatingIn(false);
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowModal(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  return {
    // mobile menu
    isOpen,
    isMobileAnimatingIn,
    isMobileAnimatingOut,
    toggleMobileMenu,

    // modal
    showModal,
    isAnimatingIn,
    isAnimatingOut,
    handleOpen,
    handleClose,
  };
}
