import { BsSortNumericDownAlt } from "react-icons/bs"
import { FaPercentage } from "react-icons/fa"
import { FaColonSign, FaWallet } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const BillsBodyDetalle = () => {
    return (
        <>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Detalle</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericDownAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Cantidad del Gasto'
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
                                            placeholder='Descripción del Gasto'
                                        />
                                    </div>
                                </div>


                                <div className="col-md-3 mb-3">
                                    <h5>Precio</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Precio por Unidad'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Impuesto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Precio por Unidad'
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-3 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Deescuento Total'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Cuenta Contable</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWallet className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Número de Cuenta'
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
                                            type='text'
                                            className='form-control'
                                            placeholder='Descripción de Cuenta'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <hr />
                                <div className="table-responsive-md tablaP">
                                    <table
                                        className="table table-dark table-hover table-bordered text-md-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Cantidad</th>
                                                <th>Descripción</th>
                                                <th>Precio Unitario</th>
                                                <th>% Descuento</th>
                                                <th>% IV</th>
                                                <th>Sub Total</th>
                                                <th>Cuenta Contable</th>
                                                <th>Descripción</th>
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

                        <div className="card-footer bg-primary">
                            <div className='row'>

                                <div className="col-md-3 mb-3">
                                    <h5 className="text-white">Sub Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Final'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5 className="text-white">Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descuento Final'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5 className="text-white">Impuestos</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Impuesto Final'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5 className="text-white">Total</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Total Final'
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
