import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';

import { FaStore, FaPhoneSquare } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

import { 
    CleanDatosFacturacionCustomers,
    SetAddDatosFacturacionCustomers,
    SetContactoDatosFacturacionCustomers,
    SetCorreoDatosFacturacionCustomers,
    SetnombreFantasiaDatosFacturacionCustomers, 
    SetSucursalDatosFacturacionCustomers, 
    SetTelefonoDatosFacturacionCustomers
} from '../../../actions/customers';
import { CustomersBodyDatosFacturacionTable } from './CustomersBodyDatosFacturacionTable';

export const CustomersBodyDatosFacturacion = () => {

    const dispatch = useDispatch();
    const { disableInputs, datosFacturacion, allDatosFacturacion } = useSelector( state => state.customers );
    const { 
        sucursal,
        nombreFantasia,
        telefono,
        correo,
        contacto
    } = datosFacturacion;

    const columns = [
        {
            Header: "Sucursal",
            accessor: "sucursal",
        },
        {
            Header: "Nombre Fantasia",
            accessor: "nombreFantasia",
        },
        {
            Header: "Telefono",
            accessor: "telefono",
        },
        {
            Header: "Contacto",
            accessor: "contacto",
        },
        {
            Header: "Correo",
            accessor: "correo",
        }
    ];
        
    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleAddDatosFacturacion = () => {

        if( sucursal == '' || nombreFantasia == '' || telefono == '' || contacto == '' || correo == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });

            return;
        }

        const newDato = {
            sucursal,
            nombreFantasia,
            telefono,
            contacto,
            correo
        }

        dispatch( SetAddDatosFacturacionCustomers( newDato ) );
        dispatch( CleanDatosFacturacionCustomers() );

    }

    return (
        <>
            <div className="card">
                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-3 mb-3">
                            <h5>Sucursal</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaStore className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='Sucursal'
                                    className='form-control'
                                    placeholder='Sucursal'
                                    disabled={ disableInputs }
                                    value={ sucursal }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetSucursalDatosFacturacionCustomers) }
                                />
                                
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Nombre Fantasia</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdOutlineDriveFileRenameOutline className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='nombreFan'
                                    className='form-control'
                                    placeholder='Nombre de Fantasia'
                                    disabled={ disableInputs }
                                    value={ nombreFantasia }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetnombreFantasiaDatosFacturacionCustomers) }
                                />
                                
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Telefono</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPhoneSquare className="iconSize" />
                                </span>
                                <input 
                                    type='tel' 
                                    name='numeroDocumento'
                                    className='form-control'
                                    placeholder='Telefono'
                                    maxLength={8}
                                    disabled={ disableInputs }
                                    value={ telefono }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetTelefonoDatosFacturacionCustomers) }
                                />
                                
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Contacto</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaPersonCircleCheck className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='contacto'
                                    className='form-control'
                                    placeholder='Persona de Contacto'
                                    disabled={ disableInputs }
                                    value={ contacto }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetContactoDatosFacturacionCustomers) }
                                />
                                
                            </div>
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-4 mb-3">
                            <h5>Correo Electronico</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <MdEmail className="iconSize" />
                                </span>
                                <input 
                                    type='text' 
                                    name='numeroDocumento'
                                    className='form-control'
                                    placeholder='Correo Electronico'
                                    disabled={ disableInputs }
                                    value={ correo }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetCorreoDatosFacturacionCustomers) }
                                />
                                
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="w-100 pt-4"></div>
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={ handleAddDatosFacturacion }
                            >
                                <IoMdPersonAdd className="iconSize" /> Agregar
                            </button>
                        </div>

                    </div>

                    <div className="row mb-2">
                        <CustomersBodyDatosFacturacionTable
                            columns={ columns }
                            data={ allDatosFacturacion }
                        />
                    </div>

                </div>
            </div>
        </>

    )
}