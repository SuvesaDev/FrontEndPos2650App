
import Swal from 'sweetalert2';
import { types } from "../types/types";
import loadingImage from '../assets/loading_snipiner.gif';
import { suvesaApi } from '../api';
import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveArqueoCash = (Arqueo) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea guardar el Arqueo?',
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
                    const { data } = await suvesaApi.post('/Arqueo/CrearArqueoCaja', Arqueo);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //TODO: Leer el modelo de respuesta y exportar un PDF Forma de Tabla

                        dispatch(CleanArqueoCash());

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Arqueo agregado correctamente',
                            showConfirmButton: false,
                            timer: 2500
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
                        text: 'Ocurrio un problema al crear el arqueo de caja',
                    });
                }
            }
        });
    };
}
export const startEditArqueoCash = (arqueo) => {

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
            const { data } = await suvesaApi.post('/Arqueo/EditarArqueoCaja', arqueo);
            const { status } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                dispatch(CleanArqueoCash());

                //Si es correcta entonces mostrar un mensaje de afirmacion
                Swal.fire({
                    icon: 'success',
                    title: 'Arqueo Editado Correctamente',
                    showConfirmButton: false,
                    timer: 2500
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
                    text: 'Ocurrio un problema al editar un arqueo de caja',
                });
            }
        }
    };
}

export const startSearchArqueoCash = (searchArqueoCash) => {

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
            const resp = await suvesaApi.post(`/Arqueo/ObtenerFiltrosArqueoCaja`, searchArqueoCash);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                if (responses.length > 0) {

                    const arqueoCash = responses.map(arqueoC => {

                        const date = arqueoC.fecha.split('T');

                        return {
                            arqueo: arqueoC.numeroArqueo,
                            nombre: arqueoC.nomUsuario,
                            fecha: date[0],
                        }
                    });

                    // Se insertan en el estado de busqueda
                    dispatch(SetInsertResultSearchArqueoCash(arqueoCash));

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen arqueo de caja con los parametros de busqueda.',
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
                    text: 'Ocurrio un problema al buscar arqueos de caja',
                });
            }
        }
    }
}

export const startDisableArqueoCash = (idArqueoCash) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea anular este arqueo de caja?',
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
                    const { data } = await suvesaApi.post(`/Arqueo/DeleteArqueoCaja?id=${idArqueoCash}`);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Arqueo de caja anulado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch(CleanArqueoCash());

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
                        text: 'Ocurrio un problema al anular arqueo de caja',
                    });
                }
            }
        });
    };
}

export const startGetOneArqueoCash = (idArqueo) => {

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
            const { data } = await suvesaApi.post(`/Arqueo/ConsultarArqueoCaja?id=${idArqueo}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                const date = responses.fecha.split('T');

                const arqueoCash = {
                    encabezado: {
                        Id: responses.id,
                        EfectivoColones: responses.efectivoColones,
                        EfectivoDolares: responses.efectivoDolares,
                        TarjetaColones: responses.tarjetaColones,
                        TarjetaDolares: responses.tarjetaDolares,
                        Cheques: responses.cheques,
                        ChequesDol: responses.chequesDol,
                        DepositoCol: responses.depositoCol,
                        DepositoDol: responses.depositoDol,
                        Total: responses.total,
                        IdApertura: responses.idApertura,
                        Fecha: date[0],
                        Cajero: responses.cajero,
                        Anulado: responses.anulado,
                        TipoCambioD: responses.tipoCambioD,
                        Observaciones: responses.observaciones,
                        TarjetaSistema: responses.tarjetaSistema
                    },
                    efectivo: responses.efectivos.map(efectivo => {
                        return {
                            Id: efectivo.id,
                            Id_Arqueo: efectivo.idArqueo,
                            Id_Denominacion: efectivo.idDenominacion,
                            CodMoneda: efectivo.codMoneda,
                            Moneda: efectivo.codMoneda == 1 ? "COLON" : "DOLAR",
                            Tipo: efectivo.tipo,
                            Monto: efectivo.monto,
                            Cantidad: efectivo.cantidad,
                            Total: parseInt(efectivo.monto) * parseInt(efectivo.cantidad)
                        }
                    }),
                    tarjeta: responses.tarjeta.map(tarjeta => {
                        return {
                            Id: tarjeta.id,
                            IdArqueo: tarjeta.idArqueo,
                            IdTarjeta: tarjeta.idTarjeta,
                            Tarjeta: tarjeta.tarjetaDescripcion,
                            CodMoneda: tarjeta.codMoneda,
                            Moneda: tarjeta.codMoneda == 1 ? "COLON" : "DOLAR",
                            Monto: tarjeta.monto
                        }
                    })
                }

                // Se ingresan los datos en el estado
                dispatch(SetSeletedArqueoCash(arqueoCash));

                // Se indica que un arqueo editable
                dispatch(SetIsEditArqueoCash(true));

                // Se valida si la apertura no esta cerrado
                if (responses.tieneCierre) {

                    dispatch(activeButtonSaveArqueoCash(false));
                    dispatch(activeButtonRemoveArqueoCash(false));

                } else {

                    dispatch(activeButtonSaveArqueoCash(true));

                    // Se habilita el campo anular si el arqueo de caja no esta anulada
                    if (!arqueoCash.encabezado.Anulado) {
                        dispatch(activeButtonRemoveArqueoCash(true));
                    }
                }

                //Clean el state de busqueda de arqueo cash
                dispatch(CleanSearchArqueoCash());

                // Se cierra el modal
                dispatch(SetOpenSearchArqueoCashModalArqueoCash(false));

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
                    text: 'Ocurrio un problema al obtener un arqueo',
                });
            }
        }
    }
}

export const startSearchDenominacionesArqueoCash = () => {

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
            const resp = await suvesaApi.post('/Caja/GetDenominacionMonedas');
            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                const detalleDenominacion = responses.map(
                    (denominacion) => {
                        return {
                            Id: 0.00,
                            Id_Arqueo: 0.00,
                            Id_Denominacion: denominacion.id,
                            CodMoneda: denominacion.codMoneda,
                            Moneda: denominacion.codMoneda == 1 ? "COLON" : "DOLAR",
                            Tipo: denominacion.tipo,
                            Monto: denominacion.denominacion,
                            Cantidad: 0.00,
                            Total: 0.00
                        }
                    });

                //dispatch(CleanDenominacionesArqueoCash());
                detalleDenominacion.forEach(denominacion => {
                    dispatch(SetAddDetalleDenominacionesArqueo(denominacion));
                }
                );



            } else if (responses === null) {


                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontro la factura',
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

export const startSearchTarjetas = () => {

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
            const resp = await suvesaApi.post('/Caja/GetTipoTarjetum');
            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                const detalleTarjeta = responses.map(
                    (tarjeta) => {
                        return {
                            Id: 0,
                            IdArqueo: 0.00,
                            IdTarjeta: tarjeta.idTarjeta,
                            Tarjeta: tarjeta.descripcion,
                            CodMoneda: tarjeta.codMoneda,
                            Moneda: tarjeta.moneda,
                            Monto: 0.00,
                        }
                    });

                //dispatch(CleanTarjetaArqueoCash());
                detalleTarjeta.forEach(tarjeta => {
                    dispatch(SetAddDetalleTarjetaArqueo(tarjeta));
                }
                );



            } else if (responses === null) {


                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontro la factura',
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

export const startSearchUsuariosArqueoCash = () => {

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
            const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                if (responses.length > 0) {

                    // Se limpia el state
                    dispatch(CleanArqueoCash());

                    // Establecemos los usuarios en state
                    dispatch(SetSearchUsuariosArqueoCash(responses));

                    // Se traen las denominaciones y tarjetas
                    dispatch(await startSearchDenominacionesArqueoCash());
                    dispatch(await startSearchTarjetas());

                    // Se levanta el modal y se cambiar los icons
                    dispatch(openSearchUsuarioModalArqueoCash(true));
                    dispatch(activeButtonSaveArqueoCash(true));
                    dispatch(activeButtonNewArqueoCash(false));
                    dispatch(SetStartOpeningArqueoCash(true));

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No se puede crear un arqueo de caja, no existen aperturas disponibles.',
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
                    text: 'Ocurrio un problema al obtener los usuarios con cajas abiertas',
                });
            }
        }
    }
}

export const startValidateClaveInternaArqueoCash = (password) => {

    return async (dispatch) => {

        try {

            const {
                status,
                userName,
                idUsuario,
                message,
                administrador
            } = await dispatch(startValidateClaveInterna(password));

            if (status === 1) {
                // Validar si el usuario tiene una caja abierta
                const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');
                const users = resp.data.responses;

                if (!administrador) {

                    if (users.length === 0) {

                        Swal.fire({
                            icon: 'warning',
                            title: 'Advertencia',
                            text: 'No existen usuarios con caja abierta.'
                        });

                        return;
                    }
                }

                const userResult = users.find(u => u.id === parseInt(idUsuario) && u.nombre === userName);

                if (!administrador) {

                    if (userResult === undefined) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Advertencia',
                            text: 'Este usuario no presenta ninguna caja abierta. Por favor intentalo con otro usuario'
                        });

                        return
                    }

                    //Se guarda el idApertura
                    dispatch(SetIdAperturaArqueoCash(userResult.idApertura));

                    // Se traen las denominaciones y tarjetas y detalles de operaciones
                    dispatch(await startGetDetallesOperacionesCash(userResult.idApertura));
                    dispatch(await startSearchDenominacionesArqueoCash());
                    dispatch(await startSearchTarjetas());

                }

                if (administrador && userResult !== undefined) {
                    //Se guarda el idApertura
                    dispatch(SetIdAperturaArqueoCash(userResult.idApertura));

                    // Se traen las denominaciones y tarjetas y detalles de operaciones
                    dispatch(await startGetDetallesOperacionesCash(userResult.idApertura));
                    dispatch(await startSearchDenominacionesArqueoCash());
                    dispatch(await startSearchTarjetas());
                }

                // Se activan los inputs
                dispatch(SetDisableInputsArqueoCash(false));

                //Guardar el usuario en el state
                dispatch(SetCajeroArqueoCash(userName));

                // Se cambia los icons
                dispatch(activeButtonSaveArqueoCash(true));
                dispatch(SetStartOpeningArqueoCash(true));

                if (administrador) {
                    dispatch(activeButtonSearchArqueoCash(true));
                    dispatch(SetIsAdminUserArqueoCash(true));
                }

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserArqueoCash(true));

                // Ocultar la password
                dispatch(SetVisiblePasswordArqueoCash(false));

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

export const startGetDetallesOperacionesCash = (napertura) => {
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
            const { data } = await suvesaApi.post(`/Arqueo/ObtenerDocumentosEnArqueoCaja?numApertura=${napertura}`);
            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {
                dispatch(SetDetalleOperacionesArqueoCash(responses));
                dispatch(startUpdateDepositoColones(napertura));
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener el detalle de operaciones',
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
                    text: 'Ocurrio un problema al obtener el detalle de operaciones',
                });
            }
        }
    }
}
export const startUpdateDepositoColones = (numApertura) => {

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

            const { data: montoDepositosData } = await suvesaApi.post(`/Arqueo/ObtenerMontoDepositosCaja?numApertura=${numApertura}`);
            const { status, responses } = montoDepositosData;

            if (status === 0 && responses) {
                const { montoTotal } = responses;
                console.log(montoTotal);
                dispatch(SetDepositoColArqueoCash(montoTotal));
                Swal.close();
            } else {
                console.log(montoTotal);
                dispatch(SetDepositoColArqueoCash(0));
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia!',
                    html: `Actualmente no cuenta con Pre Depósitos registrados.<br>
                    <strong><small style='color:red;'>Para registrarlo presione el botón de Pre Depósito.</small></strong>
                    `,
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
                    icon: 'warning',
                    title: 'Advertencia!',
                    html: `Actualmente no cuenta con Pre Depósitos registrados.<br>
                          <strong><small style='color:red;'>Para registrarlo presione el botón de Pre Depósito.</small></strong>
                          `,
                });
            }
        }
    }
}


export const startGetAllCajerosArqueoCash = () => {

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
            const { data } = await suvesaApi.post(`/Caja/ObtenerUsuariosCajaAbierta`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                dispatch(SetCajerosPreDepositoArqueoCash(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los cajeros.',
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
                    text: 'Ocurrio un problema al obtener los cajeros.',
                });
            }
        }
    }
}

export const startSavePreDepositsArqueoCash = (preDeposits) => {

    return async (dispatch) => {

        if (preDeposits.fecha === "" || preDeposits.monto === "") {
            Swal.fire("Error!", "Complete los espacios vacíos.", "error");
        } else {
            //Mostrar un mensaje de confirmacion
            Swal.fire({
                html: `
            <h3><strong>¿Desea guardar el PreDepósito?</strong></h3>
              <h4>Datos del Cajero</h4>
              <strong>${preDeposits.cedula}</strong><br>
              <strong>${preDeposits.cajero}</strong>`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Guardar',
                denyButtonText: 'Cancelar',
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
                        const { data } = await suvesaApi.post('/Bancos/CrearPreDeposito', preDeposits);
                        const { status } = data;

                        // //Quitar el loading
                        Swal.close();

                        if (status === 0) {

                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                html: `
                              <h3><strong>Pre Depósito agregado correctamente!</strong></h3>
                              <h4>Datos del Cajero</h4>
                              <strong>${preDeposits.cedula}</strong><br>
                              <strong>${preDeposits.cajero}</strong>`,
                                showConfirmButton: false,
                                timer: 2800
                            });

                            dispatch(SetDepositoColArqueoCash(preDeposits.monto));
                            // Se limpia el estado de pre deposito
                            dispatch(SetCleanPreDepositoArqueoCash());
                        } else {

                            //Caso contrario respuesta incorrecto mostrar mensaje de error
                            const { currentException } = data;
                            console.log(currentException)

                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrio un problema a la guardar el pre depósito.',
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
                            text: 'Ocurrio un problema a la guardar el pre depósito.',
                        });
                    }
                }
            });
        }
    }
}

export const startGetAllAperturasSinArqueoCash = () => {

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
            const { data } = await suvesaApi.post('/Arqueo/ObtenerAperturasDeCajaSinArqueo');
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                // const aperturas = responses.map( resp => {

                //     return {
                //         apertura: resp.napertura,
                //         nombre: resp.nombre,
                //         cedula: resp.cedula,
                //         fecha: resp.fecha
                //     }
                // });

                dispatch(SetAperturasSinArqueoArqueoCash(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las aperturas de caja'
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

export const startSearchAperturasSinArqueoCash = (aperturas, filtros, tipo) => {

    return async (dispatch) => {

        let searchAperturas = [];

        switch (tipo) {

            case 1:
                searchAperturas = aperturas.filter(
                    apert => parseInt(apert.napertura) === parseInt(filtros.apertura));
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

        if (searchAperturas.length > 0) {

            dispatch(SetSearchAperturasSinArqueoArqueoCash(searchAperturas));

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Arqueo Caja',
                text: 'No se encontraron aperturas con los filtros de busqueda.',
                timer: 2000
            });
        }

    }
}

// Normal Actions
export const CleanArqueoCash = (value) => ({
    type: types.CleanArqueoCash,
    payload: value
})

export const activeButtonNewArqueoCash = (value) => ({
    type: types.activeButtonNewArqueoCash,
    payload: value
})

export const activeButtonSaveArqueoCash = (value) => ({
    type: types.activeButtonSaveArqueoCash,
    payload: value
})

export const activeButtonSearchArqueoCash = (value) => ({
    type: types.activeButtonSearchArqueoCash,
    payload: value
})

export const activeButtonRemoveArqueoCash = (value) => ({
    type: types.activeButtonRemoveArqueoCash,
    payload: value
})

export const openSearchUsuarioModalArqueoCash = (value) => ({
    type: types.openSearchUsuarioModalArqueoCash,
    payload: value
})

export const SetSearchUsuariosArqueoCash = (value) => ({
    type: types.SetSearchUsuariosArqueoCash,
    payload: value
})

export const CleanTarjetaArqueoCash = (value) => ({
    type: types.CleanTarjetaArqueoCash,
    payload: value
})

export const CleanDenominacionesArqueoCash = (value) => ({
    type: types.CleanDenominacionesArqueoCash,
    payload: value
})

export const SetIdArqueoCash = (value) => ({
    type: types.SetIdArqueoCash,
    payload: value
})

export const SetEfectivoColonesArqueoCash = (value) => ({
    type: types.SetEfectivoColonesArqueoCash,
    payload: value
})

export const SetEfectivoDolaresArqueoCash = (value) => ({
    type: types.SetEfectivoDolaresArqueoCash,
    payload: value
})

export const SetTarjetaColonesArqueoCash = (value) => ({
    type: types.SetTarjetaColonesArqueoCash,
    payload: value
})

export const SetTarjetaDolaresArqueoCash = (value) => ({
    type: types.SetTarjetaDolaresArqueoCash,
    payload: value
})

export const SetChequesArqueoCash = (value) => ({
    type: types.SetChequesArqueoCash,
    payload: value
})

export const SetChequesDolArqueoCash = (value) => ({
    type: types.SetChequesDolArqueoCash,
    payload: value
})

export const SetDepositoColArqueoCash = (value) => ({
    type: types.SetDepositoColArqueoCash,
    payload: value
})

export const SetDepositoDolArqueoCash = (value) => ({
    type: types.SetDepositoDolArqueoCash,
    payload: value
})

export const SetTotalArqueoCash = (value) => ({
    type: types.SetTotalArqueoCash,
    payload: value
})

export const SetIdAperturaArqueoCash = (value) => ({
    type: types.SetIdAperturaArqueoCash,
    payload: value
})

export const SetFechaArqueoCash = (value) => ({
    type: types.SetFechaArqueoCash,
    payload: value
})

export const SetCajeroArqueoCash = (value) => ({
    type: types.SetCajeroArqueoCash,
    payload: value
})

export const SetAnuladoArqueoCash = (value) => ({
    type: types.SetAnuladoArqueoCash,
    payload: value
})

export const SetTipoCambioDArqueoCash = (value) => ({
    type: types.SetTipoCambioDArqueoCash,
    payload: value
})

export const SetObservacionesArqueoCash = (value) => ({
    type: types.SetObservacionesArqueoCash,
    payload: value
})

export const SetTarjetaSistemaArqueoCash = (value) => ({
    type: types.SetTarjetaSistemaArqueoCash,
    payload: value
})

export const SetOtrasTarjetasArqueoCash = (value) => ({
    type: types.SetOtrasTarjetasArqueoCash,
    payload: value
})

export const SetIdDetalleEfectivoActualArqueo = (value) => ({
    type: types.SetIdDetalleEfectivoActualArqueo,
    payload: value
})

export const SetIdArqueoDetalleEfectivoActualArqueo = (value) => ({
    type: types.SetIdArqueoDetalleEfectivoActualArqueo,
    payload: value
})

export const SetIdDenominacionDetalleEfectivoActualArqueo = (value) => ({
    type: types.SetIdDenominacionDetalleEfectivoActualArqueo,
    payload: value
})

export const SetMontoDetalleEfectivoActualArqueo = (value) => ({
    type: types.SetMontoDetalleEfectivoActualArqueo,
    payload: value
})

export const SetCantidadDetalleEfectivoActualArqueo = (value) => ({
    type: types.SetCantidadDetalleEfectivoActualArqueo,
    payload: value
})

export const SetAddDetalleDenominacionesArqueo = (value) => ({
    type: types.SetAddDetalleDenominacionesArqueo,
    payload: value
})

export const SetCantidadDenominacionArqueoCash = (value) => ({
    type: types.SetCantidadDenominacionArqueoCash,
    payload: value
})

export const SetIdDetalleTarjetaActualArqueo = (value) => ({
    type: types.SetIdDetalleTarjetaActualArqueo,
    payload: value
})

export const SetIdArqueoDetalleTarjetaActualArqueo = (value) => ({
    type: types.SetIdArqueoDetalleTarjetaActualArqueo,
    payload: value
})

export const SetIdTarjetaDetalleTarjetaActualArqueo = (value) => ({
    type: types.SetIdTarjetaDetalleTarjetaActualArqueo,
    payload: value
})

export const SetMontoDetalleTarjetaActualArqueo = (value) => ({
    type: types.SetMontoDetalleTarjetaActualArqueo,
    payload: value
})

export const SetAddDetalleTarjetaArqueo = (value) => ({
    type: types.SetAddDetalleTarjetaArqueo,
    payload: value
})

export const SetTotalTarjetaArqueoCash = (value) => ({
    type: types.SetTotalTarjetaArqueoCash,
    payload: value
})

export const SetStartOpeningArqueoCash = (value) => ({
    type: types.SetStartOpeningArqueoCash,
    payload: value
})

export const SetOpenSearchArqueoCashModalArqueoCash = (value) => ({
    type: types.SetOpenSearchArqueoCashModalArqueoCash,
    payload: value
})

export const SetValorFiltroSearchArqueoCash = (value) => ({
    type: types.SetValorFiltroSearchArqueoCash,
    payload: value
})

export const SetNombreSearchArqueoCash = (value) => ({
    type: types.SetNombreSearchArqueoCash,
    payload: value
})

export const SetNumeroSearchArqueoCash = (value) => ({
    type: types.SetNumeroSearchArqueoCash,
    payload: value
})

export const SetFechasSearchArqueoCash = (value) => ({
    type: types.SetFechasSearchArqueoCash,
    payload: value
})

export const SetFechaDesdeSearchArqueoCash = (value) => ({
    type: types.SetFechaDesdeSearchArqueoCash,
    payload: value
})

export const SetFechaHastaSearchArqueoCash = (value) => ({
    type: types.SetFechaHastaSearchArqueoCash,
    payload: value
})

export const SetActiveFechaDesdeSearchArqueoCash = (value) => ({
    type: types.SetActiveFechaDesdeSearchArqueoCash,
    payload: value
})

export const SetActiveFechaHastaSearchArqueoCash = (value) => ({
    type: types.SetActiveFechaHastaSearchArqueoCash,
    payload: value
})

export const SetInsertResultSearchArqueoCash = (value) => ({
    type: types.SetInsertResultSearchArqueoCash,
    payload: value
})

export const CleanSearchArqueoCash = () => ({
    type: types.CleanSearchArqueoCash
})

export const SetSeletedArqueoCash = (value) => ({
    type: types.SetSeletedArqueoCash,
    payload: value
})

export const SetIsEditArqueoCash = (value) => ({
    type: types.SetIsEditArqueoCash,
    payload: value
})

export const SetDisableInputsArqueoCash = (value) => ({
    type: types.SetDisableInputsArqueoCash,
    payload: value
})

export const SetDisableInputsUserArqueoCash = (value) => ({
    type: types.SetDisableInputsUserArqueoCash,
    payload: value
})

export const SetClaveInternaArqueoCash = (value) => ({
    type: types.SetClaveInternaArqueoCash,
    payload: value
})

export const SetVisiblePasswordArqueoCash = (value) => ({
    type: types.SetVisiblePasswordArqueoCash,
    payload: value
})

export const SetDetalleOperacionesArqueoCash = (value) => ({
    type: types.SetDetalleOperacionesArqueoCash,
    payload: value
})

export const SetIsOpenModalPDFDetalleOperacionesArqueoCash = (value) => ({
    type: types.SetIsOpenModalPDFDetalleOperacionesArqueoCash,
    payload: value
})

export const SetIsOpenModalAddPreDepositoArqueoCash = (value) => ({
    type: types.SetIsOpenModalAddPreDepositoArqueoCash,
    payload: value
})

export const SetFechaPreDepositoArqueoCash = (value) => ({
    type: types.SetFechaPreDepositoArqueoCash,
    payload: value
})

export const SetCajeroPreDepositoArqueoCash = (value) => ({
    type: types.SetCajeroPreDepositoArqueoCash,
    payload: value
})

export const SetNombreCajeroPreDepositoArqueoCash = (value) => ({
    type: types.SetNombreCajeroPreDepositoArqueoCash,
    payload: value
})

export const SetCedulaPreDepositoArqueoCash = (value) => ({
    type: types.SetCedulaPreDepositoArqueoCash,
    payload: value
})

export const SetDepositantePreDepositoArqueoCash = (value) => ({
    type: types.SetDepositantePreDepositoArqueoCash,
    payload: value
})

export const SetNumAperturaPreDepositoArqueoCash = (value) => ({
    type: types.SetNumAperturaPreDepositoArqueoCash,
    payload: value
})

export const SetMontoPreDepositoArqueoCash = (value) => ({
    type: types.SetMontoPreDepositoArqueoCash,
    payload: value
})

export const SetObservacionesPreDepositoArqueoCash = (value) => ({
    type: types.SetObservacionesPreDepositoArqueoCash,
    payload: value
})

export const SetCajerosPreDepositoArqueoCash = (value) => ({
    type: types.SetCajerosPreDepositoArqueoCash,
    payload: value
})

export const SetCleanPreDepositoArqueoCash = () => ({
    type: types.SetCleanPreDepositoArqueoCash
})

export const SetIsOpenModalSeletedAperturaArqueoCash = (value) => ({
    type: types.SetIsOpenModalSeletedAperturaArqueoCash,
    payload: value
})

export const SetValorSearchAperturaArqueoCash = (value) => ({
    type: types.SetValorSearchAperturaArqueoCash,
    payload: value
})

export const SetCheckAperturaSeletedModalArqueoCash = (value) => ({
    type: types.SetCheckAperturaSeletedModalArqueoCash,
    payload: value
})

export const SetCheckNombreSeletedModalArqueoCash = (value) => ({
    type: types.SetCheckNombreSeletedModalArqueoCash,
    payload: value
})

export const SetCheckFechasSeletedModalArqueoCash = (value) => ({
    type: types.SetCheckFechasSeletedModalArqueoCash,
    payload: value
})

export const SetDisableInputsFechaSeletedModalArqueoCash = (value) => ({
    type: types.SetDisableInputsFechaSeletedModalArqueoCash,
    payload: value
})

export const SetFechaDesdeSeletedModalArqueoCash = (value) => ({
    type: types.SetFechaDesdeSeletedModalArqueoCash,
    payload: value
})

export const SetFechaHastaSeletedModalArqueoCash = (value) => ({
    type: types.SetFechaHastaSeletedModalArqueoCash,
    payload: value
})

export const SetAperturasSinArqueoArqueoCash = (value) => ({
    type: types.SetAperturasSinArqueoArqueoCash,
    payload: value
})

export const SetSearchAperturasSinArqueoArqueoCash = (value) => ({
    type: types.SetSearchAperturasSinArqueoArqueoCash,
    payload: value
})

export const SetResetSearchAperturasSinArqueoCash = () => ({
    type: types.SetResetSearchAperturasSinArqueoCash
})

export const SetIsAdminUserArqueoCash = (value) => ({
    type: types.SetIsAdminUserArqueoCash,
    payload: value
})