import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveDownPayment = ( downPayment, cedula ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar la entrega a cuenta del cliente ${cedula} ${downPayment.nombre}?`,
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
                    const { data } = await suvesaApi.post('/Cobros/InsertarEntregaAcuenta', downPayment );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Entrega a cuenta del cliente ${cedula} ${downPayment.nombre} agregado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se limpia el estado
                        dispatch( CleanEntregaCuentaDownPayment() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException)

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrio un problema a la guardar la entrega a cuenta',
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
                        text: 'Ocurrio un problema a la guardar la entrega a cuenta',
                    });
                }
            }
        });
    };
}

export const startSearchDownPayment = ( searchDownPayment ) => {

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
            const { data } = await suvesaApi.post(`/Cobros/BuscarEntregasAcuenta`, searchDownPayment );

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {
                
                if( responses.length > 0 ) {
                    const downPayments = responses.map( downPayment => {
                        return {
                            id: downPayment.id,
                            cedula: downPayment.cedula,
                            codCliente: downPayment.codCliente,
                            nombre: downPayment.nombre
                        }
                    } );
                    
                    // Se insertan en el estado de busqueda
                    dispatch( SetEntregasSearchModalDownPayment(downPayments) );

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen entregas a cuenta con los parametros de busqueda.',
                    });

                }

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar entregas de cuenta.',
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
                    text: 'Ocurrio un problema al buscar entregas de cuenta.',
                });
            }
        }
    }
}

export const startGetOneDownPayment = ( idDownPayment ) => {

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
            const { data } = await suvesaApi.post(`/Cobros/ObtenerEntregasAcuenta?id=${idDownPayment}`);

            const { status, responses } = data;
            Swal.close();
            console.log(data);
            if (status === 0 && responses != null) {
            
                console.log(responses);
                // Se insertan en el estado de busqueda
                dispatch( SetInsertEntregaCuentaDownPayment(responses) );

                // Se establece el estado de entrega de cuenta
                //TODO: Ingresar el estado
                // dispatch( SetIsDisableEntregaCuentaDownPayment(responses.estado) );

                // Se establece el isSearchEntrega
                dispatch( SetIsSearchEntregaCuentaDownPayment( true ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar entregas de cuenta.',
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
                    text: 'Ocurrio un problema al buscar entregas de cuenta.',
                });
            }
        }
    }
}

export const startDisableDownPayment = ( idDownPayment, codCliente, nombre) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea anular la entrega a cuenta del cliente ${codCliente} ${nombre}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Anular',
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
                    const { data } = await suvesaApi.post(`/Cobros/InsertarEntregaAcuenta?id=${idDownPayment}`); //TODO: CAMBIAR URL
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Entrega a cuenta del cliente ${downPayment.codCliente} ${downPayment.nombre} anulada correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        //Se limpia el estado
                        dispatch( CleanEntregaCuentaDownPayment() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException)

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrio un problema a la anular la entrega a cuenta',
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
                        text: 'Ocurrio un problema a la anular la entrega a cuenta',
                    });
                }
            }
        });
    };
}

export const startValidateClaveInternaDownPayment = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, idUsuario, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                // Validar si el usuario tiene una caja abierta
                const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');
                const users = resp.data.responses;

                if( users.length === 0 ) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen usuarios con caja abierta.'
                    });

                    return;
                }
                
                const userResult = users.find( u => u.id === parseInt(idUsuario) && u.nombre === userName );
                
                if( userResult !== undefined ) {
                    
                    // Se activan los inputs
                    dispatch( SetDisableInputsDownPayment( false ) );
    
                    //Guardar el usuario en el state
                    dispatch( SetResponsableDownPayment( userName ) );
                    dispatch( SetUsuarioDownPayment( userName ) );
    
                    //Guardar el idUsuario en el state
                    dispatch( SetIdResponsableDownPayment( idUsuario ) );

                    //Se guarda el idApertura
                    dispatch( SetNumAperturaDownPayment( userResult.idApertura ) );
    
                    // Se establece la fecha de hoy
                    const date = new Date();
                    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
                    dispatch( SetFechaDownPayment( isoDateTime ) );
    
                    // Se traen los catalogos
                    await loadCatalogos( dispatch );
    
                    // Se cambia los icons
                    dispatch( SetActiveButtonSaveDownPayment( true ));
                    dispatch( SetActiveButtonSearchDownPayment( true ));
    
                    // Se inicia openingEntrega
                    dispatch( SetOpeningEntregaCuentaDownPayment( true ) );
    
                    // Desactivar los inputs de usuario
                    dispatch( SetDisableInputsUserDownPayment( true ) );
    
                    // Ocultar la password
                    dispatch( SetVisiblePasswordDownPayment( false ) );
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'El usuario no tiene caja abierta'
                    });
                }
                

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

export const startGetAllTiposMonedasDownPayment = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/moneda/ObtenerMonedasInventario`);

            const { status, responses } = data;
            
            if (status === 0 && responses != null) {
                
                const tiposMoneda = responses.map( moneda => {
                    return {
                        codMoneda: moneda.codMoneda,
                        monedaNombre: moneda.monedaNombre
                    }
                });
                dispatch( SetTiposMonedasDownPayment( tiposMoneda ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los tipos monedas.',
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
                    text: 'Ocurrio un problema al obtener los tipos monedas.',
                });
            }
        }
    }
}

export const startGetAllFormasPagoDownPayment = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/FormasPagos/ObtenerFormasDePagoSinCliente`);

            const { status, responses } = data;

            if (status === 0 && responses != null) {
                
                const formasPago = responses.map( formaPago => {
                    return {
                        codigo: formaPago.codigo,
                        descripcion: formaPago.descripcion
                    }
                });
                dispatch( SetFormasPagoDownPayment( formasPago ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los formas de pago.',
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
                    text: 'Ocurrio un problema al obtener los formas de pago.',
                });
            }
        }
    }
}

export const startSearchCustomersDownPayment = ( type, value ) => {

    return async (dispatch) => {

        try {

            let resp;

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
            if( type === 1 ) {
                resp = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula' : value });
            } else if( type === 2) {
                resp = await suvesaApi.post('/cliente/BuscarNombre', { 'nombre' : value });
            } 

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {
                
                dispatch( SetCustomersSearchModalDownPayment( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar el cliente',
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
                    text: 'Ocurrio un problema al buscar el cliente',
                });
            }
        }
    }
}

export const startSearchOneCustomerByCedulaDownPayment = ( identification ) => {

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
            const { data } = await suvesaApi.post(`/cliente/ObtenerClienteCedula?id=${identification}` );

            const { status, responses } = data;
            Swal.close();

            if (status === 0) {

                const { nombre } = responses;
                dispatch( SetNombreDownPayment( nombre ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                if( currentException === 'Cliente no existe' ) {
                                    
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: `No existen clientes con la cédula ${identification}`,
                    });

                    return;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar el cliente',
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
                    text: 'Ocurrio un problema al buscar el cliente',
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

    // Se traen los tipos de monedas
    await dispatch( startGetAllTiposMonedasDownPayment() );

    // Se traen las formas de pago
    await dispatch( startGetAllFormasPagoDownPayment() );

    //Quitar el loading
    Swal.close();

}

// Normal Actions
export const SetActiveButtonSaveDownPayment = (value) => ({
    type: types.SetActiveButtonSaveDownPayment,
    payload: value
})

export const SetActiveButtonSearchDownPayment = (value) => ({
    type: types.SetActiveButtonSearchDownPayment,
    payload: value
})

export const SetActiveButtonRemoveDownPayment = (value) => ({
    type: types.SetActiveButtonRemoveDownPayment,
    payload: value
})

export const SetDisableInputsDownPayment = (value) => ({
    type: types.SetDisableInputsDownPayment,
    payload: value
})

export const SetClaveInternaDownPayment = (value) => ({
    type: types.SetClaveInternaDownPayment,
    payload: value
})

export const SetVisiblePasswordDownPayment = (value) => ({
    type: types.SetVisiblePasswordDownPayment,
    payload: value
})

export const SetDisableInputsUserDownPayment = (value) => ({
    type: types.SetDisableInputsUserDownPayment,
    payload: value
})

export const SetTiposMonedasDownPayment = (value) => ({
    type: types.SetTiposMonedasDownPayment,
    payload: value
})

export const SetResponsableDownPayment = (value) => ({
    type: types.SetResponsableDownPayment,
    payload: value
})

export const SetIdResponsableDownPayment = (value) => ({
    type: types.SetIdResponsableDownPayment,
    payload: value
})

export const SetFormasPagoDownPayment = (value) => ({
    type: types.SetFormasPagoDownPayment,
    payload: value
})

export const SetMontoDownPayment = (value) => ({
    type: types.SetMontoDownPayment,
    payload: value
})

export const SetFormaPagoDownPayment = (value) => ({
    type: types.SetFormaPagoDownPayment,
    payload: value
})

export const SetDenominacionDownPayment = (value) => ({
    type: types.SetDenominacionDownPayment,
    payload: value
})

export const SetUsuarioDownPayment = (value) => ({
    type: types.SetUsuarioDownPayment,
    payload: value
})

export const SetNombreDownPayment = (value) => ({
    type: types.SetNombreDownPayment,
    payload: value
})

export const SetCodMonedaDownPayment = (value) => ({
    type: types.SetCodMonedaDownPayment,
    payload: value
})

export const SetMonedaDownPayment = (value) => ({
    type: types.SetMonedaDownPayment,
    payload: value
})

export const SetTipoCambioDownPayment = (value) => ({
    type: types.SetTipoCambioDownPayment,
    payload: value
})

export const SetFechaDownPayment = (value) => ({
    type: types.SetFechaDownPayment,
    payload: value
})

export const SetNumAperturaDownPayment = (value) => ({
    type: types.SetNumAperturaDownPayment,
    payload: value
})

export const SetVueltoDownPayment = (value) => ({
    type: types.SetVueltoDownPayment,
    payload: value
})

export const SetNumeroDocumentoDownPayment = (value) => ({
    type: types.SetNumeroDocumentoDownPayment,
    payload: value
})

export const SetSucursalDownPayment = (value) => ({
    type: types.SetSucursalDownPayment,
    payload: value
})

export const SetTipoDocumentoDownPayment = (value) => ({
    type: types.SetTipoDocumentoDownPayment,
    payload: value
})

export const SetMontoEntregaCuentaDownPayment = (value) => ({
    type: types.SetMontoEntregaCuentaDownPayment,
    payload: value
})

export const SetMontoDisponibleCuentaDownPayment = (value) => ({
    type: types.SetMontoDisponibleCuentaDownPayment,
    payload: value
})

export const SetCodClienteDownPayment = (value) => ({
    type: types.SetCodClienteDownPayment,
    payload: value
})

export const SetCedulaDownPayment = (value) => ({
    type: types.SetCedulaDownPayment,
    payload: value
})

export const SetIsOpenModalSearchCustomersDownPayment = (value) => ({
    type: types.SetIsOpenModalSearchCustomersDownPayment,
    payload: value
})

export const SetCheckCedulaSearchCustomersModalDownPayment = (value) => ({
    type: types.SetCheckCedulaSearchCustomersModalDownPayment,
    payload: value
})

export const SetCheckNombreSearchCustomersModalDownPayment = (value) => ({
    type: types.SetCheckNombreSearchCustomersModalDownPayment,
    payload: value
})

export const SetCedulaSearchCustomersModalDownPayment = (value) => ({
    type: types.SetCedulaSearchCustomersModalDownPayment,
    payload: value
})

export const SetNombreSearchCustomersModalDownPayment = (value) => ({
    type: types.SetNombreSearchCustomersModalDownPayment,
    payload: value
})

export const SetCustomersSearchModalDownPayment = (value) => ({
    type: types.SetCustomersSearchModalDownPayment,
    payload: value
})

export const CleanSearchCustomersModalDownPayment = () => ({
    type: types.CleanSearchCustomersModalDownPayment
})

export const SetIsOpenModalSearchDownPayment = (value) => ({
    type: types.SetIsOpenModalSearchDownPayment,
    payload: value
})

export const SetCheckIdSearchModalDownPayment = (value) => ({
    type: types.SetCheckIdSearchModalDownPayment,
    payload: value
})

export const SetCheckCedulaSearchModalDownPayment = (value) => ({
    type: types.SetCheckCedulaSearchModalDownPayment,
    payload: value
})

export const SetCheckNombreSearchModalDownPayment = (value) => ({
    type: types.SetCheckNombreSearchModalDownPayment,
    payload: value
})

export const SetIdSearchModalDownPayment = (value) => ({
    type: types.SetIdSearchModalDownPayment,
    payload: value
})

export const SetCedulaSearchModalDownPayment = (value) => ({
    type: types.SetCedulaSearchModalDownPayment,
    payload: value
})

export const SetNombreSearchModalDownPayment = (value) => ({
    type: types.SetNombreSearchModalDownPayment,
    payload: value
})

export const SetEntregasSearchModalDownPayment = (value) => ({
    type: types.SetEntregasSearchModalDownPayment,
    payload: value
})

export const CleanSearchModalDownPayment = () => ({
    type: types.CleanSearchModalDownPayment
})

export const SetInsertEntregaCuentaDownPayment = (value) => ({
    type: types.SetInsertEntregaCuentaDownPayment,
    payload: value
})

export const SetIsDisableEntregaCuentaDownPayment = (value) => ({
    type: types.SetIsDisableEntregaCuentaDownPayment,
    payload: value
})

export const SetOpeningEntregaCuentaDownPayment = (value) => ({
    type: types.SetOpeningEntregaCuentaDownPayment,
    payload: value
})

export const CleanEntregaCuentaDownPayment = () => ({
    type: types.CleanEntregaCuentaDownPayment
})

export const SetIsSearchEntregaCuentaDownPayment = (value) => ({
    type: types.SetIsSearchEntregaCuentaDownPayment,
    payload: value
})

export const CleanEntregaDownPayment = () => ({
    type: types.CleanEntregaDownPayment
})