
import { TbCircleLetterB, TbNotes } from "react-icons/tb";
import { FaCalendar, FaUpload } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaGears } from "react-icons/fa6";

export const TakeBody = () => {
    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-2 mb-3">
                    <h5>Proveedor</h5>
                    <div className="input-group">
                        <button className="btn btn-primary">
                            <TbCircleLetterB className="iconSize" />
                        </button>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre Proveedor"
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            name="codigoWO"
                            className="form-control"
                            placeholder="Descripción del Proveedor"
                        />
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
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-2 text-center" >

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Generar <RiAiGenerate className="iconSize" /></button>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Existencia Actual <FaBoxesStacked className="iconSize" /></button>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Cargar Pretoma <FaUpload className="iconSize" /></button>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <button className="btn btn-dark">Aplicar Ajustes <FaGears className="iconSize" /></button>
                </div>
            </div>
            <hr />
            <div className="row mb-0 text-center" >
                <div className="col-md-12 mb-0">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Existencia</th>
                                    <th>Toma</th>
                                    <th>Diferencia</th>
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
        </>

    )
}
