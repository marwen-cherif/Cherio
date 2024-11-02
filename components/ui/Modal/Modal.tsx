import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Modal as FlowbiteModal } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';
import { ModalSizes } from 'flowbite-react/dist/types/components/Modal/Modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  size?: keyof ModalSizes;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
  header,
  size = 'md',
}) => {
  return (
    <FlowbiteModal show={isOpen} onClose={onClose} size={size as string}>
      <Suspense fallback={<Skeleton />}>
        {header && <FlowbiteModal.Header>{header}</FlowbiteModal.Header>}
        <FlowbiteModal.Body>{children}</FlowbiteModal.Body>
      </Suspense>
    </FlowbiteModal>
  );
};

Modal.displayName = 'Modal';
