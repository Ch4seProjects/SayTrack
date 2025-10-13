"use client";

import { ReactNode, useState } from "react";
import { ModalContext, ModalData } from "./ModalContext";
import Modal from "react-modal";
import GivePointsModal from "../components/Modals/GivePointsModal";
import JoinAClub from "../components/Modals/JoinAClubModal";
import FollowActionModal from "../components/Modals/FollowActionModal";
import EditProfileModal from "../components/Modals/EditProfileModal";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalData | null>(null);

  const showModal = (type: string, props?: Record<string, any>) => {
    setModal({ type, props });
  };

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <Modal
        isOpen={!!modal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        className="bg-secondary rounded-lg p-4 w-[90%] max-w-sm text-white shadow-lg relative outline-none"
      >
        {modal?.type === "GIVE_POINTS" && (
          <GivePointsModal {...modal.props} onClose={closeModal} />
        )}
        {modal?.type === "JOIN_CLUB" && (
          <JoinAClub {...modal.props} onClose={closeModal} />
        )}
        {modal?.type === "FOLLOW_ACTION" && (
          <FollowActionModal {...modal.props} onClose={closeModal} />
        )}
        {modal?.type === "EDIT_PROFILE" && (
          <EditProfileModal {...modal.props} onClose={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
