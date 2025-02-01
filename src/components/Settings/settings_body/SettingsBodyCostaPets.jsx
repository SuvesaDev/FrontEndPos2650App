import { useEffect } from "react";

import { FaPercentage } from "react-icons/fa"
import { MdCalculate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { 
    SetPorcentajeProntoPagoSettings, 
    startGetSettings, 
    startUpdatePorcentajePagoProntoSettings 
} from "../../../actions/settings";

export const SettingsBodyCostaPets = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.settings);
    const { porcentajeProntoPago } = state;

    useEffect(() => {
        
        dispatch( startGetSettings() );
    
        return () => {};
      }, []);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleActualizarPorcentaje = () => {
        dispatch( startUpdatePorcentajePagoProntoSettings(porcentajeProntoPago) );
    }

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-3 mb-3">
                    <h5>Porcentaje (%) Pronto Pago Clientes</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPercentage className="iconSize" />
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Pronto Pago Clientes"
                            value={porcentajeProntoPago}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetPorcentajeProntoPagoSettings)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="w-100 pt-4"></div>
                    <button
                        className="btn btn-primary"
                        onClick={ handleActualizarPorcentaje }
                    >
                        Actualizar Porcentaje <MdCalculate className="iconSize" />
                    </button>
                </div>

            </div>

        </>

    )
}
