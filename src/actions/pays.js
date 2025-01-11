import Swal from 'sweetalert2';
import { suvesaApi } from '../api';
import { types } from "../types/types";
import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';
import { SetCleanAllMonedas, startGetAllMonedas } from './MonedasAction';


export const startValidateClaveInternaPays = (password) => {

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
                dispatch(SetDisableInputsPays(false));

                // Se cambia los icons
                dispatch(SetActiveButtonSavePays(true));

                dispatch(SetActiveButtonSearchPays(true));

                dispatch(SetActiveButtonRemovePays(true));

                // Ocultar la password
                dispatch(SetVisiblePasswordPays(false));

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserPays(true));

                // Se establece el nameUser
                dispatch(SetNameUserPays(userName));

                // Se establece el idUsuario
                dispatch(SetIdUsuarioPays(idUsuario));

                // Se inserta el numApertura
                dispatch(SetNumAperturaPays(userResult.idApertura));

                // Se inserta el numCaja
                dispatch(SetNumCajaPays(userResult.numCaja));

                //Habilitamos la pantalla
                dispatch(SetOpeningPays(true));

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
export const startSavePays = (newPay, idSucursalOF) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar el abono de pago?',
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
                    const { data } = await suvesaApi.post('/AbonoPagar/CreateAbonoPagar', newPay);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();
                    if (status === 0) {

                        const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
                        const { responses } = data;

                        dispatch(SetCleanPays());
                        dispatch(SetCleanAllMonedas());
                        dispatch(SetDatosSucursalPays(responses));
                        const datosPDF = {
                            datosSucursal: responses,
                            datosAbonoPago: newPay,
                        }
                        dispatch(SetDatosReciboImprimirPays(datosPDF))
                        Swal.fire({
                            icon: 'success',
                            title: 'Abono de pago creado correctamente.',
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
                        text: 'Ocurrio un problema al agregar el abono de pago.',
                    });
                }
            }
        });
    };
}

export const startPrintPays = (oldPay, idSucursalOF) => {

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

            setTimeout(() => {
                Swal.close();
            }, 2000);
            
            const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
            const { responses } = data;
            dispatch(SetDatosSucursalPays(responses));
            const datosPDF = {
                datosSucursal: responses,
                datosAbonoPago: oldPay,
            }
            dispatch(SetDatosReciboImprimirPays(datosPDF))
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
                    text: 'Ocurrio un problema al imprimir el abono.',
                });
            }
        }
    };
}

export const startSearchAbonosPays = () => {

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
            const { data } = await suvesaApi.get('/AbonoPagar/GetListAbonarPagar')
            const { status, responses } = data;
            Swal.close();

            if (status === 0) {
                dispatch(SetAbonosHechosPays(responses))
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
                    text: 'No se encuentran registros de abonos pagar recientes.',
                });
            }
        }
    }
}

export const startGetAllBancosPays = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
            const { status, responses } = data;

            if (status === 0) {

                // Se guarda en el estado los bancos
                dispatch(SetBancosPays(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los bancos',
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
                    text: 'Ocurrio un problema al obtener los bancos',
                });
            }
        }

    }
}

export const startGetAllCuentasPays = (idBanco, idEmpresa) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerCuentasPorBanco?idbanco=${idBanco}&idEmpresa=${idEmpresa}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                const cuentas = responses.map(resp => {
                    return {
                        id: resp.id,
                        numero: resp.numero
                    }
                });

                // Se guarda en el estado las cuentas
                dispatch(SetCuentasBancoPays(cuentas));
                dispatch(SetDisableInputCuentaPays(false));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                if (currentException === 'No se encuentran cuentas bancarias.') {

                    dispatch(SetCleanCuentasPays());
                    dispatch(SetDisableInputCuentaPays(true));

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
                    text: 'Ocurrio un problema al obtener las cuentas',
                });
            }
        }

    }
}


export const startAllProveedoresFacturasPays = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.get('/AbonoPagar/ObtenerFacturasPendientesPagar');

            const { status, responses } = data;
            Swal.close();

            if (status === 0) {

                dispatch(SetAllProveedoresFacturasPays(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los proveedores con pago pendiente.',
                });

            }

        } catch (error) {

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
                    text: 'Ocurrio un problema al obtener los clientes con deuda',
                });
            }
        }

    }
}

export const startAllCuentasBancariasProveedorPays = (codigoProv) => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`proveedor/ObtenerProveedor?codigo=${codigoProv}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0) {
                if (responses.cuentasBancariasProveedors == null) {
                    const cuentaVacia =
                        [
                            {
                                numCuenta: "Sin Cuenta(s) Registrada(s)",
                                idCuenta: 0
                            }
                        ]

                    dispatch(SetCuentasProveedorPays(cuentaVacia))
                } else {
                    dispatch(SetCuentasProveedorPays(responses.cuentasBancariasProveedors));
                }
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los proveedores con pago pendiente.',
                });

            }

        } catch (error) {

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
                    text: 'Ocurrio un problema al obtener los clientes con deuda',
                });
            }
        }

    }
}

export const startDatosProveedorPays = (codigoProv) => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`proveedor/ObtenerProveedor?codigo=${codigoProv}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0) {
                dispatch(SetNombreProveAbonoDetallePays(responses.nombre));
                dispatch(SetCedulaProveAbonoDetallePays(responses.cedula));
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los proveedores con pago pendiente.',
                });

            }

        } catch (error) {

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
                    text: 'Ocurrio un problema al obtener los clientes con deuda',
                });
            }
        }

    }
}
// Private methods
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

    await dispatch(startGetAllMonedas());
    await dispatch(startGetAllBancosPays());
    await dispatch(startAllProveedoresFacturasPays());
    //Quitar el loading
    Swal.close();
}


export const SelectTabPays = (nameTab) => ({
    type: types.SelectTabPays,
    payload: { nameTab }
});

export const SetActiveButtonSavePays = (value) => ({
    type: types.SetActiveButtonSavePays,
    payload: value
});

export const SetAbonosHechosDefaultPays = (value) => ({
    type: types.SetAbonosHechosDefaultPays,
    payload: value
});

export const SetActiveButtonSearchPays = (value) => ({
    type: types.SetActiveButtonSearchPays,
    payload: value
});

export const SetActiveButtonRemovePays = (value) => ({
    type: types.SetActiveButtonRemovePays,
    payload: value
});

export const SetDisableInputsPays = (value) => ({
    type: types.SetDisableInputsPays,
    payload: value
});

export const SetClaveInternaPays = (value) => ({
    type: types.SetClaveInternaPays,
    payload: value
});

export const SetVisiblePasswordPays = (value) => ({
    type: types.SetVisiblePasswordPays,
    payload: value
});

export const SetDisableInputsUserPays = (value) => ({
    type: types.SetDisableInputsUserPays,
    payload: value
});

export const SetNameUserPays = (value) => ({
    type: types.SetNameUserPays,
    payload: value
});

export const SetIdUsuarioPays = (value) => ({
    type: types.SetIdUsuarioPays,
    payload: value
});

export const SetNumAperturaPays = (value) => ({
    type: types.SetNumAperturaPays,
    payload: value
});

export const SetNumCajaPays = (value) => ({
    type: types.SetNumCajaPays,
    payload: value
});

export const SetOpeningPays = (value) => ({
    type: types.SetOpeningPays,
    payload: value
});

export const SetMonedaAbonoPays = (value) => ({
    type: types.SetMonedaAbonoPays,
    payload: value
});

export const SetObservacionesAbonoPays = (value) => ({
    type: types.SetObservacionesAbonoPays,
    payload: value
});


export const SetMonedaAbonoDetallePays = (value) => ({
    type: types.SetMonedaAbonoDetallePays,
    payload: value
});

export const SetCleanFacturasProveedor = (value) => ({
    type: types.SetCleanFacturasProveedor,
    payload: value
});



export const SetAbonosHechosPays = (value) => ({
    type: types.SetAbonosHechosPays,
    payload: value
});


export const SetCedulaProveAbonoDetallePays = (value) => ({
    type: types.SetCedulaProveAbonoDetallePays,
    payload: value
});

export const SetNombreProveAbonoDetallePays = (value) => ({
    type: types.SetNombreProveAbonoDetallePays,
    payload: value
});

export const SetCodigoProveAbonoDetallePays = (value) => ({
    type: types.SetCodigoProveAbonoDetallePays,
    payload: value
});

export const SetFechaAbonoPays = (value) => ({
    type: types.SetFechaAbonoPays,
    payload: value
});

export const SetNumFacturaAbonoDetallePays = (value) => ({
    type: types.SetNumFacturaAbonoDetallePays,
    payload: value
});

export const SetIdCompraAbonoDetallePays = (value) => ({
    type: types.SetIdCompraAbonoDetallePays,
    payload: value
});

export const SetAllAbonosPays = (value) => ({
    type: types.SetAllAbonosPays,
    payload: value
});

export const SetDisableInputsAbonoActualPays = (value) => ({
    type: types.SetDisableInputsAbonoActualPays,
    payload: value
});

export const SetCleanAbonoActualPays = (value) => ({
    type: types.SetCleanAbonoActualPays,
    payload: value
});

export const SetDatosSucursalPays = (value) => ({
    type: types.SetDatosSucursalPays,
    payload: value
});

export const SetFechaFacturaAbonoDetallePays = (value) => ({
    type: types.SetFechaFacturaAbonoDetallePays,
    payload: value
});
export const SetMontoFacturaAbonoDetallePays = (value) => ({
    type: types.SetMontoFacturaAbonoDetallePays,
    payload: value
});
export const SetSaldoAnteriorAbonoDetallePays = (value) => ({
    type: types.SetSaldoAnteriorAbonoDetallePays,
    payload: value
});
export const SetAbonoDetallePays = (value) => ({
    type: types.SetAbonoDetallePays,
    payload: value
});
export const SetSaldoActualAbonoDetallePays = (value) => ({
    type: types.SetSaldoActualAbonoDetallePays,
    payload: value
});

export const SetAbonoSuMonedaAbonoDetallePays = (value) => ({
    type: types.SetAbonoSuMonedaAbonoDetallePays,
    payload: value
});

export const SetFacturasProveedorPays = (value) => ({
    type: types.SetFacturasProveedorPays,
    payload: value
});

export const SetIsNewAbonoPays = (value) => ({
    type: types.SetIsNewAbonoPays,
    payload: value
});

export const SetCleanSeletecProveedor = (value) => ({
    type: types.SetCleanSeletecProveedor,
    payload: value
});


export const SetAllProveedoresFacturasDefaultPays = (value) => ({
    type: types.SetAllProveedoresFacturasDefaultPays,
    payload: value
});

export const SetCodigoProvePays = (value) => ({
    type: types.SetCodigoProvePays,
    payload: value
});


export const SetTotalSaldoAnteriorPays = (value) => ({
    type: types.SetTotalSaldoAnteriorPays,
    payload: value
});

export const SetTotalMontoRecibidoPays = (value) => ({
    type: types.SetTotalMontoRecibidoPays,
    payload: value
});

export const SetTotalSaldoActualPays = (value) => ({
    type: types.SetTotalSaldoActualPays,
    payload: value
});

export const SetBancoPays = (value) => ({
    type: types.SetBancoPays,
    payload: value
});

export const SetCuentaBancoPays = (value) => ({
    type: types.SetCuentaBancoPays,
    payload: value
});

export const SetCentroPagoPays = (value) => ({
    type: types.SetCentroPagoPays,
    payload: value
});

export const SetTipoPagoPays = (value) => ({
    type: types.SetTipoPagoPays,
    payload: value
});

export const SetBancosPays = (value) => ({
    type: types.SetBancosPays,
    payload: value
});

export const SetCuentasBancoPays = (value) => ({
    type: types.SetCuentasBancoPays,
    payload: value
});


export const SetDisableInputCuentaPays = (value) => ({
    type: types.SetDisableInputCuentaPays,
    payload: value
})

export const SetNumeroDocumentoPays = (value) => ({
    type: types.SetNumeroDocumentoPays,
    payload: value
})

export const SetNumeroReciboPays = (value) => ({
    type: types.SetNumeroReciboPays,
    payload: value
})

export const SetCuentasProveedorPays = (value) => ({
    type: types.SetCuentasProveedorPays,
    payload: value
})


export const SetNumeroCuentaProveedorPays = (value) => ({
    type: types.SetNumeroCuentaProveedorPays,
    payload: value
})

export const SetAllProveedoresFacturasPays = (value) => ({
    type: types.SetAllProveedoresFacturasPays,
    payload: value
})


export const SetIsEnablePrintButtonPays = (value) => ({
    type: types.SetIsEnablePrintButtonPays,
    payload: value
})

export const SetDatosReciboImprimirPays = (value) => ({
    type: types.SetDatosReciboImprimirPays,
    payload: value
})

export const SetCleanPays = () => ({
    type: types.SetCleanPays
})

export const SetCleanCuentasPays = () => ({
    type: types.SetCleanCuentasPays
})
