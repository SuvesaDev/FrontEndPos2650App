import { FaEnvelope, FaFax, FaPhoneAlt } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdPriceChange } from "react-icons/md"

export const UsualCustomersBody = () => {
    return (

        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos Generales</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <h5>Teléfono</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPhoneAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Teléfono del Cliente"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Fax (es)</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaFax className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Fax del Cliente"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Tipo Precio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdPriceChange className="iconSize" />
                                        </span>
                                        <select
                                            name="tipo"
                                            className="form-select"
                                        >
                                            <option value="" selected disabled hidden>
                                                {" "}
                                                Seleccione...{" "}
                                            </option>
                                            <option value="normal1">normal1</option>
                                            <option value="normal2">normal2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <br />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="empresa"
                                            name="empresa"
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="empresa">Empresa</h5>
                                    </div>
                                    <hr />
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
                                            type='text'
                                            className='form-control'
                                            placeholder="Dirección del Cliente"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Correo Electrónico</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEnvelope className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder="Correo Electrónico del Cliente"
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
