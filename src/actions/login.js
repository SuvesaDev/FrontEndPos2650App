import Swal from 'sweetalert2';
import { suvesaApiAuth, suvesaApi } from '../api';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startLogin = (auth) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Validando credenciales',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            imageUrl: loadingImage,
            customClass: 'alert-class-login',
            imageHeight: 100,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        dispatch(startLoading());

        try {

            const { data } = await suvesaApiAuth.post('/usuario/LoginNuevo', auth.toJson());
            const { status, responses } = data;
            
            if (status === 0) {
                
                const { 
                    token, 
                    usuario, 
                    expiracion, 
                    administrador, 
                    agenteCostaPets, 
                    costaPets 
                } = responses;

                localStorage.setItem('auth', JSON.stringify({
                    token: token
                }));

                const { data } = await suvesaApi.post(`/Centros/ObtenerSucursal`);
                
                Swal.close();

                if( data.status === 0 ) {

                    const surcursales = data.responses.map( r => {
                        return {
                            id: r.id,
                            alias: r.alias
                        }
                    }) 

                    // Se insertan en el estado las surcursales
                    dispatch( SetSurcursalesLogin( surcursales ) );

                    const centros = surcursales.map( sur => {
                        return sur.alias;
                    });

                    Swal.fire({
                        title: 'Seleccione el centro',
                        input: 'select',
                        inputOptions: centros,
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        confirmButtonText: 'Ingresar',
                        confirmButtonColor: '#EE7519',
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false,
                        preConfirm: (i) => {

                            // Establecer el idSurcursal
                            const idSurcursal = surcursales.find( sucursal => sucursal.alias === centros[i] ).id;
                            dispatch( SetIdSurcursalLogin(idSurcursal) );

                            // Establecer en el state: centro, usuario, token, isAutenticated en true
                            dispatch(login(centros[i], usuario, token, costaPets, administrador, agenteCostaPets));

                            //Escribe el localStorage
                            localStorage.setItem('auth', JSON.stringify({
                                centro: centros[i],
                                idSurcursal: idSurcursal,
                                username: usuario,
                                token: token,
                                expiracion: expiracion,
                                isAutenticated: true,
                                costaPets: costaPets,
                                administrador: administrador,
                                agenteCostaPets: agenteCostaPets
                            }));

                            dispatch(finishLoading());
                        },
                    });

                } else {

                    dispatch(finishLoading());
                
                    //Caso contrario respuesta incorrecto mostrar mensaje de error
                    const { currentException } = data;
                    const msj = currentException.split(',');

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (currentException.includes(',')) ? msj[3] : currentException,
                    });

                }

                
            } else {
                
                dispatch(finishLoading());
                
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
                    text: 'Ocurrio un problema al iniciar sesion',
                });
            }

            dispatch(finishLoading());
            
        }
    }
}

export const startGetAllUsersActive = () => {

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
            const { data } = await suvesaApiAuth.post(`/usuario/ObtenerUsuariosActivos`);
            const { status, responses } = data;

            // Quitar el modal
            Swal.close();

            if (status === 0 && responses != null) {
            
                const usersActive = responses.map( r => {
                    return {
                        id: r.id,
                        idUsuario: r.idUsuario,
                        nombre: r.nombre,
                        iniciales: r.iniciales,
                    }
                }) 

                // Se insertan en el estado
                dispatch( SetUserActiveLogin( usersActive ) );

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
                    text: 'Ocurrio un problema al obtener usuarios activos',
                });
            }
        }
    }
}

export const startGetAllSurcursales = () => {

    return async (dispatch) => {

        try {
            
            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerSucursal`);
            const { status, responses } = data;

            if (status === 0 && responses != null) {
            
                const surcursales = data.responses.map( r => {
                    return {
                        id: r.id,
                        alias: r.alias
                    }
                }) 

                // Se insertan en el estado las surcursales
                dispatch( SetSurcursalesLogin( surcursales ) );

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
                    text: 'Ocurrio un problema al obtener usuarios activos',
                });
            }
        }
    }
}

export const startValidateClaveInterna = ( password ) => {

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
            const { data } = await suvesaApi.post(`/usuario/ValidarClaveInternaSinUsuario?contrasena=${password}` );
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                return {
                    status: 1,
                    userName: responses.nombre,
                    idUsuario: responses.idUsuario,
                    administrador : responses.administrador,
                    message: '',
                    costapets: responses.costaPets
                };
            } else {
                return {
                    status: 0,
                    userName: '',
                    idUsuario: '',
                    administrador: '',
                    message: 'Contraseña Incorrecta'
                }
            }

        } catch (error) {

            Swal.close();
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                return {
                    status: 0,
                    userName: '',
                    idUsuario: '',
                    message: 'Usuario no valido'
                }
            } else {
                return {
                    status: 0,
                    userName: '',
                    idUsuario: '',
                    message: 'Ocurrio un problema al validar usuario'
                }
            }
        }
        
    }
}


// Normal Action
const login = (centro, username, token, costaPets, administrador, agenteCostaPets ) => ({
    type: types.login,
    payload: {
        centro,
        username,
        token,
        costaPets,
        administrador,
        agenteCostaPets
    }
});

export const logout = () => {
    localStorage.setItem('auth', null)
    return {
        type: types.logout,
    }
}

export const setErrorCentro = (err) => ({
    type: types.loginSetErrorCentro,
    payload: err
});

export const removeErrorCentro = () => ({
    type: types.loginRemoveErrorCentro
});

export const setErrorUserName = (err) => ({
    type: types.loginSetErrorUserName,
    payload: err
});

export const removeErrorUserName = () => ({
    type: types.loginSetErrorUserName
});

export const setErrorPassword = (err) => ({
    type: types.loginSetErrorPassword,
    payload: err
});

export const removeErrorPassword = () => ({
    type: types.loginRemoveErrorPassword
});

const startLoading = () => ({
    type: types.loginStartLoading
})

const finishLoading = () => ({
    type: types.loginFinishLoading
})

export const SetUserActiveLogin = (value) => ({
    type: types.SetUserActiveLogin,
    payload: value
});

export const SetSurcursalesLogin = (value) => ({
    type: types.SetSurcursalesLogin,
    payload: value
});

export const SetIdSurcursalLogin = (value) => ({
    type: types.SetIdSurcursalLogin,
    payload: value
});