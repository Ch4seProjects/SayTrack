"use client";
import { createContext, useContext } from "react";

export interface ModalData {
  type: string;
  props?: Record<string, any>;
}

export interface ModalContextType {
  showModal: (type: string, props?: Record<string, any>) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
