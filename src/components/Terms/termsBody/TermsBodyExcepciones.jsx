import { FaIdCard, FaUser } from "react-icons/fa"
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6"

export const TermsBodyExcepciones = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número de Cédula"
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de la Persona"
                        />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <hr />
                    <button className="btn btn-success espacio">Agregar <FaCirclePlus className="iconSize" /></button>
                    <button className="btn btn-danger espacio">Eliminar <FaCirclePlus className="iconSize" /></button>
                </div>
            </div>


            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="row mb-2 text-center">
                <div className="col-md-10 mb-2"></div>
                <div className="col-md-2 mb-2">
                    <hr />
                    <button className='btn btn-success espacio'>Aceptar <FaCircleCheck className='iconSize' /></button>
                </div>
            </div>
        </>

    )
}
