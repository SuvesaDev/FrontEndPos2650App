import { FaMagnifyingGlass } from 'react-icons/fa6';
import {FaRegSave, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export const PretakeIcons = () => {
    return (
        <>
        <div className="btn-toolbar" role="toolbar">

            <div className="btn-group mb-2">
                <button
                    className={"btn btn-success espacio"}
                >
                    Registrar <FaRegSave className="iconSizeBtn" />
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
