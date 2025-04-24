import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

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

// Normal Actions
export const SetActiveButtonNewOrdenCompra = (value) => ({
    type: types.SetActiveButtonNewOrdenCompra,
    payload: value
})

export const SetActiveButtonSearchOrdenCompra = (value) => ({
    type: types.SetActiveButtonSearchOrdenCompra,
    payload: value
})

export const SetActiveButtonSaveOrdenCompra = (value) => ({
    type: types.SetActiveButtonSaveOrdenCompra,
    payload: value
})

export const SetActiveButtonDisableOrdenCompra = (value) => ({
    type: types.SetActiveButtonDisableOrdenCompra,
    payload: value
})

export const SetDisableInputsOrdenCompra = (value) => ({
    type: types.SetDisableInputsOrdenCompra,
    payload: value
})