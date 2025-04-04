import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';
import { startGetAllSurcursales, startValidateClaveInterna } from './login';
import { startGetAllBodegas } from './bodegasAction';
import { startGetAllTiposFacturas } from './TiposFacturasAction';
import { startGetAllTiposIdentificacionBranch } from './TiposIdentificacionAction';
import { startGetAllAgentesVenta } from './AgenteVentaAction';
import { startGetAllTiposExoneracion } from './TiposExoneracionAction';
import { startGetAllMonedas } from './MonedasAction';

// API Actions
export const startSearchCustomerFacturacion = ( cedula, number, hasCoin = false ) => {

    return async (dispatch) => {

        try {
            debugger;
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
                    const customerEditBilling = {
                        identificacion: identificacion,
                        idTipoCliente: idTipoIdentificacion,
                        telefono: telefono01,
                        direccion: direccion,
                        correocuentas: e_Mail,
                        correoFacturacion: correoComprobante,
                        agente: agente,
                        actualizado: actualizado,
                        fallecido: fallecido,
                        enviaRecibo: enviarRecibo,
                        correoRecibo: correoRecibo,
                        tipoPrecio: tipoprecio,
                        descuentoEspcial: descuentoEspecial,
                        inactivo: anulado,
                        mag: mag,
                        abierto: abierto
                    }
                    
                    // Se cargar las cartas de exoneracion
                    await dispatch( startSearchCartaExoneracion( searchCedula, number ) );

                    // Se cargan los datos de facturacion
                    await dispatch( startGetDatosFacturacionByCliente( identificacion, number ) );

                    // Se establece la cedula, tipoCliente y nombre del cliente
                    dispatch( SetCedulaUsuarioBilling( { value: searchCedula, number } ) );
                    dispatch( SetIdTipoClienteBilling( { value: idTipoIdentificacion, number } ));
                    dispatch( SetNombreClienteBilling( { value: nombre, number } ));

                    // Se establece el telefono, direccion, correo comprobantes
                    dispatch( SetTelefonoBilling( { value: telefono01, number } ));
                    dispatch( SetDireccionBilling( { value: direccion, number } ));
                    dispatch( SetCorreoComprobantesBilling( { value: correoComprobante, number } ));

                    // Se establece el MAG, Fallecido, Actualizado
                    dispatch( SetMagBilling( { value: mag, number } ));
                    dispatch( SetFallecidoBilling( { value: fallecido, number } ));
                    dispatch( SetActualizadoBilling( { value: actualizado, number } ));

                    // Se establece Cliente Moroso, ObligaOrdenCompra, SinRestriccion
                    dispatch( SetClienteMorosoBilling( { value: cliente_Moroso, number } ));
                    dispatch( SetObligaOrdenCompraBilling( { value: ordenCompra, number } ));
                    dispatch( SetSinRestriccionBilling( { value: sinrestriccion, number } ));

                    // Se establece el customer Edit
                    dispatch( SetCustomerEditBilling( { value: customerEditBilling, number } ));

                    // Se establece el HasCustomerBilling
                    if (searchCedula == "000000000") {
                        dispatch( hasCustomerBilling( { value: true, number } ) );
                    } else {
                        
                        dispatch( hasCustomerBilling( { value: true, number } ) );

                        if( hasCoin ) {
                            dispatch( SetEnableItemsBilling( { value: true, number } ) );
                        }
                    }

                    // Se establece el CodCliente
                    dispatch( SetCodClienteBilling( { value: identificacion, number } ));

                    // Se establece HasHeader, OpenSearchCustomerBilling y IsEnableActiveCredito
                    dispatch( hasHeader( { value: true, number } ));
                    dispatch( OpenSearchCustomerBilling( { value: false, number } ));
                    dispatch( SetIsEnableActiveCreditoBilling( { value: abierto, number } ));

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
                            dispatch( OpenModalAddCustomer( { number } ));

                            // Se establece datos de cliente
                            dispatch( SetIdTipoClienteClienteFacturacionBilling( { value: idTipoIdentificacion, number } ));
                            dispatch( SetCedulaClienteFacturacionBilling( { value: cedula, number } ));
                            dispatch( SetNombreClienteFacturacionBilling( { value: nombre, number } ));
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

export const startSaveCustomerFacturacion = (customer, number) => {

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

                    console.log(customer)
                    //Call end-point 
                    const { data } = await suvesaApi.post('/cliente', customer);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Clean State
                        dispatch( CleanClienteFacturacionBilling( { number } ));

                        //Close modal
                        dispatch( CloseModalAddCustomer( { number } ));

                        // Cargar el numero cliente
                        dispatch(startSearchCustomerFacturacion( customer.cedula, number ));

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

export const startEditCustomerFacturacion = (customer, cedula, number ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el cliente?`,
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
                    const { data } = await suvesaApi.post('/cliente/ActualizarClienteFacturacion', customer);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Cliente editado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        })

                        // Se cierre el modal 
                        dispatch( CloseModalEditCustomer({ number }) );

                        dispatch( startSearchCustomerFacturacion( cedula, number));

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
                        text: 'Ocurrio un problema al editar cliente'
                    });
                }

            }

        });
    }
}

export const startGetCorreosComprobanteFacturacion = ( idCliente, number ) => {

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
            const { data } = await suvesaApi.post(`/cliente/ObtenerEmailsComprobantes?id=${idCliente}`, {});
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                
                const { mensaje, correos } = responses;

                if (mensaje === null) {
                    
                    const correosGuardar = correos.map(c => {
                        return {
                            correoComprobante: c.correo
                        }
                    });
                    
                    //Clean State
                    dispatch(SetAllCorreoComprobantesBilling( { value: correosGuardar, number } ));
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
                    text: 'Ocurrio un problema al buscar los correos comprobantes del cliente',
                });
            }
        }

    }
}

export const startSaveCorreosComprobanteFacturacion = (correos, cedula, number ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar estos correos?',
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
                    const { data } = await suvesaApi.post('/cliente/ActualizarEmailsComprobantes', correos);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        // Close modal
                        dispatch(OpenAddCorreosModalBilling( { value: false, number } ));

                        //Clean State
                        dispatch(CleanCorreoComprobantesBilling( { number } ));
                        dispatch(IsCorreoComprobanteEditBilling( { value: false, number } ));
                        dispatch(CleanSeletedCorreoComprobantesBilling( { number } ));
                        dispatch(CleanCorreoComprobanteActualBilling( { number } ));

                        // Cargar el numero cliente
                        dispatch(startSearchCustomerFacturacion(cedula, number))

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Correos agregados correctamente',
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
                        text: 'Ocurrio un problema al registrar los correos comprobantes',
                    });
                }
            }

        });

    }
}

export const startGetOneInventoryBillingByCodArticulo = ( cod_Articulo, parametros, number ) => {

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
            const { data } = await suvesaApi.post('/inventario/ObtenerUnInventarioCod_Articulo', { cod_Articulo });
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {

                const { codigo } = responses;
                
                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch( SetCodArticuloDetalleActualBilling( { value: responses.cod_Articulo, number } ));
                dispatch( SetDescripcionDetalleActualBilling( { value: responses.descripcion, number } ));
                dispatch( SetPrecio_UnitDetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetPrecio_UnitOriginalDetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetImpuestoDetalleActualBilling( { value: responses.iVenta, number } ));
                dispatch( SetImpuestoOriginalDetalleActualBilling( { value: responses.iVenta, number } ));
                dispatch( SetExistenciasDetalleActualBilling( { value: responses.existencia, number } ));
                dispatch( SetPrecioADetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetPrecioBDetalleActualBilling( { value: responses.precio_B, number } ));
                dispatch( SetPrecioCDetalleActualBilling( { value: responses.precio_C, number } ));
                dispatch( SetPrecioDDetalleActualBilling( { value: responses.precio_D, number } ));
                dispatch( SetPrecioPromoDetalleActualBilling( { value: responses.precio_Promo, number } ));
                dispatch( SetPromoActivaDetalleActualBilling( { value: responses.promo_Activa, number } ));
                dispatch( SetPromoIniciaDetalleActualBilling( { value: responses.promo_Inicio, number } ));
                dispatch( SetPromoFinalizaDetalleActualBilling( { value: responses.promo_Finaliza, number } ));
                dispatch( SetMaxDescuentoDetalleActualBilling( { value: responses.max_Descuento, number } ));
                dispatch( SetMagDetalleActualBilling( { value: responses.mag, number } ));
                dispatch( SetSinDecimalDetalleActualBilling( { value: responses.sinDecimal, number } ));
                dispatch( SetSoloContadoDetalleActualBilling( { value: responses.soloContado, number } ));
                dispatch( SetRecetaDetalleActualBilling( { value: responses.receta, number } ));
                dispatch( SetConsignacionDetalleActualBilling( { value: responses.consignacion, number } ));
                dispatch( SetId_BodegaDetalleActualBilling( { value: responses.id_Bodega, number } ));
                dispatch( SetExistenciaBodegaDetalleActualBilling( { value: responses.existenciaBodega, number } ));
                dispatch( SetCodigoDetalleActualBilling( { value: responses.codigo, number } ));

                // Se calculan los totales del producto
                calculateTotalsProductCurrent( responses, parametros, number, dispatch );

                dispatch( SetautoFocusPrecioUnitBilling( { value: true, number }));
                dispatch( SetautoFocusDescBilling( { value: false, number }));
                dispatch( SetautoFocusCantidadBilling( { value: false, number }));
                dispatch( SetautoFocusCodigoBilling( { value: false, number }));

                dispatch(startGetLotesByArticle( codigo, number));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');
     
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'El código de producto ingresado no es válido.'
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

export const startGetOneInventoryBilling = ( codigo, parametros, number ) => {

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
                
                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch( SetCodArticuloDetalleActualBilling( { value: responses.cod_Articulo, number } ));
                dispatch( SetDescripcionDetalleActualBilling( { value: responses.descripcion, number } ));
                dispatch( SetPrecio_UnitDetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetPrecio_UnitOriginalDetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetImpuestoDetalleActualBilling( { value: responses.iVenta, number } ));
                dispatch( SetImpuestoOriginalDetalleActualBilling( { value: responses.iVenta, number } )); 
                dispatch( SetExistenciasDetalleActualBilling( { value: responses.existencia, number } ));
                dispatch( SetPrecioADetalleActualBilling( { value: responses.precio_A, number } ));
                dispatch( SetPrecioBDetalleActualBilling( { value: responses.precio_B, number } ));
                dispatch( SetPrecioCDetalleActualBilling( { value: responses.precio_C, number } ));
                dispatch( SetPrecioDDetalleActualBilling( { value: responses.precio_D, number } ));
                dispatch( SetPrecioPromoDetalleActualBilling( { value: responses.precio_Promo, number } ));
                dispatch( SetPromoActivaDetalleActualBilling( { value: responses.promo_Activa, number } ));
                dispatch( SetPromoIniciaDetalleActualBilling( { value: responses.promo_Inicio, number } ));
                dispatch( SetPromoFinalizaDetalleActualBilling( { value: responses.promo_Finaliza, number } ));
                dispatch( SetMaxDescuentoDetalleActualBilling( { value: responses.max_Descuento, number } ));
                dispatch( SetMagDetalleActualBilling( { value: responses.mag, number } ));
                dispatch( SetSinDecimalDetalleActualBilling( { value: responses.sinDecimal, number } ));
                dispatch( SetSoloContadoDetalleActualBilling( { value: responses.soloContado, number } ));
                dispatch( SetRecetaDetalleActualBilling( { value: responses.receta, number } ));
                dispatch( SetConsignacionDetalleActualBilling( { value: responses.consignacion, number } ));
                dispatch( SetId_BodegaDetalleActualBilling( { value: responses.id_Bodega, number } ));
                dispatch( SetExistenciaBodegaDetalleActualBilling( { value: responses.existenciaBodega, number } ));
                dispatch( SetCodigoDetalleActualBilling( { value: responses.codigo, number } ));

                // Se calculan los totales de producto
                calculateTotalsProductCurrent( responses, parametros, number, dispatch );

                dispatch( SetautoFocusPrecioUnitBilling( { value: true, number }));
                dispatch( SetautoFocusDescBilling( { value: false, number }));
                dispatch( SetautoFocusCantidadBilling( { value: false, number }));
                dispatch( SetautoFocusCodigoBilling( { value: false, number }));

                dispatch(startGetLotesByArticle( codigo, number));

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

export const startAddDetalleActualBilling = ( detalle, number ) => {

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

                dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

                dispatch( SetChangeDetalleBilling( { value: true, number } ));
                dispatch( SetAddDetalleBilling( { value: detalle, number } ));
                dispatch( CleanDetalleActualBilling( { number } ));

                dispatch( SetLotesByArticuloBilling({ value: [], number }) );

                dispatch( SetautoFocusPrecioUnitBilling( { value: false, number } ));
                dispatch( SetautoFocusDescBilling( { value: false, number } ));
                dispatch( SetautoFocusCantidadBilling( { value: false, number } ));
                dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

            }

        });
    }
}

export const startEditDetalleBilling = (detalle, index, number ) => {

    return async (dispatch) => {

        dispatch( SetEditDetalleBilling({ detalle, index, number }) );

    }
}

export const startEditDetalleActualBilling = (detalle, index, number ) => {

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

                    dispatch( SetautoFocusCantidadBilling( { value: false, number } ));
                    dispatch( SetautoFocusCodigoBilling( { value: true, number } ));

                    dispatch( SetIsEditDetalleActualBilling( { value: false, number } ));
                    dispatch( SetChangeDetalleBilling( { value: true, number } ));
                    dispatch( SetEditDetalleBilling({ detalle, index, number}));
                    dispatch( CleanDetalleActualBilling( { number } ));

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

export const startDeleteDetalleActualBilling = ( deleteLinea, number ) => {

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

                dispatch( SetDeleteDetalleBilling( { value: deleteLinea, number } ) );
                
                dispatch( SetExtranjeroBilling( { value: false, number } ) );
            }

        });
    }
}

export const startSaveBilling = ( factura, number ,datosCliente,idSucursalOF) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar la factura?',
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
                        
                        if (factura.tipo == 1 || factura.tipo == 5 || factura.tipo == 7) {
                            const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
                            const { responses, status } = data;
    
                            const datosPDF = {
                                numFactura: id,
                                datosSucursal: responses,
                                datosCliente: datosCliente,
                                datosFactura: factura,
                            }
    
                            Swal.fire({
                                icon: 'success',
                                title: 'Factura de crédito agrega correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });
    
                            dispatch(SetDatosImprimirCreditoBilling(datosPDF))
                            dispatch( CleanBilling( { number } ) );
                        } else{

                            Swal.fire({
                                icon: 'success',
                                title: 'Factura agrega correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            dispatch( CleanBilling( { number } ) );

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
                        text: 'Ocurrio un problema al agregar la factura',
                    });
                }
            }
        });
    };
}

export const startEditBilling = ( factura, number ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea editar la factura?',
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
                            title: 'Factura editada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        
                        dispatch( CleanBilling( { number } ) );

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

export const startSearchCartaExoneracion = (cedula, number) => {

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
            const { data } = await suvesaApi.post('/cartaExoneracion/BuscarCarta', { cedula });
            const { status, responses } = data;

            Swal.close();

            if (status === 0) {

                if (responses != null) {

                    // Se obtiene los valores de la Carta
                    const { 
                        id, 
                        cedula, 
                        idTipoExoneracion, 
                        numeroDocumento, 
                        fechaEmision, 
                        fechaVence, 
                        porcentajeCompra, 
                        impuesto, 
                        nota, 
                        estado 
                    } = responses;

                    //Transformacion de la fecha
                    const fechaE = fechaEmision.split('T');
                    const fechaV = fechaVence.split('T');

                    dispatch( SetIdCartaBilling( { value: id, number } ) );
                    dispatch( SetCedulaCartaBilling( { value: cedula, number } ) );
                    dispatch( SetidTipoExoneracionCartaBilling( { value: idTipoExoneracion, number } ) );
                    dispatch( SetNumeroDocumentoCartaBilling( { value: numeroDocumento, number } ) );
                    dispatch( SetFechaEmisionCartaBilling( { value: fechaE[0], number } ) );
                    dispatch( SetFechaVenceCartaBilling( { value: fechaV[0], number } ) );
                    dispatch( SetPorcentajeCompraCartaBilling( { value: porcentajeCompra, number } ) );
                    dispatch( SetImpuestoCartaBilling( { value: impuesto, number } ) );
                    dispatch( SetNotaCartaBilling( { value: nota, number } ) );
                    dispatch( SetEstadoCartaBilling( { value: estado, number } ) );
                    dispatch( SetHasCartaExoneracionBilling( { value: true, number } ) );

                    return 'ok';

                } else {

                    var date = new Date();
                    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

                    dispatch( SetIdCartaBilling( { value: 0, number } ) );
                    dispatch( SetCedulaCartaBilling( { value: '', number } ) );
                    dispatch( SetidTipoExoneracionCartaBilling( { value: 1, number } ) );
                    dispatch( SetNumeroDocumentoCartaBilling( { value: '', number } ) );
                    dispatch( SetFechaEmisionCartaBilling( { value: isoDateTime[0], number } ) );
                    dispatch( SetFechaVenceCartaBilling( { value: isoDateTime[0], number } ) );
                    dispatch( SetPorcentajeCompraCartaBilling( { value: '', number } ) );
                    dispatch( SetImpuestoCartaBilling( { value: '', number } ) );
                    dispatch( SetNotaCartaBilling( { value: '', number } ) );
                    dispatch( SetEstadoCartaBilling( { value: '', number } ) );
                    dispatch( SetHasCartaExoneracionBilling( { value: false, number } ) );

                }

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException === 'Object reference not set to an instance of an object.') ? 'Error al carga la carta de Exoneracion o el cliente no tiene carta' : currentException,
                });

            }

        } catch (error) {

            Swal.close();
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
                    text: 'Ocurrio un problema al buscar la carta de Exoneracion',
                });
            }
        }

        return ''

    }
}

export const startEditCartaExoneracion = (carta, number) => {

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
            const { data } = await suvesaApi.post('/cartaExoneracion/Actualizar', carta.toJson());
            const { status } = data;

            Swal.close();

            if (status === 0) {

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Carta Exoneracion editada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( SetActualizoCarta( { value: true, number } ) );
                dispatch( CloseModalEditCartaExoneracion( { number } ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
                });

            }

        } catch (error) {

            Swal.close();
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
                    text: 'Ocurrio un problema al editar la carta de Exoneracion',
                });
            }
        }

    }
}

export const startSaveCartaExoneracion = ( carta, number) => {

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
            console.log(carta)
            //Call end-point 
            const { data } = await suvesaApi.post('/cartaExoneracion', carta.toJson());
            const { status } = data;

            Swal.close();

            if (status === 0) {

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Carta Exoneracion creada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( SetActualizoCarta( { value: true, number } ) );
                dispatch( CloseModalEditCartaExoneracion( { number } ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
                });

            }

        } catch (error) {

            Swal.close();
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
                    text: 'Ocurrio un problema al editar la carta de Exoneracion',
                });
            }
        }

    }
}

export const startSearchCustomerMAG = (cedula, number) => {

    return async (dispatch) => {

        try {
            
            if (cedula == "0" || cedula == "" || cedula == "000000000") return;

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando cliente en MAG',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.get(`/Hacienda/MAG/CedulaMAG?dato=${cedula}`,);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0 ) {

                if( responses !== null ) {

                    const { nombre, estado, fechabaja, activaMag } = responses;

                    if( nombre !== null ) {
                        //Meterlo al estado
                        dispatch( SetClienteMAGBilling( {
                            value: {
                                nombre, 
                                estado : (estado) ? 'Activo' : 'Inactivo', 
                                fechabaja : fechabaja.split('T'),
                                activaMag
                            },
                            number
                        } ) );
                    } else {
                        // Mostrar mensaje de cliente no esta en mag
                        Swal.fire({
                            icon: 'info',
                            title: 'Cliente NO Encontrado',
                            text:  `El cliente ${cedula} no esta registrado en MAG`,
                        });

                        dispatch( CloseModalMAGCustomer( { number } ) );
                    }
                } else {
                    // Mostrar mensaje de cliente no esta en mag
                    Swal.fire({
                        icon: 'info',
                        title: 'Cliente NO Encontrado',
                        text:  `El cliente ${cedula} no esta registrado en MAG`,
                    });

                    dispatch( CloseModalMAGCustomer( { number } ) );
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
                    text: 'Ocurrio un problema al buscar un cliente en MAG',
                });
            }
        }

    }
}

export const startSearchExoneracionHaciendaBilling = ( numeroDocumento, number ) => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando Numero de documento',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.get(`/Hacienda/Mag/CedulaExoneracion?dato=${numeroDocumento}` );
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {

                const { tipo, numero, fechaEmision, fechaVence, iva } = responses;

                dispatch( SetidTipoExoneracionCartaBilling( { value: tipo, number } ) );
                dispatch( SetNumeroDocumentoCartaBilling( { value: numero, number } ) );
                dispatch( SetFechaEmisionCartaBilling( { value: fechaEmision, number } ) );
                dispatch( SetFechaVenceCartaBilling( { value: fechaVence, number }  ) );
                dispatch( SetPorcentajeCompraCartaBilling( { value: iva, number } ) )
                dispatch( SetImpuestoCartaBilling( { value: 13 - iva, number } ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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
                    text: 'Ocurrio un problema al buscar una exonaracion en Hacienda',
                });
            }
        }
        
    }
}

export const startValidateClaveInternaBilling = ( password, number,  catalogos ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message, idUsuario, costapets }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {


                // Validar si el usuario tiene una caja abierta
                // const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');
                // const users = resp.data.responses;

                // if( users.length === 0 ) {
                //     Swal.fire({
                //         icon: 'warning',
                //         title: 'Advertencia',
                //         text: 'No existen usuarios con caja abierta.'
                //     });

                //     return;
                // }

                // const userResult = users.find( u => u.id === parseInt(idUsuario) && u.nombre === userName );
                // if( userResult === undefined ) {
                //     Swal.fire({
                //         icon: 'warning',
                //         title: 'Advertencia',
                //         text: 'Este usuario no presenta ninguna caja abierta. Por favor intentalo con otro usuario'
                //     });

                //     return
                // }


                // Se activan los inputs
                dispatch( SetDisableInputsHeaderBilling( { value: false, number } ) );

                //Guardar el usuario en el state
                dispatch( SetUsuarioBilling( { value: userName, number } ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserBilling( { value: true, number } ) );

                // Ocultar la password
                dispatch( SetVisibleClaveInternaBilling( { value: false, number } ) );

                // Se establece el manejo de icons
                dispatch( SetActiveButtonSaveBilling( { value: true, number } ) );

                // Se inicia el StartOpening
                dispatch( SetStartOpeningBilling( { value: true, number } ) );

                // dispatch( SetNumCajaBilling( userResult.numCaja ) );

                // dispatch( SetNumAperturaBilling( userResult.idApertura ) );

                // Se define si es Costa Pets
                dispatch( SetIsCostaPetsBilling({ value: costapets, number }) );

                // Se obtiene la ficha
                await dispatch( startGetOneFichaBilling( number ) );

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

export const startGetOneFichaBilling = ( number ) => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere cargando ficha',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.post(`/Fichas/ObtenerFicha?sucursal=1`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {

                const { numero } = responses;

                // Se guarda en el estado la ficha
                dispatch( SetFichaBilling( { value: numero, number }  ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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
                    text: 'Ocurrio un problema al obtener la ficha',
                });
            }
        }
        
    }
}

export const startGetAllEmpresasBilling = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerEmpresasFacturacion`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const empresas = responses.map( empresa => {
                    return {
                        id: empresa.id,
                        nombre: empresa.nombre
                    }
                });

                // Se guarda en el estado las empresas
                dispatch( SetInsertEmpresasBilling( empresas ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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
                    text: 'Ocurrio un problema al obtener las empresas',
                });
            }
        }
        
    }
}

export const startSearchPreventaBilling = ( ficha, fecha, number ) => {

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
            const { data } = await suvesaApi.post(`/venta/ObtenerPreventaPorFicha?ficha=${ficha}&fecha=${fecha}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                // Se activa el IsPreventaEdit
                dispatch( SetIsPreventaEditBilling( { value: true, number } ) );

                // Se activa el startEditing
                dispatch( SetStartEditingBilling( { value: true, number } ) );

                const searchPreventa = {
                    encabezado: {                    
                        id : responses.id,
                        num_Factura : responses.numFactura,
                        fecha : responses.fecha,
                        NumeroCaja : responses.numCaja,
                        tipo : responses.tipo,
                        cod_Cliente : responses.codCliente,
                        idTipoCliente : responses.idTipoCliente, //TODO: DUDA
                        nombre_Cliente : responses.cliente,
                        cedula_Usuario : responses.cedula,
                        direccion : responses.direccion, //TODO: DUDA
                        telefono : responses.telefono, //TODO: DUDA
                        observaciones : responses.observaciones,
                        empresa : responses.idEmpresa,
                        correoComprobantes : responses.correoComprobantes, //TODO: DUDA
                        Cod_Moneda : responses.codMoneda,
                        Orden : responses.orden,
                        Taller : responses.taller,
                        Mascotas : responses.mascotas,
                        agente : responses.agente,
                        cod_agente : responses.cod_agente,
                        PD : responses.pd,
                        SubTotalGravada : responses.subTotalGravada,
                        SubTotalExento : responses.subTotalExento,
                        SubTotal : responses.subTotal,
                        Descuento : responses.descuento,
                        Imp_Venta : responses.impVenta,
                        MontoCupon : responses.MontoCupon, //TODO: DUDA
                        Exonerar : responses.exonerar,
                        Total : responses.total,
                        mag : responses.mag, //TODO: DUDA
                        fallecido : responses.fallecido, //TODO: DUDA
                        actualizado : responses.actualizado, //TODO: DUDA
                        cliente_Moroso : responses.cliente_Moroso, //TODO: DUDA
                        ordenCompra : responses.ordenCompra, //TODO: DUDA
                        sinrestriccion : responses.sinrestriccion, //TODO: DUDA
                        ficha : responses.ficha,
                        preventa : responses.preventa,
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
                            SubtotalGravado : det.subtotalGravado,
                            SubTotalExcento : det.subTotalExcento,
                            SubTotal : det.subTotal,
                            CantVet : det.cantVen,
                            CantBod : det.cantBod,
                            Id_Bodega : det.idBodega,
                        }
                    })
                }

                // Se guarda en el estado la preventa
                dispatch( SetInsertPreventaBilling( { value: searchPreventa, number } ) );

                // Se busca el cliente
                dispatch( startSearchCustomerFacturacion( searchPreventa.encabezado.cedula_Usuario, number, true ) );

                // Se activa el hasHeader
                dispatch( hasHeader( { value: true, number } ) );

                // Se activa el hasCustomerBilling
                dispatch( hasCustomerBilling( { value: true, number } ) );

                // Se limpia el searchFicha
                dispatch( SetSearchFichaBilling( { value: '', number } ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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
                    text: 'Ocurrio un problema al buscar una preventa por ficha',
                });
            }
        }
        
    }
}

export const startGetPorcentajeExtranjeroBilling = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Configuracion/PorcentajeExtrajero`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Se guarda en el estado el porcentaje de extranjero
                dispatch( SetAumentoEntrajeroBilling( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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
                    text: 'Ocurrio un problema al obtener el porcentaje de extranjero',
                });
            }
        }
        
    }
}

export const startDeleteLineDetalleBilling = ( deleteLinea, number ) => {

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
                            dispatch( SetDeleteDetalleBilling( { value: deleteLinea, number } ) );
                            
                            // Se desactiva el extranjero
                            dispatch( SetExtranjeroBilling( { value: false, number } ) );

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

export const startGetLotesByArticle = (codigoPrincipal, number, activeLoading = false) => {

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

            dispatch( SetLotesByArticuloBilling({ value: [], number }) );

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

                dispatch( SetLotesByArticuloBilling({ value: lotes, number }) );
                dispatch( SetIdLoteDetalleActualBilling({ value: loteProximoVencer.id, number }) );
                dispatch( SetNombreLoteDetalleActualBilling({ value: loteProximoVencer.lote, number }) );

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

                    dispatch( SetLotesByArticuloBilling([]) );

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

export const startGetDatosFacturacionByCliente = (idCliente, number,) => {

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
            const { data } = await suvesaApi.get(`/cliente/ObtenerDatosFacturacionCliente?idCliente=${idCliente}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if( status === 0) {
                
                // const lotes = responses.map( lot => {
                //     return {
                //         id: lot.id,
                //         lote: lot.lote,
                //         vencimiento: lot.vencimiento.split('T')[0],
                //         existencia: lot.cantidad
                //     }
                // });
                console.log(responses)
                dispatch( SetDatosFacturacionByClienteBilling({ value: responses, number }) );

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
                    text: 'Ocurrio un problema al obtener los datos facturacion del cliente',
                });
            }
        }

    }

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

    // Se obtiene las bodegas
    if( catalogos.bodegas === null ) {
        await dispatch(  startGetAllBodegas() );
    }
    
    // Se obtiene los tipos de Facturas
    if( catalogos.tiposFacturas === null ) {
        await dispatch( startGetAllTiposFacturas() );
    }

    // Se obtiene los tipos de Identificacion
    if( catalogos.tiposIdentificacion.length === 0 ) {
        await dispatch( startGetAllTiposIdentificacionBranch() )
    }

    // Se obtiene las empresas
    if( catalogos.empresas.length === 0 ) {
        await dispatch( startGetAllEmpresasBilling() );
    }

    // Se obtiene las surcursales
    if( catalogos.surcursales.length === 0 ) {
        await dispatch( startGetAllSurcursales() )
    }

    // Se obtiene las aumento extranjero
    if( catalogos.aumentoExtranjero === 0 ) {
        await dispatch( startGetPorcentajeExtranjeroBilling() )
    }

    // Se obtiene los agentes
    if( catalogos.agentes === null ) {
        await dispatch( startGetAllAgentesVenta() );
    }

    // Se obtiene los tipos Exoneracion
    if( catalogos.tiposExoneracion === null ) {
        await dispatch( startGetAllTiposExoneracion() );
    }

    // Se obtiene las monedas
    if( catalogos.monedas === null ) {
        await dispatch( startGetAllMonedas() );
    }

    //Quitar el loading
    Swal.close();

}

// Private method Calcula los totales de producto buscado
const calculateTotalsProductCurrent = ( detalleArticuloActual, parametros, number, dispatch) => {
    
    //cuando se agrega un articulo o se cambia el precio, descuento o cantidad
    //se calcualan los subtotales, desuentos e impuestos del producto
    if ( detalleArticuloActual.codigo > 0) {
        
        let precio    = parseFloat( detalleArticuloActual.precio_A );
        let cantidad  = 1;
        let impuesto  = parseFloat( detalleArticuloActual.iVenta );
        let descuento = 0;

        //Diferentes precios
        switch ( parametros.tipoPrecio ) {

            case 1:

                precio = detalleArticuloActual.precio_A;
                dispatch( SetPrecio_UnitDetalleActualBilling( { value: detalleArticuloActual.precio_A, number } ));

                //Aplica precio promocion.
                if ( detalleArticuloActual.promo_Activa === true) {

                    var inicio = new Date( detalleArticuloActual.promo_Inicio );
                    var final  = new Date( detalleArticuloActual.promo_Finaliza );
                    var hoy    = new Date();

                    var i = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');
                    var f = new Date(final.getTime() - (final.getTimezoneOffset() * 60000)).toISOString().split('T');
                    var h = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

                    //   hoy >= inicio    hoy <= final
                    if (h[0] >= i[0] && h[0] <= f[0]) {
                        precio = detalleArticuloActual.promo_Inicio; //cambia el precio del producto al precio promocion
                        dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));
                    }
                }
                break;

            case 2:

                precio = detalleArticuloActual.precio_B;

                if (precio === 0) {
                    precio = detalleArticuloActual.precio_A;
                }

                dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));

                break;

            case 3:

                precio = detalleArticuloActual.precio_C;

                if (precio === 0) {
                    precio = detalleArticuloActual.precio_A
                }

                dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));

                break;

            case 4:

                precio = detalleArticuloActual.precio_D;

                if (precio === 0) {
                    precio = detalleArticuloActual.precio_A
                }

                dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));

                break;

            default:

                precio = detalleArticuloActual.precio_A;
                dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));
        };

        if (parseFloat( parametros.Cod_Moneda ) === 2) {
            precio = precio / parametros.dollar;
            dispatch( SetPrecio_UnitDetalleActualBilling( { value: precio, number } ));
        }

        //Exoneraciones y Tarifas Reducidas del IVA
        if ( parametros.HasCartaExoneracionBilling == true) {

            //comprobar si la carta esta vencida      
            var vence = new Date( parametros.cartaBilling.fechaVence );
            var hoy = new Date();

            var a = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
            var b = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split('T');

            if (a[0] >= b[0]) { //si no esta vencida                      
                if ( impuesto >= parametros.cartaBilling.porcentajeCompra ) {
                    impuesto = impuesto - parametros.cartaBilling.porcentajeCompra;
                } else {
                    impuesto = 0;
                }
            }

        } else {

            if ( detalleArticuloActual.Mag == true 
                    && parametros.mag == true) {
                //Si el cliente esta inscrito en el Mag y el producto es agricola 
                //Se aplica una tarifa reducida del IVA del 1%.
                impuesto = 1;
            }
        }

        //Si el producto es de Consignacion
        if ( detalleArticuloActual.Consignacion == true) { 

            if ( detalleArticuloActual.Existencias >= cantidad) {

                //Primero usa las existencia de la veterinaria
                dispatch( SetCantVetDetalleActualBilling( { value: cantidad, number } ));
                dispatch( SetCantBodDetalleActualBilling( { value: 0, number } ));

            } else {

                if ( detalleArticuloActual.Existencias > 0) {

                    // Usa las existencias de la veterinaria y lo que falta de la bodega de consignacion
                    dispatch( SetCantVetDetalleActualBilling( { value: detalleArticuloActual.Existencias, number } ));
                    dispatch( SetCantBodDetalleActualBilling( { value: cantidad - detalleArticuloActual.Existencias, number }));

                } else {

                    //usa solo la existencia de la bodega de consignacion
                    dispatch( SetCantVetDetalleActualBilling( { value: 0, number } ) );
                    dispatch( SetCantBodDetalleActualBilling( { value: cantidad, number } ) );
                }

            }
        }

        var resulDescuento = (precio * cantidad) * (descuento / 100);
        var resulImpuesto = ((precio * cantidad) - resulDescuento) * (impuesto / 100);

        dispatch( SetImpuestoDetalleActualBilling( { value: parseFloat(impuesto), number } ));
        dispatch( SetMonto_DescuentoDetalleActualBilling( { value: resulDescuento, number } ));
        dispatch( SetMonto_ImpuestoDetalleActualBilling( { value: resulImpuesto, number } ));

        //SubTotal
        dispatch( SetSubTotalDetalleActualBilling( { value: precio * cantidad, number } ));

        if (impuesto > 0) {
            dispatch( SetSubtotalGravadoDetalleActualBilling( { value: precio * cantidad, number } ));
            dispatch( SetSubTotalExcentoDetalleActualBilling( { value: 0, number } ));
        } else {
            dispatch( SetSubtotalGravadoDetalleActualBilling( { value: 0, number } ));
            dispatch( SetSubTotalExcentoDetalleActualBilling( { value: precio * cantidad, number } ));
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

    const fechaProximaVencer = futuras.length > 0 ? futuras.reduce((a, b) => a < b ? a : b).toISOString().split('T')[0] : null;

    return lotes.find( lot => lot.vencimiento == fechaProximaVencer);
}

// Normal Actions
export const SetAddArrayStateBilling = (value) => ({
    type: types.SetAddArrayStateBilling,
    payload: value
})

export const SetRemoveArrayStateBilling = (value) => ({
    type: types.SetRemoveArrayStateBilling,
    payload: value
})

export const SetActiveButtonSaveBilling = (value) => ({
    type: types.SetActiveButtonSaveBilling,
    payload: value
})

export const SetCedulaBuscarBilling = (value) => ({
    type: types.SetCedulaBuscarBilling,
    payload: value
})

export const OpenModalAddCustomer = (value) => ({ 
    type: types.billingOpenModelAddCustomer,
    payload: value
});

export const CloseModalAddCustomer = (value) => ({ 
    type: types.billingCloseModelAddCustomer,
    payload: value
});

export const OpenModalEditCustomer = (value) => ({ 
    type: types.billingOpenModelEditCustomer,
    payload: value
});

export const CloseModalEditCustomer = (value) => ({ 
    type: types.billingCloseModelEditCustomer,
    payload: value
});

export const OpenModalEditCartaExoneracion = (value) => ({ 
    type: types.billingOpenModelEditCartaExoneracion,
    payload: value
});

export const CloseModalEditCartaExoneracion = (value) => ({ 
    type: types.billingCloseModelEditCartaExoneracion,
    payload: value
});

export const OpenModalMAGCustomer = (value) => ({ 
    type: types.billingOpenModelMAGCustomer,
    payload: value
});

export const CloseModalMAGCustomer = (value) => ({ 
    type: types.billingCloseModelMAGCustomer,
    payload: value
});

export const SetCodClienteBilling = (value) => ({
    type: types.SetCodClienteBilling,
    payload: value
})

export const SetIdTipoClienteBilling = (value) => ({
    type: types.SetIdTipoClienteBilling,
    payload: value
})

export const SetNombreClienteBilling = (value) => ({
    type: types.SetNombreClienteBilling,
    payload: value
})

export const SetCedulaUsuarioBilling = (value) => ({
    type: types.SetCedulaUsuarioBilling,
    payload: value
})

export const SetDireccionBilling = (value) => ({
    type: types.SetDireccionBilling,
    payload: value
})

export const SetTelefonoBilling = (value) => ({
    type: types.SetTelefonoBilling,
    payload: value
})

export const SetObservacionesBilling = (value) => ({
    type: types.SetObservacionesBilling,
    payload: value
})

export const SetEmpresaBilling = (value) => ({
    type: types.SetEmpresaBilling,
    payload: value
})

export const SetCorreoComprobantesBilling = (value) => ({
    type: types.SetCorreoComprobantesBilling,
    payload: value
})

export const SetIdTipoClienteClienteFacturacionBilling = (value) => ({
    type: types.SetIdTipoClienteClienteFacturacionBilling,
    payload: value
})

export const SetCedulaClienteFacturacionBilling = (value) => ({
    type: types.SetCedulaClienteFacturacionBilling,
    payload: value
})

export const SetNombreClienteFacturacionBilling = (value) => ({
    type: types.SetNombreClienteFacturacionBilling,
    payload: value
})

export const SetTelefonoClienteFacturacionBilling = (value) => ({
    type: types.SetTelefonoClienteFacturacionBilling,
    payload: value
})

export const SetEmailClienteFacturacionBilling = (value) => ({
    type: types.SetEmailClienteFacturacionBilling,
    payload: value
})

export const SetDireccionClienteFacturacionBilling = (value) => ({
    type: types.SetDireccionClienteFacturacionBilling,
    payload: value
})

export const SetMagBilling = (value) => ({
    type: types.SetMagBilling,
    payload: value
})

export const SetFallecidoBilling = (value) => ({
    type: types.SetFallecidoBilling,
    payload: value
})

export const SetActualizadoBilling = (value) => ({
    type: types.SetActualizadoBilling,
    payload: value
})

export const SetClienteMorosoBilling = (value) => ({
    type: types.SetClienteMorosoBilling,
    payload: value
})

export const SetObligaOrdenCompraBilling = (value) => ({
    type: types.SetObligaOrdenCompraBilling,
    payload: value
})

export const SetSinRestriccionBilling = (value) => ({
    type: types.SetSinRestriccionBilling,
    payload: value
})

export const CleanClienteFacturacionBilling = (value) => ({
    type: types.CleanClienteFacturacionBilling,
    payload: value
})

export const OpenSearchCustomerBilling = (value) => ({
    type: types.OpenSearchCustomerBilling,
    payload: value
})

export const hasCustomerBilling = (value) => ({
    type: types.hasCustomerBilling,
    payload: value
})

export const SetCustomerEditBilling = (value) => ({
    type: types.SetCustomerEditBilling,
    payload: value
})

export const SetIdTipoClienteCustomerEditBilling = (value) => ({
    type: types.SetIdTipoClienteCustomerEditBilling,
    payload: value
})

export const SetTelefonoCustomerEditBilling = (value) => ({
    type: types.SetTelefonoCustomerEditBilling,
    payload: value
})

export const SetEmailCustomerEditBilling = (value) => ({
    type: types.SetEmailCustomerEditBilling,
    payload: value
})

export const SetDireccionCustomerEditBilling = (value) => ({
    type: types.SetDireccionCustomerEditBilling,
    payload: value
})

export const SetCorreocuentasCustomerEditBilling = (value) => ({
    type: types.SetCorreocuentasCustomerEditBilling,
    payload: value
})

export const SetCorreoFacturacionCustomerEditBilling = (value) => ({
    type: types.SetCorreoFacturacionCustomerEditBilling,
    payload: value
})

export const SetAgenteCustomerEditBilling = (value) => ({
    type: types.SetAgenteCustomerEditBilling,
    payload: value
})

export const SetSinAgenteCustomerEditBilling = (value) => ({
    type: types.SetSinAgenteCustomerEditBilling,
    payload: value
})

export const SetActualizadoCustomerEditBilling = (value) => ({
    type: types.SetActualizadoCustomerEditBilling,
    payload: value
})

export const SetFallecidoCustomerEditBilling = (value) => ({
    type: types.SetFallecidoCustomerEditBilling,
    payload: value
})

export const SetEnviaReciboCustomerEditBilling = (value) => ({
    type: types.SetEnviaReciboCustomerEditBilling,
    payload: value
})

export const SetCorreoReciboCustomerEditBilling = (value) => ({
    type: types.SetCorreoReciboCustomerEditBilling,
    payload: value
})

export const SetTipoPrecioCustomerEditBilling = (value) => ({
    type: types.SetTipoPrecioCustomerEditBilling,
    payload: value
})

export const SetDescuentoEspcialCustomerEditBilling = (value) => ({
    type: types.SetDescuentoEspcialCustomerEditBilling,
    payload: value
})

export const SetInactivoCustomerEditBilling = (value) => ({
    type: types.SetInactivoCustomerEditBilling,
    payload: value
})

export const SetMagCustomerEditBilling = (value) => ({
    type: types.SetMagCustomerEditBilling,
    payload: value
})

export const OpenAddCorreosModalBilling = (value) => ({
    type: types.OpenAddCorreosModalBilling,
    payload: value
})

export const SetCorreoComprobanteActualBilling = (value) => ({
    type: types.SetCorreoComprobanteActualBilling,
    payload: value
})

export const CleanCorreoComprobanteActualBilling = (value) => ({
    type: types.CleanCorreoComprobanteActualBilling,
    payload: value
})

export const SetAddCorreoComprobantesBilling = (value) => ({
    type: types.SetAddCorreoComprobantesBilling,
    payload: value
})

export const CleanCorreoComprobantesBilling = (value) => ({
    type: types.CleanCorreoComprobantesBilling,
    payload: value
})

export const IsCorreoComprobanteEditBilling = (value) => ({
    type: types.IsCorreoComprobanteEditBilling,
    payload: value
})

export const SetEditCorreoComprobantesBilling = (value) => ({
    type: types.SetEditCorreoComprobantesBilling,
    payload: value
})

export const SeletedCorreoComprobantesBilling = (value) => ({
    type: types.SeletedCorreoComprobantesBilling,
    payload: value
})

export const CleanSeletedCorreoComprobantesBilling = (value) => ({
    type: types.CleanSeletedCorreoComprobantesBilling,
    payload: value
})

export const SetAllCorreoComprobantesBilling = (value) => ({
    type: types.SetAllCorreoComprobantesBilling,
    payload: value
})

export const SetOrdenEncabezadoBilling = (value) => ({
    type: types.SetOrdenEncabezadoBilling,
    payload: value
})

export const SetCod_MonedaEncabezadoBilling = (value) => ({
    type: types.SetCod_MonedaEncabezadoBilling,
    payload: value
})

export const SetagenteEncabezadoBilling = (value) => ({
    type: types.SetagenteEncabezadoBilling,
    payload: value
})

export const SetCod_AgenteEncabezadoBilling = (value) => ({
    type: types.SetCod_AgenteEncabezadoBilling,
    payload: value
})

export const SetPDEncabezadoBilling = (value) => ({
    type: types.SetPDEncabezadoBilling,
    payload: value
})

export const SetTipoEncabezadoBilling = (value) => ({
    type: types.SetTipoEncabezadoBilling,
    payload: value
})

export const SetSubTotalGravadaBilling = (value) => ({
    type: types.SetSubTotalGravadaBilling,
    payload: value
})

export const SetSubTotalExentoBilling = (value) => ({
    type: types.SetSubTotalExentoBilling,
    payload: value
})

export const SetSubTotalBilling = (value) => ({
    type: types.SetSubTotalBilling,
    payload: value
})

export const SetDescuentoBilling = (value) => ({
    type: types.SetDescuentoBilling,
    payload: value
})

export const SetImp_VentaBilling = (value) => ({
    type: types.SetImp_VentaBilling,
    payload: value
})

export const SetMontoCuponBilling = (value) => ({
    type: types.SetMontoCuponBilling,
    payload: value
})

export const SetExonerarBilling = (value) => ({
    type: types.SetExonerarBilling,
    payload: value
})

export const SetTotalBilling = (value) => ({
    type: types.SetTotalBilling,
    payload: value
})

export const SetFichaBilling = (value) => ({
    type: types.SetFichaBilling,
    payload: value
})

export const SetPreventaBilling = (value) => ({
    type: types.SetPreventaBilling,
    payload: value
})

export const SetUsuarioBilling = (value) => ({
    type: types.SetUsuarioBilling,
    payload: value
})

export const SetDatoFacturacionBilling = (value) => ({
    type: types.SetDatoFacturacionBilling,
    payload: value
})

export const SetCodigoDetalleActualBilling = (value) => ({
    type: types.SetCodigoDetalleActualBilling,
    payload: value
})

export const SetCodArticuloDetalleActualBilling = (value) => ({
    type: types.SetCodArticuloDetalleActualBilling,
    payload: value
})

export const SetDescripcionDetalleActualBilling = (value) => ({
    type: types.SetDescripcionDetalleActualBilling,
    payload: value
})

export const SetCantidadDetalleActualBilling = (value) => ({
    type: types.SetCantidadDetalleActualBilling,
    payload: value
})

export const SetPrecio_UnitDetalleActualBilling = (value) => ({
    type: types.SetPrecio_UnitDetalleActualBilling,
    payload: value
})

export const SetDescuentoDetalleActualBilling = (value) => ({
    type: types.SetDescuentoDetalleActualBilling,
    payload: value
})

export const SetMonto_DescuentoDetalleActualBilling = (value) => ({
    type: types.SetMonto_DescuentoDetalleActualBilling,
    payload: value
})

export const SetImpuestoDetalleActualBilling = (value) => ({
    type: types.SetImpuestoDetalleActualBilling,
    payload: value
})

export const SetMonto_ImpuestoDetalleActualBilling = (value) => ({
    type: types.SetMonto_ImpuestoDetalleActualBilling,
    payload: value
})

export const SetExistenciasDetalleActualBilling = (value) => ({
    type: types.SetExistenciasDetalleActualBilling,
    payload: value
})

export const SetSubtotalGravadoDetalleActualBilling = (value) => ({
    type: types.SetSubtotalGravadoDetalleActualBilling,
    payload: value
})

export const SetSubTotalExcentoDetalleActualBilling = (value) => ({
    type: types.SetSubTotalExcentoDetalleActualBilling,
    payload: value
})

export const SetSubTotalDetalleActualBilling = (value) => ({
    type: types.SetSubTotalDetalleActualBilling,
    payload: value
})

export const SetAddDetalleActualBilling = (value) => ({
    type: types.SetAddDetalleActualBilling,
    payload: value
})

export const SetPrecioADetalleActualBilling = (value) => ({
    type: types.SetPrecioADetalleActualBilling,
    payload: value
})

export const SetPrecioBDetalleActualBilling = (value) => ({
    type: types.SetPrecioBDetalleActualBilling,
    payload: value
})

export const SetPrecioCDetalleActualBilling = (value) => ({
    type: types.SetPrecioCDetalleActualBilling,
    payload: value
})

export const SetPrecioDDetalleActualBilling = (value) => ({
    type: types.SetPrecioDDetalleActualBilling,
    payload: value
})

export const SetPrecioPromoDetalleActualBilling = (value) => ({
    type: types.SetPrecioPromoDetalleActualBilling,
    payload: value
})

export const SetPromoActivaDetalleActualBilling = (value) => ({
    type: types.SetPromoActivaDetalleActualBilling,
    payload: value
})

export const SetPromoIniciaDetalleActualBilling = (value) => ({
    type: types.SetPromoIniciaDetalleActualBilling,
    payload: value
})

export const SetPromoFinalizaDetalleActualBilling = (value) => ({
    type: types.SetPromoFinalizaDetalleActualBilling,
    payload: value
})

export const SetMaxDescuentoDetalleActualBilling = (value) => ({
    type: types.SetMaxDescuentoDetalleActualBilling,
    payload: value
})

export const SetMagDetalleActualBilling = (value) => ({
    type: types.SetMagDetalleActualBilling,
    payload: value
})

export const SetSinDecimalDetalleActualBilling = (value) => ({
    type: types.SetSinDecimalDetalleActualBilling,
    payload: value
})

export const SetSoloContadoDetalleActualBilling = (value) => ({
    type: types.SetSoloContadoDetalleActualBilling,
    payload: value
})

export const SetRecetaDetalleActualBilling = (value) => ({
    type: types.SetRecetaDetalleActualBilling,
    payload: value
})

export const SetImpuestoOriginalDetalleActualBilling = (value) => ({
    type: types.SetImpuestoOriginalDetalleActualBilling,
    payload: value
})

export const SetConsignacionDetalleActualBilling = (value) => ({
    type: types.SetConsignacionDetalleActualBilling,
    payload: value
})

export const SetId_BodegaDetalleActualBilling = (value) => ({
    type: types.SetId_BodegaDetalleActualBilling,
    payload: value
})

export const SetExistenciaBodegaDetalleActualBilling = (value) => ({
    type: types.SetExistenciaBodegaDetalleActualBilling,
    payload: value
})

export const SetCantVetDetalleActualBilling = (value) => ({
    type: types.SetCantVetDetalleActualBilling,
    payload: value
})

export const SetCantBodDetalleActualBilling = (value) => ({
    type: types.SetCantBodDetalleActualBilling,
    payload: value
})

export const SetPrecio_UnitOriginalDetalleActualBilling = (value) => ({
    type: types.SetPrecio_UnitOriginalDetalleActualBilling,
    payload: value
})

export const SetIdLoteDetalleActualBilling = (value) => ({
    type: types.SetIdLoteDetalleActualBilling,
    payload: value
})

export const SetNombreLoteDetalleActualBilling = (value) => ({
    type: types.SetNombreLoteDetalleActualBilling,
    payload: value
})

export const SetOpenSearchInventoryBilling = (value) => ({
    type: types.SetOpenSearchInventoryBilling,
    payload: value
})

export const SetautoFocusPrecioUnitBilling = (value) => ({
    type: types.SetautoFocusPrecioUnitBilling,
    payload: value
})

export const SetautoFocusDescBilling = (value) => ({
    type: types.SetautoFocusDescBilling,
    payload: value
})

export const SetautoFocusCantidadBilling = (value) => ({
    type: types.SetautoFocusCantidadBilling,
    payload: value
})

export const SetAddDetalleBilling = (value) => ({
    type: types.SetAddDetalleBilling,
    payload: value
})

export const SetIdCartaBilling = (value) => ({
    type: types.SetIdCartaBilling,
    payload: value
});

export const SetCedulaCartaBilling = (value) => ({
    type: types.SetCedulaCartaBilling,
    payload: value
});

export const SetidTipoExoneracionCartaBilling = (value) => ({
    type: types.SetidTipoExoneracionCartaBilling,
    payload: value
});

export const SetNumeroDocumentoCartaBilling = (value) => ({
    type: types.SetNumeroDocumentoCartaBilling,
    payload: value
});

export const SetFechaEmisionCartaBilling = (value) => ({
    type: types.SetFechaEmisionCartaBilling,
    payload: value
});

export const SetDatosImprimirCreditoBilling = (value) => ({
    type: types.SetDatosImprimirCreditoBilling,
    payload: value
});


export const SetFechaVenceCartaBilling = (value) => ({
    type: types.SetFechaVenceCartaBilling,
    payload: value
});

export const SetPorcentajeCompraCartaBilling = (value) => ({
    type: types.SetPorcentajeCompraCartaBilling,
    payload: value
});

export const SetImpuestoCartaBilling = (value) => ({
    type: types.SetImpuestoCartaBilling,
    payload: value
});

export const SetNotaCartaBilling = (value) => ({
    type: types.SetNotaCartaBilling,
    payload: value
});

export const SetEstadoCartaBilling = (value) => ({
    type: types.SetEstadoCartaBilling,
    payload: value
});

export const CleanStateCartaBilling = () => ({
    type: types.CleanStateCartaBilling
});

export const SetSearchCartaBilling = (value) => ({
    type: types.SetSearchCartaBilling,
    payload: value
});

export const SetHasCartaExoneracionBilling = (value) => ({
    type: types.SetHasCartaExoneracionBilling,
    payload: value
});

export const CleanBilling = (value) => ({
    type: types.CleanBilling,
    payload: value
});
export const SetEditDetalleBilling = (value) => ({
    type: types.SetEditDetalleBilling,
    payload: value
})

export const SetDeleteDetalleBilling = (value) => ({
    type: types.SetDeleteDetalleBilling,
    payload: value
})

export const SetIsEnableActiveCreditoBilling = (value) => ({
    type: types.SetIsEnableActiveCreditoBilling,
    payload: value
})

export const SetIsEditDetalleActualBilling = (value) => ({
    type: types.SetIsEditDetalleActualBilling,
    payload: value
})

export const SetIsDeleteDetalleActualBilling = (value) => ({
    type: types.SetIsDeleteDetalleActualBilling,
    payload: value
})

export const SetDetalleArticuloDeleteBilling = (value) => ({
    type: types.SetDetalleArticuloDeleteBilling,
    payload: value
})

export const CleanDetalleArticuloDeleteBilling = () => ({
    type: types.CleanDetalleArticuloDeleteBilling
})

export const SetChangeDetalleBilling = (value) => ({
    type: types.SetChangeDetalleBilling,
    payload: value
})

export const CleanDetalleActualBilling = (value) => ({
    type: types.CleanDetalleActualBilling,
    payload: value
})

export const SetautoFocusCodigoBilling = (value) => ({
    type: types.SetautoFocusCodigoBilling,
    payload: value
})

export const hasHeader = (value) => ({
    type: types.hasHeader,
    payload: value
})

export const SetDescuentoGeneral = (value) => ({
    type: types.SetDescuentoGeneral,
    payload: value
})

export const SetAplicaDescuento = (value) => ({
    type: types.SetAplicaDescuento,
    payload: value
})

export const SetActualizoCarta = (value) => ({
    type: types.SetActualizoCarta,
    payload: value
})

export const SetPosicionActual = (value) => ({
    type: types.SetPosicionActual,
    payload: value
})

export const SetClienteMAGBilling = (value) => ({
    type: types.SetClienteMAGBilling,
    payload: value
})

export const CleanClienteMAGBilling = () => ({
    type: types.CleanClienteMAGBilling
})

export const SetIdUserFacturacionBilling = (value) => ({
    type: types.SetIdUserFacturacionBilling,
    payload: value
})

export const SetClaveInternaFacturacionBilling = (value) => ({
    type: types.SetClaveInternaFacturacionBilling,
    payload: value
})

export const SetDisableInputsHeaderBilling = (value) => ({
    type: types.SetDisableInputsHeaderBilling,
    payload: value
})

export const SetVisibleClaveInternaBilling = (value) => ({
    type: types.SetVisibleClaveInternaBilling,
    payload: value
})

export const SetDisableInputsUserBilling = (value) => ({
    type: types.SetDisableInputsUserBilling,
    payload: value
})

export const SetInsertEmpresasBilling = (value) => ({
    type: types.SetInsertEmpresasBilling,
    payload: value
})

export const SetSearchFichaBilling = (value) => ({
    type: types.SetSearchFichaBilling,
    payload: value
})

export const SetInsertPreventaBilling = (value) => ({
    type: types.SetInsertPreventaBilling,
    payload: value
})

export const SetIsPreventaEditBilling = (value) => ({
    type: types.SetIsPreventaEditBilling,
    payload: value
})

export const SetStartEditingBilling = (value) => ({
    type: types.SetStartEditingBilling,
    payload: value
})

export const SetAumentoEntrajeroBilling = (value) => ({
    type: types.SetAumentoEntrajeroBilling,
    payload: value
})



export const SetExtranjeroBilling = (value) => ({
    type: types.SetExtranjeroBilling,
    payload: value
})

export const SetEnableItemsBilling = (value) => ({
    type: types.SetEnableItemsBilling,
    payload: value
})

export const SetStartOpeningBilling = (value) => ({
    type: types.SetStartOpeningBilling,
    payload: value
})

export const SetShowInfoMessageBilling = (value) => ({
    type: types.SetShowInfoMessageBilling,
    payload: value
})

export const SetNumCajaBilling = (value) => ({
    type: types.SetNumCajaBilling,
    payload: value
})


export const SetNumAperturaBilling = (value) => ({
    type: types.SetNumAperturaBilling,
    payload: value
})

export const SetIsCostaPetsBilling = (value) => ({
    type: types.SetIsCostaPetsBilling,
    payload: value
})

export const SetLotesByArticuloBilling = (value) => ({
    type: types.SetLotesByArticuloBilling,
    payload: value
})

export const SetDatosFacturacionByClienteBilling = (value) => ({
    type: types.SetDatosFacturacionByClienteBilling,
    payload: value
})
