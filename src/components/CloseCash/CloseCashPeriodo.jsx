import { useDispatch, useSelector } from "react-redux";

import {
    SetIsOpenModalSeletedAperturaCloseCash,
    startGetAllAperturasSinCerrarCloseCash
} from "../../actions/CloseCashAction";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaCalendar, FaUserAlt } from "react-icons/fa";

export const CloseCashPeriodo = () => {

    const dispatch = useDispatch();

    const {
        disableInputs,
        aperturasSinCerrar,
        fechaCierre,
        cierreCaja
    } = useSelector(state => state.closeCash);

    const { nombre, codigoCajero } = cierreCaja;

    const handleClickF1 = (e) => {

        e.preventDefault();

        if (!disableInputs) {

            if (aperturasSinCerrar.length === 0) {
                dispatch(startGetAllAperturasSinCerrarCloseCash());
            }
            dispatch(SetIsOpenModalSeletedAperturaCloseCash(true));
        }

    }

    return (

        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <h3>Periodo</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-3 mb-3">
                            <h5>Código Cajero</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPersonCircleCheck className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Código del Cajero"
                                    name='codigoCajeroCash'
                                    value={codigoCajero}
                                    disabled={disableInputs}
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Nombre</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUserAlt className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Cajero"
                                    value={nombre}
                                    disabled={disableInputs}
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5>Fecha Cierre</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendar className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Fecha de Cierre"
                                    value={fechaCierre}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="col-md-1 mb-3">
                            <hr />
                            <button
                                className="btn btn-dark"
                                disabled={disableInputs}
                                data-bs-toggle="modal"
                                data-bs-target="#modalAperturaSinCerrar"
                                onClick={handleClickF1}
                            >
                                F1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
