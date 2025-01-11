import Swal from 'sweetalert2';

import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';
import { HasCartaExoneracion } from './customers';

//Action with call API
export const startSaveCartaExoneracion = ( carta ) => {

    return async ( dispatch ) => {
        
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/cartaExoneracion', carta.toJson() );
            const { status } = data;
            
            if( status === 0 ) {
                //Clean State
                dispatch( CleanStateCartaExoneracion() );
                return 'ok';
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                if(currentException.includes(','))
                {
                    return msj[3];
                } 
                
                return currentException;
                
            }

        } catch (error) {
            return error.message;
        }
        
    }
}

export const startSearchCartaExoneracion = ( cedula ) => {

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
            const { data } = await suvesaApi.post('/cartaExoneracion/BuscarCarta', { cedula });
            const { status, responses } = data;
            
            Swal.close();

            if( status === 0 ) {

                if( responses != null ) {
                     
                    //Transformacion de la fecha
                    const fechaE = responses.fechaEmision.split('T');
                    const fechaV = responses.fechaVence.split('T');
    
                    dispatch( SetSearchCartaExoneracion( {
                        ...responses , 
                        motivo : responses.idTipoExoneracion,
                        fechaEmision : fechaE[0],
                        fechaVence : fechaV[0]
                    } ) );

                    dispatch( HasCartaExoneracion( true ) );

                } else {

                    dispatch( HasCartaExoneracion( false ) );

                    Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: `El cliente con la cédula ${cedula} no tiene Carta de Exoneración`
                    });

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
                    text: 'Ocurrio un problema al buscar la carta de Exoneracion',
                });
            }
        }
        
    }
}

export const startEditCartaExoneracion = ( carta ) => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/cartaExoneracion/Actualizar', carta.toJson() );
            const { status } = data;
            
            if( status === 0 ) {
                //Clean State
                dispatch( CleanStateCartaExoneracion() );
                return 'ok';
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                if(currentException.includes(','))
                {
                    return msj[3];
                } 
                
                return currentException;
                
            }

        } catch (error) {
            return error.message;
        }
        
    }
}

export const startRemoveCartaExoneracion = ( cedula, tipo ) => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post( (tipo === 'disable') ? '/cartaExoneracion/DesactivarCarta' : '/cartaExoneracion/ActivarCarta', { cedula } );
            const { status } = data;
            
            if( status === 0 ) {
                //Clean State
                dispatch( CleanStateCartaExoneracion() );
                return 'ok';
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                if(currentException.includes(','))
                {
                    return (msj[3] === 'Mensaje:Error al eliminar un registro de carta Exoneracion|No existe un registro con los datos especificados @ProcessID:42') ? 'No aplica' :msj[3];
                } 
                
                return currentException;
                
            }

        } catch (error) {
            return error.message;
        }
        
    }
}

export const startSearchExoneracionHacienda = ( numeroDocumento ) => {

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

                dispatch( SetMotivoCartaExoneracion( tipo ) );
                dispatch( SetNumeroDocumentoCartaExoneracion( numero ) );
                dispatch( SetFechaEmisionCartaExoneracion( fechaEmision ) );
                dispatch( SetFechaVenceCartaExoneracion( fechaVence ) );
                dispatch( SetPorcentajeCompraCartaExoneracion(iva) )
                dispatch( SetImpuestoCartaExoneracion( 13 -  iva) );

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

//Normal Actions
export const SetMotivoCartaExoneracion = ( value ) => ({
    type: types.SetMotivoCartaExoneracion,
    payload: value
});

export const SetObservacionesCustomers = ( value ) => ({
    type: types.SetObservacionesCustomers,
    payload: value
});

export const SetNumeroDocumentoCartaExoneracion = ( value ) => ({
    type: types.SetNumeroDocumentoCartaExoneracion,
    payload: value
});

export const SetFechaEmisionCartaExoneracion = ( value ) => ({
    type: types.SetFechaEmisionCartaExoneracion,
    payload: value
});

export const SetFechaVenceCartaExoneracion = ( value ) => ({
    type: types.SetFechaVenceCartaExoneracion,
    payload: value
});

export const SetPorcentajeCompraCartaExoneracion = ( value ) => ({
    type: types.SetPorcentajeCompraCartaExoneracion,
    payload: value
});

export const SetImpuestoCartaExoneracion = ( value ) => ({
    type: types.SetImpuestoCartaExoneracion,
    payload: value
});

export const SetNotaCartaExoneracion = ( value ) => ({
    type: types.SetNotaCartaExoneracion,
    payload: value
});

export const CleanStateCartaExoneracion = () => ({
    type: types.CleanStateCartaExoneracion
});

export const SetSearchCartaExoneracion = ( value ) => ({
    type: types.SetSearchCartaExoneracion,
    payload: value
});