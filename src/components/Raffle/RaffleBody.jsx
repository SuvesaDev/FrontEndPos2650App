import { FaCalendar, FaColonSign } from "react-icons/fa6"
import { TbCircleMinus, TbCirclePlus, TbNotes } from "react-icons/tb"

export const RaffleBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción de la Rifa"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha Inicio</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className="form-control"
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Fecha Fin</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Monto Mínimo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Monto Mínimo de la Rifa"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3"></div>
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkFinalizada"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checkFinalizada">Finalizada</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkAnulada"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checkAnulada">Anulada</h5>
                    </div>
                    <hr />
                </div>
                <div className="col-md-3 mb-3"></div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive-md tablaP">
                                <table
                                    className="table table-dark table-hover table-bordered text-md-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Proveedor</th>
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
                        <div className="card-footer">
                            <div className="btn-toolbar inline-containerFinal" role="toolbar">
                                <div className="btn-group mb-2">
                                    <button
                                        className={"btn btn-success espacio"}
                                    >
                                        Agregar Proveedor <TbCirclePlus className="iconSizeBtn" />
                                    </button>
                                </div>


                                <div className="btn-group mb-2">
                                    <button
                                        className={"btn btn-danger espacio"}
                                    >
                                        Quitar Proveedor <TbCircleMinus className="iconSizeBtn" />
                                    </button>
                                </div>
                                </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}
