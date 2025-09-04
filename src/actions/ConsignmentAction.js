import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

import { startGetAllSurcursales, startValidateClaveInterna } from './login';
import { startGetAllTiposFacturas } from './TiposFacturasAction';
import { startGetAllTiposIdentificacionBranch } from './TiposIdentificacionAction';
import { startGetAllEmpresasBilling } from './billing';
import { startGetAllMonedas } from './MonedasAction';
import { startGetAllBodegas } from './bodegasAction';

// API Actions
export const startValidateClaveInternaConsignment = ( password, catalogos ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message, aceptaConsignacion }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                // Se activan los inputs
                dispatch( SetDisableInputsHeaderConsignment(false));

                //Guardar el usuario en el state
                dispatch( SetusuarioConsignment(userName));

                // Desactivar los inputs de usuario
                dispatch( SetdisableInputsUserConsignment(true));

                // Ocultar la password
                dispatch( SetvisiblePasswordConsignment(false));

                // Se establece el manejo de icons
                dispatch( SetactiveButtonSaveConsignment(true));
                dispatch(SetactiveButtonSearchConsignment(true));

                // Se inicia el StartOpening
                dispatch( SetstartOpeningConsignment(true));

                // Se establece si acepta consignacion
                dispatch( SetAceptaConsignacionConsignment(aceptaConsignacion) );

                // Se cargan los catalogos
                await loadCatalogos( dispatch, catalogos );

            } else if ( status === 0 && message === 'Contraseña Incorrecta' ) {
                
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: message
                });
                
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                });

            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrio un problema al validar usuario',
            });
        }
        
    }
}

export const startSearchCustomerConsignment = ( cedula, hasCoin = false ) => {

    return async (dispatch) => {

        try {
            
            let searchCedula = cedula;

            if (cedula == "0" || cedula == "") {
               searchCedula = "000000000"
            }

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando cliente',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            //Call end-point 
            const { data } = await suvesaApi.post('/cliente/ExisteClienteFacturacion', { cedula : searchCedula });
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                const { nombre, mensaje } = responses;

                if (mensaje === null) {

                    // Se obtiene la data del Usuario
                    const {
                        identificacion,
                        cedula,
                        idTipoIdentificacion,
                        observaciones,
                        telefono01,
                        direccion,
                        correoComprobante,
                        e_Mail,
                        anulado,
                        agente,
                        fallecido,
                        enviarRecibo,
                        correoRecibo,
                        tipoprecio,
                        descuentoEspecial,
                        mag,
                        actualizado,
                        abierto,
                        cliente_Moroso,
                        ordenCompra,
                        sinrestriccion
                    } = responses;

                    // Se crea el objeto de Customer
                    // const customerEditBilling = {
                    //     identificacion: identificacion,
                    //     idTipoCliente: idTipoIdentificacion,
                    //     telefono: telefono01,
                    //     direccion: direccion,
                    //     correocuentas: e_Mail,
                    //     correoFacturacion: correoComprobante,
                    //     agente: agente,
                    //     actualizado: actualizado,
                    //     fallecido: fallecido,
                    //     enviaRecibo: enviarRecibo,
                    //     correoRecibo: correoRecibo,
                    //     tipoPrecio: tipoprecio,
                    //     descuentoEspcial: descuentoEspecial,
                    //     inactivo: anulado,
                    //     mag: mag,
                    //     abierto: abierto
                    // }
                    
                    // Se establece la cedula, tipoCliente y nombre del cliente
                    dispatch( Setcedula_UsuarioConsignment( searchCedula ) );
                    dispatch( SetidTipoClienteConsignment( idTipoIdentificacion ));
                    dispatch( Setnombre_ClienteConsignment( nombre ));

                    // Se establece el telefono, direccion, correo comprobantes
                    dispatch( SettelefonoConsignment( telefono01 ));
                    dispatch( SetdireccionConsignment( direccion ));
                    dispatch( SetcorreoComprobantesConsignment( correoComprobante ));

                    // Se establece el MAG, Fallecido, Actualizado
                    dispatch( SetmagConsignment( mag ));
                    dispatch( SetfallecidoConsignment( fallecido ));
                    dispatch( SetactualizadoConsignment( actualizado ));

                    // Se establece Cliente Moroso, ObligaOrdenCompra, SinRestriccion
                    dispatch( Setcliente_MorosoConsignment( cliente_Moroso ));
                    dispatch( SetordenCompraConsignment( ordenCompra ));
                    dispatch( SetsinrestriccionConsignment( sinrestriccion ));

                    // Se establece el customer Edit
                    // dispatch( SetCustomerEditBilling( customerEditBilling ));

                    // Se establece el HasCustomerBilling
                    if (searchCedula == "000000000") {
                        dispatch( SethasCustomerBillingConsignment(true) );
                    } else {
                        
                        dispatch( SethasCustomerBillingConsignment(true) );

                        if( hasCoin ) {
                            dispatch( SetenableItemsConsignment( true ) );
                        }
                    }

                    // Se establece el CodCliente
                    dispatch( Setcod_ClienteConsignment( identificacion ));

                    // Se establece HasHeader, OpenSearchCustomerBilling y IsEnableActiveCredito
                    // dispatch( hasHeader( true ));
                    // dispatch( OpenSearchCustomerBilling( false ));

                } else {
                    
                    //Mostrar un mensaje de confirmacion
                    Swal.fire({
                        title: `El cliente ${nombre} no esta registrado. ¿Desea agregar el cliente?`,
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Agregar',
                        denyButtonText: `Cancelar`,
                    }).then(async (result) => {

                        if (result.isConfirmed) {

                            const {
                                cedula,
                                idTipoIdentificacion,
                                nombre
                            } = responses;

                            // Se levanta el modal
                            dispatch( SetOpenAddCustomerConsignment( true ));

                            // Se establece datos de cliente
                            dispatch( SetidTipoClienteAddConsignment( idTipoIdentificacion ));
                            dispatch( SetcedulaAddConsignment( cedula ));
                            dispatch( SetnombreAddConsignment( nombre ));
                        }

                    });

                }

            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });

            }


        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar un cliente',
                });
            }
        }

    }
}

export const startSaveCustomerConsignment = (customer, btnClose) => {

    return async (dispatch) => {
        
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar un nuevo cliente?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {
                
                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });

                    //Call end-point 
                    const { data } = await suvesaApi.post('/cliente/RegistrarBasico', customer);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Clean State
                        dispatch( CleanAddCustomerConsignment());

                        //Close modal
                        // dispatch( CloseModalAddCustomer( { number } ));

                        // Cargar el numero cliente
                        dispatch(startSearchCustomerConsignment( customer.cedula ));

                        btnClose.current.click();

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Cliente ingresado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                    } else {
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al ingresar un nuevo cliente',
                    });
                }
            }

        });

    }
}

export const startGetOneInventoryConsignment = ( codigo, parametros ) => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const resp = await suvesaApi.post('/inventario/ObtenerUnInventario', { codigo });
            const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                console.log(responses)
                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch( SetCodArticuloDetalleConsignment( responses.cod_Articulo ));
                dispatch( SetDescripcionDetalleConsignment( responses.descripcion ));
                dispatch( SetPrecio_UnitDetalleConsignment( responses.precio_A ));
                dispatch( SetPrecio_UnitOriginalDetalleConsignment( responses.precio_A ));
                dispatch( SetImpuestoDetalleConsignment( responses.iVenta ));
                dispatch( SetImpuestoOriginalDetalleConsignment( responses.iVenta,)); 
                dispatch( SetExistenciasDetalleConsignment( responses.existencia ));
                dispatch( Setprecio_ADetalleConsignment( responses.precio_A ));
                dispatch( Setprecio_BDetalleConsignment( responses.precio_B ));
                dispatch( Setprecio_CDetalleConsignment( responses.precio_C ));
                dispatch( Setprecio_DDetalleConsignment( responses.precio_D ));
                dispatch( Setprecio_PromoDetalleConsignment( responses.precio_Promo ));
                dispatch( Setmax_DescuentoDetalleConsignment( responses.max_Descuento ));
                dispatch( SetcodFxArticuloDetalleConsignment( responses.codigo ));

                // Se calculan los totales de producto
                calculateTotalsProductCurrent( responses, parametros, dispatch );

                // dispatch( SetautoFocusPrecioUnitBilling( { value: true, number }));
                // dispatch( SetautoFocusDescBilling( { value: false, number }));
                // dispatch( SetautoFocusCantidadBilling( { value: false, number }));
                // dispatch( SetautoFocusCodigoBilling( { value: false, number }));

                dispatch(startGetLotesByArticleConsignment( codigo ));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });

            }

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startGetLotesByArticleConsignment = (codigoPrincipal, activeLoading = false) => {

    return async ( dispatch ) => {
    
        try {
            
            if( activeLoading ) {
                //Mostrar el loading
                Swal.fire({
                    title: 'Por favor, espere',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    imageUrl: loadingImage,
                    customClass: 'alert-class-login',
                    imageHeight: 100,
                });
            }
                        
            //Call end-point 
            const { data } = await suvesaApi.get(`/StockLote/getStockLotesArticulo?Request=${codigoPrincipal}`);
            const { status, responses } = data;
            
            if( activeLoading ) {
                //Quitar el loading
                Swal.close();
            }

            dispatch( SetLotesByArticuloConsignment([]) );

            if( status === 0) {
                
                const lotes = responses.map( lot => {
                    return {
                        id: lot.id,
                        lote: lot.lote,
                        vencimiento: lot.vencimiento.split('T')[0],
                        existencia: lot.cantidad
                    }
                });
                
                const loteProximoVencer = obtenerLoteProximoVencer(lotes);

                if( loteProximoVencer != null ) {
                    dispatch( SetLotesByArticuloConsignment( lotes ) );
                    dispatch( SetidLoteDetalleConsignment( loteProximoVencer.id ) );
                    dispatch( SetnombreLoteDetalleConsignment( loteProximoVencer.lote ) );
                }                

            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                if( currentException === "No tiene lotes" ) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Lotes',
                        text: 'Este producto no tiene lotes registrados.'
                    });

                    dispatch( SetLotesByArticuloConsignment([]) );

                    return;
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });
                
            }
            
        } catch (error) {
            
            Swal.close();
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener el stock del lote',
                });
            }
        }

    }

}

export const startAddDetalleActualConsignment = ( detalle ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar este artículo a la factura?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                // dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

                // dispatch( SetChangeDetalleBilling( { value: true, number } ));
                dispatch( SetAddDetalleConsignment( detalle ));
                dispatch( CleanDetalleActualConsignment());

                // dispatch( SetLotesByArticuloBilling({ value: [], number }) );

                // dispatch( SetautoFocusPrecioUnitBilling( { value: false, number } ));
                // dispatch( SetautoFocusDescBilling( { value: false, number } ));
                // dispatch( SetautoFocusCantidadBilling( { value: false, number } ));
                // dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

            }

        });
    }
}

export const startGetAllPlazosConsignment = () => {

    return async ( dispatch ) => {
    
        try {
            
            //Call end-point 
            const { data } = await suvesaApi.get(`/ConfiguracionPlazo/getPlazos`);
            const { status, responses } = data;
            
            if( status === 0) {
               
                dispatch( SetPlazosConsignment(responses));

            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });
                
            }
            
        } catch (error) {
            
            Swal.close();
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener el stock del lote',
                });
            }
        }

    }

}

export const startSaveConsignment = ( factura, datosCliente, idSucursalOF) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar la consignacion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post('/venta/CrearFactura', factura);
                    const { status, responses} = data;
                    const {id} = responses;
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Factura agrega correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( CleanFacturaConsignment() );
                        dispatch( CleanConsignment() );
                        
                        // if (factura.tipo == 1 || factura.tipo == 5 || factura.tipo == 7) {
                        //     const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
                        //     const { responses, status } = data;
    
                        //     const datosPDF = {
                        //         numFactura: id,
                        //         datosSucursal: responses,
                        //         datosCliente: datosCliente,
                        //         datosFactura: factura,
                        //     }
    
                        //     Swal.fire({
                        //         icon: 'success',
                        //         title: 'Factura de crédito agrega correctamente',
                        //         showConfirmButton: false,
                        //         timer: 2500
                        //     });
    
                        //     // dispatch(SetDatosImprimirCreditoBilling(datosPDF))
                        //     dispatch( CleanBilling( { number } ) );
                        // } else{

                        //     Swal.fire({
                        //         icon: 'success',
                        //         title: 'Factura agrega correctamente',
                        //         showConfirmButton: false,
                        //         timer: 2500
                        //     });
                        //     dispatch( CleanBilling( { number } ) );

                        // }

             
                    } else {
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al agregar la factura',
                    });
                }
            }
        });
    };
}

export const startEditDetalleActualConsignment = (detalle, index ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea editar este artículo a la factura?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Editar',
                denyButtonText: `Cancelar`,
                allowEnterKey: false
            }).then(async (result) => {

                if (result.isConfirmed) {

                    // dispatch( SetautoFocusCantidadBilling( { value: false, number } ));
                    // dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

                    dispatch( SetIsEditDetalleConsignment(false) );
                    // dispatch( SetChangeDetalleBilling( { value: true, number } ));
                    dispatch( SetEditDetalleConsignment({ detalle, index }));
                    dispatch( CleanDetalleActualConsignment() );

                }

            });

        } catch (error) {

            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrio un problema al buscar un cliente',
            });
        }

    }
}

export const startDeleteDetalleActualConsignment = ( deleteLinea ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el artículo ${deleteLinea.Descripcion} a la factura?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {
                dispatch( SetDeleteDetalleConsignment( deleteLinea ) );
            }

        });
    }
}

export const startSearchConsignment = ( busqueda ) => {

    return async ( dispatch ) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
    
            //Call end-point 
            const { data } = await suvesaApi.post('/venta/BuscarConsignacion', busqueda);
            const { status, responses } = data;
            Swal.close();
            
            if( status === 0 ) {
                
                dispatch(SetListaConsignacionesConsignment( responses ));

            } else {
    
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });
    
            }

        } catch (error) {
            
            Swal.close();
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar clientes',
                });
            }
        }
    }
}

export const startGetOneConsignment = ( idConsignacion ) => {

    return async ( dispatch ) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
    
            //Call end-point 
            const { data } = await suvesaApi.get(`/venta/ObtenerConsignacion?idPreventa=${idConsignacion}`);
            const { status, responses } = data;
            Swal.close();
            
            if( status === 0 ) {
                console.log(responses)
                const searchConsignmet = {
                    encabezado: {                    
                        id : responses.id,
                        num_Factura : responses.numFactura,
                        fecha : responses.fecha,
                        tipo : responses.tipo,
                        tipoDocumento: responses.tipoDocumento,
                        cod_Cliente : responses.codCliente,
                        nombre_Cliente : responses.nombreCliente,
                        cedula_Usuario : responses.numeroCedula,
                        observaciones : responses.observaciones,
                        empresa : responses.idEmpresa,
                        Cod_Moneda : responses.codMoneda,
                        plazo: responses.idPlazo,
                        SubTotalGravada : responses.subTotalGravada,
                        SubTotalExento : responses.subTotalExento,
                        SubTotal : responses.subTotal,
                        Descuento : responses.descuento,
                        Imp_Venta : responses.impVenta,
                        Total : responses.total,
                        usuario : responses.usuario, //TODO: DUDA
                    },
                    detalle: responses.detalle.map( det => {
                        return {
                            idVentaDetalle : det.idVentaDetalle,
                            CodArticulo : det.codArticulo,
                            codFxArticulo : det.codFxArticulo,
                            Descripcion : det.descripcion,
                            Cantidad : det.cantidad,
                            Precio_Unit : det.precioUnit,
                            Descuento : det.descuento,
                            Monto_Descuento : det.montoDescuento,
                            Impuesto : det.impuesto,
                            Monto_Impuesto : det.montoImpuesto,
                            ImpuestoOriginal: det.impuesto,
                            SubtotalGravado : det.subtotalGravado,
                            SubTotalExcento : det.subTotalExcento,
                            max_Descuento: det.max_Descuento,
                            SubTotal : det.subTotal,
                            idBodega : det.idBodega,
                            idLote: det.idLote
                        }
                    })
                }
                
                dispatch(SetIDFacturaConsignment(searchConsignmet.encabezado.id));
                dispatch(Setnum_FacturaConsignment(searchConsignmet.encabezado.num_Factura));
                dispatch(SetfechaConsignment(searchConsignmet.encabezado.fecha));
                dispatch(SettipoConsignment(searchConsignmet.encabezado.tipo));
                dispatch(Setcod_ClienteConsignment(searchConsignmet.encabezado.cod_Cliente));
                dispatch(SetidTipoClienteConsignment(searchConsignmet.encabezado.tipoDocumento));
                dispatch(Setnombre_ClienteConsignment(searchConsignmet.encabezado.nombre_Cliente));
                dispatch(Setcedula_UsuarioConsignment(searchConsignmet.encabezado.cedula_Usuario));
                dispatch(SetobservacionesConsignment(searchConsignmet.encabezado.observaciones));
                dispatch(SetempresaConsignment(searchConsignmet.encabezado.empresa));
                dispatch(SetCod_MonedaConsignment(searchConsignmet.encabezado.Cod_Moneda));
                dispatch(SetPlazoConsignment(searchConsignmet.encabezado.plazo));
                dispatch(SetSubTotalGravadaConsignment(searchConsignmet.encabezado.SubTotalGravada));
                dispatch(SetSubTotalExentoConsignment(searchConsignmet.encabezado.SubTotalExento)); 
                dispatch(SetSubTotalConsignment(searchConsignmet.encabezado.SubTotal));
                dispatch(SetDescuentoConsignment(searchConsignmet.encabezado.Descuento));   
                dispatch(SetImp_VentaConsignment(searchConsignmet.encabezado.Imp_Venta));   
                dispatch(SetTotalConsignment(searchConsignmet.encabezado.Total));   

                dispatch(SetDetalleFacturaConsignment(searchConsignmet.detalle) );

                // Se carga el cliente.
                // dispatch( startSearchCustomerConsignment( searchConsignmet.encabezado.cedula_Usuario, true ) );

                dispatch( SetIsEditConsignment(true) );
                dispatch( SetenableItemsConsignment(true) );
                dispatch( SethasCustomerBillingConsignment(true) );
                dispatch( CleanSearchConsignment() );

            } else {
    
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });
    
            }

        } catch (error) {
            
            Swal.close();
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener una consignacion',
                });
            }
        }
    }
}

export const startDeleteLineDetalleConsignacion = ( deleteLinea ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el artículo ${deleteLinea.Descripcion} a la factura?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            try {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post(`/venta/EliminarLineaDeVenta?id=${deleteLinea.idVentaDetalle}`);
                    const { status, responses } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        if( responses === true ) {

                            // Se elimina la linea 
                            dispatch( SetDeleteDetalleConsignment( deleteLinea ) );
                            
                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: `Producto ${deleteLinea.Descripcion} eliminado correctamente`,
                                showConfirmButton: false,
                                timer: 2500
                            });

                        }

                    } else {
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al editar la factura',
                    });
                }
            }
        });
    };
}

export const startEditConsignment = ( factura ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea editar la consignacion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post('/venta/EditarFactura', factura);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Consignacion editada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        
                        dispatch( CleanConsignment() );

                    } else {
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al editar la consignacion',
                    });
                }
            }
        });
    };
}

// Private methods
const loadCatalogos = async ( dispatch, catalogos ) => {
    
    //Mostrar el loading
    Swal.fire({
        title: 'Por favor, espere cargando catalogos',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        imageUrl: loadingImage,
        customClass: 'alert-class-login',
        imageHeight: 100,
    });
    
    // Se obtiene los tipos de Facturas
    if( catalogos.tiposFacturas === null ) {
        await dispatch( startGetAllTiposFacturas() );
    }

    // Se obtiene los tipos de Identificacion
    if( catalogos.tiposIdentificacion.length === 0 ) {
        await dispatch( startGetAllTiposIdentificacionBranch() )
    }

    // Se obtiene las surcursales
    if( catalogos.surcursales.length === 0 ) {
        await dispatch( startGetAllSurcursales() )
    }

    // Se obtiene las monedas
    if( catalogos.monedas === null ) {
        await dispatch( startGetAllMonedas() );
    }

    // Se obtiene las monedas
    if( catalogos.plazos.length === 0 ) {
        await dispatch( startGetAllPlazosConsignment() );
    }

    // Se obtiene las bodegas
    if( catalogos.bodegas === null ) {
        await dispatch(  startGetAllBodegas() );
    }

    //Quitar el loading
    Swal.close();

}

const calculateTotalsProductCurrent = ( detalleArticuloActual, parametros, dispatch) => {
    
    //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
    //se calcualan los subtotales, desuentos e impuestos del producto
    if ( detalleArticuloActual.codigo > 0) {
        
        let precio    = parseFloat( detalleArticuloActual.precio_A );
        let cantidad  = 1;
        let impuesto  = parseFloat( detalleArticuloActual.iVenta );
        let descuento = 0;

        dispatch( SetPrecio_UnitDetalleConsignment( precio ));

        if (parseFloat( parametros.Cod_Moneda ) === 2) {
            precio = precio / parametros.dollar;
            dispatch( SetPrecio_UnitDetalleConsignment( precio.toFixed(2) ));
        }

        var resulDescuento = (precio * cantidad) * (descuento / 100);
        var resulImpuesto = ((precio * cantidad) - resulDescuento) * (impuesto / 100);

        dispatch( SetImpuestoDetalleConsignment( parseFloat(impuesto).toFixed(2) ));
        dispatch( SetMonto_DescuentoDetalleConsignment( parseFloat(resulDescuento).toFixed(2) ));
        dispatch( SetMonto_ImpuestoDetalleConsignment( parseFloat(resulImpuesto).toFixed(2) ));

        //SubTotal
        dispatch( SetSubTotalDetalleConsignment( parseFloat(precio * cantidad).toFixed(2) ));

        if (impuesto > 0) {
            dispatch( SetSubtotalGravadoDetalleConsignment( parseFloat(precio * cantidad).toFixed(2) ));
            dispatch( SetSubTotalExcentoDetalleConsignment( 0 ));
        } else {
            dispatch( SetSubtotalGravadoDetalleConsignment( 0 ));
            dispatch( SetSubTotalExcentoDetalleConsignment( parseFloat(precio * cantidad).toFixed(2) ));
        }
    }
}

const obtenerLoteProximoVencer = (lotes) => {

    const fechas = lotes.map( lot => {
        return lot.vencimiento.split('T')[0]
    });

    const hoy = new Date();
    
    const futuras = fechas
        .map(fecha => new Date(fecha))
        .filter(fecha => fecha >= hoy);

    if( futuras.length == 0 ) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'No existen lotes activos para este articulo'
        });

        return null;
    }
    
    const fechaProximaVencer = futuras.length > 0 ? futuras.reduce((a, b) => a < b ? a : b).toISOString().split('T')[0] : null;

    return lotes.find( lot => lot.vencimiento == fechaProximaVencer);
}

// Normal Actions
export const SetDisableInputsHeaderConsignment = (value) => ({
    type: types.SetDisableInputsHeaderConsignment,
    payload: value
})

export const SetIsEnableActiveCreditoConsignment = (value) => ({
    type: types.SetIsEnableActiveCreditoConsignment,
    payload: value
})

export const SetSearchFichaConsignment = (value) => ({
    type: types.SetSearchFichaConsignment,
    payload: value
})

export const SetIDFacturaConsignment = (value) => ({
    type: types.SetIDFacturaConsignment,
    payload: value
})

export const Setnum_FacturaConsignment = (value) => ({
    type: types.Setnum_FacturaConsignment,
    payload: value
})

export const SetfechaConsignment = (value) => ({
    type: types.SetfechaConsignment,
    payload: value
})

export const SetNumeroCajaConsignment = (value) => ({
    type: types.SetNumeroCajaConsignment,
    payload: value
})

export const SettipoConsignment = (value) => ({
    type: types.SettipoConsignment,
    payload: value
})

export const Setcod_ClienteConsignment = (value) => ({
    type: types.Setcod_ClienteConsignment,
    payload: value
})

export const SetidTipoClienteConsignment = (value) => ({
    type: types.SetidTipoClienteConsignment,
    payload: value
})

export const Setnombre_ClienteConsignment = (value) => ({
    type: types.Setnombre_ClienteConsignment,
    payload: value
})

export const Setcedula_UsuarioConsignment = (value) => ({
    type: types.Setcedula_UsuarioConsignment,
    payload: value
})

export const SetdireccionConsignment = (value) => ({
    type: types.SetdireccionConsignment,
    payload: value
})

export const SettelefonoConsignment = (value) => ({
    type: types.SettelefonoConsignment,
    payload: value
})

export const SetobservacionesConsignment = (value) => ({
    type: types.SetobservacionesConsignment,
    payload: value
})

export const SetempresaConsignment = (value) => ({
    type: types.SetempresaConsignment,
    payload: value
})

export const SetcorreoComprobantesConsignment = (value) => ({
    type: types.SetcorreoComprobantesConsignment,
    payload: value
})

export const SetCod_MonedaConsignment = (value) => ({
    type: types.SetCod_MonedaConsignment,
    payload: value
})

export const SetOrdenConsignment = (value) => ({
    type: types.SetOrdenConsignment,
    payload: value
})

export const SetPlazoConsignment = (value) => ({
    type: types.SetPlazoConsignment,
    payload: value
})

export const SetSubTotalGravadaConsignment = (value) => ({
    type: types.SetSubTotalGravadaConsignment,
    payload: value
})

export const SetSubTotalExentoConsignment = (value) => ({
    type: types.SetSubTotalExentoConsignment,
    payload: value
})

export const SetSubTotalConsignment = (value) => ({
    type: types.SetSubTotalConsignment,
    payload: value
})

export const SetDescuentoConsignment = (value) => ({
    type: types.SetDescuentoConsignment,
    payload: value
})

export const SetImp_VentaConsignment = (value) => ({
    type: types.SetImp_VentaConsignment,
    payload: value
})

export const SetTotalConsignment = (value) => ({
    type: types.SetTotalConsignment,
    payload: value
})

export const SetmagConsignment = (value) => ({
    type: types.SetmagConsignment,
    payload: value
})

export const SetfallecidoConsignment = (value) => ({
    type: types.SetfallecidoConsignment,
    payload: value
})

export const SetactualizadoConsignment = (value) => ({
    type: types.SetactualizadoConsignment,
    payload: value
})

export const Setcliente_MorosoConsignment = (value) => ({
    type: types.Setcliente_MorosoConsignment,
    payload: value
})

export const SetordenCompraConsignment = (value) => ({
    type: types.SetordenCompraConsignment,
    payload: value
})

export const SetsinrestriccionConsignment = (value) => ({
    type: types.SetsinrestriccionConsignment,
    payload: value
})

export const SetfichaConsignment = (value) => ({
    type: types.SetfichaConsignment,
    payload: value
})

export const SetpreventaConsignment = (value) => ({
    type: types.SetpreventaConsignment,
    payload: value
})

export const SetusuarioConsignment = (value) => ({
    type: types.SetusuarioConsignment,
    payload: value
})

export const SetidDatoFacturacionConsignment = (value) => ({
    type: types.SetidDatoFacturacionConsignment,
    payload: value
})

export const SetCodArticuloDetalleConsignment = (value) => ({
    type: types.SetCodArticuloDetalleConsignment,
    payload: value
})

export const SetcodFxArticuloDetalleConsignment = (value) => ({
    type: types.SetcodFxArticuloDetalleConsignment,
    payload: value
})

export const SetDescripcionDetalleConsignment = (value) => ({
    type: types.SetDescripcionDetalleConsignment,
    payload: value
})

export const SetCantidadDetalleConsignment = (value) => ({
    type: types.SetCantidadDetalleConsignment,
    payload: value
})

export const SetPrecio_UnitDetalleConsignment = (value) => ({
    type: types.SetPrecio_UnitDetalleConsignment,
    payload: value
})

export const SetDescuentoDetalleConsignment = (value) => ({
    type: types.SetDescuentoDetalleConsignment,
    payload: value
})

export const SetMonto_DescuentoDetalleConsignment = (value) => ({
    type: types.SetMonto_DescuentoDetalleConsignment,
    payload: value
})

export const SetImpuestoDetalleConsignment = (value) => ({
    type: types.SetImpuestoDetalleConsignment,
    payload: value
})

export const SetMonto_ImpuestoDetalleConsignment = (value) => ({
    type: types.SetMonto_ImpuestoDetalleConsignment,
    payload: value
})

export const SetExistenciasDetalleConsignment = (value) => ({
    type: types.SetExistenciasDetalleConsignment,
    payload: value
})

export const SetSubtotalGravadoDetalleConsignment = (value) => ({
    type: types.SetSubtotalGravadoDetalleConsignment,
    payload: value
})

export const SetSubTotalExcentoDetalleConsignment = (value) => ({
    type: types.SetSubTotalExcentoDetalleConsignment,
    payload: value
})

export const SetSubTotalDetalleConsignment = (value) => ({
    type: types.SetSubTotalDetalleConsignment,
    payload: value
})

export const Setprecio_ADetalleConsignment = (value) => ({
    type: types.Setprecio_ADetalleConsignment,
    payload: value
})

export const Setprecio_BDetalleConsignment = (value) => ({
    type: types.Setprecio_BDetalleConsignment,
    payload: value
})

export const Setprecio_CDetalleConsignment = (value) => ({
    type: types.Setprecio_CDetalleConsignment,
    payload: value
})

export const Setprecio_DDetalleConsignment = (value) => ({
    type: types.Setprecio_DDetalleConsignment,
    payload: value
})

export const Setprecio_PromoDetalleConsignment = (value) => ({
    type: types.Setprecio_PromoDetalleConsignment,
    payload: value
})

export const Setmax_DescuentoDetalleConsignment = (value) => ({
    type: types.Setmax_DescuentoDetalleConsignment,
    payload: value
})

export const SetPrecio_UnitOriginalDetalleConsignment = (value) => ({
    type: types.SetPrecio_UnitOriginalDetalleConsignment,
    payload: value
})

export const SetImpuestoOriginalDetalleConsignment = (value) => ({
    type: types.SetImpuestoOriginalDetalleConsignment,
    payload: value
})

export const SetidLoteDetalleConsignment = (value) => ({
    type: types.SetidLoteDetalleConsignment,
    payload: value
})

export const SetnombreLoteDetalleConsignment = (value) => ({
    type: types.SetnombreLoteDetalleConsignment,
    payload: value
})

export const SethasCustomerBillingConsignment = (value) => ({
    type: types.SethasCustomerBillingConsignment,
    payload: value
})

export const SetenableItemsConsignment = (value) => ({
    type: types.SetenableItemsConsignment,
    payload: value
})

export const SetactiveButtonSaveConsignment = (value) => ({
    type: types.SetactiveButtonSaveConsignment,
    payload: value
})

export const SetstartOpeningConsignment = (value) => ({
    type: types.SetstartOpeningConsignment,
    payload: value
})

export const SetvisiblePasswordConsignment = (value) => ({
    type: types.SetvisiblePasswordConsignment,
    payload: value
})

export const SetdisableInputsUserConsignment = (value) => ({
    type: types.SetdisableInputsUserConsignment,
    payload: value
})

export const SetidClienteFacturacionConsignment = (value) => ({
    type: types.SetidClienteFacturacionConsignment,
    payload: value
})

export const SetclaveInternaConsignment = (value) => ({
    type: types.SetclaveInternaConsignment,
    payload: value
})

export const SetOpenSearchCustomerConsignment = (value) => ({
    type: types.SetOpenSearchCustomerConsignment,
    payload: value
})

export const SetidTipoClienteAddConsignment = (value) => ({
    type: types.SetidTipoClienteAddConsignment,
    payload: value
})

export const SetcedulaAddConsignment = (value) => ({
    type: types.SetcedulaAddConsignment,
    payload: value
})

export const SetnombreAddConsignment = (value) => ({
    type: types.SetnombreAddConsignment,
    payload: value
})

export const SettelefonoAddConsignment = (value) => ({
    type: types.SettelefonoAddConsignment,
    payload: value
})

export const SetemailAddConsignment = (value) => ({
    type: types.SetemailAddConsignment,
    payload: value
})

export const SetdireccionAddConsignment = (value) => ({
    type: types.SetdireccionAddConsignment,
    payload: value
})

export const CleanAddCustomerConsignment = () => ({
    type: types.CleanAddCustomerConsignment
})

export const SetOpenAddCustomerConsignment = (value) => ({
    type: types.SetOpenAddCustomerConsignment,
    payload: value
})

export const SetOpenSearchInventoryConsignment = (value) => ({
    type: types.SetOpenSearchInventoryConsignment,
    payload: value
})

export const SetAddDetalleConsignment = (value) => ({
    type: types.SetAddDetalleConsignment,
    payload: value
})

export const CleanDetalleActualConsignment = () => ({
    type: types.CleanDetalleActualConsignment
})

export const SetLotesByArticuloConsignment = (value) => ({
    type: types.SetLotesByArticuloConsignment,
    payload: value
})

export const SetPlazosConsignment = (value) => ({
    type: types.SetPlazosConsignment,
    payload: value
})

export const CleanFacturaConsignment = () => ({
    type: types.CleanFacturaConsignment
})

export const SetIsEditDetalleConsignment = (value) => ({
    type: types.SetIsEditDetalleConsignment,
    payload: value
})

export const SetAddDetalleActualConsignment = (value) => ({
    type: types.SetAddDetalleActualConsignment,
    payload: value
})

export const SetPosicionActualConsignment = (value) => ({
    type: types.SetPosicionActualConsignment,
    payload: value
})

export const SetEditDetalleConsignment = (value) => ({
    type: types.SetEditDetalleConsignment,
    payload: value
})

export const SetDeleteDetalleConsignment = (value) => ({
    type: types.SetDeleteDetalleConsignment,
    payload: value
})

export const SetactiveButtonSearchConsignment = (value) => ({
    type: types.SetactiveButtonSearchConsignment,
    payload: value
})

export const SetCedulaBuscarConsignment = (value) => ({
    type: types.SetCedulaBuscarConsignment,
    payload: value
})

export const SetNombreBuscarConsignment = (value) => ({
    type: types.SetNombreBuscarConsignment,
    payload: value
})

export const SetNumeroBuscarConsignment = (value) => ({
    type: types.SetNumeroBuscarConsignment,
    payload: value
})

export const SetListaConsignacionesConsignment = (value) => ({
    type: types.SetListaConsignacionesConsignment,
    payload: value
})

export const CleanSearchConsignment = () => ({
    type: types.CleanSearchConsignment
})

export const SetDetalleFacturaConsignment = (value) => ({
    type: types.SetDetalleFacturaConsignment,
    payload: value
})

export const SetIsEditConsignment = (value) => ({
    type: types.SetIsEditConsignment,
    payload: value
})

export const CleanConsignment = () => ({
    type: types.CleanConsignment
})

export const SetAceptaConsignacionConsignment = (value) => ({
    type: types.SetAceptaConsignacionConsignment,
    payload: value
})