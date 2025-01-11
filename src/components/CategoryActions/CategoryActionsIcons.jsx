
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';

export const CategoryActionsIcons = () => {
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
                        Guardar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                    >
                        Editar <TbEditCircle className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-primary espacio"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className="btn btn-danger espacio"
                    >
                        Eliminar <RiDeleteBin2Fill className="iconSize" />
                    </button>
                </div>


            </div>
        </>
    )
}
