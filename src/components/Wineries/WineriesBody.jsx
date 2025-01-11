import { FaCoins, FaExchangeAlt, FaEye, FaHashtag, FaListOl, FaWallet } from "react-icons/fa"
import { FaCirclePlus, FaHouseChimney, FaSignsPost } from "react-icons/fa6"

export const WineriesBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-6 mb-3">
                    <h5>Nombre de la Casa Consignante o Bodega</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHouseChimney className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Nombre de la Casa Consignante o Bodega"
                        />
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaEye className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            name="observaciones"
                        ></textarea>
                    </div>
                </div>
            </div>

          
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
