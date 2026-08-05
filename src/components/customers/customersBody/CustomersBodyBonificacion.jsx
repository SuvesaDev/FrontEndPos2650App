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
    SetCodigoBonificacionArticleCustomers,
    SetContactoDatosFacturacionCustomers,
    SetCorreoDatosFacturacionCustomers,
    SetDescripcionBonificacionArticleCustomers,
    SetEditDatosFacturacionCustomers,
    SetIdEditDatosFacturacionCustomers,
    SetIsEditDatosFacturacionCustomers,
    SetIsOpenModalSearchBonificacionesCustomers,
    SetnombreFantasiaDatosFacturacionCustomers, 
    SetSelectedTipoBonificacionCustomers, 
    SetSucursalDatosFacturacionCustomers, 
    SetTelefonoDatosFacturacionCustomers,
    startSaveArticleBonificacionCustomer,
    startSaveBonificacionCustomer
} from '../../../actions/customers';
import { CustomersBodyTipoBonificacionesTable } from "./CustomersBodyTipoBonificacionesTable";

import { id } from "date-fns/locale";
import { CustomersBodyProductosBonificacionesTable } from "./CustomersBodyProductosBonificacionesTable";

export const CustomersBodyBonificacion = () => {

    const dispatch = useDispatch();

    const { 
        disableInputs, 
        datosFacturacion, 
        allDatosFacturacion,
        isEditDatosFacturacion,
        idDatoFacturacionEdit,
        tiposBonificaciones,
        selectedTipoBonificacion,
        bonificaciones,
        customer,
        currentBonificacionArticles,
        productosBonificacion
    } = useSelector( state => state.customers );

    const { 
        sucursal,
        nombreFantasia,
        telefono,
        correo,
        contacto
    } = datosFacturacion;

    const {
        codigo,
        cod_Articulo,
        descripcion,
    } = currentBonificacionArticles;

    const columnsTipoBonificables = [
        {
        Header: "Codigo",
        accessor: "codigo",
        },
        {
        Header: "Tipo de Bonificacion",
        accessor: "descripcion",
        },
    ];

    const columnsProductos = [
        {
        Header: "Codigo",
        accessor: "cod_Articulo",
        },
        {
        Header: "Descripcion",
        accessor: "descripcion",
        }
    ];
        
    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleAddTipoBonificacion = (e) => {
      
        e.preventDefault();
    
        if (selectedTipoBonificacion == 0) return;
    
        const existTipoBonificacion = bonificaciones.find(
          (value) => value.codigo === tipoBonificacion
        );
    
        if (existTipoBonificacion === undefined) {
    
          const newTipoBonificacion = tiposBonificaciones.find(
            (value) => value.codigo == selectedTipoBonificacion
          );
    
          const newTipo = {
            codigo: selectedTipoBonificacion,
            descripcion: newTipoBonificacion.descripcion
          }
    
          dispatch(startSaveBonificacionCustomer(newTipo, customer.identificacion));
    
        } else {
          Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "El tipo de bonificacion ya esta iXFGncluido.",
            });
        }
    };

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

    const handleSearchArticle = (e) => {
        e.preventDefault();
    
        dispatch(SetIsOpenModalSearchBonificacionesCustomers(true));
    };

    const handleAddProductoBonificacion = (e) => {
        
        e.preventDefault();
    
        if (cod_Articulo == '') return;
    
        const existProductoBonificacion = productosBonificacion.find(
          (value) => value.codigo === codigo
        );
    
        if (existProductoBonificacion === undefined) {
    
          const newProducto = {
            id: 0,
            idArticulo: codigo,
            idCliente: customer.identificacion,
            codigo: cod_Articulo,
            descripcion
          }
    
          dispatch(startSaveArticleBonificacionCustomer(newProducto));
    
        } else {
          Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "El producto de bonificacion ya esta incluido.",
            });
        }
    };

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
                                    name="tipoBonificacion"
                                    disabled={disableInputs}
                                    value={selectedTipoBonificacion}
                                    className="form-select"
                                    onChange={(e) =>
                                        handleInputChangeWithDispatch(e, SetSelectedTipoBonificacionCustomers)
                                    }
                                >
                                    <option value={0} selected disabled hidden>
                                        {" "}
                                        Seleccione...{" "}
                                    </option>
                                    {tiposBonificaciones != null ? (
                                        tiposBonificaciones.map((tipo) => {
                                        return (
                                            <option value={tipo.codigo}> {tipo.descripcion} </option>
                                        );
                                        })
                                    ) : (
                                        <option value="">No se cargaron los tipos de bonificacion</option>
                                    )}
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
                                        onClick={handleAddTipoBonificacion}
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
                            <CustomersBodyTipoBonificacionesTable
                                columns={columnsTipoBonificables}
                                data={bonificaciones}
                            />
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
                                        value={codigo}
                                        onChange={(e) =>
                                            handleInputChangeWithDispatch(
                                                e,
                                                SetCodigoBonificacionArticleCustomers
                                            )
                                        }
                                    />
                                    <button
                                        // className={
                                        //     disableInputs || isSeletedProductoBonificacion ? "btn btn-primary disabled" : "btn btn-primary"
                                        // }
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleSearchArticle}
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
                                        value={descripcion}
                                        onChange={(e) =>
                                            handleInputChangeWithDispatch(
                                            e,
                                            SetDescripcionBonificacionArticleCustomers
                                            )
                                        }
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
                                        onClick={handleAddProductoBonificacion}
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
                                <CustomersBodyProductosBonificacionesTable
                                    columns={columnsProductos}
                                    data={productosBonificacion}
                                />
                            </div>
                            <hr />
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}