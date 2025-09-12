import Swal from "sweetalert2";
// import loadingImage from "../../assets/loading_snipiner.gif";
import { useDispatch, useSelector } from 'react-redux';

import { IoPeople } from "react-icons/io5";
import { FaSearch, FaUser } from 'react-icons/fa';
import { FaIdCard } from "react-icons/fa6";
import { TbListNumbers, TbNotes } from 'react-icons/tb';

// import { addTab } from '../../actions/tabs';
// import { 
//     Setcedula_UsuarioConsignment, 
//     SetidTipoClienteConsignment,
//     Setnombre_ClienteConsignment,
//     SetobservacionesConsignment,
//     SetOpenSearchCustomerConsignment,
//     startSearchCustomerConsignment
// } from '../../actions/ConsignmentAction';

// import { 
//     ActiveButtonNewCustomers,
//     ActiveButtonSaveCustomers,
//     ActiveButtonSearchCustomers, 
//     DisableInputsCustomers, 
//     SetCedulaCustomers, 
//     SetIsOpenFromConsignmentCustomers, 
//     SetStartOpeningCustomers
// } from '../../actions/customers';

// import { BillingEditCustomerModal } from '../Billing/BillingEditCustomerModal';
// import { BillingMAGCustomerModal } from '../Billing/BillingMAGCustomerModal';
// import { CustomerSearchModal } from '../customers/CustomerSearchModal';
// import { ConsignmentAddCustomerModal } from './ConsignmentAddCustomerModal';
// import { startGetAllAgentesVenta } from "../../actions/AgenteVentaAction";
// import { startGetAllProvincias } from "../../actions/ProvinciasAction";


export const FollowingConsignmentBodyDetailsHeaderCustomer = () => {

    // const dispatch = useDispatch();

    // const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);
    // const { agentesBilling } = useSelector((state) => state.agenteVentas);
    // const { provincias } = useSelector((state) => state.provincias);

    // const { 
    //     disableInputsHeader,
    //     hasCustomerBilling,
    //     factura
    // } = useSelector(state => state.consignment);

    // const { 
    //     cedula_Usuario,
    //     idTipoCliente,
    //     nombre_Cliente,
    //     observaciones,
    //     Cod_Moneda
    // } = factura.encabezado;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        // dispatch(action(target.value));
    };

    const handleSearchClientBilling = (e) => {

        // if (cedula_Usuario !== '') {

        //     e.preventDefault();
        //     dispatch(startSearchCustomerConsignment(cedula_Usuario, (Cod_Moneda != '') ? true : false) );

        // }else{
        //     dispatch( SetOpenSearchCustomerConsignment( true ));
        // }

    }

    const handleClickDown = (e) => {

        // if (e.key === 'Enter') {
        //     dispatch( startSearchCustomerConsignment(e.target.value, (Cod_Moneda != '') ? true : false));
        // }
    }

    const handleAddCustomer = async () => {

        // if(cedula_Usuario != '') {
        //     dispatch(SetCedulaCustomers(cedula_Usuario));
        // }

        // dispatch( addTab('Clientes', '/initial/customers') );
        // dispatch(ActiveButtonSearchCustomers(false));
        // dispatch(ActiveButtonSaveCustomers(true));
        // dispatch(ActiveButtonNewCustomers(false));
        // dispatch(DisableInputsCustomers(false));
        // dispatch(SetStartOpeningCustomers(true));
        // dispatch( SetIsOpenFromConsignmentCustomers(true));

        // await loadCatalogos();
    }

    const loadCatalogos = async (e) => {

        // //Mostrar el loading
        // Swal.fire({
        //   title: "Por favor, espere cargando catalogos",
        //   allowEscapeKey: false,
        //   allowOutsideClick: false,
        //   showConfirmButton: false,
        //   imageUrl: loadingImage,
        //   customClass: "alert-class-login",
        //   imageHeight: 100,
        // });
    
        // if (agentesBilling === null) {
        //   await dispatch(startGetAllAgentesVenta());
        // }
    
        // if (provincias.length === 0) {
        //   await dispatch(startGetAllProvincias());
        // }
    
        // //Quitar el loading
        // Swal.close();
      };

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
                            // disabled={disableInputsHeader}
                            // value={cedula_Usuario}
                            // onKeyDown={handleClickDown}
                            // onChange={e => handleInputChangeWithDispatch(e, Setcedula_UsuarioConsignment)}

                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            // className={(disableInputsHeader) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            // onClick={handleSearchClientBilling}
                            // data-bs-toggle={
                            //     (cedula_Usuario === '')
                            //         ? "modal"
                            //         : ''
                            // }
                            // data-bs-target={
                            //     (cedula_Usuario === '')
                            //         ? "#modalBuscarClientes"
                            //         : ''
                            // }
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
                            // disabled={disableInputsHeader}
                            // value={idTipoCliente}
                            // onChange={e => handleInputChangeWithDispatch(e, SetidTipoClienteConsignment)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {/* {
                                (tiposIdentificacion != null && tiposIdentificacion.length > 0)
                                    ?   tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.id} value={tipoD.id}> {tipoD.descripcion} </option>
                                        })
                                    :   <option value=''></option>
                            } */}
                        </select>
                    </div>
                </div>

                <div className="col-md-5 mb-3">
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
                            // value={nombre_Cliente}
                            // onChange={e => handleInputChangeWithDispatch(e, Setnombre_ClienteConsignment)}
                            readOnly
                        />
                    </div>
                </div>

                <div className="col-md-1 mb-3">
                    <hr />
                    <div className="inline-container" role="toolbar">
                        <div className="btn-group mb-2">
                            <button
                                className="btn btn-primary"
                                // className={
                                //     (disableInputsHeader)
                                //         ? 'btn btn-primary disabled'
                                //         : 'btn btn-primary'
                                // }
                                // onClick={handleAddCustomer}
                            >
                                <IoPeople className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mb-2">

                <div className="col-md-12 mb-3">
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
                            // disabled={disableInputsHeader}
                            // value={observaciones}
                            // onChange={e => handleInputChangeWithDispatch(e, SetobservacionesConsignment)}

                        />
                    </div>
                </div>

            </div>

        </>
    )
}