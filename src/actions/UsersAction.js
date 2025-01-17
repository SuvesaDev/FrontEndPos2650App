import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startSaveUsers = ( user ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar el usuario ${user.nombre}?`,
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
                    console.log(user)
                    //Call end-point 
                    // const { data } = await suvesaApi.post('/usuario/CrearUsuario', user);
                    // const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    // if (status === 0) {
                        
                    //     //Si es correcta entonces mostrar un mensaje de afirmacion
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: `Usuario ${user.nombre} agregado correctamente`,
                    //         showConfirmButton: false,
                    //         timer: 2500
                    //     });

                    //     dispatch( CleanUsers() );

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
                        text: 'Ocurrio un problema a la guardar el usuario',
                    });
                }
            }
        });
    };
}

export const startSearchUsers = ( searchUser ) => {

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
            const { data } = await suvesaApi.post(`/usuario/BuscarUsuarios`, searchUser );

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {
                
                if( responses.length > 0 ) {
                    
                    // Se insertan en el estado de busqueda
                    dispatch( SetUsersSearchUsers(responses) );

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen usuarios con los parametros de busqueda.',
                    });

                }

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
                    text: 'Ocurrio un problema al buscar usuarios',
                });
            }
        }
    }
}

export const startGetOneUsers = ( idUser ) => {

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
            const { data } = await suvesaApi.post(`/usuario/ObtenerUnUsuario?id=${idUser}` );

            const { status, responses } = data;
            Swal.close();
            
            if (status === 0 && responses != null) {
                    
                const user = {
                    id: responses.id,
                    idUsuario: responses.idUsuario,
                    nombre: responses.nombre,
                    claveEntrada: responses.claveEntrada,
                    claveInterna: responses.claveInterna,
                    perfil: responses.perfil,
                    foto: null,
                    iniciales: responses.iniciales,
                    cambiarPrecio: responses.cambiarPrecio,
                    porcPrecio: responses.porcPrecio,
                    aplicarDesc: responses.aplicarDesc,
                    porcDesc: responses.porcDesc,
                    existNegativa: responses.existNegativa,
                    usuario: responses.usuario,
                    observaciones: responses.observaciones,
                    email: responses.email,
                    maximoVentas: responses.cantidadPreventas,
                    activo: responses.activo,
                }
                
                // Se insertan en el estado
                dispatch( SetInsertOneUsers( user ) );

                if( user.activo ) {
                    
                    // Se activan los inputs
                    dispatch( SetDisableInputsUsers( false ) );
    
                    // Se activa el edit user
                    dispatch( SetIsEditUsers( true ) );
    
                    // Se activa el boton de modificar y anular y startOpening
                    dispatch( SetActiveButtonSaveUsers( true ) );
                    dispatch( SetStartOpeningUsers( true ) );

                } else {

                    // Se activan los inputs
                    dispatch( SetDisableInputsUsers( true ) );

                    // Se activa el edit user
                    dispatch( SetIsEditUsers( false ) );
    
                    // Se activa el boton de modificar y anular y startOpening
                    dispatch( SetActiveButtonSaveUsers( false ) );
                    dispatch( SetStartOpeningUsers( false ) );

                }
                
                dispatch( SetActiveButtonRemoveUsers( true ) );

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
                    text: 'Ocurrio un problema al obtener un usuario',
                });
            }
        }
    }
}

export const startEditUsers = ( idUser, user ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el usuario ${user.nombre}?`,
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
                    const { data } = await suvesaApi.post(`/usuario/ModificarUsuario?id=${idUser}`, user);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Usuario ${user.nombre} editado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( CleanUsers() );

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
                        text: 'Ocurrio un problema a la guardar el usuario',
                    });
                }
            }
        });
    };
}

export const startActiveAndDisableUsers = ( idUser, nombre, type ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: ( type === 1 )
                    ? `¿Desea anular el usuario ${ nombre }?`
                    : `¿Desea activar el usuario ${ nombre }?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: ( type === 1 ) ? 'Anular' : 'Activar',
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
                    const url = ( type === 1 )
                                    ? `/usuario/AnularUsuario?id=${idUser}`
                                    : `/usuario/ActivarUsuario?id=${idUser}`;
                    const { data } = await suvesaApi.post( url );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: ( type === 1 )
                                        ? `Usuario ${ nombre } anulado correctamente`
                                        : `Usuario ${ nombre } activado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( CleanUsers() );

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
                        text: ( type === 1 )
                            ? 'Ocurrio un problema a la anular el usuario'
                            : 'Ocurrio un problema a la activar el usuario'
                    });
                }
            }
        });
    };
}

export const startValidatePassword = ( user ) => {

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
            const { data } = await suvesaApi.post(`/usuario/ValidarExisteContrasena?contrasena=${user.claveEntrada}` );

            const { status, responses } = data;
            Swal.close();
            
            if (status === 0 && responses != null) {
                
                if( responses === false ) {

                    dispatch( startSaveUsers( user ) );

                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Clave Entrada ya esta en uso. Por favor, escriba una nueva.',
                    });
                }

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
                    text: 'Ocurrio un problema al validar la clave',
                });
            }
        }
    }
}

export const startGetAllPerfiles = () => {

    return async ( dispatch ) => {

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
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.get('/usuario/ObtenerPerfiles');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los perfiles en el estado
                dispatch( SetPerfilesUsers(responses) );

                //Quitar el loading
                Swal.close();
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                //Quitar el loading
                Swal.close();

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });
                
            }

        } catch (error) {

            //Quitar el loading
            Swal.close();

            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Obtener los perfiles Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los perfiles',
                });
            }
        }
        
    }
}

// Normal Actions
export const SetActiveButtonNewUsers = (value) => ({
    type: types.SetActiveButtonNewUsers,
    payload: value
})

export const SetActiveButtonSaveUsers = (value) => ({
    type: types.SetActiveButtonSaveUsers,
    payload: value
})

export const SetActiveButtonSearchUsers = (value) => ({
    type: types.SetActiveButtonSearchUsers,
    payload: value
})

export const SetActiveButtonRemoveUsers = (value) => ({
    type: types.SetActiveButtonRemoveUsers,
    payload: value
})

export const SetIdUsers = (value) => ({
    type: types.SetIdUsers,
    payload: value
})

export const SetIdUsuarioUsers = (value) => ({
    type: types.SetIdUsuarioUsers,
    payload: value
})

export const SetNombreUsers = (value) => ({
    type: types.SetNombreUsers,
    payload: value
})

export const SetClaveEntradaUsers = (value) => ({
    type: types.SetClaveEntradaUsers,
    payload: value
})

export const SetClaveInternaUsers = (value) => ({
    type: types.SetClaveInternaUsers,
    payload: value
})

export const SetPerfilUsers = (value) => ({
    type: types.SetPerfilUsers,
    payload: value
})

export const SetFotoUsers = (value) => ({
    type: types.SetFotoUsers,
    payload: value
})

export const SetInicialesUsers = (value) => ({
    type: types.SetInicialesUsers,
    payload: value
})

export const SetCambiarPrecioUsers = (value) => ({
    type: types.SetCambiarPrecioUsers,
    payload: value
})

export const SetPorcPrecioUsers = (value) => ({
    type: types.SetPorcPrecioUsers,
    payload: value
})

export const SetAplicarDescUsers = (value) => ({
    type: types.SetAplicarDescUsers,
    payload: value
})

export const SetPorcDescUsers = (value) => ({
    type: types.SetPorcDescUsers,
    payload: value
})

export const SetExistNegativaUsers = (value) => ({
    type: types.SetExistNegativaUsers,
    payload: value
})

export const SetUsuarioUsers = (value) => ({
    type: types.SetUsuarioUsers,
    payload: value
})

export const SetObservacionesUsers = (value) => ({
    type: types.SetObservacionesUsers,
    payload: value
})

export const SetEmailUsers = (value) => ({
    type: types.SetEmailUsers,
    payload: value
})

export const SetActivoUsers = (value) => ({
    type: types.SetActivoUsers,
    payload: value
})

export const SetMaximoVentasUsers = (value) => ({
    type: types.SetMaximoVentasUsers,
    payload: value
})

export const CleanUsers = () => ({
    type: types.CleanUsers
})

export const SetDisableInputsUsers = (value) => ({
    type: types.SetDisableInputsUsers,
    payload: value
})

export const SetStartOpeningUsers = (value) => ({
    type: types.SetStartOpeningUsers,
    payload: value
})

export const SetVisibleClaveEntradaUsers = (value) => ({
    type: types.SetVisibleClaveEntradaUsers,
    payload: value
})

export const SetVisibleClaveInternaUsers = (value) => ({
    type: types.SetVisibleClaveInternaUsers,
    payload: value
})

export const SetIsOpenModalSearchUsers = (value) => ({
    type: types.SetIsOpenModalSearchUsers,
    payload: value
})

export const SetValorFiltroSearchUsers = (value) => ({
    type: types.SetValorFiltroSearchUsers,
    payload: value
})

export const SetIdUsuarioSearchUsers = (value) => ({
    type: types.SetIdUsuarioSearchUsers,
    payload: value
})

export const SetNombreSearchUsers = (value) => ({
    type: types.SetNombreSearchUsers,
    payload: value
})

export const SetUsersSearchUsers = (value) => ({
    type: types.SetUsersSearchUsers,
    payload: value
})

export const CleanSearchOptionsUsers = () => ({
    type: types.CleanSearchOptionsUsers
})

export const SetInsertOneUsers = (value) => ({
    type: types.SetInsertOneUsers,
    payload: value
})

export const SetIsEditUsers = (value) => ({
    type: types.SetIsEditUsers,
    payload: value
})

export const SetIsEqualsClaveUsers = (value) => ({
    type: types.SetIsEqualsClaveUsers,
    payload: value
})

export const SetShowInfoMessageUsers = (value) => ({
    type: types.SetShowInfoMessageUsers,
    payload: value
})

export const SetShowCostaPetsUsers = (value) => ({
    type: types.SetShowCostaPetsUsers,
    payload: value
})

export const SetIsAdministradoCostaPetsUsers = (value) => ({
    type: types.SetIsAdministradoCostaPetsUsers,
    payload: value
})

export const SetIsAgenteCostaPetsUsers = (value) => ({
    type: types.SetIsAgenteCostaPetsUsers,
    payload: value
})

export const SetPerfilesUsers = (value) => ({
    type: types.SetPerfilesUsers,
    payload: value
})