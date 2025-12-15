import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveRole = ( role ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar el role ${ role.nombre }?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {

                if (result.isConfirmed) {

                    dispatch( SetAddRolesRole(role) );
                    dispatch( SetNombreRoleActualRole('') );
                    dispatch( SetDescripcionRoleActualRole('') );
                    dispatch( CleanModulosModuloActualRole() );

                    // //Mostrar el loading
                    // Swal.fire({
                    //     title: 'Por favor, espere',
                    //     allowEscapeKey: false,
                    //     allowOutsideClick: false,
                    //     showConfirmButton: false,
                    //     imageUrl: loadingImage,
                    //     customClass: 'alert-class-login',
                    //     imageHeight: 100,
                    // });
                    
                    // //Call end-point 
                    // const { data } = await suvesaApi.post('/Bancos/CrearBanco', bank);
                    // const { status, responses } = data;
                    
                    // //Quitar el loading
                    // Swal.close();

                    // if (status === 0) {
                        
                    //     //Si es correcta entonces mostrar un mensaje de afirmacion
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: `Banco ${ bank.banco } agregado correctamente`,
                    //         showConfirmButton: false,
                    //         timer: 2500
                    //     });

                    //     // Se ingresa nuevo banco a la tabla
                    //     dispatch( SetAddBancoBank( responses ) );

                    //     // Se limpia el banco actual
                    //     dispatch( SetBancoActualBank('') );

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

export const startValidateClaveInternaRole = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
 
                // Se activan los inputs
                dispatch( SetDisableInputsRole( false ) );

                // Se establece el nameUser
                dispatch( SetNameUserRole( userName ) );

                // Se traen los roles y pantallas
                // dispatch( await startGetAllBancosBank() );

                // Se cambia los icons
                dispatch( SetActiveButtonSaveRole( true ));

                // dispatch( SetStartOpeningBank( true ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserRole( true ) );

                // Ocultar la password
                dispatch( SetvisiblePasswordRole( false ) );

                dispatch( SetPantallasWebRole([
                    {
                        id: 1,
                        nombre: 'Test #1'
                    },
                    {
                        id: 2,
                        nombre: 'Test #2'
                    },
                    {
                        id: 3,
                        nombre: 'Test #3'
                    }
                ]));
               

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

// export const startGetAllBancosBank = () => {

//     return async ( dispatch ) => {
          
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
//             const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
//             const { status, responses } = data;

//             //Quitar el loading
//             Swal.close();
            
//             if( status === 0 ) {
                
//                 // Se guarda en el estado los bancos
//                 dispatch( SetBancosBank( responses ) );

//             } else {

//                 //Caso contrario respuesta incorrecto mostrar mensaje de error
//                 const { currentException } = data;
//                 console.log( currentException );
                
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Ocurrio un problema al obtener los bancos',
//                 });
                
//             }

//         } catch (error) {

//             Swal.close();
//             console.log(error);
//             if( error.message === 'Request failed with status code 401') {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Usuario no valido',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Ocurrio un problema al obtener los bancos',
//                 });
//             }
//         }
        
//     }
// }

// Normal Actions

export const SetActiveButtonSaveRole = (value) => ({
    type: types.SetActiveButtonSaveRole,
    payload: value
})

export const SetDisableInputsRole = (value) => ({
    type: types.SetDisableInputsRole,
    payload: value
})

export const SetClaveInternaRole = (value) => ({
    type: types.SetClaveInternaRole,
    payload: value
})

export const SetvisiblePasswordRole = (value) => ({
    type: types.SetvisiblePasswordRole,
    payload: value
})

export const SetDisableInputsUserRole = (value) => ({
    type: types.SetDisableInputsUserRole,
    payload: value
})

export const SetNameUserRole = (value) => ({
    type: types.SetNameUserRole,
    payload: value
})

export const SetIdRoleActualRole = (value) => ({
    type: types.SetIdRoleActualRole,
    payload: value
})

export const SetNombreRoleActualRole = (value) => ({
    type: types.SetNombreRoleActualRole,
    payload: value
})

export const SetDescripcionRoleActualRole = (value) => ({
    type: types.SetDescripcionRoleActualRole,
    payload: value
})

export const SetEstadoRoleActualRole = (value) => ({
    type: types.SetEstadoRoleActualRole,
    payload: value
})

export const SetAddRolesRole = (value) => ({
    type: types.SetAddRolesRole,
    payload: value
})

export const SetIdPantallaModuloActualRole = (value) => ({
    type: types.SetIdPantallaModuloActualRole,
    payload: value
})

export const SetNombrePantallaModuloActualRole = (value) => ({
    type: types.SetNombrePantallaModuloActualRole,
    payload: value
})

export const SetCrearModuloActualRole = (value) => ({
    type: types.SetCrearModuloActualRole,
    payload: value
})

export const SetModificarModuloActualRole = (value) => ({
    type: types.SetModificarModuloActualRole,
    payload: value
})

export const SetBorrarModuloActualRole = (value) => ({
    type: types.SetBorrarModuloActualRole,
    payload: value
})

export const SetVerModuloActualRole = (value) => ({
    type: types.SetVerModuloActualRole,
    payload: value
})

export const SetAddModulosRole = (value) => ({
    type: types.SetAddModulosRole,
    payload: value
})

export const SetPantallasWebRole = (value) => ({
    type: types.SetPantallasWebRole,
    payload: value
})

export const CleanModuloActualRole = () => ({
    type: types.CleanModuloActualRole
})

export const SetIsEditModuloRole = (value) => ({
    type: types.SetIsEditModuloRole,
    payload: value
})

export const SetEditModulosRole = (value) => ({
    type: types.SetEditModulosRole,
    payload: value
})

export const SetIdModuloSeletedRole = (value) => ({
    type: types.SetIdModuloSeletedRole,
    payload: value
})

export const SetDeleteModuloRole = (value) => ({
    type: types.SetDeleteModuloRole,
    payload: value
})

export const CleanModulosModuloActualRole = () => ({
    type: types.CleanModulosModuloActualRole
})

export const SetModulosModuloRole = (value) => ({
    type: types.SetModulosModuloRole,
    payload: value
})

export const SetIsEditRoleRole = (value) => ({
    type: types.SetIsEditRoleRole,
    payload: value
})

export const CleanRoleActualRole = () => ({
    type: types.CleanRoleActualRole
})

export const SetEditRole = (value) => ({
    type: types.SetEditRole,
    payload: value
})

export const SetIdSeletedRole = (value) => ({
    type: types.SetIdSeletedRole,
    payload: value
})

export const SetDeleteRole = (value) => ({
    type: types.SetDeleteRole,
    payload: value
})