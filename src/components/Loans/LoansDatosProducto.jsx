import { FaExchangeAlt, FaPlusCircle } from "react-icons/fa"
import { FaBoxArchive, FaColonSign, FaHashtag } from "react-icons/fa6"
import { TbNotes, TbNumber } from "react-icons/tb"
import { PiPlusCircleFill } from "react-icons/pi";

export const LoansDatosProducto = () => {
    return (
        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-12 mb-2'>
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de los Productos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-0">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Código del Prodcuto'
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
                                            type="text"
                                            className="form-control"
                                            placeholder='Descripción del Prodcuto'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Existencia Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumber className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Existencia Actual del Prodcuto'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Préstamos</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaExchangeAlt className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Cantidad de Préstamos'
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-0">
                                <div className="col-md-1 mb-3"></div>
                                <div className="col-md-3 mb-3">
                                    <h5>Precio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Precio del Prodcuto'
                                        />
                                    </div>
                                </div>


                                <div className="col-md-3 mb-3">
                                    <h5>Cantidad Préstamo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBoxArchive className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Cantidad para el Préstamo'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <hr />
                                    <button className="btn btn-success">Agregar <PiPlusCircleFill className="iconSize" /> </button>
                                </div>

                                <div className="col-md-1 mb-3"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>Ttest</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

    )
}
