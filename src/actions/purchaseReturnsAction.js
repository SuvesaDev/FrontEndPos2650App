import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';
import { SetDescuentoDetalleActualCompras } from './ComprasAction';

export const startSaveDevolucion = (devoluccion) => {

    return async (dispatch) => {


        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea guardar la devolución?',
            icon: 'question',
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
                    const { data } = await suvesaApi.post('/DevolucionCompra/CrearDevolucionCompra', devoluccion);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        dispatch(CleanPurchaseReturns())
                        dispatch(SetCodArticuloDetalleActualPurchaseReturns(0))
                        dispatch(SetCantidadDetalleActualPurchaseReturns(0))
                        dispatch(SetPrecioCostoDetalleActualPurchaseReturns(0))
                        dispatch(SetDescuentoDetalleActualCompras(0))
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito!',
                            text: 'Se realizo la devolución de compra correctamente.',
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
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema al registrar la devolución',
                    });
                }
            }
        });
    };
}

export const startSearchOneCompraPurchaseReturns = (Id) => {

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
            const resp = await suvesaApi.post('/Compras/ObtenerFactura?id=' + Id);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0) {

                //limpia la compra
                dispatch(CleanPurchaseReturns())
                //carga el encabezado                

                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var f = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                dispatch(SetIdFacturaCompraPurchaseReturns(Id))
                dispatch(SetSaldoAntFactPurchaseReturns(responses.totalFactura));
                dispatch(SetFechaPurchaseReturns(f[0]));
                dispatch(SetProveedorPurchaseReturns(responses.nombreProveedor));
                dispatch(SetNumeroFacturaPurchaseReturns(responses.factura));

                //Carga el detalle
                const articulosComprados = responses.detalle.map(detalle => {
                    return {
                        codFxArticulo: parseFloat(detalle.codigo),
                        CodArticulo: detalle.codArticulo,
                        Descripcion: detalle.descripcion,
                        Cantidad: parseFloat(detalle.cantidad),
                        Precio_Costo: parseFloat(detalle.costo),
                        Precio_Base: parseFloat(detalle.base),
                        Precio_Flete: parseFloat(detalle.montoFlete),
                        Precio_Otros: parseFloat(detalle.otrosCargos),
                        Descuento: parseFloat(detalle.descuentoP),
                        Monto_Descuento: parseFloat(detalle.descuento),
                        Impuesto: parseFloat(detalle.impuestoP),
                        Monto_Impuesto: parseFloat(detalle.impuesto),
                        SubtotalGravado: parseFloat(detalle.gravado),
                        SubTotalExcento: parseFloat(detalle.exento),
                        SubTotal: parseFloat(detalle.gravado + detalle.exento),
                        Numero: 0,
                        idBodega: detalle.idBodega
                    }
                })

                const articulosDevolver = responses.detalle.map(detalle => {
                    return {
                        codFxArticulo: parseFloat(detalle.codigo),
                        CodArticulo: detalle.codArticulo,
                        Descripcion: detalle.descripcion,
                        Cantidad: parseFloat(detalle.cantidad),
                        Precio_Costo: parseFloat(detalle.costo),
                        Precio_Base: parseFloat(detalle.base),
                        Precio_Flete: parseFloat(detalle.montoFlete),
                        Precio_Otros: parseFloat(detalle.otrosCargos),
                        Descuento: parseFloat(detalle.descuentoP),
                        Monto_Descuento: parseFloat(detalle.descuento),
                        Impuesto: parseFloat(detalle.impuestoP),
                        Monto_Impuesto: parseFloat(detalle.impuesto),
                        SubtotalGravado: parseFloat(detalle.gravado),
                        SubTotalExcento: parseFloat(detalle.exento),
                        SubTotal: parseFloat(detalle.gravado + detalle.exento),
                        Numero: "",
                        idBodega: detalle.idBodega
                    }
                })

                articulosComprados.forEach(detalle => {
                    dispatch(SetAddarticulosPurchaseReturns(detalle));
                    dispatch(SetIdBodegaPurchaseReturns(detalle.idBodega));
                }
                );

                //agregar opcion para ingresar automaticamente todos los productos
                Swal.fire({
                    title: '¿Desea agregar todos productos a la devolución?',
                    icon: 'question',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: `Cancelar`,
                    allowEnterKey: false
                }).then(async (result) => {

                    if (result.isConfirmed) {

                        articulosDevolver.forEach(detalle => {
                            dispatch(SetAddDetallePurchaseReturns(detalle));
                            dispatch(SetIdBodegaPurchaseReturns(detalle.idBodega));
                        }
                        );

                    }

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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startAddDetalleActualPurchaseReturns = (detalle) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar este artículo a la devolucion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                dispatch(SetAddDetallePurchaseReturns(detalle));
                //dispatch(CleanDetalleActualBilling());

            }

        });
    }
}

export const startSearchPurchaseReturns = (opcionFiltro) => {

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
            const resp = await suvesaApi.post('/DevolucionCompra/ObtenerDevolucionCompraFiltros', opcionFiltro);

            const { status, responses } = resp.data;
            Swal.close();

            console.log(responses)


            if (status === 0 && responses != null) {

                const devoluciones = responses.map(
                    (comp) => {
                        return {
                            //...inventory,    
                            IdCompra: comp.devolucion,
                            Nombre: comp.nombrePro,
                            Fecha: comp.fecha
                        }
                    });

                dispatch(SetsearchPurchaseReturns(devoluciones));
            } else if (responses === null) {
                Swal.fire({
                    icon: 'info',
                    title: 'Información!',
                    text: 'No se encontraron devoluciones con lo ingresado.',
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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startSearchOnePurchaseReturns = (devolucion) => {

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
            const resp = await suvesaApi.post('/DevolucionCompra/ObtenerDevolucionCompraPK?id=' + devolucion);

            const { status, responses } = resp.data;
            Swal.close();

            console.log(responses);

            if (status === 0 && responses != null) {

                // //limpia la compra
                dispatch(CleanPurchaseReturns())
                // //carga el encabezado

                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var f = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                dispatch(startSearchOneCompraPurchaseReturns2(responses.idFacturaCompra));

                const articulosDevolucion = responses.detalle.map(detalle => {
                    return {
                        //codFxArticulo: detalle.codigo,
                        codFxArticulo: detalle.codigo,
                        CodArticulo: detalle.codigo,
                        Descripcion: detalle.descripcion,
                        Cantidad: detalle.cantidad,
                        Precio_Costo: detalle.precioCosto,
                        Precio_Base: detalle.precioBase,
                        Precio_Flete: detalle.precioFlete,
                        Precio_Otros: detalle.precioOtros,
                        Descuento: detalle.descuento,
                        Monto_Descuento: detalle.montoDescuento,
                        Impuesto: detalle.impuesto,
                        Monto_Impuesto: detalle.montoImpuesto,
                        SubtotalGravado: detalle.subtotalGravado,
                        SubTotalExcento: detalle.subTotalExcento,
                        SubTotal: detalle.subTotal,
                        Numero: detalle.numero,
                    }
                })

                articulosDevolucion.forEach(detalle => {
                    dispatch(SetAddDetallePurchaseReturns(detalle));
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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startSearchOneCompraPurchaseReturns2 = (Id) => {

    return async (dispatch) => {

        try {
            //Call end-point 
            const resp = await suvesaApi.post('/Compras/ObtenerFactura?id=' + Id);

            const { status, responses } = resp.data;

            if (status === 0) {

                //limpia la compra
                //dispatch(CleanPurchaseReturns())
                //carga el encabezado                

                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var f = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                dispatch(SetIdFacturaCompraPurchaseReturns(Id))
                dispatch(SetSaldoAntFactPurchaseReturns(responses.totalFactura));
                dispatch(SetFechaPurchaseReturns(f[0]));
                dispatch(SetProveedorPurchaseReturns(responses.nombreProveedor));
                dispatch(SetNumeroFacturaPurchaseReturns(responses.factura));

                //Carga el detalle
                const articulosComprados = responses.detalle.map(detalle => {
                    return {
                        codFxArticulo: parseFloat(detalle.codigo),
                        CodArticulo: detalle.codArticulo,
                        Descripcion: detalle.descripcion,
                        Cantidad: parseFloat(detalle.cantidad),
                        Precio_Costo: parseFloat(detalle.costo),
                        Precio_Base: parseFloat(detalle.base),
                        Precio_Flete: parseFloat(detalle.montoFlete),
                        Precio_Otros: parseFloat(detalle.otrosCargos),
                        Descuento: parseFloat(detalle.descuentoP),
                        Monto_Descuento: parseFloat(detalle.descuento),
                        Impuesto: parseFloat(detalle.impuestoP),
                        Monto_Impuesto: parseFloat(detalle.impuesto),
                        SubtotalGravado: parseFloat(detalle.gravado),
                        SubTotalExcento: parseFloat(detalle.exento),
                        SubTotal: parseFloat(detalle.gravado + detalle.exento),
                        idBodega: detalle.idBodega,
                        Numero: 0
                    }
                })

                articulosComprados.forEach(detalle => {
                    dispatch(SetAddarticulosPurchaseReturns(detalle));
                    dispatch(SetIdBodegaPurchaseReturns(detalle.idBodega))
                }
                );

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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const SetIsOpenSearchComprasPurchaseReturns = (value) => ({
    type: types.SetIsOpenSearchComprasPurchaseReturns,
    payload: value
})

//Consulta
export const SetopenSearchModalPurchaseReturns = (value) => ({
    type: types.SetopenSearchModalPurchaseReturns,
    payload: value
})
export const SetsearchPurchaseReturns = (value) => ({
    type: types.SetsearchPurchaseReturns,
    payload: value
})
export const SetValorFiltroSearchModalPurchaseReturns = (value) => ({
    type: types.SetValorFiltroSearchModalPurchaseReturns,
    payload: value
})
export const SetNombreSearchModalPurchaseReturns = (value) => ({
    type: types.SetNombreSearchModalPurchaseReturns,
    payload: value
})
export const SetFacturaSearchModalPurchaseReturns = (value) => ({
    type: types.SetFacturaSearchModalPurchaseReturns,
    payload: value
})
export const SetFechasSearchModalPurchaseReturns = (value) => ({
    type: types.SetFechasSearchModalPurchaseReturns,
    payload: value
})
export const SetDesdeSearchModalPurchaseReturns = (value) => ({
    type: types.SetDesdeSearchModalPurchaseReturns,
    payload: value
})
export const SetHastaSearchModalPurchaseReturns = (value) => ({
    type: types.SetHastaSearchModalPurchaseReturns,
    payload: value
})

//Encabezado Devolucion
export const SetIdFacturaCompraPurchaseReturns = (value) => ({
    type: types.SetIdFacturaCompraPurchaseReturns,
    payload: value
})

export const SetIdBodegaPurchaseReturns = (value) => ({
    type: types.SetIdBodegaPurchaseReturns,
    payload: value
})

export const SetNumeroFacturaPurchaseReturns = (value) => ({
    type: types.SetNumeroFacturaPurchaseReturns,
    payload: value
})
export const SetProveedorPurchaseReturns = (value) => ({
    type: types.SetProveedorPurchaseReturns,
    payload: value
})
export const SetSaldoAntFactPurchaseReturns = (value) => ({
    type: types.SetSaldoAntFactPurchaseReturns,
    payload: value
})
export const SetSubTotalGravadoPurchaseReturns = (value) => ({
    type: types.SetSubTotalGravadoPurchaseReturns,
    payload: value
})
export const SetSubTotalExcentoPurchaseReturns = (value) => ({
    type: types.SetSubTotalExcentoPurchaseReturns,
    payload: value
})
export const SetDescuentoPurchaseReturns = (value) => ({
    type: types.SetDescuentoPurchaseReturns,
    payload: value
})
export const SetImpuestoPurchaseReturns = (value) => ({
    type: types.SetImpuestoPurchaseReturns,
    payload: value
})
export const SetMontoPurchaseReturns = (value) => ({
    type: types.SetMontoPurchaseReturns,
    payload: value
})
export const SetFechaPurchaseReturns = (value) => ({
    type: types.SetFechaPurchaseReturns,
    payload: value
})
export const SetCedulaUsuarioPurchaseReturns = (value) => ({
    type: types.SetCedulaUsuarioPurchaseReturns,
    payload: value
})
export const SetCodMonedaPurchaseReturns = (value) => ({
    type: types.SetCodMonedaPurchaseReturns,
    payload: value
})
export const CleanPurchaseReturns = (value) => ({
    type: types.CleanPurchaseReturns,
    payload: value
})

//Detalle Devolucion
export const SetCodigoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetCodigoDetalleActualPurchaseReturns,
    payload: value
})
export const SetCodArticuloDetalleActualPurchaseReturns = (value) => ({
    type: types.SetCodArticuloDetalleActualPurchaseReturns,
    payload: value
})
export const SetDescripcionDetalleActualPurchaseReturns = (value) => ({
    type: types.SetDescripcionDetalleActualPurchaseReturns,
    payload: value
})
export const SetCantidadDetalleActualPurchaseReturns = (value) => ({
    type: types.SetCantidadDetalleActualPurchaseReturns,
    payload: value
})
export const SetPrecioCostoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetPrecioCostoDetalleActualPurchaseReturns,
    payload: value
})
export const SetPrecioBaseDetalleActualPurchaseReturns = (value) => ({
    type: types.SetPrecioBaseDetalleActualPurchaseReturns,
    payload: value
})
export const SetPrecioFleteDetalleActualPurchaseReturns = (value) => ({
    type: types.SetPrecioFleteDetalleActualPurchaseReturns,
    payload: value
})
export const SetPrecioOtrosDetalleActualPurchaseReturns = (value) => ({
    type: types.SetPrecioOtrosDetalleActualPurchaseReturns,
    payload: value
})
export const SetDescuentoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetDescuentoDetalleActualPurchaseReturns,
    payload: value
})
export const SetMontoDescuentoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetMontoDescuentoDetalleActualPurchaseReturns,
    payload: value
})
export const SetImpuestoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetImpuestoDetalleActualPurchaseReturns,
    payload: value
})
export const SetMontoImpuestoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetMontoImpuestoDetalleActualPurchaseReturns,
    payload: value
})
export const SetSubtotalGravadoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetSubtotalGravadoDetalleActualPurchaseReturns,
    payload: value
})
export const SetSubTotalExcentoDetalleActualPurchaseReturns = (value) => ({
    type: types.SetSubTotalExcentoDetalleActualPurchaseReturns,
    payload: value
})
export const SetSubTotalDetalleActualPurchaseReturns = (value) => ({
    type: types.SetSubTotalDetalleActualPurchaseReturns,
    payload: value
})
export const SetNumeroDetalleActualPurchaseReturns = (value) => ({
    type: types.SetNumeroDetalleActualPurchaseReturns,
    payload: value
})
export const SetAddDetallePurchaseReturns = (value) => ({
    type: types.SetAddDetallePurchaseReturns,
    payload: value
})
export const SetAddarticulosPurchaseReturns = (value) => ({
    type: types.SetAddarticulosPurchaseReturns,
    payload: value
})
export const SetAddDetalleActualPurchaseReturns = (value) => ({
    type: types.SetAddDetalleActualPurchaseReturns,
    payload: value
})
