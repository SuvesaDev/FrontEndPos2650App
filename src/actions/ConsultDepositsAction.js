import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Actions
export const startValidateClaveInternaConsultDeposits = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
 
                // Se activan los inputs
                dispatch( SetDisableInputsConsultDeposits( false ) );

                // Se establece la fecha de hoy
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');
                dispatch( SetSearchFechaDesdeConsultPreDeposits( isoDateTime[0] ) );
                dispatch( SetSearchFechaHastaConsultPreDeposits( isoDateTime[0] ) );
                dispatch( SetSearchFechaDesdeConsultDeposits( isoDateTime[0] ) );
                dispatch( SetSearchFechaHastaConsultDeposits( isoDateTime[0] ) );

                // Se traen los cajeros, los bancos
                loadCatalogos( dispatch );

                // Se cambia los icons
                dispatch( SetActiveButtonSearchConsultDeposits( true ));

                // Se inicia openingConsultDeposito
                dispatch( SetStartOpeningConsultDeposits( true ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputUserConsultDeposits( true ) );

                // Ocultar la password
                dispatch( SetVisiblePasswordConsultDeposits( false ) );
               

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

export const startGetAllCajerosConsultDeposits = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Caja/ObtenerUsuariosCajaAbierta`);

            const { status, responses } = data;
            
            if (status === 0 && responses != null) {
                
                dispatch( SetCajerosConsultDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los cajeros.',
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
                    text: 'Ocurrio un problema al obtener los cajeros.',
                });
            }
        }
    }
}

export const startGetAllBancosConsultDeposits = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Se guarda en el estado los bancos
                dispatch( SetBancosConsultDeposits( responses ) );

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

export const startSearchPreDepositsConsultDeposits = ( searchPreDeposits ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerPreDepositos`, searchPreDeposits );

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                // Se ingresa en el estado los valores buscados
                dispatch( SetResultSearchPreDepositosConsultPreDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar los Pre Depósitos.',
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
                    text: 'Ocurrio un problema al buscar los Pre Depósitos.',
                });
            }
        }
    }
}

export const startSearchDepositsConsultDeposits = ( searchDeposits ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerDepositos`, searchDeposits );

            const { status, responses } = data;
            Swal.close();

            console.log(responses)
            if (status === 0 && responses != null) {
                
                // Se ingresa en el estado los valores buscados
                dispatch( SetResultSearchDepositosConsultPreDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar los Depósitos.',
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
                    text: 'Ocurrio un problema al buscar los Depósitos.',
                });
            }
        }
    }
}

export const startGetOnePreDepositsConsultDeposits = ( idPreDeposits ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerPreDepositoPorId?id=${idPreDeposits}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {
                console.log(responses)
                // Se ingresa en el estado los valores buscados
                dispatch( SetPreDepositoSeletedConsultDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener un Pre Depósitos.',
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
                    text: 'Ocurrio un problema al obtener un Pre Depósitos.',
                });
            }
        }
    }
}

export const startGetOneDepositsConsultDeposits = ( idDeposits ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerDepositoPorId?id=${idDeposits}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                // Se ingresa en el estado los valores buscados
                dispatch( SetDepositoSeletedConsultDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener un Depósitos.',
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
                    text: 'Ocurrio un problema al obtener un Depósitos.',
                });
            }
        }
    }
}

const loadCatalogos = async ( dispatch ) => {

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

    // Se traen las cajeros
    await dispatch( startGetAllCajerosConsultDeposits() );

    // Se traen los bancos
    await dispatch( startGetAllBancosConsultDeposits() );

    //Quitar el loading
    Swal.close();

}

// Normal Actions
export const SetActiveButtonSearchConsultDeposits = (value) => ({
    type: types.SetActiveButtonSearchConsultDeposits,
    payload: value
})

export const SetDisableInputsConsultDeposits = (value) => ({
    type: types.SetDisableInputsConsultDeposits,
    payload: value
})

export const SetClaveInternaConsultDeposits = (value) => ({
    type: types.SetClaveInternaConsultDeposits,
    payload: value
})

export const SetVisiblePasswordConsultDeposits = (value) => ({
    type: types.SetVisiblePasswordConsultDeposits,
    payload: value
})

export const SetDisableInputUserConsultDeposits = (value) => ({
    type: types.SetDisableInputUserConsultDeposits,
    payload: value
})

export const SetCurrentTabConsultDeposits = (value) => ({
    type: types.SetCurrentTabConsultDeposits,
    payload: value
})

export const SetCajerosConsultDeposits = (value) => ({
    type: types.SetCajerosConsultDeposits,
    payload: value
})

export const SetBancosConsultDeposits = (value) => ({
    type: types.SetBancosConsultDeposits,
    payload: value
})

export const SetCheckNumeroPreDepositoConsultDeposits = (value) => ({
    type: types.SetCheckNumeroPreDepositoConsultDeposits,
    payload: value
})

export const SetDisableNumeroPreDepositoConsultDeposits = (value) => ({
    type: types.SetDisableNumeroPreDepositoConsultDeposits,
    payload: value
})

export const SetCheckNumAperturaPreDepositoConsultDeposits = (value) => ({
    type: types.SetCheckNumAperturaPreDepositoConsultDeposits,
    payload: value
})

export const SetDisableNumAperturaPreDepositoConsultDeposits = (value) => ({
    type: types.SetDisableNumAperturaPreDepositoConsultDeposits,
    payload: value
})

export const SetCheckCajeroPreDepositoConsultDeposits = (value) => ({
    type: types.SetCheckCajeroPreDepositoConsultDeposits,
    payload: value
})

export const SetDisableCajeroPreDepositoConsultDeposits = (value) => ({
    type: types.SetDisableCajeroPreDepositoConsultDeposits,
    payload: value
})

export const SetCheckDepositantePreDepositoConsultDeposits = (value) => ({
    type: types.SetCheckDepositantePreDepositoConsultDeposits,
    payload: value
})

export const SetDisableDepositantePreDepositoConsultDeposits = (value) => ({
    type: types.SetDisableDepositantePreDepositoConsultDeposits,
    payload: value
})

export const SetCheckFechasPreDepositoConsultDeposits = (value) => ({
    type: types.SetCheckFechasPreDepositoConsultDeposits,
    payload: value
})

export const SetDisableFechasPreDepositoConsultDeposits = (value) => ({
    type: types.SetDisableFechasPreDepositoConsultDeposits,
    payload: value
})

export const SetCheckNumeroDepositoConsultDeposits = (value) => ({
    type: types.SetCheckNumeroDepositoConsultDeposits,
    payload: value
})

export const SetDisableNumeroDepositoConsultDeposits = (value) => ({
    type: types.SetDisableNumeroDepositoConsultDeposits,
    payload: value
})

export const SetCheckBancoConsultDeposits = (value) => ({
    type: types.SetCheckBancoConsultDeposits,
    payload: value
})

export const SetDisableBancoConsultDeposits = (value) => ({
    type: types.SetDisableBancoConsultDeposits,
    payload: value
})

export const SetCheckCajeroConsultDeposits = (value) => ({
    type: types.SetCheckCajeroConsultDeposits,
    payload: value
})

export const SetDisableCajeroConsultDeposits = (value) => ({
    type: types.SetDisableCajeroConsultDeposits,
    payload: value
})

export const SetCheckFechasConsultDeposits = (value) => ({
    type: types.SetCheckFechasConsultDeposits,
    payload: value
})

export const SetDisableFechasConsultDeposits = (value) => ({
    type: types.SetDisableFechasConsultDeposits,
    payload: value
})

export const SetSearchNumeroConsultPreDeposits = (value) => ({
    type: types.SetSearchNumeroConsultPreDeposits,
    payload: value
})

export const SetSearchNumAperturaConsultPreDeposits = (value) => ({
    type: types.SetSearchNumAperturaConsultPreDeposits,
    payload: value
})

export const SetSearchCajeroConsultPreDeposits = (value) => ({
    type: types.SetSearchCajeroConsultPreDeposits,
    payload: value
})

export const SetSearchDepositanteConsultPreDeposits = (value) => ({
    type: types.SetSearchDepositanteConsultPreDeposits,
    payload: value
})

export const SetSearchFechaDesdeConsultPreDeposits = (value) => ({
    type: types.SetSearchFechaDesdeConsultPreDeposits,
    payload: value
})

export const SetSearchFechaHastaConsultPreDeposits = (value) => ({
    type: types.SetSearchFechaHastaConsultPreDeposits,
    payload: value
})

export const SetResultSearchPreDepositosConsultPreDeposits = (value) => ({
    type: types.SetResultSearchPreDepositosConsultPreDeposits,
    payload: value
})

export const SetSearchNumeroConsultDeposits = (value) => ({
    type: types.SetSearchNumeroConsultDeposits,
    payload: value
})

export const SetSearchBancoConsultDeposits = (value) => ({
    type: types.SetSearchBancoConsultDeposits,
    payload: value
})

export const SetSearchCajeroConsultDeposits = (value) => ({
    type: types.SetSearchCajeroConsultDeposits,
    payload: value
})

export const SetSearchFechaDesdeConsultDeposits = (value) => ({
    type: types.SetSearchFechaDesdeConsultDeposits,
    payload: value
})

export const SetSearchFechaHastaConsultDeposits = (value) => ({
    type: types.SetSearchFechaHastaConsultDeposits,
    payload: value
})

export const SetResultSearchDepositosConsultPreDeposits = (value) => ({
    type: types.SetResultSearchDepositosConsultPreDeposits,
    payload: value
})

export const SetIsOpenPreDepositsModalConsultPreDeposits = (value) => ({
    type: types.SetIsOpenPreDepositsModalConsultPreDeposits,
    payload: value
})

export const SetIsOpenDepositsModalConsultDeposits = (value) => ({
    type: types.SetIsOpenDepositsModalConsultDeposits,
    payload: value
})

export const SetPreDepositoSeletedConsultDeposits = (value) => ({
    type: types.SetPreDepositoSeletedConsultDeposits,
    payload: value
})

export const CleanPreDepositoSeletedConsultDeposits = () => ({
    type: types.CleanPreDepositoSeletedConsultDeposits
})

export const SetDepositoSeletedConsultDeposits = (value) => ({
    type: types.SetDepositoSeletedConsultDeposits,
    payload: value
})

export const CleanDepositoSeletedConsultDeposits = () => ({
    type: types.CleanDepositoSeletedConsultDeposits
})

export const SetStartOpeningConsultDeposits = (value) => ({
    type: types.SetStartOpeningConsultDeposits,
    payload: value
})

export const CleanStateConsultDeposits = () => ({
    type: types.CleanStateConsultDeposits
})