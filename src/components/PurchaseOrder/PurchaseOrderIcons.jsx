import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose } from 'react-icons/fa';

export const PurchaseOrderIcons = () => {
    return (

        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-success espacio"}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-primary espacio"}
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-dark espacio"}
                    >
                        Registrar <FaRegSave className="iconSizeBtn" />
                    </button>
                </div>



                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-danger espacio"}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
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
