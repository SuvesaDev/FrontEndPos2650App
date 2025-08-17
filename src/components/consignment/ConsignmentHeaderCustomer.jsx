import { useDispatch, useSelector } from 'react-redux';

import { SiHappycow } from 'react-icons/si';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaIdCard } from "react-icons/fa6";
import { TbListNumbers, TbNotes } from 'react-icons/tb';

import { 
    Setcedula_UsuarioConsignment, 
    SetidTipoClienteConsignment,
    Setnombre_ClienteConsignment,
    SetobservacionesConsignment,
    SetOpenSearchCustomerConsignment,
    startSearchCustomerConsignment
} from '../../actions/ConsignmentAction';

import { BillingAddCustomerModal } from '../Billing/BillingAddCustomerModal';
import { BillingEditCustomerModal } from '../Billing/BillingEditCustomerModal';
import { BillingMAGCustomerModal } from '../Billing/BillingMAGCustomerModal';
import { CustomerSearchModal } from '../customers/CustomerSearchModal';

export const ConsignmentHeaderCustomer = () => {

    const dispatch = useDispatch();

    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const { 
        disableInputsHeader,
        hasCustomerBilling,
        factura
    } = useSelector(state => state.consignment);

    const { 
        cedula_Usuario,
        idTipoCliente,
        nombre_Cliente,
        observaciones,
        Cod_Moneda
    } = factura.encabezado;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    // const handleAddUserClick = () => {

    //     if (billings[numberScreen] === undefined) return;

    //     if (!billings[numberScreen].hasCustomerBilling) {
    //         dispatch(SetIdTipoClienteClienteFacturacionBilling({ value: 2, number: numberScreen }))
    //         dispatch(OpenModalAddCustomer({ number: numberScreen }));
    //     }

    // }

    // const handleEditUserClick = () => {

    //     if (billings[numberScreen] === undefined) return;

    //     if (billings[numberScreen].hasCustomerBilling) {
    //         dispatch(OpenModalEditCustomer({ number: numberScreen }));
    //     }
    // }

    // const handleMAGUserClick = () => {

    //     if (billings[numberScreen] === undefined) return;

    //     if (billings[numberScreen].hasCustomerBilling) {
    //         dispatch(OpenModalMAGCustomer({ number: numberScreen }));
    //         dispatch(startSearchCustomerMAG(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
    //     }
    // }

    const handleSearchClientBilling = (e) => {

        if (cedula_Usuario !== '') {

            e.preventDefault();

            // dispatch(SetCedulaBuscarBilling({ value: billings[numberScreen].factura.encabezado.cedula_Usuario, number: numberScreen }));
            dispatch(startSearchCustomerConsignment(cedula_Usuario, (Cod_Moneda != '') ? true : false) );
        }else{
            dispatch( SetOpenSearchCustomerConsignment( true ));
        }

    }

    const handleClickDown = (e) => {

        if (e.key === 'Enter') {
            // dispatch(SetCedulaBuscarBilling({ value: e.target.value, number: numberScreen }));
            dispatch( startSearchCustomerConsignment(e.target.value, (Cod_Moneda != '') ? true : false));
        }
    }

    return (

        <>
            <div className="row mb-2">

                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            name="cedula_Usuario"
                            type='number'
                            min="0"
                            className='form-control'
                            placeholder='Cédula del Cliente'
                            disabled={disableInputsHeader}
                            value={cedula_Usuario}
                            onKeyDown={handleClickDown}
                            onChange={e => handleInputChangeWithDispatch(e, Setcedula_UsuarioConsignment)}

                        />
                        <button
                            type="button"
                            className={(disableInputsHeader) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            onClick={handleSearchClientBilling}
                            data-bs-toggle={
                                (cedula_Usuario === '')
                                    ? "modal"
                                    : ''
                            }
                            data-bs-target={
                                (cedula_Usuario === '')
                                    ? "#modalBuscarClientes"
                                    : ''
                            }
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbListNumbers className="iconSize" />
                        </span>
                        <select
                            name="idTipoCliente"
                            className="form-select"
                            disabled={disableInputsHeader}
                            value={idTipoCliente}
                            onChange={e => handleInputChangeWithDispatch(e, SetidTipoClienteConsignment)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null && tiposIdentificacion.length > 0)
                                    ?   tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.codigoFe} value={tipoD.codigoFe}> {tipoD.descripcion} </option>
                                        })
                                    :   <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            name="nombre_Cliente"
                            autoComplete="off"
                            disabled={true}
                            value={nombre_Cliente}
                            onChange={e => handleInputChangeWithDispatch(e, Setnombre_ClienteConsignment)}
                            readOnly
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <div className="inline-container" role="toolbar">

                        <div className="btn-group mb-2">
                            <button
                                className={
                                    (hasCustomerBilling) 
                                        ? 'btn btn-dark' 
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsultaMAG"

                            >
                                <SiHappycow className="iconSize" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <div className="row mb-2">

                <div className="col-md-6 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones Extra"
                            name='observaciones'
                            autoComplete='off'
                            disabled={disableInputsHeader}
                            value={observaciones}
                            onChange={e => handleInputChangeWithDispatch(e, SetobservacionesConsignment)}

                        />
                    </div>
                </div>

            </div>

            <BillingAddCustomerModal />

            <BillingEditCustomerModal />

            <BillingMAGCustomerModal />

            <CustomerSearchModal />

        </>
    )
}