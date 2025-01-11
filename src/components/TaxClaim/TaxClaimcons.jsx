import {  RiDeleteBack2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave } from 'react-icons/fa';
export const TaxClaimIcons = () => {
    return (


        <>
        <div className="btn-toolbar" role="toolbar">
            <div className="btn-group mb-2">
                <button
                    className={"btn btn-success espacio"}
                >
                    Nuevo PreToma <MdNoteAdd className="iconSizeBtn" />
                </button>
            </div>


            <div className="btn-group mb-2">
                <button
                    className={"btn btn-dark espacio"}
                >
                    Guardar PreToma <FaRegSave className="iconSizeBtn" />
                </button>
            </div>


            <div className="btn-group mb-2">
                <button
                    className={"btn btn-primary espacio"}
                >
                    Buscar PreToma <FaMagnifyingGlass className="iconSizeBtn" />
                </button>
            </div>


            <div className="btn-group mb-2">
                <button
                    className={"btn btn-danger espacio"}
                >
                    Anular PreToma <RiDeleteBack2Fill className="iconSizeBtn" />
                </button>
            </div>
        </div>



    </>

    )
}
