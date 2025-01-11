import { FaCalendar, FaHashtag, FaUser } from "react-icons/fa"
import { FaBoxesStacked } from "react-icons/fa6"

export const WineriesAdjustmentDatos = () => {
    return (

        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-4 mb-3">
                    <h5>Nombre de la Casa Consignante o Bodega</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBoxesStacked className="iconSize" />
                        </span>
                        <select className="form-select">
                            <option value="ABOPAC">ABOPAC</option>
                            <option value="ABOPAB">ABOPAB</option>
                            <option value="ABOPAF">ABOPAF</option>
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
                            name="fechaWO"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <br />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="checkAnulado"
                            class="form-check-input checkP"
                        />
                        <h5 className="form-check-label" for="checkAnulado">Anulado</h5>
                    </div>
                    <hr />
                </div>

            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-3 mb-3"></div>
                <div className="col-md-3 mb-3">
                    <h5>Cliente</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Cliente"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Referencia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Referencia de Bodega"
                        />
                    </div>
                </div>
                <div className="col-md-3 mb-3"></div>
            </div>

        </>

    )
}
