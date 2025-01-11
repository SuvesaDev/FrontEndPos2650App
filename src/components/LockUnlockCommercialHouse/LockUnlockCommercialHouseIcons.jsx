
import { FaWindowClose } from 'react-icons/fa';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';

export const LockUnlockCommercialHouseIcons = () => {
    return (
        <>
            <div className="btn-toolbar" role="toolbar">
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
