import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Actions
// export const startGetAllFamilias = () => {

//     return async (dispatch) => {

//         try {

//             //Mostrar el loading
//             Swal.fire({
//                 title: 'Por favor, espere',
//                 allowEscapeKey: false,
//                 allowOutsideClick: false,
//                 showConfirmButton: false,
//                 imageUrl: loadingImage,
//                 customClass: 'alert-class-login',
//                 imageHeight: 100,
//             });
            
//             //Call end-point 
//             const { data } = await suvesaApi.get('/Familias/getFamilias');
//             const { status, responses } = data;
            
//             //Quitar el loading
//             Swal.close();

//             if (status === 0) {

//                 // Se ingresa nuevo banco a la tabla
//                 dispatch( SetAllFamiliasFamily( responses ) );

//             } else {

//                 //Caso contrario respuesta incorrecto mostrar mensaje de error
//                 const { currentException } = data;
//                 const msj = currentException.split(',');

//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: (currentException.includes(',')) ? msj[3] : currentException,
//                 });

//             }

//         } catch (error) {

//             Swal.close();
//             console.log(error);
//             if (error.message === 'Request failed with status code 401') {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Usuario no valido',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Ocurrio un problema a la guardar el banco',
//                 });
//             }
//         }
//     };
// }

export const startValidateClaveInternaBonificaciones = ( password ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                dispatch( SetNameUserBonificaciones(userName) );
                dispatch( SetVisibleClaveInternaBonificaciones(false) );
                dispatch( SetDisableInputsUserBonificaciones(true) );
                dispatch( SetDisableInputsBonificaciones(false) );

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

// Normal Actions
export const SetDisableInputsBonificaciones = (value) => ({
    type: types.SetDisableInputsBonificaciones,
    payload: value
})

export const CleanStateBonificaciones = () => ({
    type: types.CleanStateBonificaciones
})

export const SetClaveInternaBonificaciones = (value) => ({
    type: types.SetClaveInternaBonificaciones,
    payload: value
})

export const SetVisibleClaveInternaBonificaciones = (value) => ({
    type: types.SetVisibleClaveInternaBonificaciones,
    payload: value
})

export const SetDisableInputsUserBonificaciones = (value) => ({
    type: types.SetDisableInputsUserBonificaciones,
    payload: value
})

export const SetNameUserBonificaciones = (value) => ({
    type: types.SetNameUserBonificaciones,
    payload: value
})