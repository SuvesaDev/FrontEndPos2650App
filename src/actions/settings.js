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

export const startGetAllTipoBonificacion = () => {

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
            // const { data } = await suvesaApi.get('/ArticuloBonificacion/CreateArticulosBonificacion');
            // const { status, response } = data;

            //Quitar el loading
            Swal.close();

            // if (status === 0) {
                
                // dispatch( SetAddAllTipoBonificacionSettings( [] ) );


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
                    text: 'Ocurrio un problema al obtener los tipos de bonificaciones',
                });
            }
        }
    }
}

export const startEditTipoBonificaciones = ( editBonificacion ) => {

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
            // const resp = await suvesaApi.post('/ArticuloBonificacion/UpdateArticulosBonificacion', { editBonificacion });
            // const { status } = resp.data;

            //Quitar el loading
            Swal.close();

            // if (status === 0) {
                
                dispatch( SetEditTipoBonificacionSettings( editBonificacion ) );

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Bonificacion editada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( SetIsEditTipoBonificacionSettings(false) );
                dispatch( SetIndexTipoBonificacionSettings(0) );

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
                    text: 'Ocurrio un problema al editar un tipo de bonificacion',
                });
            }
        }
    }
}

export const startDeleteTipoBonificaciones = ( index, idTipoBonificacion, nombre ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea eliminar el tipo bonificacion ${nombre}?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

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
                    // const { data } = await suvesaApi.delete(`/ArticuloBonificacion/DeleteArticulosBonificacion?Request=${idTipoBonificacion}`);
                    // const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    // if (status === 0) {
                        
                        dispatch( SetDeleteTipoBonificacionSettings( index ) );

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

                }

            });

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
                    text: 'Ocurrio un problema a la eliminar un tipo de bonificacion',
                });
            }
        }
    };
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

export const SetIsEditTipoBonificacionSettings = ( value ) => ({
    type: types.SetIsEditTipoBonificacionSettings,
    payload: value
});

export const SetIndexTipoBonificacionSettings = ( value ) => ({
    type: types.SetIndexTipoBonificacionSettings,
    payload: value
});

export const SetEditTipoBonificacionSettings = ( value ) => ({
    type: types.SetEditTipoBonificacionSettings,
    payload: value
});

export const SetDeleteTipoBonificacionSettings = ( value ) => ({
    type: types.SetDeleteTipoBonificacionSettings,
    payload: value
});