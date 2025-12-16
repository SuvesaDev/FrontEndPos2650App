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
                    const { data } = await suvesaApi.post('/Bancos/CrearBanco', role); //TODO: CAMBIAR END-POINT PARA CREAR LOS ROLES
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Roles agregados correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( SetAddRolesRole(role) );
                        dispatch( SetNombreRoleActualRole('') );
                        dispatch( SetDescripcionRoleActualRole('') );
                        dispatch( CleanModulosModuloActualRole() );

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
                dispatch( await startGetAllRoles() );
                dispatch( await startGetAllPantallasWeb() );

                // Se cambia los icons
                dispatch( SetActiveButtonSaveRole( true ));

                // dispatch( SetStartOpeningBank( true ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserRole( true ) );

                // Ocultar la password
                dispatch( SetvisiblePasswordRole( false ) );               

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

export const startGetAllRoles = () => {

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
            const { data } = await suvesaApi.get(`/Bancos/ObtenerBancos`); //TODO: CAMBIAR END-POINT PARA OBTENER TODOS LOS ROLES
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                // Se guarda en el estado los bancos
                dispatch( SetRolesRole( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los roles',
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
                    text: 'Ocurrio un problema al obtener los roles',
                });
            }
        }
        
    }
}

export const startGetAllPantallasWeb = () => {

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
            const { data } = await suvesaApi.get(`/Bancos/ObtenerBancos`); //TODO: CAMBIAR END-POINT PARA OBTENER TODOS LAS PANTALLAS
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                // Se guarda en el estado los bancos
                dispatch( SetPantallasWebRole( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los roles',
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
                    text: 'Ocurrio un problema al obtener los roles',
                });
            }
        }
        
    }
}

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

export const SetRolesRole = (value) => ({
    type: types.SetRolesRole,
    payload: value
})