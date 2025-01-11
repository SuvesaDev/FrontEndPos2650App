import React from "react";
import { FaCalendar, FaCalendarDay, FaCashRegister, FaCoins, FaFilePdf, FaFilter, FaSalesforce, FaSearch, FaTable, FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
export const ReportsVentas = () => {
    const { disableInputsUser } = useSelector((state) => state.reports);
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h2>
                        Búsqueda <FaSearch className="iconSizeBtn" />
                    </h2>
                </div>
                <div className="col-md-3 mb-3">
                    <h5>Fecha Desde</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            name="fechaDesde"
                            className="form-control"
                            disabled={disableInputsUser}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha Hasta</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendarDay className="iconSize" />
                        </span>
                        <input
                            type="date"
                            name="fechaHasta"
                            className="form-control"
                            disabled={disableInputsUser}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-primary" disabled={disableInputsUser}>Obtener Datos <FaTable className="iconSize" /> </button>
                </div>
            </div>
            <hr />
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h2>
                        Filtros <FaFilter className="iconSizeBtn" />
                    </h2>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            name="tipoMoneda"
                            className="form-select"
                            disabled={disableInputsUser}
                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Colones</option>
                            <option value="2">Dolares</option>
                        </select>
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Caja</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCashRegister className="iconSize" />
                        </span>
                        <select
                            name="nombreProveedor"
                            className="form-select"
                            disabled={disableInputsUser}
                        >
                            <option value="" selected disabled hidden>
                                {" "}
                                Seleccione...{" "}
                            </option>
                            <option value="1">Caja 1</option>
                            <option value="1">Caja 2</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-header inline-containerFinal">
                            <button type="button" className="btn btn-danger" disabled={disableInputsUser}>Exportar Datos <FaFilePdf className="iconSize" /></button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive-md tablaP">
                                <table
                                    className="table table-dark table-hover table-bordered text-md-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Fecha Venta</th>
                                            <th>Ventas Netas</th>
                                            <th>Costo de Venta</th>
                                            <th>Utilidad</th>
                                            <th>Monto Utilidad</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-secondary">
                                        <tr>
                                            <td>Test</td>
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
                </div>
            </div>
        </>
    );
}
