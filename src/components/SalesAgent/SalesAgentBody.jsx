import { FaEnvelope, FaIdCard, FaUser } from "react-icons/fa"
import { FaLocationDot, FaPhone } from "react-icons/fa6"

export const SalesAgentBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-8 mb-3">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <h5>Nombre</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Agente"
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Cédula</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaIdCard className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cédula del Agente"
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Teléfono</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPhone className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Teléfono del Agente"
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>E-Mail</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaEnvelope className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="E-Mail del Agente"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h5>Dirección</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLocationDot className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección del Agente"
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <br />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkActivo"
                                    class="form-check-input checkP"
                                />
                                <h5 className="form-check-label" for="checkActivo">Activo</h5>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-3 mb-3">
                            <br />
                            <button className="btn btn-dark">PD</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Listado</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive-md tablaP">
                                <table
                                    className="table table-dark table-hover table-bordered text-md-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-secondary">
                                        <tr>
                                            <td>ID</td>
                                            <td>Nombre</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>

    )
}
