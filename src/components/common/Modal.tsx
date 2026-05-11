import type { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ open, title, children, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <section className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <h2>{title}</h2>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
