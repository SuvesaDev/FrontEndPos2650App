import { FaHashtag, FaUser } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa6"
import { ImSortNumbericDesc } from "react-icons/im"
import { IoAddCircle } from "react-icons/io5"
import { TbNotes } from "react-icons/tb"

export const WarehouseOrdersBody = () => {
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-2 mb-3">
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

                <div className="col-md-2 mb-3">
                    <h5>Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="usuariosSWO"
                            className="form-control"
                            placeholder="Nombre de Usuario"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="codigoWO"
                            className="form-control"
                            placeholder="Código del Pedido"
                        />
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="codigoWO"
                            className="form-control"
                            placeholder="Descripción del Pedido"
                        />
                    </div>
                </div>

            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-2 mb-3"></div>
                <div className="col-md-2 mb-3">
                    <h5>Cantidad Solicitar</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <ImSortNumbericDesc className="iconSize" />
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones del Pedido"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <hr />
                    <button className="btn btn-success">Agregar <IoAddCircle className="iconSize" /></button>
                </div>
                <div className="col-md-2 mb-3"></div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Cod Artículo</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Observaciones</th>
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
