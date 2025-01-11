import Modal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import { ConsultDepositsDepositsModalTable } from './ConsultDepositsDepositsModalTable';

import {
    CleanDepositoSeletedConsultDeposits,
    SetIsOpenDepositsModalConsultDeposits
} from '../../actions/ConsultDepositsAction';
import { FaBuildingColumns, FaCalendarDay, FaCashRegister, FaCircleXmark, FaHashtag, FaMoneyBill, FaPiggyBank, FaWallet } from 'react-icons/fa6';

Modal.setAppElement('#root');

export const ConsultDepositsDepositsModal = () => {


    const dispatch = useDispatch();
    const {
        isOpenDepositsModal,
        depositoSeleted
    } = useSelector(state => state.consultDeposits);

    const {
        idEmpresa,
        idBanco,
        idCuenta,
        numeroDeposito,
        fecha,
        montoDeposito,
        preDepositos
    } = depositoSeleted;

    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Cajero",
            accessor: "cajero",
        },
        {
            Header: "Depositante",
            accessor: "depositante",
        },
        {
            Header: "Monto",
            accessor: "monto",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenDepositsModalConsultDeposits(false));

        // Limpiar el estado
        dispatch(CleanDepositoSeletedConsultDeposits());

    }

    return (
        <>
            <div className="modal fade" id="modalDepositoFiltrado" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Detalle Depósito <FaMoneyBill className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-4 mb-3">
                                    <h5>Empresa</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaBuildingColumns className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            type='text'
                                            disabled={true}
                                            value={idEmpresa}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Banco</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaPiggyBank className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled={true}
                                            name='cedula'
                                            value={idBanco}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Cuenta</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWallet className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            type='text'
                                            disabled={true}
                                            value={idCuenta}
                                        />
                                    </div>
                                </div>



                                <div className="col-md-4 mb-3">
                                    <h5>Número Depósito</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            name='depositante'
                                            className='form-control'
                                            type='text'
                                            disabled={true}
                                            value={numeroDeposito}
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
                                    <h5>Total Depósito</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCashRegister className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            disabled
                                            value={
                                                new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(montoDeposito)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />                       
                            <div className='row mb-3 text-center'>
                                <ConsultDepositsDepositsModalTable columns={columns} data={preDepositos} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <FaCircleXmark className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
