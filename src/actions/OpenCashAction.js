import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

export const startSaveOpenCash = (OpenCash) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea guardar la apertura de caja?',
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
                    const { data } = await suvesaApi.post('/Caja/CrearAperturaCaja', OpenCash);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Apertura agrega correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch(CleanOpenCash());

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
                        text: 'Ocurrio un problema a la apertura de la caja',
                    });
                }
            }
        });
    };
}

export const startEditOpenCash = ( newData, type ) => {

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
            const url = ( type === 1 ) ? '/Caja/EditarAperturaTotalTope' : '/Caja/EditarAperturaDenominacion';
            const { data } = await suvesaApi.post(url, newData);
            const { status } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {
                
                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: ( type === 1 ) ? 'Detalle Total Tope editado correctamente' : 'Detalle Denominacion editado correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });

                if( type === 1 ) {

                    dispatch(SetUpdateMontoTopeOpenCash( {
                        id_total_tope: newData.idTotalTope,
                        monto: newData.montoTope
                    } ));

                } else if ( type === 2 ) {

                    // Se actualiza la cantidad
                    dispatch(SetUpdateCantidadDenominacionOpenCash( {
                        Id: newData.id,
                        cantidad: newData.cantidad
                    } ));

                    // Se actualiza la total de esa denominacion
                    const newTotal = parseFloat( newData.monto ) * parseFloat( newData.cantidad );
                    dispatch( SetUpdateTotalDenominacionOpenCash( {
                        Id: newData.id,
                        total: ( isNaN(newTotal) ) ? 0 : newTotal
                    } ));

                }

                // dispatch(CleanOpenCash());

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
                    text: 'Ocurrio un problema al editar una apertura de la caja',
                });
            }
        }
    };
}

export const startSearchOpenCash = ( searchOpenCash ) => {

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
            const resp = await suvesaApi.post(`/Caja/ObtenerFiltrosAperturaCaja`, searchOpenCash );

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {
                
                if( responses.length > 0 ) {

                    const openCash = responses.map( openC => {

                        const date = openC.fecha.split('T');

                        return {
                            apertura : openC.numeroApertura,
                            nombre : openC.nomUsuario,
                            fecha : date[0],
                            caja : openC.caja,
                        }
                    } );
                    
                    // Se insertan en el estado de busqueda
                    dispatch( SetInsertResultSearchOpenCash(openCash) );

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen aperturas de caja con los parametros de busqueda.',
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
                    text: 'Ocurrio un problema al buscar aperturas de caja',
                });
            }
        }
    }
}

export const startDisableOpenCash = ( idOpenCash ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea anular esta apertura de caja?',
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
                    const { data } = await suvesaApi.post(`/Caja/DeleteAperturaCaja?id=${idOpenCash}`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Apertura anulada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch(CleanOpenCash());

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
                        text: 'Ocurrio un problema al anular apertura de la caja',
                    });
                }
            }
        });
    };
}

export const startGetOneOpenCash = ( idApertura ) => {

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
            const { data } = await suvesaApi.post(`/Caja/ConsultarAperturaCaja?id=${idApertura}`);
            const { status, responses } = data;
            
            // Cerrar el modal
            Swal.close();

            if (status === 0 && responses != null) {

                const openCash = {
                    encabezado: {
                        NApertura: responses.napertura,
                        Fecha: responses.fecha,
                        Nombre: responses.nombre,
                        Estado: responses.estado,
                        Observaciones: responses.observaciones,
                        Anulado: responses.anulado,
                        Cedula: responses.cedula,
                        Num_Caja: responses.numCaja,
                        IdSucursal: 0.00
                    },
                    tope: responses.aperturaTotalTope.map(
                        tope => {
                            return {
                                id_total_tope : tope.idTotalTope,
                                NApertura : tope.napertura,
                                CodMoneda : tope.codMoneda,
                                Monto_Tope : tope.montoTope,
                                MonedaNombre : tope.monedaNombre
                            }
                        }
                    ),
                    denominaciones: responses.aperturaDenominacion.map(
                        denominacion => {
                            return {
                                Id: denominacion.id,
                                Id_Apertura: denominacion.idApertura,
                                Id_Denominacion: denominacion.idDenominacion,
                                Moneda: denominacion.codMoneda == 1 ? "COLON" : "DOLAR",
                                Tipo: denominacion.tipo,
                                Monto: denominacion.monto,
                                Cantidad: denominacion.cantidad,
                                Total: parseInt( denominacion.monto ) * parseInt( denominacion.cantidad ),
                            }
                        }
                    )
                }

                //Meterlo en el estado
                dispatch( SetSelectSearchOpenCash( openCash ) );

                // Cerrar el modal
                dispatch( SetOpenModalSearchOpenCash( false ) );
            
                //Clean el state de busqueda de open cash
                dispatch( CleanSearchOpenCash() );

                // Set IsOpenCashEdit en true
                dispatch( SetIsOpenCashEdit( true ) );
                
                // Se obtienen todas las cajas
                dispatch( await startGetAllCajas() );

                // Se habilita el campo anular si la apertura de caja no esta anulada
                if( !openCash.encabezado.Anulado ) {
                    dispatch( activeButtonRemoveOpenCash( true ) );
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
                    text: 'Ocurrio un problema al buscar aperturas de caja',
                });
            }
        }
    }
}

export const startSearchMoneda = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const resp = await suvesaApi.post('/moneda/ObtenerMonedasInventario');

            const { status, responses } = resp.data;

            if (status === 0 && responses != null) {

                let contadorMoneda = 0;

                const detalleTope = responses.map(
                    (moneda) => {
                        contadorMoneda += 1;
                        return {
                            id_total_tope: contadorMoneda,
                            NApertura: 0.00,
                            CodMoneda: moneda.codMoneda,
                            Monto_Tope: 0.00,
                            MonedaNombre: moneda.monedaNombre
                        }
                    }
                );

                dispatch(SetAddDetalleTopeCash(detalleTope));

            } else if (responses === null) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'No se encontro los topes',
                });

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
                    text: 'Ocurrio un problema al obtener los topes',
                });
            }
        }
    }
}

export const startSearchDenominaciones = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const resp = await suvesaApi.post('/Caja/GetDenominacionMonedas');
            const { status, responses } = resp.data;

            if (status === 0 && responses != null) {
                
                const detalleDenominacion = responses.map(
                    (denominacion) => {
                        return {
                            Id: denominacion.id,
                            Id_Apertura: 0.00,
                            Id_Denominacion: denominacion.id,
                            Moneda: denominacion.codMoneda == 1 ? "COLON" : "DOLAR",
                            Tipo: denominacion.tipo,
                            Monto: denominacion.denominacion,
                            Cantidad: 0.00,
                            Total: 0.00
                        }
                    }
                );

                dispatch(SetAddDetalleDenominacionesCash(detalleDenominacion));

            } else if (responses === null) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'No se encontro las denominacion',
                });

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
                    text: 'Ocurrio un problema al obtener las denominaciones',
                });
            }
        }
    }
}

export const startSearchUsuarios = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const resp = await suvesaApi.post('/Caja/ObtenerUsuariosSinCajaAbierta');

            const { status, responses } = resp.data;

            if (status === 0 && responses != null) {

                dispatch( SetSearchUsuariosOpenCash(responses) );

            } else if (responses === null) {


                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontraron usuarios',
                    text: '',
                });

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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startSearchCajas = (numApertura) => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const resp = await suvesaApi.post(`/Caja/ObtenerCajas?id=${numApertura}`);

            const { status, responses } = resp.data;

            if (status === 0 && responses != null) {

                dispatch( SetSearchCajasOpenCash(responses) );

                if( responses.length > 0 ) {

                    // Llamar a traer los catalogos de denominaciones y moneda
                    dispatch(startSearchDenominaciones());
                    dispatch(startSearchMoneda());
        
                    // Llamar a traer los catalogos de usuarios y cajas
                    await dispatch(startSearchUsuarios());
        
                    // Se levanta el modal de seleccionar un usuario
                    dispatch( openSearchUsuarioModalOpenCash(true) );

                    dispatch( activeButtonSaveOpenCash(true) );
                    dispatch( activeButtonSearchOpenCash(true) );
                    dispatch( activeButtonRemoveOpenCash( false ) );
                    dispatch( SetStartOpeningOpenCash(true) );
                    dispatch( SetIsOpenCashEdit( false ) );

                    // Desactivar los inputs de usuario
                    dispatch( SetDisableInputsUserOpenCash( true ) );

                    // Ocultar la password
                    dispatch( SetVisiblePasswordOpenCash( false ) );

                    // Se desactivan los campos
                    dispatch( SetDisableInputsOpenCash( false ) );

                    dispatch( CleanStateEncabezadoOpenCash() );


                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No se puede crear una apertura de caja, no existen cajas disponibles.',
                    });

                }

            } else if (responses === null) {


                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontraron usuarios',
                    text: '',
                });

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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startGetAllCajas = () => {

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
            const resp = await suvesaApi.post(`/Caja/ObtenerTodasCajas`);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                dispatch( SetAllCajasOpenCash(responses) );

            } else if (responses === null) {


                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontraron usuarios',
                    text: '',
                });

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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startValidateClaveInternaOpenCash = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { 
                status, 
                userName, 
                idUsuario, 
                message, 
                administrador 
            } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
                
                await dispatch(startSearchCajas(0));

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

export const CleanOpenCash = (value) => ({
    type: types.CleanOpenCash,
    payload: value
})

export const activeButtonNewOpenCash = (value) => ({
    type: types.activeButtonNewOpenCash,
    payload: value
})

export const activeButtonSaveOpenCash = (value) => ({
    type: types.activeButtonSaveOpenCash,
    payload: value
})

export const activeButtonSearchOpenCash = (value) => ({
    type: types.activeButtonSearchOpenCash,
    payload: value
})

export const activeButtonRemoveOpenCash = (value) => ({
    type: types.activeButtonRemoveOpenCash,
    payload: value
})

export const openSearchUsuarioModalOpenCash = (value) => ({
    type: types.openSearchUsuarioModalOpenCash,
    payload: value
})

export const openSearchUsuarioModalOKOpenCash = (value) => ({
    type: types.openSearchUsuarioModalOKOpenCash,
    payload: value
})

export const SetSearchUsuariosOpenCash = (value) => ({
    type: types.SetSearchUsuariosOpenCash,
    payload: value
})

export const SetSearchCajasOpenCash = (value) => ({
    type: types.SetSearchCajasOpenCash,
    payload: value
})

export const SetEditDenominacionOpenCash = (value) => ({
    type: types.SetEditDenominacionOpenCash,
    payload: value
})

export const SetNAperturaOpenCash = (value) => ({
    type: types.SetNAperturaOpenCash,
    payload: value
})

export const SetFechaOpenCash = (value) => ({
    type: types.SetFechaOpenCash,
    payload: value
})

export const SetNombreOpenCash = (value) => ({
    type: types.SetNombreOpenCash,
    payload: value
})

export const SetEstadoOpenCash = (value) => ({
    type: types.SetEstadoOpenCash,
    payload: value
})

export const SetObservacionesOpenCash = (value) => ({
    type: types.SetObservacionesOpenCash,
    payload: value
})

export const SetAnuladoOpenCash = (value) => ({
    type: types.SetAnuladoOpenCash,
    payload: value
})

export const SetCedulaOpenCash = (value) => ({
    type: types.SetCedulaOpenCash,
    payload: value
})

export const SetNum_CajaOpenCash = (value) => ({
    type: types.SetNum_CajaOpenCash,
    payload: value
})

export const SetIdSucursalOpenCash = (value) => ({
    type: types.SetIdSucursalOpenCash,
    payload: value
})

export const Setid_total_topeDetalleTopeActualCash = (value) => ({
    type: types.Setid_total_topeDetalleTopeActualCash,
    payload: value
})

export const SetidNAperturaDetalleTopeActualCash = (value) => ({
    type: types.SetidNAperturaDetalleTopeActualCash,
    payload: value
})

export const SetCodMonedaDetalleTopeActualCash = (value) => ({
    type: types.SetCodMonedaDetalleTopeActualCash,
    payload: value
})

export const SetMonto_TopeDetalleTopeActualCash = (value) => ({
    type: types.SetMonto_TopeDetalleTopeActualCash,
    payload: value
})

export const SetMonedaNombreDetalleTopeActualCash = (value) => ({
    type: types.SetMonedaNombreDetalleTopeActualCash,
    payload: value
})

export const SetAddDetalleTopeCash = (value) => ({
    type: types.SetAddDetalleTopeCash,
    payload: value
})

export const SetIdDetalleDenominacionActualCash = (value) => ({
    type: types.SetIdDetalleDenominacionActualCash,
    payload: value
})

export const SetId_AperturaDetalleDenominacionActualCash = (value) => ({
    type: types.SetId_AperturaDetalleDenominacionActualCash,
    payload: value
})

export const SetId_DenominacionDetalleDenominacionActualCash = (value) => ({
    type: types.SetId_DenominacionDetalleDenominacionActualCash,
    payload: value
})

export const SetMontoDetalleDenominacionActualCash = (value) => ({
    type: types.SetMontoDetalleDenominacionActualCash,
    payload: value
})

export const SetCantidadDetalleDenominacionActualCash = (value) => ({
    type: types.SetCantidadDetalleDenominacionActualCash,
    payload: value
})

export const SetAddDetalleDenominacionesCash = (value) => ({
    type: types.SetAddDetalleDenominacionesCash,
    payload: value
})

export const SetUpdateMontoTopeOpenCash = (value) => ({
    type: types.SetUpdateMontoTopeOpenCash,
    payload: value
})

export const SetUpdateCantidadDenominacionOpenCash = (value) => ({
    type: types.SetUpdateCantidadDenominacionOpenCash,
    payload: value
})

export const SetUpdateTotalDenominacionOpenCash = (value) => ({
    type: types.SetUpdateTotalDenominacionOpenCash,
    payload: value
})

export const SetTotalColonesOpenCash = (value) => ({
    type: types.SetTotalColonesOpenCash,
    payload: value
})

export const SetTotalDolaresOpenCash = (value) => ({
    type: types.SetTotalDolaresOpenCash,
    payload: value
})

export const SetStartOpeningOpenCash = (value) => ({
    type: types.SetStartOpeningOpenCash,
    payload: value
})

export const SetOpenModalSearchOpenCash = (value) => ({
    type: types.SetOpenModalSearchOpenCash,
    payload: value
})

export const SetValorFiltroSearchOpenCash = (value) => ({
    type: types.SetValorFiltroSearchOpenCash,
    payload: value
})

export const SetNombreSearchOpenCash = (value) => ({
    type: types.SetNombreSearchOpenCash,
    payload: value
})

export const SetNumeroSearchOpenCash = (value) => ({
    type: types.SetNumeroSearchOpenCash,
    payload: value
})

export const SetFechasSearchOpenCash = (value) => ({
    type: types.SetFechasSearchOpenCash,
    payload: value
})

export const SetFechaDesdeSearchOpenCash = (value) => ({
    type: types.SetFechaDesdeSearchOpenCash,
    payload: value
})

export const SetFechaHastaSearchOpenCash = (value) => ({
    type: types.SetFechaHastaSearchOpenCash,
    payload: value
})

export const SetChangeFechaDesdeSearchOpenCash = (value) => ({
    type: types.SetChangeFechaDesdeSearchOpenCash,
    payload: value
})

export const SetActiveFechaDesdeSearchOpenCash = (value) => ({
    type: types.SetActiveFechaDesdeSearchOpenCash,
    payload: value
})

export const SetActiveFechaHastaSearchOpenCash = (value) => ({
    type: types.SetActiveFechaHastaSearchOpenCash,
    payload: value
})

export const SetInsertResultSearchOpenCash = (value) => ({
    type: types.SetInsertResultSearchOpenCash,
    payload: value
})

export const CleanSearchOpenCash = () => ({
    type: types.CleanSearchOpenCash
})

export const SetSelectSearchOpenCash = (value) => ({
    type: types.SetSelectSearchOpenCash,
    payload: value
})

export const SetAllCajasOpenCash = (value) => ({
    type: types.SetAllCajasOpenCash,
    payload: value
})

export const SetIsOpenCashEdit = (value) => ({
    type: types.SetIsOpenCashEdit,
    payload: value
})

export const CleanStateEncabezadoOpenCash = () => ({
    type: types.CleanStateEncabezadoOpenCash
})

export const SetDisableInputsOpenCash = (value) => ({
    type: types.SetDisableInputsOpenCash,
    payload: value
})

export const SetClaveInternaOpenCash = (value) => ({
    type: types.SetClaveInternaOpenCash,
    payload: value
})

export const SetVisiblePasswordOpenCash = (value) => ({
    type: types.SetVisiblePasswordOpenCash,
    payload: value
})

export const SetDisableInputsUserOpenCash = (value) => ({
    type: types.SetDisableInputsUserOpenCash,
    payload: value
})