
import { FaWindowClose } from 'react-icons/fa';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk } from 'react-icons/fa6';
export const TermsIcons = () => {
    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-success espacio"
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-dark espacio"
                    >
                        Registrar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                    >
                        Cerrar <FaWindowClose className="iconSize" />
                    </button>
                </div>
            </div>
        </>
    )
}
