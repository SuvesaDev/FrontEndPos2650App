import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

import { startGetAllSurcursales, startValidateClaveInterna } from './login';
import { startGetAllTiposFacturas } from './TiposFacturasAction';
import { startGetAllTiposIdentificacionBranch } from './TiposIdentificacionAction';
import { startGetAllEmpresasBilling } from './billing';
import { startGetAllMonedas } from './MonedasAction';

// API Actions
export const startValidateClaveInternaConsignment = ( password, catalogos ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message, idUsuario }  = await dispatch( startValidateClaveInterna( password ) );
            
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

                // Se inicia el StartOpening
                dispatch( SetstartOpeningConsignment(true));

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

export const startSaveCustomerConsignment = (customer) => {

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
                    const { data } = await suvesaApi.post('/cliente/Registrar', customer);
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

    //Quitar el loading
    Swal.close();

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

export const SetPrecio_UnitOriginalDetalleConsignment = (value) => ({
    type: types.SetPrecio_UnitOriginalDetalleConsignment,
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