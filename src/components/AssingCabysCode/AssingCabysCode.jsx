import { FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { AssingCabysCodeBody } from './AssingCabysCodeBody';

export const AssingCabysCode = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Asignar Código Cabys</h3>
                    </div>
                    <div className="card-body">
                        <AssingCabysCodeBody />
                    </div>
                    <div className="card-footer cartaP">
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
                                    className={"btn btn-danger espacio"}
                                >
                                    Cerrar <FaWindowClose className="iconSizeBtn" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />

        </>


    )
}
