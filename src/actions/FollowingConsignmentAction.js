import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

import { startGetAllSurcursales, startValidateClaveInterna } from './login';
import { startGetAllTiposFacturas } from './TiposFacturasAction';
import { startGetAllTiposIdentificacionBranch } from './TiposIdentificacionAction';
import { startGetAllMonedas } from './MonedasAction';
import { startGetAllBodegas } from './bodegasAction';

// API Actions
export const startValidateClaveInternaFollowingConsignment = ( password, catalogos ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message, aceptaConsignacion }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                //Guardar el usuario en el state
                dispatch( SetNameUserFollowingConsignment(userName));

                // Ocultar la password
                dispatch( SetVisiblePasswordFollowingConsignment(false));

                // Se establece el manejo de icons
                dispatch( SetActiveButtonFooterFollowingConsignment(true));

                // Se inicia el StartOpening
                dispatch( SetStartOpeningFollowingConsignment(true));

                // Se indica si acepta consignacion
                dispatch( SetAceptaConsignacionFollowingConsignment(aceptaConsignacion) );

                // Se cargan los catalogos
                await loadCatalogos( dispatch, catalogos );

                // Cargar las consignaciones
                await startGetAllConsignments(dispatch);

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

export const startGetAllPlazosFollowingConsignment = () => {

    return async ( dispatch ) => {
    
        try {
            
            //Call end-point 
            const { data } = await suvesaApi.get(`/ConfiguracionPlazo/getPlazos`);
            const { status, responses } = data;
            
            if( status === 0) {
               
                dispatch( SetPlazosFollowingConsignment(responses));

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

const startGetAllConsignments = async ( dispatch ) => {
    
    //Mostrar el loading
    Swal.fire({
        title: 'Por favor, espere cargando las consginaciones',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        imageUrl: loadingImage,
        customClass: 'alert-class-login',
        imageHeight: 100,
    });
    
    // Se obtiene los tipos de Facturas
    // if( catalogos.tiposFacturas === null ) {
        await dispatch( startGetAllConsignmentAprobadas() );
    // }

    // Se obtiene los tipos de Identificacion
    // if( catalogos.tiposIdentificacion.length === 0 ) {
        await dispatch( startGetAllConsignmentPendientes() )
    // }

    //Quitar el loading
    Swal.close();

}

export const startGetAllConsignmentAprobadas = () => {

    return async ( dispatch ) => {
    
        try {

            //Call end-point 
            const { data } = await suvesaApi.get(`/venta/ObtenerConsignacionEncabezadoEstado?request=true`);
            const { status, responses } = data;
            
            if( status === 0) {
            
                const consignaciones = responses.map( consginacion => {
                    return {
                        ...consginacion,
                        fecha: consginacion.fecha.split('T')[0]
                    }
                });

                dispatch( SetConsignacionesAprobadasFollowingConsignment(consignaciones));

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
                    text: 'Ocurrio un problema al obtener las consignaciones',
                });
            }
        }

    }

}

export const startGetAllConsignmentPendientes = () => {

    return async ( dispatch ) => {
    
        try {

            //Call end-point 
            const { data } = await suvesaApi.get(`/venta/ObtenerConsignacionEncabezadoEstado?request=false`);
            const { status, responses } = data;
            
            if( status === 0) {
               
                const consignaciones = responses.map( consginacion => {
                    return {
                        ...consginacion,
                        fecha: consginacion.fecha.split('T')[0]
                    }
                });

                dispatch( SetConsignacionesPendientesFollowingConsignment(consignaciones));

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
                    text: 'Ocurrio un problema al obtener las consignaciones',
                });
            }
        }

    }

}

export const startGetOneFollowingConsignment = ( idConsignacion, tipo ) => {

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

                if(responses == null) {
                    Swal.fire({
                        icon: 'warnign',
                        title: 'Advertencia',
                        text: 'No se puedo cargar correctamente la consignacion',
                    });
                }
            
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
                            CantidadMaxima : det.cantidad,
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
                            idLote: det.idLote,
                            nombreLote: det.numeroLote
                        }
                    })
                }
                
                dispatch(SetFacturaFollowingConsignment(searchConsignmet));
                dispatch(SetVisibleTabDetalleFollowingConsignment(true));
                dispatch(SetSeletedTabFollowingConsignment('DetalleConsignacion'));

                if(tipo == 'Aprobar') {
                    dispatch(SetActiveButtonAprobadoFollowingConsignment(true));
                } else if (tipo == 'Despachar') {
                    dispatch(SetActiveButtonDespacharFollowingConsignment(true));
                    dispatch(SetIsDespacharFollowingConsignment(true));
                }

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

export const startAprobadoFollowingConsignment = ( idConsignacion ) => {

    return async ( dispatch ) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea aprobar la consignacion?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Aprobar',
                denyButtonText: `Cancelar`,
                allowEnterKey: false
            }).then(async (result) => {

                if(result.isConfirmed) {
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
                    const { data } = await suvesaApi.put(`/Consignacion/AceptarRechazarConsignacion?id=${idConsignacion}`);
                    const { status, responses } = data;
                    Swal.close();
                    
                    if( status === 0 ) {

                        if(responses) {
                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Consignacion aprobada correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });

                            dispatch(SetVisibleTabDetalleFollowingConsignment(false));
                            dispatch(SetSeletedTabFollowingConsignment('ListadoConsignacion'));
                            dispatch(SetActiveButtonAprobadoFollowingConsignment(false));
                            await startGetAllConsignments(dispatch);

                        } else {


                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se puedo aprobar la consignacion'
                            });
                        }
                    
                        
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
                }

            });

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
                    text: 'Ocurrio un problema al aprobar una consignacion',
                });
            }
        }
    }
}

export const startEditDetalleActualFollowingConsignment = (detalle, index ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea editar la cantidad del articulo?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Editar',
                denyButtonText: `Cancelar`,
                allowEnterKey: false
            }).then(async (result) => {

                if (result.isConfirmed) {

                    dispatch( SetIsEditDetalleFollowingConsignment(false) );
                    dispatch( SetEditDetalleFollowingConsignment({ detalle, index }));
                    dispatch( CleanDetalleActualFollowingConsignment() );
                    dispatch( SetCantidadMaximaFollowingConsignment(0) );

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
        await dispatch( startGetAllPlazosFollowingConsignment() );
    }

    // Se obtiene las bodegas
    if( catalogos.bodegas === null ) {
        await dispatch(  startGetAllBodegas() );
    }

    //Quitar el loading
    Swal.close();

}


// Normal Actions
export const SetActiveButtonFooterFollowingConsignment = (value) => ({
    type: types.SetActiveButtonFooterFollowingConsignment,
    payload: value
})

export const SetIdUserFollowingConsignment = (value) => ({
    type: types.SetIdUserFollowingConsignment,
    payload: value
})

export const SetClaveInternaFollowingConsignment = (value) => ({
    type: types.SetClaveInternaFollowingConsignment,
    payload: value
})

export const SetNameUserFollowingConsignment = (value) => ({
    type: types.SetNameUserFollowingConsignment,
    payload: value
})

export const SetVisiblePasswordFollowingConsignment = (value) => ({
    type: types.SetVisiblePasswordFollowingConsignment,
    payload: value
})

export const SetStartOpeningFollowingConsignment = (value) => ({
    type: types.SetStartOpeningFollowingConsignment,
    payload: value
})

export const SetPlazosFollowingConsignment = (value) => ({
    type: types.SetPlazosFollowingConsignment,
    payload: value
})

export const SetVisibleTabDetalleFollowingConsignment = (value) => ({
    type: types.SetVisibleTabDetalleFollowingConsignment,
    payload: value
})

export const SetSeletedTabFollowingConsignment = (value) => ({
    type: types.SetSeletedTabFollowingConsignment,
    payload: value
})

export const SetConsignacionesAprobadasFollowingConsignment = (value) => ({
    type: types.SetConsignacionesAprobadasFollowingConsignment,
    payload: value
})

export const SetConsignacionesPendientesFollowingConsignment = (value) => ({
    type: types.SetConsignacionesPendientesFollowingConsignment,
    payload: value
})

export const SetFacturaFollowingConsignment = (value) => ({
    type: types.SetFacturaFollowingConsignment,
    payload: value
})

export const SetAprobacionConsignacionFollowingConsignment = (value) => ({
    type: types.SetAprobacionConsignacionFollowingConsignment,
    payload: value
})

export const SetSurcursalesFollowingConsignment = (value) => ({
    type: types.SetSurcursalesFollowingConsignment,
    payload: value
})

export const SetAceptaConsignacionFollowingConsignment = (value) => ({
    type: types.SetAceptaConsignacionFollowingConsignment,
    payload: value
})

export const SetActiveButtonAprobadoFollowingConsignment = (value) => ({
    type: types.SetActiveButtonAprobadoFollowingConsignment,
    payload: value
})

export const SetActiveButtonDespacharFollowingConsignment = (value) => ({
    type: types.SetActiveButtonDespacharFollowingConsignment,
    payload: value
})

export const SetIsDespacharFollowingConsignment = (value) => ({
    type: types.SetIsDespacharFollowingConsignment,
    payload: value
})

export const SetDetalleActualFollowingConsignment = (value) => ({
    type: types.SetDetalleActualFollowingConsignment,
    payload: value
})

export const SetIsEditDetalleFollowingConsignment = (value) => ({
    type: types.SetIsEditDetalleFollowingConsignment,
    payload: value
})

export const SetPosicionActualFollowingConsignment = (value) => ({
    type: types.SetPosicionActualFollowingConsignment,
    payload: value
})

export const SetCantidadFollowingConsignment = (value) => ({
    type: types.SetCantidadFollowingConsignment,
    payload: value
})

export const SetCantidadMaximaFollowingConsignment = (value) => ({
    type: types.SetCantidadMaximaFollowingConsignment,
    payload: value
})

export const SetEditDetalleFollowingConsignment = (value) => ({
    type: types.SetEditDetalleFollowingConsignment,
    payload: value
})

export const CleanDetalleActualFollowingConsignment = () => ({
    type: types.CleanDetalleActualFollowingConsignment
})

export const CleanFollowingConsignment = () => ({
    type: types.CleanFollowingConsignment
})