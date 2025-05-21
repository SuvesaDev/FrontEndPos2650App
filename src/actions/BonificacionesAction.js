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

export const startGetOneInventoryBonificaciones = (codigo) => {

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
            const resp = await suvesaApi.post('/inventario/ObtenerUnInventario', { codigo });
            const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                
                const { codigo, descripcion } = responses;
                
                // Seleccinarlo y meterlo en el estado
                dispatch( SetIdArticuloBonificaciones(codigo) );
                dispatch( SetNombreArticuloBonificaciones(descripcion) );

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

export const startAddNewBonificaciones = ( newBonificacion ) => {

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

            //Call end-point //TODO: Falta el end-point
            // const resp = await suvesaApi.post('', { newBonificacion });
            // const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            // if (status === 0) {
                
                dispatch( SetAddOneBonificacionBonificaciones( newBonificacion ) );

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Bonificacion ingresada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( SetCleanBonificaciones() );

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

export const startEditBonificaciones = ( editBonificacion ) => {

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

            //Call end-point //TODO: Falta el end-point
            // const resp = await suvesaApi.post('', { newBonificacion });
            // const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            // if (status === 0) {
                
                dispatch( SetEditBonificaciones( editBonificacion ) );

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Bonificacion editada correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                dispatch( SetIsEditBonificaciones(false) );

                dispatch( SetCleanBonificaciones() );

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

export const startDeleteBonificaciones = ( index, nombreArticulo ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea eliminar la bonificacion del articulo ${nombreArticulo}?`,
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
                    // const { data } = await suvesaApi.delete(`/subFamilias/deleteSubFamilia?idSubFamilia=${idSubFamilia}`);
                    // const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    // if (status === 0) {
                        
                    //     // Se ingresa nuevo banco a la tabla
                    dispatch( SetDeleteBonificaciones( index ) );

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
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
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

export const SetCantidadRequeridaBonificaciones = (value) => ({
    type: types.SetCantidadRequeridaBonificaciones,
    payload: value
})

export const SetBonificacionBonificaciones = (value) => ({
    type: types.SetBonificacionBonificaciones,
    payload: value
})

export const SetIdArticuloBonificaciones = (value) => ({
    type: types.SetIdArticuloBonificaciones,
    payload: value
})

export const SetNombreArticuloBonificaciones = (value) => ({
    type: types.SetNombreArticuloBonificaciones,
    payload: value
})

export const SetAddOneBonificacionBonificaciones = (value) => ({
    type: types.SetAddOneBonificacionBonificaciones,
    payload: value
})

export const SetAddAllBonificaciones = (value) => ({
    type: types.SetAddAllBonificaciones,
    payload: value
})

export const SetIsOpenModalSearchBonificaciones = (value) => ({
    type: types.SetIsOpenModalSearchBonificaciones,
    payload: value
})

export const SetCleanBonificaciones = () => ({
    type: types.SetCleanBonificaciones
})

export const SetIsEditBonificaciones = (value) => ({
    type: types.SetIsEditBonificaciones,
    payload: value
})

export const SetEditBonificaciones = (value) => ({
    type: types.SetEditBonificaciones,
    payload: value
})

export const SetIndexSeletedBonificaciones = (value) => ({
    type: types.SetIndexSeletedBonificaciones,
    payload: value
})

export const SetDeleteBonificaciones = (value) => ({
    type: types.SetDeleteBonificaciones,
    payload: value
})