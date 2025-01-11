import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveBank = ( bank ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar el banco ${ bank.banco }?`,
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
                    const { data } = await suvesaApi.post('/Bancos/CrearBanco', bank);
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Banco ${ bank.banco } agregado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se ingresa nuevo banco a la tabla
                        dispatch( SetAddBancoBank( responses ) );

                        // Se limpia el banco actual
                        dispatch( SetBancoActualBank('') );

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
                        text: 'Ocurrio un problema a la guardar el banco',
                    });
                }
            }
        });
    };
}

export const startEditBank = ( bank ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el banco ${ bank.banco }?`,
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
                    const { data } = await suvesaApi.post('/Bancos/EditarBanco', bank);
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Banco ${ bank.banco } editado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        
                        // Se edita banco en la tabla
                        dispatch( SetEditBancoBank( responses ) );

                        // Se limpia el banco actual
                        dispatch( SetBancoActualBank('') );

                        // Se cambia el modo de edit
                        dispatch( SetIsEditBank(false) );

                        // Se reset el idSeleted
                        dispatch( SetIdSeletedBancoBank(0) );

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
                        text: 'Ocurrio un problema a la editar el banco',
                    });
                }
            }
        });
    };
}

export const startDisableBank = ( idBank, nameBank ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea anular el banco ${ nameBank }?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Anular',
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
                    const { data } = await suvesaApi.post(`/Bancos/InactivarBanco?id=${idBank}`);
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Banco ${ nameBank } anulado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        
                        // Se edita banco con el disable en la tabla
                        dispatch( SetEditBancoBank( responses ) );

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
                        text: 'Ocurrio un problema a la anular el banco',
                    });
                }
            }
        });
    };
}

export const startActiveBank = ( idBank, nameBank ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea activar el banco ${ nameBank }?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Activar',
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
                    const { data } = await suvesaApi.post(`/Bancos/ActivarBancos?id=${idBank}`);
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Banco ${ nameBank } activado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                        
                        // Se edita banco con el disable en la tabla
                        dispatch( SetEditBancoBank( responses ) );

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
                        text: 'Ocurrio un problema a la activar el banco',
                    });
                }
            }
        });
    };
}

export const startValidateClaveInternaBank = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
 
                // Se activan los inputs
                dispatch( SetDisableInputsBank( false ) );

                // Se establece el nameUser
                dispatch( SetNameUserBank( userName ) );

                // Se traen los bancos
                dispatch( await startGetAllBancosBank() );

                // Se cambia los icons
                dispatch( SetActiveButtonSaveBank( true ));

                dispatch( SetStartOpeningBank( true ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserBank( true ) );

                // Ocultar la password
                dispatch( SetVisiblePasswordBank( false ) );
               

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

export const startGetAllBancosBank = () => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                // Se guarda en el estado los bancos
                dispatch( SetBancosBank( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los bancos',
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
                    text: 'Ocurrio un problema al obtener los bancos',
                });
            }
        }
        
    }
}

// Normal Actions
export const SetActiveButtonSaveBank = (value) => ({
    type: types.SetActiveButtonSaveBank,
    payload: value
})

export const SetDisableInputsBank = (value) => ({
    type: types.SetDisableInputsBank,
    payload: value
})

export const SetClaveInternaBank = (value) => ({
    type: types.SetClaveInternaBank,
    payload: value
})

export const SetVisiblePasswordBank = (value) => ({
    type: types.SetVisiblePasswordBank,
    payload: value
})

export const SetDisableInputsUserBank = (value) => ({
    type: types.SetDisableInputsUserBank,
    payload: value
})

export const SetNameUserBank = (value) => ({
    type: types.SetNameUserBank,
    payload: value
})

export const SetBancosBank = (value) => ({
    type: types.SetBancosBank,
    payload: value
})

export const SetBancoActualBank = (value) => ({
    type: types.SetBancoActualBank,
    payload: value
})

export const SetAddBancoBank = (value) => ({
    type: types.SetAddBancoBank,
    payload: value
})

export const SetIsEditBank = (value) => ({
    type: types.SetIsEditBank,
    payload: value
})

export const SetIdSeletedBancoBank = (value) => ({
    type: types.SetIdSeletedBancoBank,
    payload: value
})

export const SetEditBancoBank = (value) => ({
    type: types.SetEditBancoBank,
    payload: value
})

export const SetStartOpeningBank = (value) => ({
    type: types.SetStartOpeningBank,
    payload: value
})

export const CleanStateBancosBank = () => ({
    type: types.CleanStateBancosBank
})