import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbEditCircle } from 'react-icons/tb';
import { FaCheckCircle, FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';

export const CheckOrdersIcons = () => {
    return (
        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-primary espacio"}
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-danger espacio"}
                    >
                        Eliminar <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>
            </div>

        </>


    )
}
