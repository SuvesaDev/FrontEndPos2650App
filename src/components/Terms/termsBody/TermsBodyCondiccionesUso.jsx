import { FaSortNumericDownAlt } from "react-icons/fa"
import { FaCircleCheck, FaColonSign } from "react-icons/fa6"

export const TermsBodyCondiccionesUso = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Tipos de Facturas Permitidas</h5>
                    <div className="row mb-0 text-center">
                        <div className="col-md-6 mb-0">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkContado"
                                    name="checkContado"
                                    class="form-check-input checkP"
                                />
                                <h5 className="form-check-label" for="checkContado">Contado</h5>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-6 mb-0">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="checkPVE"
                                    name="checkPVE"
                                    class="form-check-input checkP"
                                />
                                <h5 className="form-check-label" for="checkPVE">PVE</h5>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkContado"
                            name="checkContado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checkContado">Exigir Nombre de Cliente</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Monto Maximo de la Factura</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaColonSign className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Monto Maximo de la Factura"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Cantidad Máxima por Cliente</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad Máxima por Cliente"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cantidad Máxima por Autorizar</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad Máxima por Autorizar"
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Cantidad Máxima por Retirar</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad Máxima por Retirar"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-success">Aceptar <FaCircleCheck className="iconSize" /></button>
                </div>
            </div>
        </>
    )
}
