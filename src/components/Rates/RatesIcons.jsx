
import { FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';

export const RatesIcons = () => {
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
                        className="btn btn-primary espacio"
                    >
                        Editar <TbEditCircle className="iconSize" />
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
                        className="btn btn-danger espacio"
                    >
                        Eliminar <RiDeleteBin2Fill className="iconSize" />
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
