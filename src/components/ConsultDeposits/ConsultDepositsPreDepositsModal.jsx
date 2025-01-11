import Modal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import {
    CleanPreDepositoSeletedConsultDeposits,
    SetIsOpenPreDepositsModalConsultPreDeposits
} from '../../actions/ConsultDepositsAction';
import { FaCalendarDay, FaCashRegister, FaCircleXmark, FaIdCard, FaMoneyBill, FaUser, FaUserCheck, FaUserTie } from 'react-icons/fa6';
import { FaSortNumericDownAlt } from 'react-icons/fa';
import { TbNotes } from 'react-icons/tb';

Modal.setAppElement('#root');

export const ConsultDepositsPreDepositsModal = () => {


    const dispatch = useDispatch();
    const {
        isOpenPreDepositsModal,
        preDepositoSeleted,
        cajeros
    } = useSelector(state => state.consultDeposits);

    const {
        cajero,
        cedula,
        monto,
        depositante,
        fecha,
        observaciones
    } = preDepositoSeleted;

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenPreDepositsModalConsultPreDeposits(false));

        // Limpiar el estado
        dispatch(CleanPreDepositoSeletedConsultDeposits());

    }

    return (

        <>
            <div className="modal fade" id="modalPreDepositoFiltrado" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Detalle Pre Depósito <FaMoneyBill className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-3 mb-3">
                                    <h5>Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUserCheck className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            placeholder='Nombre del Cajero'
                                            type='text'
                                            disabled={true}
                                            name='cajero'
                                            value={cajero}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Cédula Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Cédula del Cajero'
                                            disabled={true}
                                            name='cedula'
                                            value={cedula}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre Cajero</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            placeholder='Nombre del Cajero'
                                            type='text'
                                            disabled={true}
                                            name='cajero'
                                            value={cajero}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-3 mb-3">
                                    <h5>Monto</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCashRegister className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(monto)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Depositante</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUserTie className="iconSize" />
                                        </span>
                                        <input
                                            name='depositante'
                                            className='form-control'
                                            placeholder='Nombre del Depositante'
                                            type='text'
                                            disabled={true}
                                            value={depositante}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-4 mb-3">
                                    <h5>Fecha</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            name='fecha'
                                            type='date'
                                            disabled={true}
                                            value={fecha.split('T')[0]}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            className="form-control"
                                            name='observaciones'
                                            rows="4"
                                            cols="50"
                                            disabled={true}
                                            value={observaciones}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <FaCircleXmark className='iconSize'/> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
