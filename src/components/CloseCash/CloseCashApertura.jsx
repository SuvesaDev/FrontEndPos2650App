import { FaSortNumericUp } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const CloseCashApertura = () => {

    const { cierreCaja } = useSelector(state => state.closeCash);

    const { numApertura, fechaApertura } = cierreCaja;

    return (

        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Apertura</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-6 mb-3">
                            <h5>Número de Apertura</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSortNumericUp className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número de Apertura"
                                    value={numApertura}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <h5>Fecha y Hora</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarDays className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Fecha y Hora de Cierre"
                                    name='FechaHoraCash'
                                    value={fechaApertura}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
