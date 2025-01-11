import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Action
export const startSaveCloseCash = ( CloseCash ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea guardar el cierre de caja?',
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



                    // //Call end-point 
                    // const { data } = await suvesaApi.post('/CierreCaja/CrearCierreDeCaja', CloseCash);
                    // const { status } = data;
                    
                    // //Quitar el loading
                    // Swal.close();

                    // if (status === 0) {
                        
                    //     //Si es correcta entonces mostrar un mensaje de afirmacion
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: 'Cierre de Caja creado correctamente',
                    //         showConfirmButton: false,
                    //         timer: 2500
                    //     });

                    //     // Se limpia el estado
                    //     dispatch( CleanCloseCash() );

                    // } else {
                        
                    //     //Caso contrario respuesta incorrecto mostrar mensaje de error
                    //     const { currentException } = data;
                    //     console.log(currentException);

                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Error',
                    //         text: 'Ocurrio un problema en la creacion de cierre de la caja',
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
                        text: 'Ocurrio un problema en la creacion de cierre de la caja',
                    });
                }
            }
        });
    };
}

export const startGetAllAperturasSinCerrarCloseCash = () => {

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
            const { data } = await suvesaApi.post('/Caja/ObtenerAperturasDeCajaSinCerrar');
            const { status, responses } = data;
            
            console.log(responses)
            //Quitar el loading
            Swal.close();

            if (status === 0) {
                const aperturas = responses.map( resp => {
                    
                 
                    return {
                        apertura: resp.napertura,
                        nombre: resp.nombre,
                        cedula: resp.cedula,
                        fecha: resp.fecha,
                    }
                });
                
                dispatch( SetAperturasSinCerrarCloseCash(aperturas) );
            
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
                    text: 'Ocurrio un problema al obtener las aperturas de caja',
                });
            }
        }
    };
}

export const startSearchCloseCash = ( searchCloseCash ) => {

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
            const { data } = await suvesaApi.post(`/CierreCaja/BuscarCierreCaja`, searchCloseCash);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {

                if( responses.length === 0 ) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen cierres de caja con los filtros de busqueda.'
                    });

                    return;
                }

                const cierres = responses.map( resp => {

                    const dateCierre = resp.fechaCierre.split('T');
                    const dateApertura = resp.fechaApertura.split('T');

                    return {
                        cierre: resp.idCierre,
                        nombre: resp.nombreApertura,
                        cedula : resp.codigoCajero,
                        fechaCierre: dateCierre[0] + ' ' + dateCierre[1],
                        fechaApertura: dateApertura[0] + ' ' + dateApertura[1],
                        numApertura: resp.numApertura
                    }
                });

                dispatch( SetCloseCashSearchCloseCash(cierres) );
            
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
                    text: 'Ocurrio un problema al buscar los cierres de caja',
                });
            }
        }
    };
}

export const startDisableCloseCash = ( idCierre ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea anular este cierre de caja?',
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
                    const { data } = await suvesaApi.post(`/CierreCaja/AnularCierreDeCaja?id=${idCierre}`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Cierre de Caja anulado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se limpia el estado
                        dispatch( CleanCloseCash() );

                    } else {
                        
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException);

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrio un problema al anular cierre de la caja',
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
                        text: 'Ocurrio un problema al anular cierre de la caja',
                    });
                }
            }
        });
    };
}

export const startValidateClaveInternaCloseCash = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, idUsuario, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
                
                // Se activan los inputs
                dispatch( SetDisableInputsCloseCash( false ) );

                //Guardar el usuario en el state
                dispatch( SetUserNameCloseCash( userName ) );

                //Guardar la cedula en el state
                dispatch( SetCedulaUserCloseCash(idUsuario) );

                //Se establece la fecha
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');
                dispatch( SetFechaCierreCloseCash( isoDateTime[0] + ' ' + isoDateTime[1] ) );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserCloseCash( true ) );

                // Ocultar la password
                dispatch( SetVisiblePasswordCloseCash( false ) );

                // Activar el icon de search
                dispatch( SetActiveButtonSearchCloseCash( true ) );

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

export const startSearchAperturasCloseCash = ( aperturas, filtros, tipo ) => {

    return async ( dispatch ) => {

        let searchAperturas = [];

        switch ( tipo ) {

            case 1:
                searchAperturas = aperturas.filter( 
                    apert => parseInt(apert.apertura) === parseInt(filtros.apertura));
                break;

            case 2:
                searchAperturas = aperturas.filter( 
                    apert => apert.nombre.toUpperCase().includes(filtros.nombre.toUpperCase()));
                break;

            case 3:
                searchAperturas = aperturas.filter( 
                    apert => (apert.fecha.split(' ')[0].toUpperCase() >= filtros.fecha_desde.toUpperCase() 
                                && apert.fecha.split(' ')[0].toUpperCase() <= filtros.fecha_hasta.toUpperCase()));
                break;
        
            default:
                break;
        }
        
        if( searchAperturas.length > 0 ) {
            
            dispatch( SetSearchAperturasCloseCash( searchAperturas ) );

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cierre Caja',
                text: 'No se encontraron aperturas con los filtros de busqueda.',
                timer: 2000
            });
        }
        
    }
}

export const startGetDataOneCloseCash = ( apertura, nombre, cedula, fecha ) => {

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
            const { data } = await suvesaApi.post(`/CierreCaja/ObtenerDatosDelCierreCaja?numApertura=${apertura}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {

                // Se ingresan los detalles del cierre de caja
                dispatch( SetInsertDataCierreCajaCloseCash( responses ) );
                
                // Se establece el codigo de cajero
                dispatch( SetCodigoCajeroCloseCash( cedula ) );

                // Se establece el nombre de cajero
                dispatch( SetNombreCajeroCloseCash( nombre ) );

                // Se establece el num de apertura
                dispatch( SetNumAperturaCloseCash( apertura ) );

                // Se establece la fecha de apertura
                dispatch( SetFechaAperturaCloseCash( fecha ) );

                // Se habilita el icon de registrar
                dispatch( SetActiveButtonSaveCloseCash( true ) );

                // Se deshabilita el icon de search
                dispatch( SetActiveButtonSearchCloseCash( false ) );

                // Se activa el IsStartCloseCash
                dispatch( SetIsStartCloseCash( true ) );
            
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
                    text: 'Ocurrio un problema al obtener la data de cierre de caja',
                });
            }
        }
    };
}

export const startGetOneCloseCash = ( apertura, nombre, cedula, fechaCierre, fechaApertura, idCierre ) => {

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
            const { data } = await suvesaApi.post(`/CierreCaja/ObtenerDatosDelCierreCajaInsertado?numApertura=${apertura}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {

                // Se ingresan los detalles del cierre de caja
                dispatch( SetInsertDataCierreCajaCloseCash( responses ) );
                
                // Se establece el codigo de cajero
                dispatch( SetCodigoCajeroCloseCash( cedula ) );

                // Se establece el nombre de cajero
                dispatch( SetNombreCajeroCloseCash( nombre ) );

                // Se establece el num de apertura
                dispatch( SetNumAperturaCloseCash( apertura ) );

                // Se establece la fecha de apertura
                dispatch( SetFechaAperturaCloseCash( fechaApertura ) );

                // Se establece la fecha de cierre
                dispatch( SetFechaCierreCloseCash( fechaCierre ) );

                // Se deshabilita el icon de registrar
                dispatch( SetActiveButtonSaveCloseCash( false ) );

                // Se deshabilita el icon de search
                dispatch( SetActiveButtonSearchCloseCash( true ) );

                // Se establece el idCierre
                dispatch( SetIdCierreCloseCash( idCierre ) );

                // Se deshabilita el icon de anular si esta activo el cierre de caja
                if( responses.anulado === false ) {
                    dispatch( SetActiveButtonRemoveCloseCash( true ) );
                }

                // Se activa el IsStartCloseCash
                dispatch( SetIsStartCloseCash( true ) );
            
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
                    text: 'Ocurrio un problema al obtener la data de cierre de caja',
                });
            }
        }
    };
}

export const startGetTiqueteCaja = (idDocumento) => {

    return async (dispatch) => {
        try {
            //Call end-point 
            const { data } = await suvesaApi.get(`/venta/ObtenerDatosParaImpresionFactura?id=${idDocumento}`);
            const { responses, status, currentException } = data
            if (status === 0 && responses != null) {
                console.log(responses);
                dispatch(SetReporteCloseCash(responses))
            } else {
                console.log(currentException);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al generar el Reporte Cierre de Caja.',
                });
            }
        } catch (error) {
            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al generar Reporte Cierre de Caja.',
                });
            }
        }
    }
}

// Normal Action
export const SetDisableInputsCloseCash = (value) => ({
    type: types.SetDisableInputsCloseCash,
    payload: value
})

export const SetClaveInternaCloseCash = (value) => ({
    type: types.SetClaveInternaCloseCash,
    payload: value
})

export const SetUserNameCloseCash = (value) => ({
    type: types.SetUserNameCloseCash,
    payload: value
})

export const SetCedulaUserCloseCash = (value) => ({
    type: types.SetCedulaUserCloseCash,
    payload: value
})

export const SetIsOpenModalSeletedAperturaCloseCash = (value) => ({
    type: types.SetIsOpenModalSeletedAperturaCloseCash,
    payload: value
})

export const SetCheckAperturaSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetCheckAperturaSeletedAperturaModalCloseCash,
    payload: value
})

export const SetCheckNombreSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetCheckNombreSeletedAperturaModalCloseCash,
    payload: value
})

export const SetCheckFechasSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetCheckFechasSeletedAperturaModalCloseCash,
    payload: value
})

export const SetFechaDesdeSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetFechaDesdeSeletedAperturaModalCloseCash,
    payload: value
})

export const SetFechaHastaSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetFechaHastaSeletedAperturaModalCloseCash,
    payload: value
})

export const SetDisableInputsFechasSeletedAperturaModalCloseCash = (value) => ({
    type: types.SetDisableInputsFechasSeletedAperturaModalCloseCash,
    payload: value
})

export const SetDisableInputsUserCloseCash = (value) => ({
    type: types.SetDisableInputsUserCloseCash,
    payload: value
})

export const SetVisiblePasswordCloseCash = (value) => ({
    type: types.SetVisiblePasswordCloseCash,
    payload: value
})

export const SetFechaCierreCloseCash = (value) => ({
    type: types.SetFechaCierreCloseCash,
    payload: value
})

export const SetActiveButtonSaveCloseCash = (value) => ({
    type: types.SetActiveButtonSaveCloseCash,
    payload: value
})

export const SetActiveButtonSearchCloseCash = (value) => ({
    type: types.SetActiveButtonSearchCloseCash,
    payload: value
})

export const SetActiveButtonRemoveCloseCash = (value) => ({
    type: types.SetActiveButtonRemoveCloseCash,
    payload: value
})

export const SetAperturasSinCerrarCloseCash = (value) => ({
    type: types.SetAperturasSinCerrarCloseCash,
    payload: value
})

export const SetCleanAperturasSinCerrarCloseCash = () => ({
    type: types.SetCleanAperturasSinCerrarCloseCash
})

export const SetValorSearchAperturaCloseCash = (value) => ({
    type: types.SetValorSearchAperturaCloseCash,
    payload: value
})

export const SetSearchAperturasCloseCash = (value) => ({
    type: types.SetSearchAperturasCloseCash,
    payload: value
})

export const SetResetAperturasCloseCash = () => ({
    type: types.SetResetAperturasCloseCash
})

export const SetInsertDataCierreCajaCloseCash = (value) => ({
    type: types.SetInsertDataCierreCajaCloseCash,
    payload: value
})

export const SetCodigoCajeroCloseCash = (value) => ({
    type: types.SetCodigoCajeroCloseCash,
    payload: value
})

export const SetNombreCajeroCloseCash = (value) => ({
    type: types.SetNombreCajeroCloseCash,
    payload: value
})

export const SetNumAperturaCloseCash = (value) => ({
    type: types.SetNumAperturaCloseCash,
    payload: value
})

export const SetFechaAperturaCloseCash = (value) => ({
    type: types.SetFechaAperturaCloseCash,
    payload: value
})

export const CleanCloseCash = () => ({
    type: types.CleanCloseCash
})

export const SetIsStartCloseCash = (value) => ({
    type: types.SetIsStartCloseCash,
    payload: value
})

export const SetIsOpenModalSearchCloseCash = (value) => ({
    type: types.SetIsOpenModalSearchCloseCash,
    payload: value
})

export const SetValorSearchCloseCash = (value) => ({
    type: types.SetValorSearchCloseCash,
    payload: value
})

export const SetCheckCierreSearchModalCloseCash = (value) => ({
    type: types.SetCheckCierreSearchModalCloseCash,
    payload: value
})

export const SetCheckNombreSearchModalCloseCash = (value) => ({
    type: types.SetCheckNombreSearchModalCloseCash,
    payload: value
})

export const SetCheckFechasSearchModalCloseCash = (value) => ({
    type: types.SetCheckFechasSearchModalCloseCash,
    payload: value
})

export const SetFechaDesdeSearchModalCloseCash = (value) => ({
    type: types.SetFechaDesdeSearchModalCloseCash,
    payload: value
})

export const SetFechaHastaSearchModalCloseCash = (value) => ({
    type: types.SetFechaHastaSearchModalCloseCash,
    payload: value
})

export const SetDisableInputsFechasSearchModalCloseCash = (value) => ({
    type: types.SetDisableInputsFechasSearchModalCloseCash,
    payload: value
})

export const SetCloseCashSearchCloseCash = (value) => ({
    type: types.SetCloseCashSearchCloseCash,
    payload: value
})

export const CleanCloseCashSearchCloseCash = () => ({
    type: types.CleanCloseCashSearchCloseCash
})

export const SetIdCierreCloseCash = (value) => ({
    type: types.SetIdCierreCloseCash,
    payload: value
})

export const SetReporteCloseCash = (value) => ({
    type: types.SetReporteCloseCash,
    payload: value
})

