import { FaHashtag, FaUser } from "react-icons/fa"
import { FaCalendar, FaBoxesStacked } from "react-icons/fa6"
import { ImSortNumbericDesc } from "react-icons/im"
import { IoAddCircle } from "react-icons/io5"
import { TbNotes } from "react-icons/tb"
import { GrNotes } from "react-icons/gr";

export const RequestWineryBody = () => {
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-4 mb-3">
                    <h5>Fecha Solicitud</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            name="fechaWO"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="col-md-8 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="codigoWO"
                            className="form-control"
                            placeholder="Descripción de la Solicitud"
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de los productos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código del Pedido"
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
                                            type="text"
                                            className="form-control"
                                            placeholder="Descripción del Producto(s)"
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
                                            type="text"
                                            className="form-control"
                                            placeholder="Existencia del Producto(s)"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <ImSortNumbericDesc className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cantidad del Producto(s)"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <hr />
                                    <button className="btn btn-success">Agregar <IoAddCircle className="iconSize" /></button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3"></div>
                                <div className="col-md-4 mb-3">
                                    <h5>Nota</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <GrNotes className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Notas Extras"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3"></div>
                            </div>
                            <hr />
                            <div className="row mb-0 text-center" >
                                <div className="col-md-12 mb-0">
                                    <div className="table-responsive-md tablaP">
                                        <table
                                            className="table table-dark table-hover table-bordered text-md-center">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Código Articulo</th>
                                                    <th>Descripción</th>
                                                    <th>Cantidad</th>
                                                    <th>Entrada</th>
                                                    <th>Nota</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-secondary">
                                                <tr>
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
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
