import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';
import { DownPaymentSearchModalTable } from './DownPaymentSearchModalTable';

import {
    CleanSearchModalDownPayment,
    SetCedulaSearchModalDownPayment,
    SetCheckCedulaSearchModalDownPayment,
    SetCheckIdSearchModalDownPayment,
    SetCheckNombreSearchModalDownPayment,
    SetIdSearchModalDownPayment,
    SetIsOpenModalSearchDownPayment,
    SetNombreSearchModalDownPayment,
    startSearchDownPayment
} from '../../actions/DownPaymentAction';
import { FaMagnifyingGlass, FaMoneyBills } from 'react-icons/fa6';
import { FaHashtag, FaIdCard, FaUser } from 'react-icons/fa';

Modal.setAppElement('#root');

export const DownPaymentSearchModal = () => {


    const dispatch = useDispatch();
    const {
        isOpenModalSearch,
        checkIdSearchModal,
        checkCedulaSearchModal,
        checkNombreSearchModal,
        idSearchModal,
        cedulaSearchModal,
        nombreSearchModal,
        entregasSearchModal
    } = useSelector(state => state.downPayment);

    const columns = [
        {
            Header: "ID Entrega a Cuenta",
            accessor: "id",
        },
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeCheckId = ({ target }) => {
        dispatch(SetCheckIdSearchModalDownPayment(target.checked));
        dispatch(SetCheckCedulaSearchModalDownPayment(false));
        dispatch(SetCheckNombreSearchModalDownPayment(false));
    };

    const handleChangeCheckCedula = ({ target }) => {
        dispatch(SetCheckCedulaSearchModalDownPayment(target.checked));
        dispatch(SetCheckIdSearchModalDownPayment(false));
        dispatch(SetCheckNombreSearchModalDownPayment(false));
    };

    const handleChangeCheckNombre = ({ target }) => {
        dispatch(SetCheckNombreSearchModalDownPayment(target.checked));
        dispatch(SetCheckIdSearchModalDownPayment(false));
        dispatch(SetCheckCedulaSearchModalDownPayment(false));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if (checkIdSearchModal === true && checkCedulaSearchModal === false && checkNombreSearchModal === false) {

            if (idSearchModal === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar Id Entrega para realizar la busqueda.',
                });
                return;
            }

            dispatch(startSearchDownPayment({
                idEntregaCuenta: idSearchModal,
                cedula: null,
                nombre: null
            }));

        } else if (checkCedulaSearchModal === true && checkIdSearchModal === false && checkNombreSearchModal === false) {

            if (cedulaSearchModal === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar Cédula para realizar la busqueda.',
                });
                return;
            }

            dispatch(startSearchDownPayment({
                idEntregaCuenta: null,
                cedula: cedulaSearchModal,
                nombre: null
            }));

        } else if (checkNombreSearchModal === true && checkIdSearchModal === false && checkCedulaSearchModal === false) {

            if (nombreSearchModal === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar Nombre de la persona para realizar la busqueda.',
                });
                return;
            }

            dispatch(startSearchDownPayment({
                idEntregaCuenta: null,
                cedula: null,
                nombre: nombreSearchModal
            }));
        }

    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenModalSearchDownPayment(false));

        // Limpiar el estado de busqueda
        dispatch(CleanSearchModalDownPayment());

    }

    return (
        <>

            <div className="modal fade" id="modalBuscaEntregaCuentaGen">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Entregar a Cuenta <FaMoneyBills className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center">

                            <div className="col-md-3 mb-2">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id='checkIdModalSearchCustomerDownPayment'
                                            type='checkbox'
                                            name='checkIdSearchModal'
                                            checked={checkIdSearchModal}
                                            onChange={e => handleChangeCheckId(e)}
                                        />
                                        <h5 className="form-check-label" for="checkIdModalSearchCustomerDownPayment">Id Entrega</h5>
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            className="form-control"
                                            type='number'
                                            min={0}
                                            placeholder='0'
                                            name="idSearchModal"
                                            disabled={!checkIdSearchModal}
                                            value={idSearchModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetIdSearchModalDownPayment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id='checkcedulaModalSearchCustomerDownPayment'
                                            type='checkbox'
                                            name='checkCedulaSearchModal'
                                            checked={checkCedulaSearchModal}
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
                                            placeholder='Cédula del Cliente'
                                            name="cedulaSearchModal"
                                            disabled={!checkCedulaSearchModal}
                                            value={cedulaSearchModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaSearchModalDownPayment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id='checknombreModalSearchCustomerDownPayment'
                                            type='checkbox'
                                            name='checkNombreSearchModal'
                                            checked={checkNombreSearchModal}
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
                                            name="nombreSearchModal"
                                            autoFocus
                                            disabled={!checkNombreSearchModal}
                                            value={nombreSearchModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetNombreSearchModalDownPayment)}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3 mb-3'>
                                    <hr />
                                    <form onSubmit={handleSearch}>
                                        <button type='submit' className='btn btn-primary'>Buscar <FaMagnifyingGlass className='iconSize' /> </button>
                                    </form>
                                </div>
                            </div>

                            <div className='row mb-2 text-center'>
                                <div className='col-md-12 mb-2'>
                                    <DownPaymentSearchModalTable columns={columns} data={entregasSearchModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpenModalSearch}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className={'modal-searchDownPayment'}
                overlayClassName={'modal-fondo'}
            >
                <form className='modal_searchDownPayment-main' onSubmit={handleSearch}>

                    <div className='modal_searchDownPayment-title'>
                        <p id='lblTitleSearchCustomersDownPayment'>Buscar Entrega a Cuenta</p>
                        <p id='lblCloseSearchCustomersDownPayment' onClick={closeModal}>X</p>
                    </div>

                    <div className='modal_searchDownPayment-inputs'>

                        <div className='modal_searchDownPayment-inputs-id'>
                            <div className='modal_searchDownPayment-inputs-id-titles'>

                                <div className='modal_searchDownPayment-inputs-id-titles-check'>
                                    <input
                    
                                    />
                                </div>

                                <div className='modal_searchDownPayment-inputs-id-titles-label'>
                                    <p
                                        id='lblIdModalSearchCustomerDownPayment'
                                        for='checkIdModalSearchCustomerDownPayment'
                                    >
                                        Id Entrega
                                    </p>
                                </div>

                            </div>
                            <div className='input'>
                                <input
                             
                                />
                            </div>
                        </div>

                        <div className='modal_searchDownPayment-inputs-cedula'>
                            <div className='modal_searchDownPayment-inputs-cedula-titles'>

                                <div className='modal_searchDownPayment-inputs-cedula-titles-check'>
                                    <input

                                    />
                                </div>

                                <div className='modal_searchDownPayment-inputs-cedula-titles-label'>
                                    <p
                                        id='lblcedulaModalSearchCustomerDownPayment'
                                        for='checkcedulaModalSearchCustomerDownPayment'
                                    >
                                        Cédula
                                    </p>
                                </div>

                            </div>
                            <input
                                type='number'

                            />
                        </div>

                        <div className='modal_searchDownPayment-inputs-nombre'>
                            <div className='modal_searchDownPayment-inputs-nombre-titles'>

                                <div className='modal_searchDownPayment-inputs-nombre-titles-check'>
                                    <input
                           
                                    />
                                </div>

                                <div className='modal_searchDownPayment-inputs-nombre-titles-label'>
                                    <p
                                        id='lblNombreModalSearchCustomerDownPayment'
                                        for='checknombreModalSearchCustomerDownPayment'
                                    >
                                        Nombre del Cliente
                                    </p>
                                </div>

                            </div>

                            <input
                                type='text'

                            />
                        </div>

                        <div className='modal_searchDownPayment-inputs-btn'>
                            <button type='submit' id='btnSearchCustomerDownPayment'>Buscar</button>
                        </div>

                    </div>

                    <div className='modal_searchDownPayment-table'>
                    </div>

                </form>
            </Modal>

        </>

    )
}
