import { FaWindowClose } from 'react-icons/fa';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export const BagsKilosIcons = () => {
    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-success espacio"
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                    >
                        Anular <RiDeleteBin2Fill className="iconSize" />
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
