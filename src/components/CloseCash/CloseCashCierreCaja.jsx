import { FaExchangeAlt, FaMoneyBill } from "react-icons/fa";
import { FaCashRegister, FaComputer, FaMoneyBillTransfer, FaMoneyBills, FaMoneyCheckDollar } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const CloseCashCierreCaja = () => {

    const { disableInputs, cierreCaja } = useSelector(state => state.closeCash);

    const {
        fondoCaja,
        devoluciones,
        totalSistema,
        diferenciaCaja,
        ventaContado,
        ventaCredito,
        totalCajero,
        montoAdepositar
    } = cierreCaja;

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Cierre Caja</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-6 mb-1">
                            <div className="col-md-12 mb-1">
                                <h5>Fondo Caja</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCashRegister className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Fondo de Caja"
                                        name='fondoCaja'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(fondoCaja)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Abonos</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCashRegister className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Abonos de Caja"
                                        name='abonosCash'
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Devoluciones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCashRegister className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Devoluciones de Caja"
                                        name='devoluciones'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(devoluciones)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Anulaciones</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCashRegister className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Anulaciones de Caja"
                                        name='anulacionesCash'
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Total Sistema</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaComputer className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total del Sistema"
                                        name='totalSistema'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(totalSistema)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Diferencial Caja</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBillTransfer  className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Diferencia de la Caja"
                                        name='diferenciaCaja'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(diferenciaCaja)
                                        }
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-1">

                            <div className="col-md-12 mb-1">
                                <h5>Ventas Contado</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBill className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total de Ventas de Contado"
                                        name='ventaContado'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(ventaContado)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Ventas Crédito</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBill className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total de Ventas de Crédito"
                                        name='ventaCredito'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(ventaCredito)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Entradas</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBill className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total de Entradas"
                                        name='entradasCash'
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Salidas</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBill className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total de Salidas"
                                        name='salidasCash'
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Total Cajero</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyCheckDollar className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Total de Cajero"
                                        name='totalCajero'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(totalCajero)
                                        }
                                        disabled={true}
                                    />
                                </div>
                                <hr />
                            </div>

                            <div className="col-md-12 mb-1">
                                <h5>Monto Depositar</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMoneyBills className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Monto Total a Depositar"
                                        name='montoAdepositar'
                                        value={
                                            new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(montoAdepositar)
                                        }
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
