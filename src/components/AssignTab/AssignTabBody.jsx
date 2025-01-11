import { FaCalendar, FaEnvelope, FaFax, FaHashtag, FaPhoneAlt, FaUser } from "react-icons/fa"
import { FaCirclePlus, FaLocationDot } from "react-icons/fa6"
import { MdPriceChange } from "react-icons/md"

export const AssignTabBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Usuario</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <select
                            name="tipoPrecio"
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Usuario 1</option>
                            <option value="1">Usuario 2</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Desde</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Hasta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type='date'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Mostrador</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Nombre del Mostrador"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-success">Agregar <FaCirclePlus className="iconSize" /></button>
                </div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>

                                    <th>Usuario</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Mostrador</th>
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
