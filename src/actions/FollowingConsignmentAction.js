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

                if(!aceptaConsignacion) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'El usuario no esta habilitado para ver el siguimiento de las consignaciones.'
                    });
    
                    return;
                }

                //Guardar el usuario en el state
                dispatch( SetNameUserFollowingConsignment(userName));

                // Ocultar la password
                dispatch( SetVisiblePasswordFollowingConsignment(false));

                // Se establece el manejo de icons
                dispatch( SetActiveButtonFooterFollowingConsignment(true));

                // Se inicia el StartOpening
                dispatch( SetStartOpeningFollowingConsignment(true));

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

                console.log(consignaciones)

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

                console.log(consignaciones)

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