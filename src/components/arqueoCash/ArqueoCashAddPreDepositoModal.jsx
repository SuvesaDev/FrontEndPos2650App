import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import {
    SetCajeroPreDepositoArqueoCash,
    SetCedulaPreDepositoArqueoCash,
    SetCleanPreDepositoArqueoCash,
    SetDepositantePreDepositoArqueoCash,
    SetFechaPreDepositoArqueoCash,
    SetIsOpenModalAddPreDepositoArqueoCash,
    SetMontoPreDepositoArqueoCash,
    SetNumAperturaPreDepositoArqueoCash,
    SetObservacionesPreDepositoArqueoCash,
    startSavePreDepositsArqueoCash,
    startUpdateDepositoColones
} from '../../actions/arqueocashAction';
import { FaCalendar, FaCashRegister, FaIdCard, FaMoneyCheckDollar, FaPersonCircleCheck, FaUser } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';
import { PiPlusCircleFill } from 'react-icons/pi';
import { IoIosCloseCircle } from 'react-icons/io';

Modal.setAppElement('#root');

export const ArqueoCashAddPreDepositoModal = () => {

    const dispatch = useDispatch();
    const {
        cajeros,
        preDeposito,
        isOpenModalAddPreDeposito
    } = useSelector(state => state.ArqueCash);

    const {
        fecha,
        cajero,
        cedula,
        depositante,
        monto,
        observaciones,
        numApertura
    } = preDeposito;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeCajero = ({ target }) => {

        dispatch( SetCajeroPreDepositoArqueoCash(target.value) );

        const cajeroSeleted = cajeros.find( cajero => cajero.nombre === target.value );
        
        if( cajeroSeleted !== undefined ) {

            const { id, idApertura } = cajeroSeleted;
            
            dispatch( SetCedulaPreDepositoArqueoCash( id ) );
            dispatch( SetNumAperturaPreDepositoArqueoCash( idApertura ));
        }
    };

    const handleSavePreDeposito = async (e) => {

        e.preventDefault();

        const newPreDeposits = {
            id: 0,
            fecha: fecha,
            cajero,
            cedula: cedula.toString(),
            depositante,
            idEmpresa: 0,
            numApertura,
            idDeposito: 0,
            monto,
            observaciones
        }

        await dispatch(startSavePreDepositsArqueoCash(newPreDeposits));
        //await dispatch(startUpdateDepositoColones(numApertura));
  
    }

    return (
        <>
            <div className="modal fade" id="modalAgregarPreDeposito">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Agrega Pre-Depósito <FaMoneyCheckDollar className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-md-center">
                                <div className="col-md-4 mb-2">
                                    <h5>Nombre Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPersonCircleCheck className="iconSize" />
                                        </span>
                                        <select
                                            name='cajero'
                                            className="form-select"
                                            value={cajero}
                                            onChange={handleChangeCajero}
                                        >
                                              <option value={''} selected disabled hidden> Seleccione... </option>
                                    {
                                        ( cajeros.length !== 0)
                                            ?   cajeros.map( cajero => {
                                                    return <option key={cajero.id}  value={cajero.nombre}> { cajero.nombre } </option>
                                                })
                                            : <option value=''>No Cajeros</option>
                                    }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Cédula Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='cedula'
                                            disabled={true}
                                            value={cedula}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Nombre Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='cajero'
                                            disabled={true}
                                            value={cajero}
                                        />
                                    </div>
                                </div>


                            </div>

                            <div className="row mb-2 text-md-center">
                                <div className="col-md-4 mb-2">
                                    <h5>Monto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCashRegister className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            min="0"
                                            name='monto'
                                            className="form-control"
                                            value={monto}
                                            onChange={e => handleInputChangeWithDispatch(e, SetMontoPreDepositoArqueoCash)}
                                        />
                                        <input
                                            type='text'
                                            className="form-control"
                                            disabled
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(monto)
                                            }
                                            onChange={e => handleInputChangeWithDispatch(e, SetMontoPreDepositoArqueoCash)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Depositante</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            name='depositante'
                                            className="form-control"
                                            disabled={true}
                                            value={depositante}
                                            onChange={e => handleInputChangeWithDispatch(e, SetDepositantePreDepositoArqueoCash)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendar className="iconSize" />
                                        </span>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name='fecha'
                                            value={fecha}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaPreDepositoArqueoCash)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2 text-md-center">
                                <div className="col-md-12 mb-2">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="4"
                                            name="observaciones"
                                            value={observaciones}
                                            onChange={e => handleInputChangeWithDispatch(e, SetObservacionesPreDepositoArqueoCash)}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type='button'
                                className='btn btn-success'
                                onClick={handleSavePreDeposito}
                                data-bs-dismiss="modal"
                            >
                                Agregar <PiPlusCircleFill className="iconSize" />
                            </button>


                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}