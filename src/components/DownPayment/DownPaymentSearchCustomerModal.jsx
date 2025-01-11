import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';

import { DownPaymentSearchCustomerModalTable } from './DownPaymentSearchCustomerModalTable';

import {
    CleanSearchCustomersModalDownPayment,
    SetCedulaSearchCustomersModalDownPayment,
    SetCheckCedulaSearchCustomersModalDownPayment,
    SetCheckNombreSearchCustomersModalDownPayment,
    SetIsOpenModalSearchCustomersDownPayment,
    SetNombreSearchCustomersModalDownPayment,
    startSearchCustomersDownPayment
} from '../../actions/DownPaymentAction';
import { FaUserAlt } from 'react-icons/fa';
import { FaIdCard, FaMagnifyingGlass, FaUser } from 'react-icons/fa6';

Modal.setAppElement('#root');

export const DownPaymentSearchCustomerModal = () => {


    const dispatch = useDispatch();
    const {
        isOpenModalSearchCustomers,
        checkCedulaSearchCustomersModal,
        checkNombreSearchCustomersModal,
        cedulaSearchCustomerModal,
        nombreSearchCustomerModal,
        customersSearchModal
    } = useSelector(state => state.downPayment);

    const columns = [
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Télefono",
            accessor: "telefono_01",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeCheckCedula = ({ target }) => {
        dispatch(SetCheckCedulaSearchCustomersModalDownPayment(target.checked));
        dispatch(SetCheckNombreSearchCustomersModalDownPayment(false));
    };

    const handleChangeCheckNombre = ({ target }) => {
        dispatch(SetCheckNombreSearchCustomersModalDownPayment(target.checked));
        dispatch(SetCheckCedulaSearchCustomersModalDownPayment(false));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if (checkCedulaSearchCustomersModal === true && checkNombreSearchCustomersModal === false) {

            if (cedulaSearchCustomerModal === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar Cédula de la persona para realizar la busqueda.',
                });
                return;
            }

            dispatch(startSearchCustomersDownPayment(1, cedulaSearchCustomerModal));

        } else if (checkNombreSearchCustomersModal === true && checkCedulaSearchCustomersModal === false) {

            if (nombreSearchCustomerModal === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar Nombre de la persona para realizar la busqueda.',
                });
                return;
            }

            dispatch(startSearchCustomersDownPayment(2, nombreSearchCustomerModal));
        }

    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenModalSearchCustomersDownPayment(false));

        // Limpiar el estado de busqueda
        dispatch(CleanSearchCustomersModalDownPayment());

    }

    return (
        <>
            <div className="modal fade" id="modalEntregarCuenta">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Cliente Entregar a Cuenta <FaUserAlt className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center">
                                <div className="col-md-4 mb-2">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id='checkcedulaModalSearchCustomerDownPayment'
                                            type='checkbox'
                                            name='checkCedulaSearchCustomersModal'
                                            checked={checkCedulaSearchCustomersModal}
                                            onChange={e => handleChangeCheckCedula(e)}
                                        />
                                        <h5 className="form-check-label" for="checkcedulaModalSearchCustomerDownPayment">Cédula</h5>
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className="form-control"
                                            name="cedula"
                                            placeholder='Cédula del Cliente'
                                            disabled={!checkCedulaSearchCustomersModal}
                                            value={cedulaSearchCustomerModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaSearchCustomersModalDownPayment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id='checknombreModalSearchCustomerDownPayment'
                                            type='checkbox'
                                            name='checkNombreSearchCustomersModal'
                                            checked={checkNombreSearchCustomersModal}
                                            onChange={e => handleChangeCheckNombre(e)}
                                        />
                                        <h5 className="form-check-label" for="checknombreModalSearchCustomerDownPayment">Nombre</h5>
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className="form-control"
                                            placeholder='Nombre del Cliente'
                                            autoFocus
                                            disabled={!checkNombreSearchCustomersModal}
                                            value={nombreSearchCustomerModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetNombreSearchCustomersModalDownPayment)}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-4 mb-3'>
                                    <hr />
                                    <form onSubmit={handleSearch}>
                                        <button type='submit' className='btn btn-primary'>Buscar <FaMagnifyingGlass className='iconSize' /> </button>
                                    </form>
                                </div>
                            </div>

                            <div className='row mb-2 text-center'>
                                <div className='col-md-12 mb-2'>
                                    <DownPaymentSearchCustomerModalTable columns={columns} data={customersSearchModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
