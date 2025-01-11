import { FaCalendar, FaEye, FaHashtag, FaSortNumericDownAlt } from "react-icons/fa"
import { FaBoxesStacked, FaCirclePlus, FaShop } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const TranferPointsSaleBody = () => {
    return (

        <>
            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Punto de Venta Origen</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaShop className="iconSize" />
                        </span>
                        <select className="form-select">
                            <option value='1'>Punto de Venta 1</option>
                            <option value='2'>Punto de Venta 2</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Punto de Venta Destino</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaShop className="iconSize" />
                        </span>
                        <select className="form-select">
                            <option value='1'>Punto de Venta 1</option>
                            <option value='2'>Punto de Venta 2</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Fecha</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className='form-control'
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-0 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de los productos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center">
                                <div className="col-md-2 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Código del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Descripción del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Existencia</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxesStacked className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Existencia del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaSortNumericDownAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Cantidad del Producto"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <hr />
                                    <button className="btn btn-success">Agregar <FaCirclePlus className="iconSize" /></button>
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
                                                    <th>Descripción</th>
                                                    <th>Cantidad</th>
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
                        <div className="card-footer">
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
                    </div>
                </div>
            </div>
        </>

    )
}
