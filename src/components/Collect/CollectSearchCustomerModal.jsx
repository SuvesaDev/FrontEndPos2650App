import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
    CleanStateSearchCustomerModalCollect,
    SetAllCustomerResulCollect,
    SetCedulaSearchCustomerCollect,
    SetCustomerResulCollect,
    SetIsOpenModalSearchCustomerCollect,
    SetNombreSearchCustomerCollect
} from '../../actions/CollectAction';

import { CollectSearchCustomerModalTable } from './CollectSearchCustomerTable';
import { FaUserAlt } from 'react-icons/fa';
import { FaCircleXmark, FaIdCard, FaMagnifyingGlass, FaPerson, FaUser } from 'react-icons/fa6';
import { RiUserSearchFill } from 'react-icons/ri';

export const CollectSearchCustomerModal = () => {

    const dispatch = useDispatch();

    const {
        isOpenModalSearchCustomer,
        searchCustomer
    } = useSelector(state => state.collect);

    const {
        cedula,
        nombre,
        customersResul,
        allCustomer
    } = searchCustomer;

    const columns = [
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        }
    ];

    const [cedulaInput, setCedulaInput] = useState('');
    const [nombreInput, setNombreInput] = useState('');
    const [filteredData, setFilteredData] = useState(customersResul);


    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        let customers = allCustomer;

        if (cedula === '' && nombre === '') {
            dispatch(SetCustomerResulCollect(customers));
        } else {

            if (cedula != null && (nombre == null || nombre === '')) {
                customers = customers.filter(cus => cus.cedula === cedula);
            } else if (nombre != null && (cedula == null || cedula === '')) {
                customers = customers.filter(cus => cus.nombre.toUpperCase().includes(nombre.toUpperCase()));
            } else {
                customers = customers.filter(cus => cus.nombre.toUpperCase.includes(nombre.toUpperCase()) || customer.cedula === cedula);
            }

            dispatch(SetCustomerResulCollect((customers !== undefined) ? customers : []));
        }
    }

    const closeModal = () => {

        // Se cierre el modal
        dispatch(SetIsOpenModalSearchCustomerCollect(false));

        // Se limpia el estado
        dispatch(CleanStateSearchCustomerModalCollect());
    }

    const handleCedulaChange = (e) => {
        const inputValue = e.target.value;
        setCedulaInput(inputValue);
        filterData(inputValue, nombreInput);
    };

    const handleNombreChange = (e) => {
        const inputValue = e.target.value;
        setNombreInput(inputValue);
        filterData(cedulaInput, inputValue);
    };

    const filterData = (cedula, nombre) => {
        const filteredResults = customersResul.filter((customer) => {
          const cedulaMatch = cedula !== '' ? customer.cedula.toLowerCase().includes(cedula.toLowerCase()) : true;
          const nombreMatch = nombre !== '' ? customer.nombre.toLowerCase().includes(nombre.toLowerCase()) : true;
          return cedulaMatch && nombreMatch;
        });
        setFilteredData(filteredResults);
      };

    return (

        <>
            <div className="modal fade" id="modalBuscarClientesD" tabindex="-1">
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
                            <div className="row mb-2 text-center" >
                                <div className="col-md-6 mb-3">
                                    <h5>Cédula</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaIdCard className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            placeholder='Buscar por cédula de cliente...'
                                            name="cedula"
                                            type='number'
                                            value={cedulaInput}
                                            onChange={handleCedulaChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            className='form-control'
                                            placeholder='Buscar por nombre de cliente...'
                                            name="nombre"
                                            autoFocus
                                            value={nombreInput}
                                            onChange={handleNombreChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className='row mb-3 text-center'>
                                <CollectSearchCustomerModalTable columns={columns} data={filteredData.length > 0 ? filteredData : customersResul} />
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
