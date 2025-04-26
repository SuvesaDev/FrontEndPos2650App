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

export const SetNumeroOrdenCompra = (value) => ({
    type: types.SetNumeroOrdenCompra,
    payload: value
})

export const SetIdProveedorOrdenCompra = (value) => ({
    type: types.SetIdProveedorOrdenCompra,
    payload: value
})

export const SetNombreProveedorOrdenCompra = (value) => ({
    type: types.SetNombreProveedorOrdenCompra,
    payload: value
})

export const SetFechaEntregaOrdenCompra = (value) => ({
    type: types.SetFechaEntregaOrdenCompra,
    payload: value
})

export const SetNombreEntregaOrdenCompra = (value) => ({
    type: types.SetNombreEntregaOrdenCompra,
    payload: value
})

export const SetMonedaOrdenCompra = (value) => ({
    type: types.SetMonedaOrdenCompra,
    payload: value
})

export const SetFormaPagoContadoOrdenCompra = (value) => ({
    type: types.SetFormaPagoContadoOrdenCompra,
    payload: value
})

export const SetFormaPagoCreditoOrdenCompra = (value) => ({
    type: types.SetFormaPagoCreditoOrdenCompra,
    payload: value
})

export const SetCantidadDiasOrdenCompra = (value) => ({
    type: types.SetCantidadDiasOrdenCompra,
    payload: value
})

export const SetArticulosOrdenCompra = (value) => ({
    type: types.SetArticulosOrdenCompra,
    payload: value
})

export const SetTotalSubGravadoOrdenCompra = (value) => ({
    type: types.SetTotalSubGravadoOrdenCompra,
    payload: value
})

export const SetTotalSubExentoOrdenCompra = (value) => ({
    type: types.SetTotalSubExentoOrdenCompra,
    payload: value
})

export const SetTotalSubTotalOrdenCompra = (value) => ({
    type: types.SetTotalSubTotalOrdenCompra,
    payload: value
})

export const SetTotalDescuentoOrdenCompra = (value) => ({
    type: types.SetTotalDescuentoOrdenCompra,
    payload: value
})

export const SetTotalImpuestosOrdenCompra = (value) => ({
    type: types.SetTotalImpuestosOrdenCompra,
    payload: value
})

export const SetTotalFinalOrdenCompra = (value) => ({
    type: types.SetTotalFinalOrdenCompra,
    payload: value
})

export const SetIdArticuloArticuloOrdenCompra = (value) => ({
    type: types.SetIdArticuloArticuloOrdenCompra,
    payload: value
})

export const SetCodigoArticuloOrdenCompra = (value) => ({
    type: types.SetCodigoArticuloOrdenCompra,
    payload: value
})

export const SetDescripcionArticuloOrdenCompra = (value) => ({
    type: types.SetDescripcionArticuloOrdenCompra,
    payload: value
})

export const SetPrecioUnitarioArticuloOrdenCompra = (value) => ({
    type: types.SetPrecioUnitarioArticuloOrdenCompra,
    payload: value
})

export const SetFletesArticuloOrdenCompra = (value) => ({
    type: types.SetFletesArticuloOrdenCompra,
    payload: value
})

export const SetCostoArticuloOrdenCompra = (value) => ({
    type: types.SetCostoArticuloOrdenCompra,
    payload: value
})

export const SetDescuentoArticuloOrdenCompra = (value) => ({
    type: types.SetDescuentoArticuloOrdenCompra,
    payload: value
})

export const SetImpuestoArticuloOrdenCompra = (value) => ({
    type: types.SetImpuestoArticuloOrdenCompra,
    payload: value
})

export const SetCantidadArticuloOrdenCompra = (value) => ({
    type: types.SetCantidadArticuloOrdenCompra,
    payload: value
})

export const SetSubtotalArticuloOrdenCompra = (value) => ({
    type: types.SetSubtotalArticuloOrdenCompra,
    payload: value
})

export const SetObservacionesArticuloOrdenCompra = (value) => ({
    type: types.SetObservacionesArticuloOrdenCompra,
    payload: value
})

export const CleanStateOrdenCompra = () => ({
    type: types.CleanStateOrdenCompra
})