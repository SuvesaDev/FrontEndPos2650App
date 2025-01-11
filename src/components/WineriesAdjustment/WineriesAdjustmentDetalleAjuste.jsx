import { FaClinicMedical } from "react-icons/fa"
import { FaBoxesPacking, FaHashtag } from "react-icons/fa6"
import { BsSortNumericUp } from "react-icons/bs";
export const WineriesAdjustmentDetalleAjuste = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de Ajuste</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2 text-center">
                                <div className="col-md-2 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Código del Ajuste"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Bodega</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxesPacking className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre de la Bodega"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Veterinaria</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaClinicMedical className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre de la Veterinaria"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Tipo</h5>
                                    <div className="inline-container">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioEntrada"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioEntrada">Entrada</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioSalida"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioSalida">Salida</h5>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericUp className="iconSize" />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ingrese la Cantidad"
                                        />
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
