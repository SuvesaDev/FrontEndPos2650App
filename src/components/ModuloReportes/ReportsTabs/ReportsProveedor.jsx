import React from "react";
import { FaCalendar, FaCalendarDay, FaCashRegister, FaCoins, FaFilePdf, FaFilter, FaSalesforce, FaSearch, FaTable, FaTruck } from "react-icons/fa";
import { FaBuildingNgo, FaIdCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
export const ReportsProveedores = () => {
    const { disableInputsUser } = useSelector((state) => state.reports);
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                    <h2>
                        Filtros <FaFilter className="iconSizeBtn" />
                    </h2>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            name="cedulaProve"
                            className="form-control"
                            disabled={disableInputsUser}
                            placeholder="Cédula del Proveedor"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuildingNgo className="iconSize" />
                        </span>
                        <input
                            name="nombreProve"
                            className="form-control"
                            disabled={disableInputsUser}
                            placeholder="Nombre del Proveedor"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-primary" disabled={disableInputsUser}>Obtener Datos <FaTable className="iconSize" /> </button>
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
                                            <th>Cédula</th>
                                            <th>Nombre</th>
                                            <th>Contacto</th>
                                            <th>Teléfono Contacto</th>
                                            <th>Teléfono 1</th>
                                            <th>Fax</th>
                                            <th>E-Mail</th>
                                            <th>Dirección</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-secondary">
                                        <tr>
                                            <td>Test</td>
                                            <td>Test</td>
                                            <td>Test</td>
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
