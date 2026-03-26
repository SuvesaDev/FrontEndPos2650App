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

                    const newRole = {
                        nombreRol: role.nombre,
                        descripcion: role.descripcion,
                        pantallas: role.modulos.map(rol => {
                            return {
                                idModulo: rol.idModulo,
                                idPantalla: rol.idPantalla,
                                nombrePantalla: rol.nombrePantalla,
                                nombrePantallaWeb: rol.nombrePantalla,
                                acciones: {
                                    idPantalla: rol.idPantalla,
                                    crear: rol.crear,
                                    modificar: rol.modificar,
                                    borrar: rol.borrar,
                                    ver: rol.ver
                                },
                                estado: true
                            }
                        }),
                        estado: true
                    }
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post('/usuario/RegistrarConfiguracionPorRol', newRole);
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

                        dispatch( startGetAllRoles());

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

export const startEditRole = ( editRole ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el role ${ editRole.data.nombre }?`,
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

                    const Role = {
                        idRol: editRole.data.id,
                        nombreRol: editRole.data.nombre,
                        descripcion: editRole.data.descripcion,
                        pantallas: editRole.data.modulos.map(rol => {
                            return {
                                idModulo: rol.idModulo,
                                idPantalla: rol.idPantalla,
                                nombrePantalla: rol.nombrePantalla,
                                nombrePantallaWeb: rol.nombrePantalla,
                                acciones: {
                                    idPantalla: rol.idPantalla,
                                    crear: rol.crear,
                                    modificar: rol.modificar,
                                    borrar: rol.borrar,
                                    ver: rol.ver
                                },
                                idRol: editRole.data.id,
                                estado: true
                            }
                        }),
                        estado: true
                    }
                    
                    //Call end-point 
                    const { data } = await suvesaApi.put('/usuario/EditarConfiguracionPorRol', Role);
                    const { status, responses } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Rol editado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch(SetEditRole(editRole));
            
                        // Se cambia el modo de edit
                        dispatch(SetIsEditRoleRole(false));

                        // Se reset el bancoActual
                        dispatch(CleanRoleActualRole());

                        dispatch(SetIdSeletedRole(0));

                        dispatch( SetNombreRoleActualRole('') );
                        dispatch( SetDescripcionRoleActualRole('') );
                        dispatch( CleanModulosModuloActualRole() );

                        dispatch( startGetAllRoles());

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
                dispatch( await startGetAllModulos() );

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
            const { data } = await suvesaApi.get(`/usuario/ObtenerRoles`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if( status === 0 ) {

                const newRoles = responses.map(resp => {
                    return {
                        idRol: resp.idRol,
                        descripcion: resp.descripcion,
                        estado: resp.activo
                    }
                });

                // Se guarda en el estado los bancos
                dispatch( SetRolesRole( newRoles ) );

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

export const startGetAllModulos = () => {

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
            const { data } = await suvesaApi.get(`/usuario/ObtenerModulos`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                const newModules = responses.map(resp => {
                    return {
                        idModulo: resp.idModulo,
                        descripcion: resp.descripcionWeb
                    }
                });

                // Se guarda en el estado los bancos
                dispatch( SetModulosWebRole( newModules ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los modulos',
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

export const startGetAllPantallasWeb = (idModulo) => {

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
            const { data } = await suvesaApi.get(`/usuario/ObtenerVetanas?IdModulo=${idModulo}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {

                const newPantalla = responses.map(resp => {
                    return {
                        idVentana: resp.idVentana,
                        descripcion: resp.descripcion
                    }
                });

                // Se guarda en el estado los bancos
                dispatch( SetPantallasWebRole( newPantalla ) );

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

export const startGetOneRol = (idRol) => {

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
            const { data } = await suvesaApi.get(`/usuario/ObtenerConfiguracionPorRol?IdRol=${idRol}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if( status === 0 ) {
                
                const {
                    idRol,
                    nombreRol,
                    estado,
                    pantallas
                } = responses;

                // Se establece el idBanco seleccionado
                dispatch( SetIdRoleActualRole(idRol) );
                dispatch( SetNombreRoleActualRole(nombreRol) );
                dispatch( SetEstadoRoleActualRole(estado) );

                const newModules = pantallas.map(pantalla => {
                    return {
                        idModulo: pantalla.idModulo,
                        nombreModulo: pantalla.nombreModulo,
                        idPantalla: pantalla.idPantalla,
                        nombrePantalla: pantalla.nombrePantalla,
                        crear: pantalla.acciones.crear,
                        modificar: pantalla.acciones.modificar,
                        borrar: pantalla.acciones.borrar,
                        ver: pantalla.acciones.ver
                    }
                    
                });

                dispatch( SetModulosModuloRole(newModules) );
        
                // Se establece que esta en modo edit
                dispatch(SetIsEditRoleRole(true));
            

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

export const SetIdModuleModuloActualRole = (value) => ({
    type: types.SetIdModuleModuloActualRole,
    payload: value
})

export const SetNombreModuleModuloActualRole = (value) => ({
    type: types.SetNombreModuleModuloActualRole,
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

export const SetModulosWebRole = (value) => ({
    type: types.SetModulosWebRole,
    payload: value
})