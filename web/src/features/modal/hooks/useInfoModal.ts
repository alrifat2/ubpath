import { useAtom } from "jotai";
import { useEffect } from "react";
import { infoModalAtom } from "../atoms/modalAtom";

export const useInfoModal = () => {
  const [isOpen, setIsOpen] = useAtom(infoModalAtom);

  useEffect(() => {
    const hasVisited = localStorage.getItem("modal_shown");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("modal_shown", "true");
    }
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
