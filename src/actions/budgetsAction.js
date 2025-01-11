import Swal from 'sweetalert2';
import { suvesaApi } from '../api';
import { types } from "../types/types";
import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';
import { SetCleanAllMonedas, startGetAllMonedas, startGetAllTiposIdentificacion } from './MonedasAction';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const startSaveBudget = (proforma, idSucursalOF) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar la cotización?',
            showDenyButton: true,
            showCancelButton: false,
            icon: 'question',
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
                    const { data } = await suvesaApi.post('/Cotizacion/CreateCotizacion', proforma);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
                        const { responses } = data;

                        dispatch(SetCleanBudgets());
                        dispatch(SetCleanAllMonedas());
                        dispatch(SetFechaReporteBudgets(proforma.fechaReporte))
                        dispatch(SetDatosSucursalBudgets(responses));

                        const datosPDF = {
                            datosSucursal: responses,
                            datosProforma: proforma,
                        }
                        dispatch(SetDatosReporteBudgets(datosPDF))
                        Swal.fire({
                            icon: 'success',
                            title: 'Cotización creada correctamente.',
                            showConfirmButton: false,
                            timer: 2500
                        });

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

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Usuario no válido.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema al agregar la cotizacón.',
                    });
                }
            }
        });
    };
}

export const startEditBudget = (proformaImprimir, idSucursalOF) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea editar la cotización ?',
            showDenyButton: true,
            showCancelButton: false,
            icon: 'question',
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
                    const { data } = await suvesaApi.put('/Cotizacion/EditCotizacionEncabezado', proformaImprimir);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();


                    if (status === 0) {

                        const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
                        const { responses } = data;

                        dispatch(SetCleanBudgets());
                        dispatch(SetCleanAllMonedas());
                        dispatch(SetFechaReporteBudgets(proformaImprimir.fechaReporte))
                        dispatch(SetDatosSucursalBudgets(responses));

                        const datosPDF = {
                            datosSucursal: responses,
                            datosProforma: proformaImprimir,
                        }
                        dispatch(SetDatosReporteImprimirBudgets(datosPDF))
                        Swal.fire({
                            icon: 'success',
                            title: 'Cotización editada correctamente.',
                            showConfirmButton: false,
                            timer: 2500
                        });



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

            } catch (error) {

                Swal.close();
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Usuario no válido.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema al agregar la cotizacón.',
                    });
                }
            }
        });
    };
}

export const startPrintBudget = (proforma, idSucursalOF) => {

    return async (dispatch) => {
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
        const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
        const { responses, status } = data;
        //Quitar el loading

        if (status === 0) {

            dispatch(SetFechaReporteBudgets(proforma.fechaReporte))
            dispatch(SetDatosSucursalBudgets(responses));
            const datosPDF = {
                datosSucursal: responses,
                datosProforma: proforma,
            }
            dispatch(SetDatosReporteImprimirBudgets(datosPDF))

        } else {
            const { currentException } = data;
            const msj = currentException.split(',');

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: (currentException.includes(',')) ? msj[3] : currentException,
            });

        }

    }


};
export const startGetDatosSucursalActualBudgets = (idSucursalOF) => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
            const { status, responses } = data;

            if (status === 0) {
                // Establece los tipos en el estado
                dispatch(SetDatosSucursalBudgets(responses));

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
            console.log(error);
            if (error.message === 'Request failed with status code 401.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Usuario no válido.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener los datos de la sucursal actual.',
                });
            }
        }

    }
}

export const startValidateClaveInternaBudgets = (password) => {

    return async (dispatch) => {

        try {
            const { status, userName, message, idUsuario } = await dispatch(startValidateClaveInterna(password));
            if (status === 1) {

                // Validar si el usuario tiene una caja abierta
                const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');
                const users = resp.data.responses;

                if (users.length === 0) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen usuarios con caja abierta.'
                    });

                    return;
                }

                const userResult = users.find(u => u.id === parseInt(idUsuario) && u.nombre === userName);

                if (userResult === undefined) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Este usuario no presenta ninguna caja abierta. Por favor intentalo con otro usuario'
                    });

                    return
                }


                // Se activan los inputs
                dispatch(SetDisableInputsBudgets(false));

                // Se activan los inputs checks
                dispatch(SetDisableInputsChecksBudgets(false));
                // Ocultar la password
                dispatch(SetVisiblePasswordBudgets(false));

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserBudgets(true));

                // Se establece el nameUser
                dispatch(SetNameUserBudgets(userName));

                // Se establece el idUsuario
                dispatch(SetIdUsuarioBudgets(idUsuario));

                // Se inserta el numApertura
                dispatch(SetNumAperturaBudgets(userResult.idApertura));

                // Se inserta el numCaja
                dispatch(SetNumCajaBudgets(userResult.numCaja));

                //Validaciones
                dispatch(SetStartOpeningBudget(true));

                dispatch(SetActiveButtonSaveBudgets(true));

                dispatch(SetActiveButtonSearchBudgets(true))

                // Se traen los catalogos
                await loadCatalogos(dispatch);



            } else if (status === 0 && message === 'Contraseña Incorrecta') {

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

export const startGetOneInventoryBudgets = (codigo, type = 1) => {

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

            let url = '/inventario/ObtenerUnInventario';
            let json = { codigo };

            const { data } = await suvesaApi.post(url, json);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch(SetCodArticuloDetalleActualBudgets(responses.cod_Articulo));
                dispatch(SetDescripcionDetalleActualBudgets(responses.descripcion));
                dispatch(SetCostoDetalleActualBudgets(responses.costo));
                dispatch(SetImpuestoDetalleActualBudgets(responses.iVenta));
                dispatch(SetPrecioADetalleActualBudgets(responses.precio_A));
                dispatch(SetPrecioBDetalleActualBudgets(responses.precio_B));
                dispatch(SetPrecioCDetalleActualBudgets(responses.precio_C));
                dispatch(SetPrecioDDetalleActualBudgets(responses.precio_D));
                dispatch(SetCabysDetalleActualBudgets(responses.codcabys));
                dispatch(SetExistenciaDetalleActualBudgets(responses.existencia));
                dispatch(SetMaxDescuentoDetalleActualBudgets(responses.max_Descuento))
                dispatch(SetSubFamiliaDetalleActualBudgets(responses.subFamilia))
                dispatch(SetPrecioOtrosDetalleActualBudgets(responses.otrosCargos))
                dispatch(SetCodigoMonedaVentaDetalleActualBudgets(responses.monedaVenta))
                dispatch(SetCodigoPDetalleActualBudgets(responses.codigo))

                //Datos Generales de Calculos
                dispatch(SetCantidadDetalleActualBudgets(0));
                dispatch(SetMontoDescuentoDetalleActualBudgets(0))
                dispatch(SetDescuentoDetalleActualBudgets(0))
                dispatch(SetSubTotalDetalleActualBudgets(0))
                dispatch(SetSubTotalExcentoDetalleActualBudgets(0))
                dispatch(SetSubtotalGravadoDetalleActualBudgets(0))
                dispatch(SetTotalDetalleActualBudgets(0))
                dispatch(SetMontoImpuestoDetalleActualBudgets(0))


            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException)

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: currentException
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
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startGetOneInventoryBudegtByCodArticulo = (cod_Articulo, parametros, number) => {

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
            const { data } = await suvesaApi.post('/inventario/ObtenerUnInventarioCod_Articulo', { cod_Articulo });
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch(SetCodArticuloDetalleActualBudgets(responses.cod_Articulo));
                dispatch(SetDescripcionDetalleActualBudgets(responses.descripcion));
                dispatch(SetCostoDetalleActualBudgets(responses.costo));
                dispatch(SetImpuestoDetalleActualBudgets(responses.iVenta));
                dispatch(SetPrecioADetalleActualBudgets(responses.precio_A));
                dispatch(SetPrecioBDetalleActualBudgets(responses.precio_B));
                dispatch(SetPrecioCDetalleActualBudgets(responses.precio_C));
                dispatch(SetPrecioDDetalleActualBudgets(responses.precio_D));
                dispatch(SetCabysDetalleActualBudgets(responses.codcabys));
                dispatch(SetExistenciaDetalleActualBudgets(responses.existencia));
                dispatch(SetMaxDescuentoDetalleActualBudgets(responses.max_Descuento))
                dispatch(SetSubFamiliaDetalleActualBudgets(responses.subFamilia))
                dispatch(SetPrecioOtrosDetalleActualBudgets(responses.otrosCargos))
                dispatch(SetCodigoMonedaVentaDetalleActualBudgets(responses.monedaVenta))
                dispatch(SetCodigoPDetalleActualBudgets(responses.codigo))

                //Datos Generales de Calculos
                dispatch(SetCantidadDetalleActualBudgets(0));
                dispatch(SetMontoDescuentoDetalleActualBudgets(0))
                dispatch(SetDescuentoDetalleActualBudgets(0))
                dispatch(SetSubTotalDetalleActualBudgets(0))
                dispatch(SetSubTotalExcentoDetalleActualBudgets(0))
                dispatch(SetSubtotalGravadoDetalleActualBudgets(0))
                dispatch(SetTotalDetalleActualBudgets(0))
                dispatch(SetMontoImpuestoDetalleActualBudgets(0))
                // calculateTotalsProductCurrent( responses, parametros, number, dispatch );
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'El código de producto ingresado no es válido.'
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
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startGetQuantityArticleBudgetByCodArticulo = (cod_Articulo) => {

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
            const { data } = await suvesaApi.post('/inventario/ObtenerUnInventarioCod_Articulo', { cod_Articulo });
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                dispatch(SetExistenciaDetalleActualBudgets(responses.existencia));
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'El código de producto ingresado no es válido.'
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
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startSearchProformasBudget = () => {

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
            const { data } = await suvesaApi.post('/Cotizacion/ObtenerCotizaciones')
            const { status, responses } = data;
            Swal.close();

            if (status === 0) {
                dispatch(SetAllCotizacionesBudgets(responses))
            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);

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
                    title: 'Error!',
                    text: 'No se encuentran registros de cotizaciones recientes.',
                });
            }
        }
    }
}

export const startSearchCustomerCedulaBudget = (value1) => {

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
            const { data } = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula': value1 })
            const { status, responses } = data;
            Swal.close();

            if (status === 0) {
                const { cedula, nombre, telefono_01, e_Mail, idTipoIdentificacion, identificacion, descuento, tipoprecio } = responses[0];
                dispatch(SetCedulaClienteDataBudgets(cedula))
                dispatch(SetNombreClienteDataBudgets(nombre))
                dispatch(SetTelefonoClienteDataBudgets(telefono_01))
                dispatch(SetCodigoClienteDataBudgets(identificacion))
                dispatch(SetContactoClienteDataBudgets(e_Mail))
                dispatch(SetTipoCedulaClienteDataBudgets(idTipoIdentificacion))
                dispatch(SetMaximoDescuentoClienteDataBudgets(descuento))
                dispatch(SetTipoPrecioClienteDataBudgets(tipoprecio))
            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);

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
                    title: 'Error!',
                    text: 'No se encuentran registros de clientes con lo ingresado.',
                });
            }
        }
    }
}

export const startSearchCustomerBudget = (value1, value2, tipo) => {

    return async (dispatch) => {

        try {

            var resp;

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
            if (tipo === 'cedula') {
                resp = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula': value1 });
            } else if (tipo === 'nombre') {
                resp = await suvesaApi.post('/cliente/BuscarNombre', { 'nombre': value1 });
            } else if (tipo === 'filtro') {
                resp = await suvesaApi.post('/cliente/Buscar', { 'cedula': value1, 'nombre': value2 });
            }

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0) {
                dispatch(SetCustomersBudgets(responses));
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);

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
                    title: 'Error!',
                    text: 'No se encuentran registros de clientes con lo ingresado.',
                });
            }
        }
    }
}

const loadCatalogos = async (dispatch) => {
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
    //await dispatch(startGetAllProveedoresBudgets());
    await dispatch(startGetAllMonedas());
    await dispatch(startGetAllTiposIdentificacion());
    Swal.close();

}

export const SetDisableInputsBudgets = (value) => ({
    type: types.SetDisableInputsBudgets,
    payload: value
});


export const SetDatosReporteImprimirBudgets = (value) => ({
    type: types.SetDatosReporteImprimirBudgets,
    payload: value
});

export const SetActiveButtonPrintBudgets = (value) => ({
    type: types.SetActiveButtonPrintBudgets,
    payload: value
});

export const SetActiveButtonSaveBudgets = (value) => ({
    type: types.SetActiveButtonSaveBudgets,
    payload: value
});

export const SetClaveInternaBudgets = (value) => ({
    type: types.SetClaveInternaBudgets,
    payload: value
});

export const SetVisiblePasswordBudgets = (value) => ({
    type: types.SetVisiblePasswordBudgets,
    payload: value
});

export const SetDisableInputsUserBudgets = (value) => ({
    type: types.SetDisableInputsUserBudgets,
    payload: value
});

export const SetNameUserBudgets = (value) => ({
    type: types.SetNameUserBudgets,
    payload: value
});

export const SetIdUsuarioBudgets = (value) => ({
    type: types.SetIdUsuarioBudgets,
    payload: value
});

export const SetNumAperturaBudgets = (value) => ({
    type: types.SetNumAperturaBudgets,
    payload: value
});

export const SetAllCotizacionesBudgets = (value) => ({
    type: types.SetAllCotizacionesBudgets,
    payload: value
});

export const SetActiveButtonEditBudgets = (value) => ({
    type: types.SetActiveButtonEditBudgets,
    payload: value
});


export const SetActiveButtonSearchBudgets = (value) => ({
    type: types.SetActiveButtonSearchBudgets,
    payload: value
});


export const SetNumCajaBudgets = (value) => ({
    type: types.SetNumCajaBudgets,
    payload: value
});

export const SetStartOpeningBudget = (value) => ({
    type: types.SetStartOpeningBudget,
    payload: value
});


export const SetCustomersBudgets = (value) => ({
    type: types.SetCustomersBudgets,
    payload: value
});

export const SetCodigoClienteDataBudgets = (value) => ({
    type: types.SetCodigoClienteDataBudgets,
    payload: value
});

export const SetNombreClienteDataBudgets = (value) => ({
    type: types.SetNombreClienteDataBudgets,
    payload: value
});

export const SetContactoClienteDataBudgets = (value) => ({
    type: types.SetContactoClienteDataBudgets,
    payload: value
});

export const SetTelefonoClienteDataBudgets = (value) => ({
    type: types.SetTelefonoClienteDataBudgets,
    payload: value
});

export const SetTipoCedulaClienteDataBudgets = (value) => ({
    type: types.SetTipoCedulaClienteDataBudgets,
    payload: value
});
export const SetSubTotalGeneralBudgets = (value) => ({
    type: types.SetSubTotalGeneralBudgets,
    payload: value
});

export const SetSubTotalGravadoGeneralBudgets = (value) => ({
    type: types.SetSubTotalGravadoGeneralBudgets,
    payload: value
});

export const SetSubTotalExentoGeneralBudgets = (value) => ({
    type: types.SetSubTotalExentoGeneralBudgets,
    payload: value
});

export const SetDescuentoGeneralBudgets = (value) => ({
    type: types.SetDescuentoGeneralBudgets,
    payload: value
});

export const SetImpuestoVentaGeneralBudgets = (value) => ({
    type: types.SetImpuestoVentaGeneralBudgets,
    payload: value
});

export const SetTotalGeneralBudgets = (value) => ({
    type: types.SetTotalGeneralBudgets,
    payload: value
});


export const SetCedulaClienteDataBudgets = (value) => ({
    type: types.SetCedulaClienteDataBudgets,
    payload: value
});


export const SetValidezDiasBudgets = (value) => ({
    type: types.SetValidezDiasBudgets,
    payload: value
});

export const SetTiempoEntregaBudgets = (value) => ({
    type: types.SetTiempoEntregaBudgets,
    payload: value
});

export const SetFechaCotizacionsBudgets = (value) => ({
    type: types.SetFechaCotizacionsBudgets,
    payload: value
});
export const SetMonedaBudgets = (value) => ({
    type: types.SetMonedaBudgets,
    payload: value
});

export const SetMonedaNombreBudgets = (value) => ({
    type: types.SetMonedaNombreBudgets,
    payload: value
});

export const SetIsContadoBudgets = (value) => ({
    type: types.SetIsContadoBudgets,
    payload: value
});


export const SetIsCreditoBudgets = (value) => ({
    type: types.SetIsCreditoBudgets,
    payload: value
});

export const SetCodigoCotizacionBudgets = (value) => ({
    type: types.SetCodigoCotizacionBudgets,
    payload: value
})

export const SetIsAnulateBudgets = (value) => ({
    type: types.SetIsAnulateBudgets,
    payload: value
});

export const SetIsEditArticleBudgets = (value) => ({
    type: types.SetIsEditArticleBudgets,
    payload: value
});

export const SetIsNewArticleBudgets = (value) => ({
    type: types.SetIsNewArticleBudgets,
    payload: value
});



export const SetIsConfirmBudgets = (value) => ({
    type: types.SetIsConfirmBudgets,
    payload: value
});

export const SetDisableInputsChecksBudgets = (value) => ({
    type: types.SetDisableInputsChecksBudgets,
    payload: value
});


export const SetCostoTransporteBudgets = (value) => ({
    type: types.SetCostoTransporteBudgets,
    payload: value
});

export const SetNombreQuienCotizaBudgets = (value) => ({
    type: types.SetNombreQuienCotizaBudgets,
    payload: value
});

export const SetNombreQuienConfirmaBudgets = (value) => ({
    type: types.SetNombreQuienConfirmaBudgets,
    payload: value
});

export const SetObservacionesBudgets = (value) => ({
    type: types.SetObservacionesBudgets,
    payload: value
});

export const SetOpenSearchInventoryBudgets = (value) => ({
    type: types.SetOpenSearchInventoryBudgets,
    payload: value
});

export const SetDetalleFacturaBudgets = (value) => ({
    type: types.SetDetalleFacturaBudgets,
    payload: value
});

export const SetCodArticuloDetalleActualBudgets = (value) => ({
    type: types.SetCodArticuloDetalleActualBudgets,
    payload: value
});

export const SetTipoPrecioClienteDataBudgets = (value) => ({
    type: types.SetTipoPrecioClienteDataBudgets,
    payload: value
});

export const SetMaximoDescuentoClienteDataBudgets = (value) => ({
    type: types.SetMaximoDescuentoClienteDataBudgets,
    payload: value
});

export const SetDisableInputsArticlesBudgets = (value) => ({
    type: types.SetDisableInputsArticlesBudgets,
    payload: value
});


export const SetDescuentoDetalleActualBudgets = (value) => ({
    type: types.SetDescuentoDetalleActualBudgets,
    payload: value
});

export const SetDescripcionDetalleActualBudgets = (value) => ({
    type: types.SetDescripcionDetalleActualBudgets,
    payload: value
});


export const SetCostoDetalleActualBudgets = (value) => ({
    type: types.SetCostoDetalleActualBudgets,
    payload: value
});


export const SetCantidadDetalleActualBudgets = (value) => ({
    type: types.SetCantidadDetalleActualBudgets,
    payload: value
});

export const SetMontoImpuestoDetalleActualBudgets = (value) => ({
    type: types.SetMontoImpuestoDetalleActualBudgets,
    payload: value
});

export const SetSubtotalGravadoDetalleActualBudgets = (value) => ({
    type: types.SetSubtotalGravadoDetalleActualBudgets,
    payload: value
});

export const SetSubTotalExcentoDetalleActualBudgets = (value) => ({
    type: types.SetSubTotalExcentoDetalleActualBudgets,
    payload: value
});

export const SetSubTotalDetalleActualBudgets = (value) => ({
    type: types.SetSubTotalDetalleActualBudgets,
    payload: value
});

export const SetTotalDetalleActualBudgets = (value) => ({
    type: types.SetTotalDetalleActualBudgets,
    payload: value
});

export const SetPrecioADetalleActualBudgets = (value) => ({
    type: types.SetPrecioADetalleActualBudgets,
    payload: value
});

export const SetPrecioBDetalleActualBudgets = (value) => ({
    type: types.SetPrecioBDetalleActualBudgets,
    payload: value
});

export const SetPrecioCDetalleActualBudgets = (value) => ({
    type: types.SetPrecioCDetalleActualBudgets,
    payload: value
});

export const SetPrecioDDetalleActualBudgets = (value) => ({
    type: types.SetPrecioDDetalleActualBudgets,
    payload: value
});

export const SetCabysDetalleActualBudgets = (value) => ({
    type: types.SetCabysDetalleActualBudgets,
    payload: value
});

export const SetImpuestoDetalleActualBudgets = (value) => ({
    type: types.SetImpuestoDetalleActualBudgets,
    payload: value
});

export const SetExistenciaDetalleActualBudgets = (value) => ({
    type: types.SetExistenciaDetalleActualBudgets,
    payload: value
});

export const SetMontoDescuentoDetalleActualBudgets = (value) => ({
    type: types.SetMontoDescuentoDetalleActualBudgets,
    payload: value
});

export const SetCleanDetalleActualBudgets = (value) => ({
    type: types.SetCleanDetalleActualBudgets,
    payload: value
});

export const SetCleanAllDatosPDFBudgets = (value) => ({
    type: types.SetCleanAllDatosPDFBudgets,
    payload: value
});


export const SetCodigoPDetalleActualBudgets = (value) => ({
    type: types.SetCodigoPDetalleActualBudgets,
    payload: value
});

export const SetCodigoMonedaVentaDetalleActualBudgets = (value) => ({
    type: types.SetCodigoMonedaVentaDetalleActualBudgets,
    payload: value
});

export const SetPrecioOtrosDetalleActualBudgets = (value) => ({
    type: types.SetPrecioOtrosDetalleActualBudgets,
    payload: value
});

export const SetSubFamiliaDetalleActualBudgets = (value) => ({
    type: types.SetSubFamiliaDetalleActualBudgets,
    payload: value
});

export const SetDatosSucursalBudgets = (value) => ({
    type: types.SetDatosSucursalBudgets,
    payload: value
});

export const SetDatosReporteBudgets = (value) => ({
    type: types.SetDatosReporteBudgets,
    payload: value
});


export const SetFechaReporteBudgets = (value) => ({
    type: types.SetFechaReporteBudgets,
    payload: value
});

export const SetMaxDescuentoDetalleActualBudgets = (value) => ({
    type: types.SetMaxDescuentoDetalleActualBudgets,
    payload: value
});

export const SetCleanBudgets = () => ({
    type: types.SetCleanBudgets
})



