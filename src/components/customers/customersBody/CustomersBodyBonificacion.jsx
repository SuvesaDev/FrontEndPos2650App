import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaSearch, FaGift } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber } from "react-icons/tb";

import { 
    CleanDatosFacturacionCustomers,
    SetAddDatosFacturacionCustomers,
    SetContactoDatosFacturacionCustomers,
    SetCorreoDatosFacturacionCustomers,
    SetEditDatosFacturacionCustomers,
    SetIdEditDatosFacturacionCustomers,
    SetIsEditDatosFacturacionCustomers,
    SetnombreFantasiaDatosFacturacionCustomers, 
    SetSucursalDatosFacturacionCustomers, 
    SetTelefonoDatosFacturacionCustomers
} from '../../../actions/customers';
import { id } from "date-fns/locale";

export const CustomersBodyBonificacion = () => {

    const dispatch = useDispatch();

    const { 
        disableInputs, 
        datosFacturacion, 
        allDatosFacturacion,
        isEditDatosFacturacion,
        idDatoFacturacionEdit
    } = useSelector( state => state.customers );

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
        },
        {
            Header: "Acciones",
            accessor: "icon"
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
            id: allDatosFacturacion.length + 1,
            sucursal,
            nombreFantasia,
            telefono,
            contacto,
            correo
        }

        dispatch( SetAddDatosFacturacionCustomers( newDato ) );
        dispatch( CleanDatosFacturacionCustomers() );

    }

    const handleEditDatosFacturacion = () => {

        if( sucursal == '' || nombreFantasia == '' || telefono == '' || contacto == '' || correo == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });

            return;
        }

        const editDato = {
            id: idDatoFacturacionEdit,
            sucursal,
            nombreFantasia,
            telefono,
            contacto,
            correo
        }

        dispatch( SetEditDatosFacturacionCustomers( editDato ) );
        dispatch( SetIdEditDatosFacturacionCustomers( 0 ) );
        dispatch( SetIsEditDatosFacturacionCustomers( false ) );
        dispatch( CleanDatosFacturacionCustomers() );

    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="container-fluid mt-2">

                        <div className="row mb-2">
                            <div className="col-md-6 mb-3">
                                <h5>Tipo de Bonificacion</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                    <FaGift className="iconSize" />
                                    </span>
                                    <select
                                    name="proveedor"
                                    // disabled={disableInputs}
                                    // value={tipoBonificacion}
                                    className="form-select"
                                    // onChange={(e) =>
                                    //     handleInputChangeWithDispatch(e, SetTipoBonificacionInventory)
                                    // }
                                >
                                    <option value={0} selected disabled hidden>
                                        {" "}
                                        Seleccione...{" "}
                                    </option>
                                    {/* {tiposBonificacion != null ? (
                                        tiposBonificacion.map((tipo) => {
                                        return (
                                            <option value={tipo.codigo}> {tipo.descripcion} </option>
                                        );
                                        })
                                    ) : (
                                        <option value="">No se cargaron los tipos de bonificacion</option>
                                    )} */}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-md-4 mb-2">
                                <h5>Opciones</h5>
                                <div className="inline-container">
                                    <button
                                        className={
                                            disableInputs ? "btn btn-success disabled" : "btn btn-success"
                                        }
                                        disabled={disableInputs}
                                        // onClick={  isSeletedTipoBonificacion ? handleEditTipoBonificacion : handleAddTipoBonificacion }
                                    >
                                        {/* { isSeletedTipoBonificacion ? 'Editar' : 'Agregar' } <IoAddCircle className="iconSize" /> */}
                                        Agregar
                                    </button>
                    
                                    <button
                                        // className={
                                        //     (isSeletedTipoBonificacion)
                                        //     ? "btn btn-danger "
                                        //     : "btn btn-danger disabled"
                                        // }
                                        className="btn btn-danger "
                                        // onClick={handleDeleteTipoBonificacion}
                                        type="button"
                                    >
                                        <RiDeleteBin2Fill className="iconSize" />
                                    </button>
                                </div>
                                <hr />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12 mb-2">
                                <p>Table Tipo Bonificacion</p>
                            {/* <InventoryBodyFeaturesTipoBonificacionesTable
                                columns={columnsTipoBonificables}
                                data={bonificacionTypes}
                            /> */}
                            </div>
                            <hr />
                        </div>

                        <div className="row mb-2">
                        
                            <div className="col-md-6 mb-3">
                                <h5>Código</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                    <GoNumber className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        name="codigo"
                                        className="form-control"
                                        placeholder="Código Producto"
                                        disabled={disableInputs}
                                        // value={codigo}
                                        // onChange={(e) =>
                                        //     handleInputChangeWithDispatch(
                                        //     e,
                                        //     SetCodigoBonificacionArticleInventory
                                        //     )
                                        // }
                                    />
                                    <button
                                        // className={
                                        //     disableInputs || isSeletedProductoBonificacion ? "btn btn-primary disabled" : "btn btn-primary"
                                        // }
                                        className="btn btn-primary"
                                        type="button"
                                        // onClick={handleSearchArticle}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalBuscarArticulo"
                                    >
                                        <FaSearch className="iconSize" />
                                    </button>
                                </div>
                            </div>
                
                            <div className="col-md-6 mb-2">
                                <h5>Descipción</h5>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <TbNotes className="iconSize" />
                                    </span>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        className="form-control"
                                        placeholder="Descripción del Producto"
                                        disabled={true}
                                        // value={descripcion}
                                        // onChange={(e) =>
                                        //     handleInputChangeWithDispatch(
                                        //     e,
                                        //     SetDescripcionArtBonificacionArticleInventory
                                        //     )
                                        // }
                                    />
                                </div>
                            </div>
                
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-4 mb-2">
                                <h5>Opciones</h5>
                                <div className="inline-container">
                                    <button
                                        // className={
                                        //     disableInputs || isSeletedProductoBonificacion
                                        //         ? "btn btn-success disabled" 
                                        //         : "btn btn-success"
                                        // }
                                        className="btn btn-success"
                                        disabled={disableInputs}
                                        // onClick={handleAddProductoBonificacion}
                                    >
                                        Agregar <IoAddCircle className="iconSize" />
                                    </button>

                                    <button
                                        // className={
                                        //     (isSeletedProductoBonificacion)
                                        //         ? "btn btn-danger "
                                        //         : "btn btn-danger disabled"
                                        // }
                                        className="btn btn-danger"
                                        // onClick={handleDeleteProductoBonificacion}
                                        type="button"
                                    >
                                        <RiDeleteBin2Fill className="iconSize" />
                                    </button>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12 mb-2">
                                <p>Table Productos</p>
                                {/* <InventoryBodyFeaturesProductosBonificacionesTable
                                    columns={columnsProductos}
                                    data={bonificacionArticles}
                                /> */}
                            </div>
                            <hr />
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}