import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveCharge = (charge) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea generar el cobro?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Generar',
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

                    if (charge[0].tipoDocumento == null || charge[0].tipoDocumento == "Credito") {
                        //Call end-point 
                        const { data } = await suvesaApi.post('/Cobros/InsertarCobro', charge);
                        const { status } = data;
                        //Quitar el loading
                            Swal.close();
                        if (status === 0) {
                            const { data } = await suvesaApi.get(`/AbonoCobrar/ObetenerAbonoCobrar?id=${charge[0].idDocumento}`);
                            const { responses, status } = data;

                            if (status === 0) {
                                //Si es correcta entonces mostrar un mensaje de afirmacion
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cobro realizado correctamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                // Se limpia el estado
                                dispatch(CleanStateCharge());
                                // Se muestra el modal deL Recibo
                                dispatch(SetTiqueteAbonoCajaCharge(responses))
                            }

                        } else {

                            //Caso contrario respuesta incorrecto mostrar mensaje de error
                            const { currentException } = data;
                            const msj = currentException.split(',');

                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: (currentException.includes(',')) ? msj[3] : currentException,
                            });

                        }

                    } else {
                        //Call end-point 
                        const { data } = await suvesaApi.post('/Cobros/InsertarCobro', charge);
                        const { status } = data;
                        //Quitar el loading
                        Swal.close();
                        if (status === 0) {
                            // Se manda a llamar el end-point para preventa factura
                            const { data } = await suvesaApi.post(`/venta/PreventaFacturada?idPreventa=${charge[0].idDocumento}`);
                            const { status } = data;
                            if (status === 0) {

                                //Si es correcta entonces mostrar un mensaje de afirmacion
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cobro realizado correctamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                // Se muestra el modal de ticket
                                dispatch(startGetTiqueteCaja(charge[0].idDocumento));

                                // Se limpia el estado
                                dispatch(CleanStateCharge());
                            }

                        } else {

                            //Caso contrario respuesta incorrecto mostrar mensaje de error
                            const { currentException } = data;
                            const msj = currentException.split(',');

                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: (currentException.includes(',')) ? msj[3] : currentException,
                            });

                        }
                    }
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
                        text: 'Ocurrio un problema al generar el cobro',
                    });
                }
            }
        });
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
                dispatch(SetTiqueteCajaCharge(responses))
            } else {
                console.log(currentException);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al generar el tiquete de caja.',
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
                    text: 'Ocurrio un problema al generar el tiquete de caja.',
                });
            }
        }
    }
}

export const startGetAllFormasPago = (idCliente) => {

    return async (dispatch) => {

        try {

            const date = new Date();

            //Call end-point 
            const { data } = await suvesaApi.post(`/FormasPagos/ObtenerFormasDePago?codCliente=${idCliente}`);

            const { status, responses } = data;

            if (status === 0 && responses != null) {

                // Se insertan en el estado
                dispatch(SetInsertFormasPagoCharge(responses));

                // Se insertan el estado inicial de cobro
                const initialCobro = responses.map(formaPago => {
                    return {
                        id: 0,
                        documento: 0,
                        tipoDocumento: '',
                        montoPago: 0,
                        formaPago: formaPago.codigo,
                        nombreFormaPago: formaPago.descripcion,
                        usuario: '',
                        nombre: '',
                        codMoneda: 0,
                        nombremoneda: '',
                        tipoCambio: 0,
                        fecha: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
                        numapertura: 0,
                        vuelto: 0,
                        numeroDocumento: '',
                        idDocumento: 0
                    }
                });
                dispatch(SetInsertInitialCobroCharge(initialCobro));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener las formas de pago',
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
                    text: 'Ocurrio un problema al obtener las formas de pago',
                });
            }
        }
    }
}

// Type 1 => Ficha
// Type 2 => Cedula
// Type 3 => Nombre
export const startSearchPreVenta = (dato, initialCobro, cedula, name, numApertura, type) => {

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

            let url = '';
            let codCliente = 0;

            const date = new Date();
            const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

            if (type === 1) {
                url = `/venta/ObtenerPreventaPorFicha?ficha=${dato}&fecha=${isoDateTime}`;
            } else if (type === 2) {

                const { data } = await suvesaApi.post(`/cliente/obtenerCodigoCliente?cedula=${dato}`);
                const { status, responses } = data;

                if (status === 0) {
                    codCliente = parseInt(responses);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: `No existe ningun cliente con la cédula ${dato} por intentelo de nuevo.`
                    });

                    return;
                }

                url = `/venta/ObtenerPreventaPorCodigoCliente?cliente=${codCliente}`;

            } else if (type === 3) {
                //TODO: Cambiar URL
                url = `/venta/ObtenerPreventaPorNombre?nombre=${dato}`;
            }

            //Call end-point 
            const { data } = await suvesaApi.post(url);
            const { status, responses, currentException } = data;
            // Cerrar modal
            Swal.close();

            if (status === 0 && responses != null) {

                // Se agregan los campos a los cobros
                const cobros = initialCobro.map(cobro => {
                    return {
                        id: 0,
                        documento: responses.numFactura,
                        tipoDocumento: responses.tipoFactura,
                        montoPago: 0.00,
                        formaPago: cobro.formaPago,
                        nombreFormaPago: cobro.nombreFormaPago,
                        usuario: cedula,
                        nombre: name,
                        codMoneda: parseInt(responses.codMoneda),
                        nombremoneda: responses.moneda,
                        tipoCambio: 0,
                        fecha: cobro.fecha,
                        numapertura: numApertura,
                        vuelto: 0,
                        numeroDocumento: '',
                        idDocumento: responses.id
                    }
                });


                // console.log(responses.tipoFactura)
                // debugger;

                if (responses.tipoFactura === null) {
                    dispatch(SetIsTiqueteAbonoCajaCharge(true));
                    dispatch(SetIsTiqueteNormalCajaCharge(false));
                } else {
                    dispatch(SetIsTiqueteAbonoCajaCharge(false));
                    dispatch(SetIsTiqueteNormalCajaCharge(true));
                }

                // Se ingresa la data de los cobros
                dispatch(SetInsertInitialCobroCharge(cobros));

                // Se establece el total a pagar
                dispatch(SetTotalCobrarCharge(responses.total));

                // Se establece el total original
                dispatch(SetTotalCobrarOriginalCharge(responses.total));

                // Obtener el simbolo de la moneda
                let iconCoin = '';

                if (responses.moneda === 'COLON') {
                    iconCoin = '₡';
                } else {
                    iconCoin = '$';
                }

                responses.fecha = responses.fecha.split(' ')[0];
                responses.impVenta = `${iconCoin} ${responses.impVenta}`;
                responses.descuento = `${iconCoin} ${responses.descuento}`;
                responses.subTotal = `${iconCoin} ${responses.subTotal}`;
                responses.total = `${iconCoin} ${responses.total}`;

                responses.detalle = responses.detalle.map(det => {
                    return {
                        ...det,
                        impuesto: `${det.impuesto}%`,
                        subTotal: `${iconCoin} ${det.subTotal}`,
                        total: `${iconCoin} ${det.subTotal + det.montoImpuesto}`
                    }
                });

                dispatch(SetInsertPreVentaCharge(responses));

                // Se desactivan los campo de buscar
                dispatch(SetDisableInputsSearchCharge(true));

                // Se indica que se busca la preventa
                dispatch(SetIsSearchPreventaCharge(true));

            } else if (currentException === 'No existe preventa') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: `No existe una preventa con la ficha ${ficha} por inténtelo con otro número de ficha.`
                });

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
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
                    text: 'Ocurrio un problema al buscar una preventa por ficha',
                });
            }
        }
    }
}

export const startValidateClaveInternaCharge = (password) => {

    return async (dispatch) => {

        try {

            const { status, userName, idUsuario, message } = await dispatch(startValidateClaveInterna(password));

            if (status === 1) {

                const { estado, numApertura, mensaje } = await dispatch(startValidateUserWithOpenCash(idUsuario));

                if (estado === true) {

                    // Se activan los inputs de search
                    dispatch(SetDisableInputsSearchCharge(false));

                    // Se activan los icons
                    dispatch(SetDisableIconsSearchCharge(false));

                    //Guardar el usuario en el state
                    dispatch(SetNameUserCharge(userName));

                    //Guardar cedula del usuario
                    dispatch(SetCedulaUserCharge(idUsuario));

                    // Guardar numApertura
                    dispatch(SetNumAperturaCharge(numApertura));

                    // Desactivar los inputs de usuario
                    dispatch(SetDisableInputsUserCharge(true));

                    // Ocultar la password
                    dispatch(SetVisiblePasswordUserCharge(false));

                    // Se activa el start opening
                    dispatch(SetStartOpeningCharge(true));

                    // Se cargan los catalogos
                    await loadCatalogos(dispatch, idUsuario);

                } else if (estado === false && mensaje === 'No encontrado') {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: `Usuario ${name} no tiene ninguna apertura de caja. Por favor, inténtalo con otro usuario.`
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: respUserWithOpenCash,
                    });

                }

            } else if (status === 0 && message === 'Contraseña Incorrecta') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: message
                });

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: message,
                });

            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Ocurrio un problema al validar usuario',
            });
        }

    }
}

const startValidateUserWithOpenCash = (id) => {

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
            const { data } = await suvesaApi.post(`/Caja/ValidarUsuarioConCajaAbierta?idUsuario=${id}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0 && responses.estado === true) {
                return {
                    estado: true,
                    numApertura: responses.numeroApertura,
                    mensaje: ''
                };
            } else {
                return {
                    estado: false,
                    numApertura: responses.numeroApertura,
                    mensaje: 'No encontrado'
                };
            }

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                return {
                    estado: false,
                    numApertura: responses.numeroApertura,
                    mensaje: 'Usuario no valido'
                };
            } else {
                return {
                    estado: false,
                    numApertura: responses.numeroApertura,
                    mensaje: 'Ocurrio un problema al validar usuario'
                };
            }
        }

    }
}

const loadCatalogos = async (dispatch, idUsuario) => {

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

    // Se traen las formas de pago
    await dispatch(startGetAllFormasPago(idUsuario));

    //Quitar el loading
    Swal.close();

}

// Normal Actions
export const SetInsertFormasPagoCharge = (value) => ({
    type: types.SetInsertFormasPagoCharge,
    payload: value
})

export const SetInsertInitialCobroCharge = (value) => ({
    type: types.SetInsertInitialCobroCharge,
    payload: value
})

export const SetInsertPreVentaCharge = (value) => ({
    type: types.SetInsertPreVentaCharge,
    payload: value
})

export const SetNumeroFichaSearchCharge = (value) => ({
    type: types.SetNumeroFichaSearchCharge,
    payload: value
})

export const SetDisableInputsSearchCharge = (value) => ({
    type: types.SetDisableInputsSearchCharge,
    payload: value
})

export const SetIdUserCharge = (value) => ({
    type: types.SetIdUserCharge,
    payload: value
})

export const SetClaveInternaUserCharge = (value) => ({
    type: types.SetClaveInternaUserCharge,
    payload: value
})

export const SetVisiblePasswordUserCharge = (value) => ({
    type: types.SetVisiblePasswordUserCharge,
    payload: value
})

export const SetDisableInputsUserCharge = (value) => ({
    type: types.SetDisableInputsUserCharge,
    payload: value
})

export const SetDisableIconsSearchCharge = (value) => ({
    type: types.SetDisableIconsSearchCharge,
    payload: value
})

export const SetNameUserCharge = (value) => ({
    type: types.SetNameUserCharge,
    payload: value
})

export const SetCedulaUserCharge = (value) => ({
    type: types.SetCedulaUserCharge,
    payload: value
})

export const SetStartOpeningCharge = (value) => ({
    type: types.SetStartOpeningCharge,
    payload: value
})

export const SetNumAperturaCharge = (value) => ({
    type: types.SetNumAperturaCharge,
    payload: value
})

export const CleanStateCharge = () => ({
    type: types.CleanStateCharge
})

export const SetOpenModalDetailsPreventaCharge = (value) => ({
    type: types.SetOpenModalDetailsPreventaCharge,
    payload: value
})

export const SetTotalCobrarCharge = (value) => ({
    type: types.SetTotalCobrarCharge,
    payload: value
})

export const SetTotalCobrarOriginalCharge = (value) => ({
    type: types.SetTotalCobrarOriginalCharge,
    payload: value
})

export const SetEntregadoCharge = (value) => ({
    type: types.SetEntregadoCharge,
    payload: value
})

export const SetCambioCharge = (value) => ({
    type: types.SetCambioCharge,
    payload: value
})

export const SetIsSearchPreventaCharge = (value) => ({
    type: types.SetIsSearchPreventaCharge,
    payload: value
})

export const SetMontoPagoCharge = (value) => ({
    type: types.SetMontoPagoCharge,
    payload: value
})

export const SetDisableInputMontoEFECharge = (value) => ({
    type: types.SetDisableInputMontoEFECharge,
    payload: value
})

export const SetDisableInputMontoTARCharge = (value) => ({
    type: types.SetDisableInputMontoTARCharge,
    payload: value
})

export const SetIsOpenTicketModalCharge = (value) => ({
    type: types.SetIsOpenTicketModalCharge,
    payload: value
})

export const SetCheckSearchFichaCharge = (value) => ({
    type: types.SetCheckSearchFichaCharge,
    payload: value
})

export const SetCheckSearchCedulaCharge = (value) => ({
    type: types.SetCheckSearchCedulaCharge,
    payload: value
})

export const SetCheckSearchNombreCharge = (value) => ({
    type: types.SetCheckSearchNombreCharge,
    payload: value
})

export const SetCedulaSearchCharge = (value) => ({
    type: types.SetCedulaSearchCharge,
    payload: value
})

export const SetNombreFichaSearchCharge = (value) => ({
    type: types.SetNombreFichaSearchCharge,
    payload: value
})

export const SetTiqueteCajaCharge = (value) => ({
    type: types.SetTiqueteCajaCharge,
    payload: value
})

export const SetTiqueteAbonoCajaCharge = (value) => ({
    type: types.SetTiqueteAbonoCajaCharge,
    payload: value
})


export const SetIsTiqueteAbonoCajaCharge = (value) => ({
    type: types.SetIsTiqueteAbonoCajaCharge,
    payload: value
})

export const SetIsTiqueteNormalCajaCharge = (value) => ({
    type: types.SetIsTiqueteNormalCajaCharge,
    payload: value
})