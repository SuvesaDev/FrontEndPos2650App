import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';
import { CustomerSearchTable } from './CustomerSearchTable';

import {
    ActiveButtonNewCustomers,
    ActiveButtonRemoveCustomers,
    ActiveButtonSaveCustomers,
    ActiveButtonSearchCustomers,
    CleanSearchCustomers,
    CloseSearchModalCustomers,
    DisableInputsCustomers,
    startSearchCustomer
} from '../../actions/customers';

import { openSearchCustomerModalDocumentsEmited } from '../../actions/documentsEmitedAction';
import { SetOpenModalSearchCustomerConsultAlbaranes, SetIndexCustomerSeletedTableConsultAlbaranes } from '../../actions/consultAlbaranesAction';
import { FaUserSlash } from 'react-icons/fa';
import { FaIdCard, FaMagnifyingGlass, FaUser } from 'react-icons/fa6';
import { RiUserSearchFill } from 'react-icons/ri';


Modal.setAppElement('#root');

export const CustomerSearchModal = () => {

    const defaultData = {
        cedula: null,
        nombre: null
    };

    const dispatch = useDispatch();
    const { searchCustomers, openSearchModal } = useSelector(state => state.customers);
    const { openSearchCustomerModalDE } = useSelector(state => state.documentsEmited);
    const { openModalSearchCustomerConsultAlbaranes } = useSelector(state => state.consultAlbaranes);

    const [{ cedula, nombre }, handleInputChange] = useForm(defaultData);

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
            accessor: "telefono",
        }
    ];

    const handleSearch = async (e) => {

        e.preventDefault();

        if ((cedula === null && nombre === null) || (cedula === undefined && nombre === undefined) || cedula === '' && nombre === ''
            || (cedula === '' && nombre === null) || (cedula === null && nombre === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se debe ingresar Cédula o Nombre de la persona para realizar la busqueda.',
            });
        } else {

            dispatch( startSearchCustomer( { cedula, nombre } ) );
            // if (cedula != null && (nombre == null || nombre === '')) {
            //     dispatch(startSearchCustomer(cedula, null, 'cedula'));
            // } else if (nombre != null && (cedula == null || cedula === '')) {
            //     dispatch(startSearchCustomer(nombre, null, 'nombre'));
            // } else {
            //     dispatch(startSearchCustomer(cedula, nombre, 'filtro'));
            // }
        }
    }

    return (
        <>
            <div className="modal fade" id="modalBuscarClientes" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Cliente <RiUserSearchFill className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSearch}>
                                <div className="row mb-2 text-center">
                                    <div className="col-md-4 mb-3">
                                        <h5>Cédula</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaIdCard className="iconSize" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Cédula del Cliente"
                                                name="cedula"
                                                value={cedula}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <h5>Nombre</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaUser className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Nombre del Cliente"
                                                name="nombre"
                                                autoFocus
                                                value={nombre}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <hr />
                                        <button type='submit' className='btn btn-primary'
                                        >
                                            Buscar <FaMagnifyingGlass className='iconSize' />
                                        </button>
                                    </div>

                                </div>

                                <div className='row mb-3'>
                                    <hr />
                                    <div className="col-md-12 mb-3">
                                        <CustomerSearchTable columns={columns} data={searchCustomers} />
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
