import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose } from 'react-icons/fa';

export const PurchaseOrderIcons = () => {

    const dispatch = useDispatch();

    const { 
        ActiveButtonNew,
        ActiveButtonSearch,
        ActiveButtonSave,
        ActiveButtonDisable 
    } = useSelector((state) => state.ordenCompra);

    return (

        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonNew ? "btn btn-success espacio" : "btn btn-success espacio disabled")
                        }
                        disabled={!ActiveButtonNew}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn"/>
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonSearch ? "btn btn-primary espacio" : "btn btn-primary espacio disabled")
                        }
                        disabled={!ActiveButtonSearch}
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonSave ? "btn btn-dark espacio" : "btn btn-dark espacio disabled")
                        }
                        disabled={!ActiveButtonSave}
                    >
                        Registrar <FaRegSave className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonDisable ? "btn btn-danger espacio" : "btn btn-danger espacio disabled")
                        }
                        disabled={!ActiveButtonDisable}
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
