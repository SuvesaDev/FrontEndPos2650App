import React from "react";
import { FaBarcode, FaCalendar, FaCalendarDay, FaCashRegister, FaCoins, FaFilePdf, FaFilter, FaSalesforce, FaSearch, FaTable, FaTruck } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export const ReportsInventarios = () => {
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
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBarcode className="iconSize" />
                        </span>
                        <input
                            name="descripcionArt"
                            className="form-control"
                            placeholder="Código del Articulo"
                            disabled={disableInputsUser}
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
                            name="descripcionArt"
                            className="form-control"
                            placeholder="Descripción del Articulo"
                            disabled={disableInputsUser}
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
                                            <th>Código Artículo</th>
                                            <th>Descripción</th>
                                            <th>Precio Base</th>
                                            <th>Costo Real</th>
                                            <th>Cantidad Vendida</th>
                                            <th>Cantidad Comprada</th>
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
