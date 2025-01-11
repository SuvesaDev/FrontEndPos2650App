import { BsSortNumericDown } from "react-icons/bs"
import { FaCalendarDay, FaCoins, FaMoneyBill, FaPercentage, FaUser } from "react-icons/fa"
import { FaBuildingUn, FaColonSign, FaHashtag, FaTruckFast } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const PurchaseOrderBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Información del Proveedor</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Código del Proveedor'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre Proveedor</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingUn className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Nombre del Proveedor'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <h5>Forma de Pago</h5>
                                            <div className="inline-containerCenter">
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        id="radioContado"
                                                        class="form-check-input checkP"
                                                    />
                                                    <h5 className="form-check-label" for="radioContado">Contado</h5>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        id="radioCrédito"
                                                        class="form-check-input checkP"
                                                    />
                                                    <h5 className="form-check-label" for="radioCrédito">Crédito</h5>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <h5>Días</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaCalendarDay className="iconSize" />
                                                </span>
                                                <input
                                                    type='number'
                                                    className='form-control'
                                                    placeholder='Cantidad de Días'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Opciones de Orden</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <h5>Entrega</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
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
                                            type='number'
                                            className='form-control'
                                            placeholder='Nombre de Persona a Entregar'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            name='monedaPurchaseOrden'
                                            className="form-select">
                                            <option value="COLON">COLON</option>
                                            <option value="DOLAR">DOLAR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Información del Articulo</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Código del Artículo'
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
                                            placeholder='Descripción del Artículo'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Precio Unitario</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Precio del Artículo'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Fletes</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaTruckFast className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Fletes del Artículo'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <div className="col-md-2 mb-3">
                                    <h5>Otros</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Otras Anotaciones'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Costo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Costo Total'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Descuento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descuento Total'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Impuesto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPercentage className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Impuesto Total'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Cantidad</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericDown className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Cantidad Total'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>SubTotal</h5>
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
                            </div>

                            <div className="row mb-3 text-center">
                                <div className="col-md-3 mb-3"> </div>
                                <div className="col-md-6 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Observaciones Extras'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3"> </div>
                            </div>

                            <div className="row mb-3 text-center">
                                <hr />
                                <div className="table-responsive-md tablaP">
                                    <table
                                        className="table table-dark table-hover table-bordered text-md-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Código</th>
                                                <th>Descripción</th>
                                                <th>Precio Unitario</th>
                                                <th>Cantidad</th>
                                                <th>% IV</th>
                                                <th>% Descuento</th>
                                                <th>Gravado</th>
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
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-primary">
                            <div className='row'>
                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Sub. Gravado</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Gravado'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5 className="text-white">Sub. Exento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Sob-Total Exento'
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
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

                                <div className="col-md-2 mb-3">
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

                                <div className="col-md-2 mb-3">
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

                                <div className="col-md-2 mb-3">
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
