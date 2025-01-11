import { FaExchangeAlt, FaHashtag, FaSearch } from 'react-icons/fa';
import { GrPersonalComputer } from "react-icons/gr";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { AiOutlineFieldNumber } from "react-icons/ai";

export const TaxClaimBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-2 mb-3">
                    <h5>Código</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Código de PreToma'
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Cantidad Contada</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BsSortNumericDownAlt className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Cantidad Total Contada'
                        />
                    </div>
                </div>


                <div className="col-md-3 mb-3">
                    <h5>Cantidad Sistema</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <GrPersonalComputer className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Cantidad Total Sistema'
                        />
                    </div>
                </div>


                <div className="col-md-2 mb-3">
                    <h5>Diferencia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaExchangeAlt className="iconSize" />
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Diferencia Total'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-3">
                    <hr />
                    <button className="btn btn-success">Contar <AiOutlineFieldNumber className="iconSize" /></button>
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
                                    <th>Código Artículo</th>
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
