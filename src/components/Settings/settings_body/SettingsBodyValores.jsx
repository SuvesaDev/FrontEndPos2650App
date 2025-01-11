import { FaCashRegister, FaPercentage, FaPlusCircle } from "react-icons/fa"

export const SettingsBodyValores = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Impuesto Venta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercentage className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Impuesto de Venta"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Intereses</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPlusCircle className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Intereses"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Número Cajeros</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCashRegister className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de Cajeros"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Porcentaje Extranjeros</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercentage className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Porcentaje de Extranjeros"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="consecutivoUnico"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="consecutivoUnico">Consecutivo Unico</h5>
                    </div>
                    <hr />
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="consecutivoCredito"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="consecutivoCredito">Consecutivo Crédito</h5>
                    </div>
                    <hr />
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="consecutivoContado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="consecutivoContado">Consecutivo Contado</h5>
                    </div>
                    <hr />
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="consecutivoPVE"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="consecutivoPVE">Consecutivo PVE</h5>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="tallerCredito"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="tallerCredito">Taller Crédito</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="tallerContado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="tallerContado">Taller Contado</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="mascotasCredito"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="mascotasCredito">Mascotas Crédito</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="mascotasContado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="mascotasContado">Mascotas Contado</h5>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="activarRegalias"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="activarRegalias">Activar regalias</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="cambiaPrecioPersonalizado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="cambiaPrecioPersonalizado">Cambia Precio Personalizado</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="utilizarFacturaPersonalizada"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="utilizarFacturaPersonalizada">Utilizar Factura Personalizada</h5>
                    </div>
                    <hr />
                </div>

                <div className="col-md-3 mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="utilizarFacturaPersonalizada"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label textRed" for="utilizarFacturaPersonalizada">Se Puede Editar el Nombre en Facturas</h5>
                    </div>
                    <hr />
                </div>
            </div>
        </>

    )
}
