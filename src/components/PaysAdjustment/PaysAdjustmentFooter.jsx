import { FaExchangeAlt, FaMoneyBill } from "react-icons/fa"
import { FaColonSign, FaListCheck } from "react-icons/fa6"
import { TbNotes } from "react-icons/tb"

export const PaysAdjustmentFooter = () => {
    return (

        <>
            <div className="row mb-2 text-center">
                <div className="col-md-2 mb-2">
                    <h5>Tipo Cambio</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaExchangeAlt className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tipo de Cambio'
                        />
                    </div>
                </div>

                <div className="col-md-2 mb-2">
                    <h5>Tipo Nota</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaListCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tipo de Nota'
                        />
                    </div>
                </div>
                <div className="col-md-8 mb-2">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Saldos de la cuenta</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb- text-center">
                                <div className="col-md-4 mb-2">
                                    <h5>Saldo Anterior</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Total Saldo Anterior"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <h5>Saldo Actual</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Total Saldo Actual"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Monto Recibido</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMoneyBill className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Total Monto de Recibo"
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
