import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export const AreasIcons = () => {
    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-success espacio"
                    >
                        Nuevo Área <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-dark espacio"
                    >
                        Guardar Área <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-primary espacio"
                    >
                        Buscar Área <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                    >
                        Eliminar Área <RiDeleteBin2Fill className="iconSize" />
                    </button>
                </div>
            </div>
        </>
    )
}

