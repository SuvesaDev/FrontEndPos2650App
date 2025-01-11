import { useDispatch } from 'react-redux';

import { ModalSearchProviders } from './ModalSearchProviders';
import { OpenModalAssingCabysCode, OpenModalSearchProviders } from '../../actions/assingCabysCode';
import { ModalAssingCabysCode } from './ModalAssingCabysCode';
import { FaListCheck } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

export const AssingCabysCodeBody = () => {

    const dispatch = useDispatch();

    const openModalSearchProviders = () => {
        dispatch(OpenModalSearchProviders());
    }

    const openModalAssingCabysCode = () => {
        dispatch(OpenModalAssingCabysCode());
    }

    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Opción para Mostrar Artículos</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaListCheck className="iconSize" />
                        </span>
                        <select className='form-select'>
                            <option value='1'>Mostrar solo artículos sin código cabys</option>
                            <option value='2'>Mostrar solo artículos con código cabys</option>
                            <option value='3'>Mostrar todos los artículos</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checksoloAct"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checksoloAct">Mostar solo Activos</h5>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Articulos por Descripcion..."
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="btn-group mb-2">
                        <button className='btn btn-dark espacio'>Producto Agricula (MAG)</button>
                    </div>

                    <div className="btn-group mb-2">
                        <button className='btn btn-dark espacio'>Quitar (MAG)</button>
                    </div>

                    <div className="btn-group mb-2">
                        <button className='btn btn-dark espacio' onClick={openModalAssingCabysCode}>Asignar Cabys</button>
                    </div>

                    <div className="btn-group mb-2">
                        <button className='btn btn-dark espacio'>Quitar Código Cabys</button>
                    </div>

                    <div className="btn-group mb-2">
                        <button className='btn btn-dark espacio' data-bs-toggle="modal" data-bs-target="#modalBuscaProveedor">...</button>
                    </div>
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
                                    <th>Proveedor</th>
                                    <th>Existencia</th>
                                    <th>MAG</th>
                                    <th>Servicio</th>
                                    <th>Código Cabys</th>
                                    <th>Cabys</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ModalSearchProviders />

            <ModalAssingCabysCode />
        </>

    )
}
