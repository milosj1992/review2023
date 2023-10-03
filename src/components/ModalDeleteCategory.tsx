import ReactDOM from 'react-dom';

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  deleteCat: () => void;
}

const deleteModalRoot: HTMLElement | null =
  document.getElementById('delete-modal-root')!;

const ModalDeleteCategory = ({ isOpen, onClose, deleteCat }: Modal) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-opacity-90 bg-black">
      <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
        {/* Your modal content here */}
        <span className="mx-auto inline-block">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... Your SVG content ... */}
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Deactivate Your Account
        </h3>
        <p className="mb-10 font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum been.
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={() => onClose()}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={() => deleteCat()}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>,
    deleteModalRoot,
  );
};

export default ModalDeleteCategory;
