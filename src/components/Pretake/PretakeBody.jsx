

import { TbCircleLetterB, TbNotes } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { FaCalendar, FaBoxesStacked } from "react-icons/fa6";
import { ImSortNumbericDesc } from "react-icons/im";
import { IoAddCircle } from "react-icons/io5";

export const PretakeBody = () => {
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
                <div className="col-md-2 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código del Pedido"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción del Producto(s)"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Existencia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBoxesStacked className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Existencia del Producto(s)"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <h5>Cantidad</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <ImSortNumbericDesc className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad para Préstamo"
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <hr />
                    <button className="btn btn-success">Agregar <IoAddCircle className="iconSize" /></button>
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
                                    <th>Cantidad</th>
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
