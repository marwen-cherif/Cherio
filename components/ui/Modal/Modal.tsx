import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Modal as FlowbiteModal } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
  header,
}) => {
  return (
    <FlowbiteModal show={isOpen} onClose={onClose}>
      <Suspense fallback={<Skeleton />}>
        <FlowbiteModal.Header>{header}</FlowbiteModal.Header>
        <FlowbiteModal.Body>{children}</FlowbiteModal.Body>
      </Suspense>
    </FlowbiteModal>
  );
};

Modal.displayName = 'Modal';
