import { FaCoins, FaSalesforce } from "react-icons/fa"
import { FaCirclePlus } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const RatesBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Tarifa</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSalesforce className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Monto de Tarifa"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Descripcion de Tarifa"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            name="tipoPrecio"
                            className="form-select"

                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Colon</option>
                            <option value="1">Dolar</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-success">Agregar <FaCirclePlus className="iconSize" /></button>
                </div>
            </div>

            <div className="row mb-0 text-center" >
                <div className="col-md-12 mb-0">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>

                                    <th>Tarifa</th>
                                    <th>Descripción</th>
                                    <th>Moneda</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
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
