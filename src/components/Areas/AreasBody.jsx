import { FaEye, FaHashtag, FaUser } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';
import { TbNotes } from 'react-icons/tb';

export const AreasBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-6 mb-3">
                    <div className="col-md-12 mb-3">
                        <h5>Descripción del Area</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <TbNotes className="iconSize" />
                            </span>
                            <textarea
                                class="form-control"
                                rows="1"
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <h5>Observaciones</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaEye className="iconSize" />
                            </span>
                            <textarea
                                class="form-control"
                                rows="1"
                                name="observaciones"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="col-md-12 mb-2">
                        <h5>Encargado</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser className="iconSize" />
                            </span>
                            <select
                                className="form-select"

                            >
                                <option value="" selected disabled hidden>
                                    {" "}
                                    Seleccione...{" "}
                                </option>
                                <option value='1'>Juan</option>
                                <option value='2'>Pedro</option>
                            </select>
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                <FaCirclePlus className="iconSize" />
                            </button>
                        </div>
                    </div>

                    <div className="col-md-12 mb-2">
                        <hr />
                        <div className="table-responsive-md tablaP">
                            <table
                                className="table table-dark table-hover table-bordered text-md-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Encargado</th>
                                    </tr>
                                </thead>
                                <tbody className="table-secondary">
                                    <tr>
                                        <td>Test</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Código Producto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            name='numeroDocumento'
                            className='form-control'
                            placeholder='Código del Producto'
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                        >
                            <FaCirclePlus className="iconSize" />
                        </button>
                    </div>
                </div>
                <div className="col-md-8 mb-3">
                    <h5>Descripción del Producto</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                        ></textarea>
                    </div>
                </div>
            </div>


            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código Artículo</th>
                                    <th>Barras</th>
                                    <th>Descripción</th>
                                    <th>Existencia</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
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
        </>

    )
}
