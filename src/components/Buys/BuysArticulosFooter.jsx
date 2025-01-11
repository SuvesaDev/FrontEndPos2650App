import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";
import { FaColonSign } from 'react-icons/fa6';
import { FaPercentage, FaWallet } from 'react-icons/fa';

export const BuysArticulosFooter = () => {

    const dispatch = useDispatch();
    const { compras, disableInputs } = useSelector(state => state.compras);

    const {
        SubTotalGravado,
        SubTotalExento,
        Descuento,
        Impuesto,
        TotalFactura
    } = compras.encabezado;


    return (
        <>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-secondary cartaHMod2">
                            <div className='row'>
                                <div className="col-md-4 mb-0"></div>
                                <div className="col-md-4 mb-0">
                                    <h4>Totales de Compra</h4>
                                </div>
                                <div className="col-md-4 mb-0">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="checkCambiarImp"
                                            name="cambiarImp"
                                            disabled={disableInputs}
                                            class="form-check-input checkP"
                                        />
                                        <h5 className="form-check-label" for="checkCambiarImp">Cambiar Impuesto</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-1 mb-3"></div>
                                <div className="col-md-2 mb-3">
                                    <h5>Sub Total Excento</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="SubTotalExento"
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(SubTotalExento)
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Sub Total Gravado</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="SubTotalGravada"
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(SubTotalGravado)
                                            }
                                            disabled
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
                                            type="text"
                                            className="form-control"
                                            name="Descuento"
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Descuento)
                                            }
                                            disabled
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
                                            type="text"
                                            className="form-control"
                                            name="Impuesto"
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(Impuesto)
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <h5>Monto Factura</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWallet className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="TotalFactura"
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(TotalFactura)
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-1 mb-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
