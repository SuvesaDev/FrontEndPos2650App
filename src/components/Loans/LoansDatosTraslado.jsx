import { FaCalendar, FaHashtag, FaLocationDot, FaMapLocation, FaMapLocationDot, FaTruckFast } from "react-icons/fa6"
import { TbNumber } from "react-icons/tb"

export const LoansDatosTraslado = () => {
    return (
        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-12 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos del Traslado</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-0">
                                <div className="col-md-3 mb-3">
                                    <h5>N° de Boleta</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Número de Boleta'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Boleta Proveedor</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Boleta del Proveedor'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Fecha</h5>
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
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-3 mb-3">
                                    <h5>Origen</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaLocationDot className="iconSize" />
                                        </span>
                                        <select className="form-select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Destino</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMapLocationDot className="iconSize" />
                                        </span>
                                        <select className="form-select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Transportista</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaTruckFast className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Nombre del Transportista'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Tipo</h5>
                                    <div className="inline-container">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioPrestan"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioPrestan">Me Prestan</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioPrestar"
                                                class="form-check-input checkP"
                                            />
                                            <h5 className="form-check-label" for="radioPrestar">Prestar</h5>
                                        </div>

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
