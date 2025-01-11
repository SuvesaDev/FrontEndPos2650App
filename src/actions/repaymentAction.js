import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';
import { startGetAllTiposFacturas } from './TiposFacturasAction';
import { startGetAllMonedas } from './MonedasAction';

export const startSaveRepayment = (repayment) => {

    return async (dispatch) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea guardar la devoluccion?',
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

                    console.log(repayment);

                    const { data } = await suvesaApi.post('/DevolucionVentas/CrearDevolucionVenta', repayment);
                    const { status } = data;

                    console.log(data);

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        dispatch(CleanRepayment())
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Devolucion registrada correctamente',
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
                        text: 'Ocurrio un problema al agregar la factura',
                    });
                }
            }
        });
    };
}

export const  startSearchOneBilling = ( dato, type = 1 ) => {

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

            if(type === 1){
                url = `/venta/ObtenerFacturaVentaDevoluciones?idFactura=${dato}`;
            } else {
                url = `/venta/ObtenerFacturaVentaDevolucionesPorNumeroFactura?numeroFactura=${dato}`;
            }

            //Call end-point 
            const resp = await suvesaApi.post(url);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                // Carga el encabezado
                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var newFecha = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                dispatch( SetIdBilling(responses.id));
                dispatch( SetNum_FacturaBilling(responses.numFactura) );
                dispatch( SetFechaBilling(newFecha[0]) );
                dispatch( SetNumeroCajaBilling(responses.numCaja) );
                dispatch( SetTipoBilling(responses.tipo) );
                dispatch( SetNombre_ClienteBilling(responses.nombreCliente) );
                dispatch( SetCod_MonedaBilling(1) );
                dispatch( SetSubTotalGravadaBilling(responses.subTotalGravada) );
                dispatch( SetSubTotalExentoBilling(responses.subTotalExento) );
                dispatch( SetSubTotalBilling(responses.subTotal) );
                dispatch( SetDescuentoBilling(responses.descuento) );
                dispatch( SetImp_VentaBilling(responses.impVenta) );
                dispatch( SetTotalBilling(responses.total) );

                dispatch( CleanDetalleFactura() );

                //Se carga el detalle
                const articulosFactura = responses.detalle.map(detalle => {                    
                    return {
                        id_venta_detalle: parseFloat(detalle.idVentaDetalle), //no lo tengo
                        id_factura: parseFloat(responses.id),
                        codFxArticulo: parseFloat(detalle.codFxArticulo),
                        codArticulo: parseFloat(detalle.codArticulo),
                        descripcion: detalle.descripcion,
                        cantidad: parseFloat(detalle.cantidad),
                        precioUnit: parseFloat(detalle.precioUnit),
                        descuento: parseFloat(detalle.descuento),
                        impuesto: parseFloat(detalle.impuesto),
                        cantVen: parseFloat(detalle.cantVen),
                        cantBod: parseFloat(detalle.cantBod)
                    }
                });

                articulosFactura.forEach(detalle => {
                    dispatch( SetAddDetalleFactura(detalle) );
                });

                dispatch( SetId_FacturaRepayment(responses.id) );
                dispatch( SetSaldoAnt_FactRepayment(responses.total) );
                dispatch( SetFechaRepayment(responses.fecha) );
                dispatch( SetDisableInputsBodyRepayment(false) );

                // const articulosDevolver = responses.detalle.map(detalle => {
                //     return {
                //         codFxArticulo: parseFloat(detalle.codFxArticulo),
                //         Descripcion: detalle.descripcion,
                //         Cantidad: parseFloat(detalle.cantidad),
                //         CantVet: parseFloat(detalle.cantVen),
                //         CantBod: parseFloat(detalle.cantBod),
                //         Precio_Costo: parseFloat(0),
                //         Precio_Base: parseFloat(0),
                //         Precio_Flete: parseFloat(0),
                //         Precio_Otros: parseFloat(0),
                //         Precio_Unit: parseFloat(detalle.precioUnit),
                //         Descuento: parseFloat(detalle.descuento),
                //         Monto_Descuento: parseFloat(detalle.montoDescuento),
                //         Impuesto: parseFloat(detalle.impuesto),
                //         Monto_Impuesto: parseFloat(detalle.montoImpuesto),
                //         SubtotalGravado: parseFloat(detalle.subtotalGravado),
                //         SubTotalExcento: parseFloat(detalle.subTotalExcento),
                //         SubTotal: parseFloat(detalle.subTotal),
                //         Id_Art_Venta: parseFloat(0),
                //         id_articulo_V: parseFloat(detalle.idVentaDetalle),
                //     }
                // })

                

                // //agregar opcion para ingresar automaticamente todos los productos
                // Swal.fire({
                //     title: '¿Desea agregar todos productos a la devolucion?',
                //     showDenyButton: true,
                //     showCancelButton: false,
                //     confirmButtonText: 'Aceptar',
                //     denyButtonText: `Cancelar`,
                //     allowEnterKey: false
                // }).then(async (result) => {
        
                //     if (result.isConfirmed) {

                //         articulosDevolver.forEach(detalle => {
                //             dispatch(SetAddDetalleRepayment(detalle));
                //         }
                //         );                        
                        
                //     }

                // });

                

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

export const startAddDetalleActualRepayment = (detalle) => {

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

                const { Cantidad, CantidadOriginal, id_articulo_V } = detalle;
                
                if( parseInt( Cantidad ) === parseInt( CantidadOriginal )) {
                    dispatch( SetDeleteLineaArticuloRepayment( id_articulo_V ) );
                }

                dispatch( SetAddDetalleRepayment( detalle ) );

                dispatch( SetIsShowSecondTabRepayment( true ) );

                dispatch( SetCleanDetalleArticuloActualRepayment() );
            }

        });
    }
}

export const startSearchRepayment = (opcionFiltro) => {

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
            const resp = await suvesaApi.post('/DevolucionVentas/ObtenerDevolucionVentaFiltros', opcionFiltro);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0 && responses != null) {

                const devoluciones = responses.map(
                    (comp) => {
                        return {
                            //...inventory,    
                            Id: comp.devolucion,
                            Nombre: 'no tengo el nombre',
                            Fecha: comp.fecha
                        }
                    });

                dispatch(SetsearchRepayment(devoluciones));
            } else if (responses === null) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No se encontro la devolucion',
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

export const startSearchOneRepayment = (devolucion) => {

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
            const resp = await suvesaApi.post('/DevolucionVentas/ObtenerDevolucionVentaPK?id=' + devolucion);

            const { status, responses } = resp.data;
            Swal.close();

            console.log(responses);

            if (status === 0 && responses != null) {

                // //limpia la compra
                dispatch(CleanRepayment())
                // //carga el encabezado

                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var f = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                


                const articulosDevolucion = responses.detalle.map(detalle => {
                    return {                        
                        codFxArticulo: detalle.codigo,
                        Descripcion: detalle.descripcion,
                        Cantidad: detalle.cantidad,
                        CantVet: detalle.cantVet,
                        CantBod: detalle.cantBod,
                        Precio_Costo: detalle.precioCosto,
                        Precio_Base: detalle.precioBase,
                        Precio_Flete: detalle.precioFlete,
                        Precio_Otros: detalle.precioOtros,
                        Precio_Unit: detalle.precioUnit,
                        Descuento: detalle.descuento,
                        Monto_Descuento: detalle.montoDescuento,
                        Impuesto: detalle.impuesto,
                        Monto_Impuesto: detalle.montoImpuesto,
                        SubtotalGravado: detalle.subtotalGravado,
                        SubTotalExcento: detalle.subTotalExcento,
                        SubTotal: detalle.subTotal,
                        Id_Art_Venta: detalle.idArtVenta,
                        id_articulo_V: detalle.idArticuloV
                    }
                })

                articulosDevolucion.forEach(detalle => {
                    dispatch(SetAddDetalleRepayment(detalle));
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

export const startValidateClaveInternaRepayment = ( password ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
 
                // Se activan los inputs
                dispatch( SetDisableInputsRepayment( false ) );

                // Se establece el nameUser
                dispatch( SetNameUserRepayment( userName ) );

                // Se cambia los icons
                dispatch( SetActiveButtonSearchRepayment( true ));

                //Se establece la fecha
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');
                dispatch( SetFechaBilling( isoDateTime[0] ) );
                dispatch( SetValueFechasSearchBillingModalRepayment( isoDateTime[0] ) );

                // Desactivar los inputs de usuario
                dispatch( SetVisiblePasswordRepayment( false ) );

                // Ocultar la password
                dispatch( SetDisableInputUserRepayment( true ) );

                // Se cargan los catalogos
                await loadCatalogos( dispatch );
               

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

export const startGetAllPersonalRepayment = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.get('/usuario/ObtenerPersonal');

            const { status, responses } = data;
            Swal.close();

            if (status === 0) {

                const personalActive = responses.map( personal => {
                    
                    if( personal.activo ) {
                        return {
                            ...personal
                        }
                    }
                    
                });

                dispatch( SetAllPersonalRepayment( personalActive ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener Personal',
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
                    text: 'Ocurrio un problema al obtener Personal',
                });
            }
        }
    }
}

export const startSearchBillingRepayment = ( filters ) => {

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
            const { data } = await suvesaApi.post('/venta/BusquedaFacturasDevoluciones', filters );
            
            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                const resultados = responses.map( resul => {
                    return {
                        id: resul.id,
                        numFactura: resul.numFactura,
                        nombreCliente: resul.nombreCliente,
                        fecha: resul.fecha.split('T')[0] + ' ' + resul.fecha.split('T')[1]
                    }
                });

                dispatch( SetResultSearchBillingModalRepayment( resultados ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar facturas',
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
                    text: 'Ocurrio un problema al buscar facturas',
                });
            }
        }
    }
}

// Private methods
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

    // Se traen las facturas
    await dispatch( startGetAllTiposFacturas());

    // Se traen el personal
    await dispatch( startGetAllPersonalRepayment() );

    // Se traen las monedas
    await dispatch( startGetAllMonedas() );

    //Quitar el loading
    Swal.close();
}

// Normal Action
export const SetopenSearchModalRepayment = (value) => ({
    type: types.SetopenSearchModalRepayment,
    payload: value
})

export const SetValorFiltroSearchModalRepayment = (value) => ({
    type: types.SetValorFiltroSearchModalRepayment,
    payload: value
})

export const SetNombreSearchModalRepayment = (value) => ({
    type: types.SetNombreSearchModalRepayment,
    payload: value
})

export const SetFacturaSearchModalRepayment = (value) => ({
    type: types.SetFacturaSearchModalRepayment,
    payload: value
})

export const SetFechasSearchModalRepayment = (value) => ({
    type: types.SetFechasSearchModalRepayment,
    payload: value
})

export const SetDesdeSearchModalRepayment = (value) => ({
    type: types.SetDesdeSearchModalRepayment,
    payload: value
})

export const SetHastaSearchModalRepayment = (value) => ({
    type: types.SetHastaSearchModalRepayment,
    payload: value
})

export const SetsearchRepayment = (value) => ({
    type: types.SetsearchRepayment,
    payload: value
})

export const SetId_FacturaRepayment = (value) => ({
    type: types.SetId_FacturaRepayment,
    payload: value
})

export const SetSaldoAnt_FactRepayment = (value) => ({
    type: types.SetSaldoAnt_FactRepayment,
    payload: value
})

export const SetSubTotalGravadoRepayment = (value) => ({
    type: types.SetSubTotalGravadoRepayment,
    payload: value
})

export const SetSubTotalExcentoRepayment = (value) => ({
    type: types.SetSubTotalExcentoRepayment,
    payload: value
})

export const SetDescuentoRepayment = (value) => ({
    type: types.SetDescuentoRepayment,
    payload: value
})

export const SetImpuestoRepayment = (value) => ({
    type: types.SetImpuestoRepayment,
    payload: value
})

export const SetMontoRepayment = (value) => ({
    type: types.SetMontoRepayment,
    payload: value
})

export const SetFechaRepayment = (value) => ({
    type: types.SetFechaRepayment,
    payload: value
})

export const SetCedula_UsuarioRepayment = (value) => ({
    type: types.SetCedula_UsuarioRepayment,
    payload: value
})

export const SetCod_MonedaRepayment = (value) => ({
    type: types.SetCod_MonedaRepayment,
    payload: value
})

export const SetcajaRepayment = (value) => ({
    type: types.SetcajaRepayment,
    payload: value
})

export const SetMontoDevolucionRepayment = (value) => ({
    type: types.SetMontoDevolucionRepayment,
    payload: value
})

export const SetNum_AperturaRepayment = (value) => ({
    type: types.SetNum_AperturaRepayment,
    payload: value
})

export const SetUsuarioRecibioRepayment = (value) => ({
    type: types.SetUsuarioRecibioRepayment,
    payload: value
})

export const SetNotasDevolucionRepayment = (value) => ({
    type: types.SetNotasDevolucionRepayment,
    payload: value
})

export const SetTipoDevolucionRepayment = (value) => ({
    type: types.SetTipoDevolucionRepayment,
    payload: value
})

export const SetIdSucursalRepayment = (value) => ({
    type: types.SetIdSucursalRepayment,
    payload: value
})

export const CleanRepayment = (value) => ({
    type: types.CleanRepayment,
    payload: value
})

export const SetTipoFacturaRepayment = (value) => ({
    type: types.SetTipoFacturaRepayment,
    payload: value
})

export const SetNumeroCajaRepayment = (value) => ({
    type: types.SetNumeroCajaRepayment,
    payload: value
})

export const SetNumeroFacturaRepayment = (value) => ({
    type: types.SetNumeroFacturaRepayment,
    payload: value
})

export const SetCodigoDetalleActualRepayment = (value) => ({
    type: types.SetCodigoDetalleActualRepayment,
    payload: value
})

export const SetDescripcionDetalleActualRepayment = (value) => ({
    type: types.SetDescripcionDetalleActualRepayment,
    payload: value
})

export const SetCantidadOriginalDetalleActualRepayment = (value) => ({
    type: types.SetCantidadOriginalDetalleActualRepayment,
    payload: value
})

export const SetCantidadDetalleActualRepayment = (value) => ({
    type: types.SetCantidadDetalleActualRepayment,
    payload: value
})

export const SetCantVetDetalleActualRepayment = (value) => ({
    type: types.SetCantVetDetalleActualRepayment,
    payload: value
})

export const SetCantBodDetalleActualRepayment = (value) => ({
    type: types.SetCantBodDetalleActualRepayment,
    payload: value
})

export const SetPrecio_CostoDetalleActualRepayment = (value) => ({
    type: types.SetPrecio_CostoDetalleActualRepayment,
    payload: value
})

export const SetPrecio_BaseDetalleActualRepayment = (value) => ({
    type: types.SetPrecio_BaseDetalleActualRepayment,
    payload: value
})

export const SetPrecio_FleteDetalleActualRepayment = (value) => ({
    type: types.SetPrecio_FleteDetalleActualRepayment,
    payload: value
})

export const SetPrecio_OtrosDetalleActualRepayment = (value) => ({
    type: types.SetPrecio_OtrosDetalleActualRepayment,
    payload: value
})

export const SetPrecio_UnitDetalleActualRepayment = (value) => ({
    type: types.SetPrecio_UnitDetalleActualRepayment,
    payload: value
})

export const SetDescuentoDetalleActualRepayment = (value) => ({
    type: types.SetDescuentoDetalleActualRepayment,
    payload: value
})

export const SetMonto_DescuentoDetalleActualRepayment = (value) => ({
    type: types.SetMonto_DescuentoDetalleActualRepayment,
    payload: value
})

export const SetImpuestoDetalleActualRepayment = (value) => ({
    type: types.SetImpuestoDetalleActualRepayment,
    payload: value
})

export const SetMonto_ImpuestoDetalleActualRepayment = (value) => ({
    type: types.SetMonto_ImpuestoDetalleActualRepayment,
    payload: value
})

export const SetSubtotalGravadoDetalleActualRepayment = (value) => ({
    type: types.SetSubtotalGravadoDetalleActualRepayment,
    payload: value
})

export const SetSubTotalExcentoDetalleActualRepayment = (value) => ({
    type: types.SetSubTotalExcentoDetalleActualRepayment,
    payload: value
})

export const SetSubTotalDetalleActualRepayment = (value) => ({
    type: types.SetSubTotalDetalleActualRepayment,
    payload: value
})

export const SetId_Art_VentaDetalleActualRepayment = (value) => ({
    type: types.SetId_Art_VentaDetalleActualRepayment,
    payload: value
})

export const Setid_articulo_VDetalleActualRepayment = (value) => ({
    type: types.Setid_articulo_VDetalleActualRepayment,
    payload: value
})

export const SetAddDetalleRepayment = (value) => ({
    type: types.SetAddDetalleRepayment,
    payload: value
})

export const SetIdBilling = (value) => ({
    type: types.SetIdBilling,
    payload: value
})

export const SetNum_FacturaBilling = (value) => ({
    type: types.SetNum_FacturaBilling,
    payload: value
})

export const SetFechaBilling = (value) => ({
    type: types.SetFechaBilling,
    payload: value
})

export const SetNumeroCajaBilling = (value) => ({
    type: types.SetNumeroCajaBilling,
    payload: value
})

export const SetTipoBilling = (value) => ({
    type: types.SetTipoBilling,
    payload: value
})

export const SetCod_ClienteBilling = (value) => ({
    type: types.SetCod_ClienteBilling,
    payload: value
})

export const SetNombre_ClienteBilling = (value) => ({
    type: types.SetNombre_ClienteBilling,
    payload: value
})

export const SetCod_MonedaBilling = (value) => ({
    type: types.SetCod_MonedaBilling,
    payload: value
})

export const SetSubTotalGravadaBilling = (value) => ({
    type: types.SetSubTotalGravadaBilling,
    payload: value
})

export const SetSubTotalExentoBilling = (value) => ({
    type: types.SetSubTotalExentoBilling,
    payload: value
})

export const SetSubTotalBilling = (value) => ({
    type: types.SetSubTotalBilling,
    payload: value
})

export const SetDescuentoBilling = (value) => ({
    type: types.SetDescuentoBilling,
    payload: value
})

export const SetImp_VentaBilling = (value) => ({
    type: types.SetImp_VentaBilling,
    payload: value
})

export const SetTotalBilling = (value) => ({
    type: types.SetTotalBilling,
    payload: value
})

export const SetAddDetalleFactura = (value) => ({
    type: types.SetAddDetalleFactura,
    payload: value
})

export const CleanDetalleFactura = () => ({
    type: types.CleanDetalleFactura
})

export const SetPosicionActualRepayment = (value) => ({
    type: types.SetPosicionActual,
    payload: value
})

export const SetAddDetalleFacturaRepayment = (value) => ({
    type: types.SetAddDetalleFacturaRepayment,
    payload: value
})

export const CleanFacturaRepayment = (value) => ({
    type: types.CleanFacturaRepayment,
    payload: value
})

export const SetCurrentTabRepayment = (value) => ({
    type: types.SetCurrentTabRepayment,
    payload: value
})

export const SetDisableInputsRepayment = (value) => ({
    type: types.SetDisableInputsRepayment,
    payload: value
})

export const SetActiveButtonSaveRepayment = (value) => ({
    type: types.SetActiveButtonSaveRepayment,
    payload: value
})

export const SetActiveButtonSearchRepayment = (value) => ({
    type: types.SetActiveButtonSearchRepayment,
    payload: value
})

export const SetActiveButtonRemoveRepayment = (value) => ({
    type: types.SetActiveButtonRemoveRepayment,
    payload: value
})

export const SetClaveInternaRepayment = (value) => ({
    type: types.SetClaveInternaRepayment,
    payload: value
})

export const SetVisiblePasswordRepayment = (value) => ({
    type: types.SetVisiblePasswordRepayment,
    payload: value
})

export const SetDisableInputUserRepayment = (value) => ({
    type: types.SetDisableInputUserRepayment,
    payload: value
})

export const SetNameUserRepayment = (value) => ({
    type: types.SetNameUserRepayment,
    payload: value
})

export const SetAllPersonalRepayment = (value) => ({
    type: types.SetAllPersonalRepayment,
    payload: value
})

export const SetIsOpenSearchBillingModalRepayment = (value) => ({
    type: types.SetIsOpenSearchBillingModalRepayment,
    payload: value
})

export const SetCheckTipoSearchBillingModalRepayment = (value) => ({
    type: types.SetCheckTipoSearchBillingModalRepayment,
    payload: value
})

export const SetCheckCajaSearchBillingModalRepayment = (value) => ({
    type: types.SetCheckCajaSearchBillingModalRepayment,
    payload: value
})

export const SetCheckNombreClienteSearchBillingModalRepayment = (value) => ({
    type: types.SetCheckNombreClienteSearchBillingModalRepayment,
    payload: value
})

export const SetCheckFechasSearchBillingModalRepayment = (value) => ({
    type: types.SetCheckFechasSearchBillingModalRepayment,
    payload: value
})

export const SetValueTipoSearchBillingModalRepayment = (value) => ({
    type: types.SetValueTipoSearchBillingModalRepayment,
    payload: value
})

export const SetValueCajaSearchBillingModalRepayment = (value) => ({
    type: types.SetValueCajaSearchBillingModalRepayment,
    payload: value
})

export const SetValueNombreClienteSearchBillingModalRepayment = (value) => ({
    type: types.SetValueNombreClienteSearchBillingModalRepayment,
    payload: value
})

export const SetValueFechasSearchBillingModalRepayment = (value) => ({
    type: types.SetValueFechasSearchBillingModalRepayment,
    payload: value
})

export const SetResultSearchBillingModalRepayment = (value) => ({
    type: types.SetResultSearchBillingModalRepayment,
    payload: value
})

export const CleanStateSearchBillingModalRepayment = () => ({
    type: types.CleanStateSearchBillingModalRepayment
})

export const SetDisableInputsBodyRepayment = (value) => ({
    type: types.SetDisableInputsBodyRepayment,
    payload: value
})

export const SetIdVentaDetalleSelectedRepayment = (value) => ({
    type: types.SetIdVentaDetalleSelectedRepayment,
    payload: value
})

export const SetShowMessageInfoRepayment = (value) => ({
    type: types.SetShowMessageInfoRepayment,
    payload: value
})

export const SetDeleteLineaArticuloRepayment = (value) => ({
    type: types.SetDeleteLineaArticuloRepayment,
    payload: value
})

export const SetCleanDetalleArticuloActualRepayment = () => ({
    type: types.SetCleanDetalleArticuloActualRepayment
})

export const SetIsReturnAllArticulosRepayment = (value) => ({
    type: types.SetIsReturnAllArticulosRepayment,
    payload: value
})

export const SetIsShowSecondTabRepayment = (value) => ({
    type: types.SetIsShowSecondTabRepayment,
    payload: value
})