import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveGenerateDeposits = ( generateDeposits ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar el Depósito Número ${generateDeposits.numeroDeposito}?`,
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
                    const { data } = await suvesaApi.post('/Bancos/CrearDeposito', generateDeposits );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Depósito Número ${generateDeposits.numeroDeposito} agregado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se limpia el estado
                        dispatch( CleanGenerateDeposits() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException)

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrio un problema a la guardar el depósito.',
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
                        text: 'Ocurrio un problema a la guardar el depósito.',
                    });
                }
            }
        });
    };
}

export const startValidateClaveInternaGenerateDeposits = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
 
                // Se activan los inputs
                dispatch( SetDisableInputsGenerateDeposits( false ) );

                // Se establece la fecha de hoy
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
                dispatch( SetFechaGenerateDeposits( isoDateTime ) );

                // Se traen los catalogos
                loadCatalogos( dispatch );

                // Se cambia los icons
                dispatch( SetActiveButtonSaveGenerateDeposits( true ));
                dispatch( SetActiveButtonSearchGenerateDeposits( true ));

                // Se inicia openingDeposito
                dispatch( SetStartOpeningDepositoGenerateDeposits( true ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserGenerateDeposits( true ) );

                // Ocultar la password
                dispatch( SetVisiblePasswordGenerateDeposits( false ) );
               

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

export const startGetAllEmpresasGenerateDeposits = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerEmpresasFacturacion`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const empresas = responses.map( empresa => {
                    return {
                        id: empresa.id,
                        nombre: empresa.nombre
                    }
                });

                // Se guarda en el estado las empresas
                dispatch( SetEmpresasGenerateDeposits( empresas ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las empresas',
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
                    text: 'Ocurrio un problema al obtener las empresas',
                });
            }
        }
        
    }
}

export const startGetAllBancosGenerateDeposits = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Se guarda en el estado los bancos
                dispatch( SetBancosGenerateDeposits( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los bancos',
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
                    text: 'Ocurrio un problema al obtener los bancos',
                });
            }
        }
        
    }
}

export const startGetAllCuentasGenerateDeposits = ( idBanco, idEmpresa ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerCuentasPorBanco?idbanco=${idBanco}&idEmpresa=${idEmpresa}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                const cuentas = responses.map( resp => {
                    return {
                        id: resp.id,
                        numero: resp.numero
                    }
                });

                // Se guarda en el estado las cuentas
                dispatch( SetCuentasGenerateDeposits( cuentas ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );

                if( currentException === 'No se encuentran cuentas bancarias.' ) {

                    dispatch( CleanCuentasGenerateDeposits() );
                    dispatch( SetDisableInputCuentaGenerateDeposits( true ) );
                    dispatch( SetIdCuentaGenerateDeposits( 0 ) );

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se encuentran cuentas bancarias con los parametros de busqueda.',
                        
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al obtener las cuentas',
                    });
                }
                
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
                    text: 'Ocurrio un problema al obtener las cuentas',
                });
            }
        }
        
    }
}

export const startSearchPreDepositosGenerateDeposits = ( numApertura ) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerPreDepositosPorNumApertura?numApertura=${numApertura}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                const preDepositos = responses.map( resp => {

                    const newFecha = resp.fecha.split('T');

                    return {
                        id: resp.id,
                        fecha: newFecha[0] + ' ' + newFecha[1],
                        cajero: resp.cajero,
                        cedula: resp.cedula,
                        depositante: resp.depositante,
                        monto: resp.monto,
                        seleccionar: false
                    }
                });

                // Se guarda en el estado el resultado
                dispatch( SetPreDepositosSearchGenerateDeposits( preDepositos ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );

                if( currentException === 'No se encuentran pre depositos.' ) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se encuentran Pre Depósitos con los parametros de busqueda.',
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al buscar pre depósitos',
                    });
                }
                
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
                    text: 'Ocurrio un problema al buscar pre depósitos',
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

    // Se traen las empresas
    await dispatch( startGetAllEmpresasGenerateDeposits() );

    // Se traen los bancos
    await dispatch( startGetAllBancosGenerateDeposits() );

    //Quitar el loading
    Swal.close();

}

// Normal Actions
export const SetActiveButtonSaveGenerateDeposits = (value) => ({
    type: types.SetActiveButtonSaveGenerateDeposits,
    payload: value
})

export const SetActiveButtonSearchGenerateDeposits = (value) => ({
    type: types.SetActiveButtonSearchGenerateDeposits,
    payload: value
})

export const SetActiveButtonRemoveGenerateDeposits = (value) => ({
    type: types.SetActiveButtonRemoveGenerateDeposits,
    payload: value
})

export const SetDisableInputsGenerateDeposits = (value) => ({
    type: types.SetDisableInputsGenerateDeposits,
    payload: value
})

export const SetClaveInternaGenerateDeposits = (value) => ({
    type: types.SetClaveInternaGenerateDeposits,
    payload: value
})

export const SetVisiblePasswordGenerateDeposits = (value) => ({
    type: types.SetVisiblePasswordGenerateDeposits,
    payload: value
})

export const SetDisableInputsUserGenerateDeposits = (value) => ({
    type: types.SetDisableInputsUserGenerateDeposits,
    payload: value
})

export const SetEmpresasGenerateDeposits = (value) => ({
    type: types.SetEmpresasGenerateDeposits,
    payload: value
})

export const SetIdGenerateDeposits = (value) => ({
    type: types.SetIdGenerateDeposits,
    payload: value
})

export const SetNumeroDepositoGenerateDeposits = (value) => ({
    type: types.SetNumeroDepositoGenerateDeposits,
    payload: value
})

export const SetFechaGenerateDeposits = (value) => ({
    type: types.SetFechaGenerateDeposits,
    payload: value
})

export const SetIdCuentaGenerateDeposits = (value) => ({
    type: types.SetIdCuentaGenerateDeposits,
    payload: value
})

export const SetIdBancoGenerateDeposits = (value) => ({
    type: types.SetIdBancoGenerateDeposits,
    payload: value
})

export const SetMontoDepositoGenerateDeposits = (value) => ({
    type: types.SetMontoDepositoGenerateDeposits,
    payload: value
})

export const SetMontoEnLetrasGenerateDeposits = (value) => ({
    type: types.SetMontoEnLetrasGenerateDeposits,
    payload: value
})

export const SetIdEmpresaGenerateDeposits = (value) => ({
    type: types.SetIdEmpresaGenerateDeposits,
    payload: value
})

export const SetNumeroAperturaGenerateDeposits = (value) => ({
    type: types.SetNumeroAperturaGenerateDeposits,
    payload: value
})

export const SetPreDepositosSearchGenerateDeposits = (value) => ({
    type: types.SetPreDepositosSearchGenerateDeposits,
    payload: value
})

export const SetBancosGenerateDeposits = (value) => ({
    type: types.SetBancosGenerateDeposits,
    payload: value
})

export const SetDisableInputCuentaGenerateDeposits = (value) => ({
    type: types.SetDisableInputCuentaGenerateDeposits,
    payload: value
})

export const SetCuentasGenerateDeposits = (value) => ({
    type: types.SetCuentasGenerateDeposits,
    payload: value
})

export const SetIdEmpresaLastGenerateDeposits = (value) => ({
    type: types.SetIdEmpresaLastGenerateDeposits,
    payload: value
})

export const SetIdBancoLastGenerateDeposits = (value) => ({
    type: types.SetIdBancoLastGenerateDeposits,
    payload: value
})

export const CleanCuentasGenerateDeposits = () => ({
    type: types.CleanCuentasGenerateDeposits
})

export const SetAddPreDepositoGenerateDeposits = (value) => ({
    type: types.SetAddPreDepositoGenerateDeposits,
    payload: value
})

export const SetRemovePreDepositoGenerateDeposits = (value) => ({
    type: types.SetRemovePreDepositoGenerateDeposits,
    payload: value
})

export const SetStartOpeningDepositoGenerateDeposits = (value) => ({
    type: types.SetStartOpeningDepositoGenerateDeposits,
    payload: value
})

export const CleanGenerateDeposits = () => ({
    type: types.CleanGenerateDeposits
})