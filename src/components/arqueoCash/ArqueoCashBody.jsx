import { useDispatch, useSelector } from 'react-redux';

import { ArqueoCashBodyDesgloceEfectivo } from "./ArqueoCashBodyDesgloceEfectivo"
import { ArqueoCashBodyTarjetas } from "./ArqueoCashBodyTarjetas"
import { ArqueoCashBodyTotales } from "./ArqueoCashBodyTotales"
import { ArqueoCashBodyDetalleOperaciones } from './ArqueoCashBodyDetalleOperaciones';
import { TbNotes } from "react-icons/tb";
import { FaExchangeAlt } from 'react-icons/fa';
import { FaPersonCircleCheck } from 'react-icons/fa6';

import { 
    SetIsOpenModalSeletedAperturaArqueoCash, 
    SetObservacionesArqueoCash, 
    startGetAllAperturasSinArqueoCash
} from '../../actions/arqueocashAction';

export const ArqueoCashBody = () => {

    const dispatch = useDispatch();

    const { 
        arqueo, 
        isEditArqueoCash, 
        disableInputs,
        aperturasSinArqueo,
        isAdminUser
    } = useSelector(state => state.ArqueCash);

    const { 
        Observaciones, 
        Cajero, 
        Anulado 
    } = arqueo.encabezado;

    const handleChangeObservaciones = ({ target }) => {
        dispatch(SetObservacionesArqueoCash(target.value));
    }

    const handleSearchApertura = (e) => {

        if( !disableInputs && isAdminUser ) {
            e.preventDefault();

            if( aperturasSinArqueo.length === 0 ) {
                dispatch( startGetAllAperturasSinArqueoCash() );
            }

            dispatch( SetIsOpenModalSeletedAperturaArqueoCash( true ) );
        }
    }

    return (
        <>
            <div className='row'>
                <div className="col-md-6 mb-3">
                    <ArqueoCashBodyDesgloceEfectivo />
                </div>

                <div className="col-md-6 mb-3">
                    <ArqueoCashBodyTarjetas />
                </div>

                <div className="col-md-8 mb-3">
                    <ArqueoCashBodyDetalleOperaciones />
                    <hr />
                    <div className="col-md-12 mb-2">
                        <h5>Observaciones</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <TbNotes className="iconSize" />
                            </span>
                            <textarea
                                class="form-control"
                                rows="1"
                                name="observaciones"
                                disabled={(disableInputs) ? disableInputs : isEditArqueoCash}
                                value={Observaciones}
                                onChange={e => handleChangeObservaciones(e)}
                            ></textarea>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        {/* <div className="col-md-5 mb-2">
                            <h5>Diferencia</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaExchangeAlt className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled={disableInputs}
                                />
                            </div>
                        </div> */}


                        <div className="col-md-12 mb-2">
                            <h5>Cajero</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPersonCircleCheck className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled={true}
                                    value={Cajero}
                                />
                            </div>
                        </div>

                        {/* <div className="col-md-2 mb-2">
                            <hr />
                            <button
                                className={
                                    (disableInputs)
                                        ? 'btn btn-dark disabled'
                                        : (isAdminUser)
                                            ? 'btn btn-dark'
                                            : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalAperturaSinArqueo"
                               onClick={handleSearchApertura} 
                            >
                                F1
                            </button>
                        </div> */}
                    </div>
                    <hr />
                </div>

                <div className="col-md-4 mb-3">
                    <ArqueoCashBodyTotales />
                </div>
            </div>
        </>

    )
}
