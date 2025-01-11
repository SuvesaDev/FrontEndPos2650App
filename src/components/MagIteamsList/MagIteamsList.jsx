import { useDispatch } from 'react-redux';

import { FaExchangeAlt, FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

import { ModalAddImpuesto } from './ModalAddImpuesto';
import { OpenModalAddMagItemsList } from '../../actions/magItemList';
import { FaCircleXmark } from 'react-icons/fa6';

export const MagIteamsList = () => {

    const dispatch = useDispatch();

    const openModalAddImpuesto = () => {
        dispatch(OpenModalAddMagItemsList());
    }

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Lista Articulos MAG</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2 text-center">
                            <div className="col-md-6 mb-3">
                                <h5>Buscar</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaSearch className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar Artículo..."
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <hr />
                                <button className='btn btn-success' data-bs-toggle="modal"
                                    data-bs-target="#modalNuevoImpuesto">
                                    Cambiar Impuesto <FaExchangeAlt className='iconSize' />
                                </button>
                            </div>

                            <div className="col-md-3 mb-3">
                                <hr />
                                <button className='btn btn-danger'>
                                    Quitar de la Lista <FaCircleXmark className='iconSize' />
                                </button>
                            </div>
                        </div>

                        <hr />
                        <div className="row mb-2 text-center" >
                            <div className="col-md-12 mb-2">
                                <div className="table-responsive-md tablaP">
                                    <table
                                        className="table table-dark table-hover table-bordered text-md-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Código Artículo</th>
                                                <th>Descripción</th>
                                                <th>Impuesto Venta</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-secondary">
                                            <tr>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="card-footer cartaP">
                        <div className="btn-toolbar" role="toolbar">

                            <div className="btn-group mb-2">
                                <button
                                    className={"btn btn-dark espacio"}
                                >
                                    Registrar <FaRegSave className="iconSizeBtn" />
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
                    </div>
                </div>
            </div>
            <br />

            <ModalAddImpuesto />

        </>

    )
}
