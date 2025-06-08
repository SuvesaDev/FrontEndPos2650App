import Swal from 'sweetalert2';

import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startGetSettings = () => {
   
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
            const { data } = await suvesaApi.post(`/ConfiguracionCostaPets/ObtenerConfiguracion`);
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                const { porcentajeClienteProntoPago } = responses;
                dispatch( SetPorcentajeProntoPagoSettings( porcentajeClienteProntoPago ) );

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
                    text: 'Ocurrio un problema al obtener configuracion de Costa Pets',
                });
            }
        }
    }
}

export const startUpdatePorcentajePagoProntoSettings = ( cantidad ) => {
   
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
            const { data } = await suvesaApi.post(`/ConfiguracionCostaPets/PutConfiguration?Cantidad=${cantidad}`);
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Porcentaje Pronto Pago',
                    text: `Se cambio el Porcentaje Pronto Pago Cliente correctamente.`,
                    timer: 1000,
                    showConfirmButton: false
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
                    text: 'Ocurrio un problema al actualizar el porcentaje de pronto pago clientes',
                });
            }
        }
    }
}

export const startAddNewTipoBonificacion = ( newTipoBonificacion ) => {

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
            // const { data } = await suvesaApi.post('/ArticuloBonificacion/CreateArticulosBonificacion', { newBonificacion });
            // const { status } = data;

            //Quitar el loading
            Swal.close();

            // if (status === 0) {
                
                dispatch( SetAddOneTipoBonificacionSettings( newTipoBonificacion ) );

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Bonificacion ingresada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( CleanTipoBonificacionSettings() );

            // } else {

            //     //Caso contrario respuesta incorrecto mostrar mensaje de error
            //     const { currentException } = data;
            //     const msj = currentException.split(',');

            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: (currentException.includes(',')) ? msj[3] : currentException,
            //     });

            // }

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

// Normal Actions
export const SelectTabSettings = ( nameTab ) => ({
    type: types.SelectTabSettings,
    payload: {
        nameTab
    }
});

export const SetPorcentajeProntoPagoSettings = ( value ) => ({
    type: types.SetPorcentajeProntoPagoSettings,
    payload: value
});

export const SetNombreTipoBonificacionSettings = ( value ) => ({
    type: types.SetNombreTipoBonificacionSettings,
    payload: value
});

export const SetDescripcionTipoBonificacionSettings = ( value ) => ({
    type: types.SetDescripcionTipoBonificacionSettings,
    payload: value
});

export const SetActivoTipoBonificacionSettings = ( value ) => ({
    type: types.SetActivoTipoBonificacionSettings,
    payload: value
});

export const SetAddAllTipoBonificacionSettings = ( value ) => ({
    type: types.SetAddAllTipoBonificacionSettings,
    payload: value
});

export const SetAddOneTipoBonificacionSettings = ( value ) => ({
    type: types.SetAddOneTipoBonificacionSettings,
    payload: value
});

export const CleanTipoBonificacionSettings = () => ({
    type: types.CleanTipoBonificacionSettings
});