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