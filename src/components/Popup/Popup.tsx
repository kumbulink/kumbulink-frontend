import closeIcon from '@icons/close.svg'
import { FC } from 'react'

interface PopupProps {
  title: string,
  text: string,
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const CloseIcon: FC = () => (
  <img src={closeIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const Popup: React.FC<PopupProps> = ({ title, text,  isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </button>

        {/* Título */}
        <h2 className="text-red-600 font-bold text-sm uppercase">{title}</h2>

        {/* Texto */}
        <p className="text-gray-700 text-sm mt-2">
          {text}
        </p>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onConfirm}
            className="border border-orange-600 text-orange-600 font-semibold px-4 py-2 rounded-md hover:bg-orange-100"
          >
            Sim
          </button>
          <button
            onClick={onClose}
            className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
