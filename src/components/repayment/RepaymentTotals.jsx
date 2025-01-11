import { FaPercentage, FaWallet } from "react-icons/fa";
import { FaColonSign, FaTruckFast } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const RepaymentTotals = () => {

    const { devolucion } = useSelector(state => state.repayment);

    const {
        SubTotalExcento,
        SubTotalGravado,
        Descuento,
        Impuesto,
        Monto,
    } = devolucion.encabezado;

    return (
        <>
            <div className='card'>
                <div className="card-header bg-primary cartaHMod2">
                    <h4>Totales de Devolución</h4>
                </div>

                <div className='card-body'>
                    <div className="row text-center">
                        <div className="col-md-2 mb-3">
                            <h5>Sub. Gravado</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    placeholder="Sub Total Gravado"
                                    type='text'
                                    name='subGravadoDevoluciones'
                                    disabled={true}
                                    value={SubTotalGravado}
                                />
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h5>Sub. Exento</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaColonSign className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    placeholder="Sub Total Exento"
                                    type='text'
                                    name='subExentoDevoluciones'
                                    disabled={true}
                                    value={SubTotalExcento}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Transporte</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaTruckFast className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    type='text'
                                    name='TransporteDevoluciones'
                                    disabled={true}
                                    value={0}
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
                                    className="form-control"
                                    type='text'
                                    name='DescuentoDevoluciones'
                                    disabled={true}
                                    value={Descuento}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Imp. Venta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPercentage className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    type='text'
                                    name='impVentaDevoluciones'
                                    disabled={true}
                                    value={Impuesto}
                                />
                            </div>
                        </div>

                        
                        <div className="col-md-2 mb-3">
                            <h5>Total</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaWallet className="iconSize" />
                                </span>
                                <input
                                    className="form-control"
                                    type='text'
                                    name='totalDevoluciones'
                                    disabled={true}
                                    value={Monto}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
