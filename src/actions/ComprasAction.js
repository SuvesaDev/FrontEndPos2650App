import Swal from 'sweetalert2';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';
import { startGetAllBodegas } from './bodegasAction';
import { startValidateClaveInterna } from './login';
import { startGetAllProveedores } from './ProveedoresAction';
import { startGetAllMonedas } from './MonedasAction';

export const startSaveCompras = (compras, Id, newPrices) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: (Id === 0) ? '¿Desea agregar la compra?' : '¿Desea editar la compra?',
            showDenyButton: true,
            showCancelButton: false,
            icon: 'question',
            confirmButtonText: (Id === 0) ? 'Guardar' : 'Editar',
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

                    let EndPoint = '';
                    let Mensaje = '';

                    if (Id === 0) {
                        EndPoint = '/Compras/CrearFactura';
                        Mensaje = 'Se registro la compra correctamente';
                    } else {
                        EndPoint = `/Compras/EditarCompraNuevo?id=${Id}`;
                        Mensaje = 'Se actualizo la compra correctamente';
                    }

                    //Call end-point 
                    const { data } = await suvesaApi.post(EndPoint, compras);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        if (newPrices.length > 0) {

                            const { data } = await suvesaApi.put('/Compras/ActualizarPreciosArticulos', newPrices);

                            if (data.status === 0) {
                                //Si es correcta entonces mostrar un mensaje de afirmacion
                                Swal.fire({
                                    icon: 'success',
                                    title: Mensaje,
                                    showConfirmButton: false,
                                    timer: 2500
                                });

                                // Se limpia el estado
                                dispatch(CleanCompras());

                            } else {
                                //Caso contrario respuesta incorrecto mostrar mensaje de error
                                const { currentException } = data;
                                console.log(currentException);

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    text: `Ocurrio un problema al`(Id === 0) ? 'Guardar' : 'Editar' `la factura`,
                                });

                            }

                        } else {

                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito!',
                                text: Mensaje,
                                showConfirmButton: false,
                                timer: 2500
                            });

                            // Se limpia el estado
                            dispatch(CleanCompras());

                        }

                    } else {
                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException);

                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: `Ocurrio un problema al`(Id === 0) ? 'Guardar' : 'Editar' `la factura`,
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
                        text: `Ocurrio un problema al guardar la Factura.`,
                    });
                }
            }
        });
    };
}

export const startSearchCompras = (opcionFiltro) => {

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
            const resp = await suvesaApi.post('/Compras/ObtenerFacturasFiltro', opcionFiltro);

            const { status, responses } = resp.data;
            Swal.close();

            if (status === 0) {

                const compras = responses.map(
                    (comp) => {
                        return {
                            IdCompra: comp.idCompra,
                            Factura: comp.factura,
                            Nombre: comp.nombreProveedor,
                            Fecha: comp.fecha
                        }
                    });

                dispatch(SetsearchCompras(compras));
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

export const startDeleteDetalleCompra = (detalle) => {

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
            const { data } = await suvesaApi.post('/Compras/EliminarItemFactura', detalle);
            console.log(data);
            const { status } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                //dispatch(CleanCompras())
                //Si es correcta entonces mostrar un mensaje de afirmacion
                dispatch(SetDeleteDetalleCompra(detalle));

                Swal.fire({
                    icon: 'success',
                    title: 'Compra eliminada correctamente.',
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
                    text: 'Ocurrio un problema al eliminar la compra',
                });
            }
        }

    };
}

export const startDeleteCompra = (Id) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea Eliminar la compra?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
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
                    let EndPoint = '/Compras/EliminarFactura?id=' + Id.toString()
                    console.log(EndPoint);
                    const { data } = await suvesaApi.post(EndPoint, {});
                    console.log(data);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        dispatch(CleanCompras())
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Compra eliminada correctamente.',
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
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema al eliminar la compra',
                    });
                }
            }
        });
    };
}

export const startSearchOneCompra = (Id, proveedors) => {

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
            const { data } = await suvesaApi.post('/Compras/ObtenerFactura?id=' + Id);

            const { status, responses } = data;

            // Se cierre el modal
            Swal.close();

            console.log(
                responses.detalle.map(detalle => {
                    return {

                        idBodega: detalle.idBodega
                    }
                }))

            if (status === 0) {

                // Se limpia el estado
                dispatch(CleanFacturaCompras());

                //carga el encabezado
                var parts = responses.fecha.split(' ')[0].split('/')
                var inicio = new Date(parts[2], parts[1] - 1, parts[0]);
                var f = new Date(inicio.getTime() - (inicio.getTimezoneOffset() * 60000)).toISOString().split('T');

                var FechaVence = ''
                if (responses.vence != null) {
                    var parts2 = responses.vence.split(' ')[0].split('/')
                    var vence = new Date(parts2[2], parts2[1] - 1, parts2[0]);
                    var v = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
                    FechaVence = v[0]
                } else {
                    var vence = new Date();
                    var v = new Date(vence.getTime() - (vence.getTimezoneOffset() * 60000)).toISOString().split('T');
                    FechaVence = v[0]
                }

                // Se obtiene la cedula del proveedor
                const cedulaProveedor = proveedors.find(proveedor => proveedor.descripcion === responses.nombreProveedor);

                dispatch(SetId_CompraCompras(Id))
                dispatch(SetFacturaCompras(responses.factura));
                dispatch(SetCodigoProvCompras(responses.codigoProv));
                dispatch(SetCedulaProveedorCompras(cedulaProveedor.cedula));
                dispatch(SetProveedorCompras(responses.nombreProveedor));
                dispatch(SetSubTotalGravadaCompras(responses.subTotalGravado));
                dispatch(SetSubTotalExentoCompras(responses.subTotalExento));
                dispatch(SetDescuentoCompras(responses.descuento));
                dispatch(SetImpuestoCompras(responses.impuesto));
                dispatch(SetTotalFacturaCompras(responses.totalFactura));
                dispatch(SetFechaCompras(f[0]));
                dispatch(SetVenceCompras(FechaVence));
                dispatch(SetTipoCompraCompras(responses.tipoCompra));
                dispatch(SetCod_MonedaCompraCompras(responses.codMonedaCompra));
                dispatch(SetTipoCambioCompras(responses.tipoCambio));
                dispatch(SetCambioImpuestoCompras(responses.cambioImpuesto));
                dispatch(SetIdEmpresaCompras(responses.idEmpresa));
                //Carga el detalle
                const articulosComprados = responses.detalle.map(detalle => {
                    return {
                        idArticuloComprados: parseFloat(detalle.idArticuloComprados),
                        CodArticulo: detalle.codArticulo,
                        codFxArticulo: parseFloat(detalle.codigo),
                        Descripcion: detalle.descripcion,
                        Cantidad: parseFloat(detalle.cantidad),
                        Regalia: parseFloat(detalle.regalias),
                        Base: parseFloat(detalle.base),
                        Flete: parseFloat(detalle.montoFlete),
                        Otros: parseFloat(detalle.otrosCargos),
                        Costo: parseFloat(detalle.costo),
                        Descuento: parseFloat(detalle.descuentoP),
                        Monto_Descuento: parseFloat(detalle.descuento),
                        Impuesto: parseFloat(detalle.impuestoP),
                        Monto_Impuesto: parseFloat(detalle.impuesto),
                        SubtotalGravado: parseFloat(detalle.gravado),
                        SubTotalExcento: parseFloat(detalle.exento),
                        SubTotal: parseFloat(detalle.gravado + detalle.exento),
                        Total: parseFloat(detalle.total),
                        precio_A: parseFloat(detalle.precioA),
                        precio_B: parseFloat(detalle.precioB),
                        precio_C: parseFloat(detalle.precioC),
                        precio_D: parseFloat(detalle.precioD),
                        Cabys: detalle.codCabys,
                        idBodega: detalle.idBodega
                    }
                })

                // Se inserta cada detalle
                articulosComprados.forEach(detalle => {
                    dispatch(SetAddDetalleCompras(detalle));
                    dispatch(SetIdBodegaCompraCompras(detalle.idBodega))
                });

                // Se activa el boton de editar
                dispatch(SetActiveButtonSaveCompras(true));

                // Se activa el boton de buscar
                dispatch(SetActiveButtonSearchCompras(true));

                // Se activa el boton de anular
                dispatch(SetActiveButtonRemoveCompras(true));

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

export const startCreateProveedoresCompra = (proveedor) => {

    return async (dispatch) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar un nuevo proveedor?',
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
                    const { data } = await suvesaApi.post('/proveedor/CreateProveedor', proveedor);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Call new proveedores
                        await dispatch(startGetAllProveedores());

                        // Se establece la cedula 
                        dispatch(SetCedulaProveedorCompras(proveedor.cedula));

                        // Se establece el nombre del proveedor
                        dispatch(SetProveedorCompras(proveedor.nombre))

                        //Clean State de modal
                        dispatch(CleanProveedorAddCompras());

                        //Cerrar el Modal
                        dispatch(isOpenModalAddProveedorCompras(false));

                        // Se setea el valor de existProveedor en false
                        dispatch(SetExistProveedorCompras(true));

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Proveedor ingresado correctamente',
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
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema al ingresar un nuevo proveedor',
                    });
                }
            }

        });

    }
}

export const startGetCatalogosProductosInternos = (products) => {

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
            const { data } = await suvesaApi.post('/Compras/ObtenerCatalogoProductosInternos', products);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                responses.forEach(producto => {

                    // Se guarda el codigo 
                    dispatch(SetCodigoInternoDetalleCompras({
                        codigoPro: producto.codigoProveedor,
                        codigoInt: producto.codigoInterno
                    }));

                    // Se guarda el descripcion 
                    dispatch(SetDescripcionInternoDetalleCompras({
                        codigoPro: producto.codigoProveedor,
                        descripcionInt: producto.descripcionInterno
                    }));
                });

                dispatch(SetHasCatalogosInternos(true));

            } else {
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener el catalogo de productos internos.',
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
                    text: 'Ocurrio un problema al obtener el catalogo de productos internos.',
                });
            }
        }

    }
}

export const startGetOneInventoryCompras = (codigo, type = 1) => {

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

            //Call end-point 
            if (type === 2) {
                url = '/inventario/ObtenerUnInventarioCod_Articulo';
                json = { cod_Articulo: `${codigo}` }
            }

            const { data } = await suvesaApi.post(url, json);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                //seleccionarlo y meterlo al estado en el metodo de action                
                dispatch(SetCodArticuloDetalleActualCompras(responses.cod_Articulo));
                dispatch(SetDescripcionDetalleActualCompras(responses.descripcion));
                dispatch(SetCantidadDetalleActualCompras(1));
                dispatch(SetRegaliaDetalleActualCompras(0));
                dispatch(SetBaseDetalleActualCompras(responses.precioBase));
                dispatch(SetFleteDetalleActualCompras(responses.fletes));
                dispatch(SetOtrosDetalleActualCompras(responses.otrosCargos));
                dispatch(SetCostoDetalleActualCompras(responses.costo));
                dispatch(SetImpuestoDetalleActualCompras(responses.iVenta));
                dispatch(SetPrecioADetalleActualCompras(responses.precio_A));
                dispatch(SetPrecioBDetalleActualCompras(responses.precio_B));
                dispatch(SetPrecioCDetalleActualCompras(responses.precio_C));
                dispatch(SetPrecioDDetalleActualCompras(responses.precio_D));
                dispatch(SetCabysDetalleActualCompras(responses.codcabys));
                dispatch(SetIdBodegaDetalleActualCompras(responses.id_Bodega));
                dispatch(SetCodigoDetalleActualCompras(responses.codigo));

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

export const startAddDetalleActualCompras = (detalle) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar este artículo a la compra?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                dispatch(SetAddDetalleCompras(detalle));
                dispatch(CleanDetalleActualCompras());

            }

        });
    }
}

export const startEditDetalleActualCompras = (detalle, index) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea editar este artículo a la factura?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                dispatch(SetEditDetalleCompras({ detalle, index }));
                dispatch(SetPosicionActualCompra(-1));
                dispatch(SetIsDetalleActualEditCompras(false))
                dispatch(CleanDetalleActualCompras());

            }

        });
    }
}

export const startDeleteDetalleCompras = (deleteLinea) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea eliminar este artículo de la compra?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                if (deleteLinea.idArticuloComprados > 0) {

                    const newDetalleCompra = {
                        idArticuloComprados: deleteLinea.idArticuloComprados,
                        codigo: deleteLinea.codFxArticulo,
                        codArticulo: deleteLinea.CodArticulo,
                        descripcion: deleteLinea.Descripcion,
                        base: deleteLinea.Base,
                        montoFlete: deleteLinea.Flete,
                        otrosCargos: deleteLinea.Otros,
                        costo: deleteLinea.Costo,
                        cantidad: deleteLinea.Cantidad,
                        regalias: deleteLinea.Regalia,
                        gravado: deleteLinea.SubtotalGravado,
                        exento: deleteLinea.SubTotalExcento,
                        descuentoP: deleteLinea.Monto_Descuento,
                        descuento: deleteLinea.Descuento,
                        impuestoP: deleteLinea.Impuesto,
                        impuesto: deleteLinea.Monto_Impuesto,
                        total: deleteLinea.Total,
                        devoluciones: 0,
                        precioA: deleteLinea.precio_A,
                        precioB: deleteLinea.precio_B,
                        precioC: deleteLinea.precio_C,
                        precioD: deleteLinea.precio_D,
                        codMonedaVenta: 1,
                        nuevoCostoBase: deleteLinea.Costo,
                        lote: '',
                        bonificado: true,
                        codigoBonificado: 0,
                        cantidadBonificado: 0,
                        costoBonificado: 0,
                        subTotalBonificado: 0,
                        codArticuloBonificacion: '',
                        codCabys: deleteLinea.Cabys,
                        idBodega: 28,
                        estadoLinea: 1
                    }

                    console.log(newDetalleCompra);

                    dispatch(startDeleteDetalleCompra(newDetalleCompra))
                } else {
                    dispatch(SetDeleteDetalleCompra(deleteLinea));
                }

            }

        });
    }
}

export const startValidateClaveInternaCompras = (password) => {

    return async (dispatch) => {

        try {

            const { status, idUsuario, message, costapets } = await dispatch(startValidateClaveInterna(password));
            
            if (status === 1) {

                // Se activan los inputs
                dispatch(SetDisableInputsCompras(false));

                // Se establece la fecha actual
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');
                dispatch(SetFechaCompras(isoDateTime[0]));
                dispatch(SetVenceCompras(isoDateTime[0]));

                // Se establece la cedula de usuario
                dispatch(SetCedulaUserCompras(idUsuario));

                // Se cargan los catalogos
                await loadCatalogos(dispatch);

                // Se cambia los icons
                dispatch(SetActiveButtonSaveCompras(true));
                dispatch(SetActiveButtonSearchCompras(true));

                // Se inicia startOpeningCompras
                dispatch(SetStartOpeningCompras(true));

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserCompras(true));

                // Ocultar la password
                dispatch(SetVisiblePasswordCompras(false));

                // Se indica si es CostaPets
                dispatch( SetIsCostaPetsCompras(costapets) );

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

export const startSearchCodigoCabysCompras = (codigoCabys) => {

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
            const { data } = await suvesaApi.get(`/Hacienda/Empresa/ObtenerCabys?dato=${codigoCabys}`);
            const { status, responses } = data;

            // Cerrar modal
            Swal.close();

            if (status === 0) {

                // Insertar en el state
                dispatch(SetSearchCodigoCabysCompras(responses));

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
                    text: 'Ocurrio un problema al buscar el codigo cabys',
                });
            }
        }
    }
}

export const startGetArticulosXMLCompras = (productos, detalleServicio) => {

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

            // Se obtiene los productos que si estan registrados
            const onlyProducts = productos.filter((product) => product.codArticulo !== "");

            //Call end-point 
            const { data } = await suvesaApi.post(`/Compras/ObtenerInventariosXML`, onlyProducts);
            const { status, responses } = data;

            // Cerrar modal
            Swal.close();

            if (status === 0) {

                let indexProduct = 1;

                // Se insertan los detalle en la tabla
                responses.forEach(product => {
                    
                    // Se obtiene el detalle actual
                    const productCurrent = onlyProducts.find(p => p.numeroLinea == indexProduct);
                    const detalleCurrent = detalleServicio.find(detalle => detalle.codigoComercial.codigo === productCurrent.codProveedor);

                    // Se obtiene el porcentaje de impuesto
                    let impuesto = detalleCurrent.impuesto.tarifa;

                    const lotes = detalleServicio.find(detalle => detalle.numeroLinea == indexProduct);
                    
                    const newProduct = {
                        idArticuloComprados: indexProduct,
                        CodArticulo: product.codArticulo,
                        codFxArticulo: product.codigo,
                        Descripcion: product.descripcion,
                        Cantidad: parseInt(detalleCurrent.cantidad),
                        Regalia: 0.00,
                        Base: parseFloat(detalleCurrent.precioUnitario),
                        Flete: 0.00,
                        Otros: 0.00,
                        Costo: parseFloat(detalleCurrent.precioUnitario),
                        Descuento: 0.00,
                        Monto_Descuento: '',
                        Impuesto: impuesto,
                        Monto_Impuesto: parseFloat(detalleCurrent.impuesto.monto),
                        SubtotalGravado: parseFloat(detalleCurrent.precioUnitario) * parseInt(detalleCurrent.cantidad),
                        SubTotalExcento: 0.00,
                        SubTotal: parseFloat(detalleCurrent.subTotal),
                        Total: parseFloat(detalleCurrent.subTotal) + parseFloat(detalleCurrent.impuesto.monto),
                        precio_A: product.precio_A,
                        precio_B: product.precio_B,
                        precio_C: product.precio_C,
                        precio_D: product.precio_D,
                        Cabys: detalleCurrent.codigo,
                        id_Bodega: product.id_Bodega,
                        nuevosCostos: detalleCurrent.costos,
                        lotes: lotes.lotes,
                        isImportXML: true,
                    }
                    
                    dispatch(SetAddDetalleCompras(newProduct));

                    indexProduct++;
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
                    text: 'Ocurrio un problema al obtener los productos',
                });
            }
        }
    }
}

export const startExistProveedorCompras = (cedula) => {

    return async (dispatch) => {

        try {
            
            //Call end-point 
            const { data } = await suvesaApi.get(`/proveedor/ExisteProveedorController?cedula=${cedula}`);
            const { status, responses } = data;

            if (status === 0) {

                // Se inserta el resultado en el state
                dispatch(SetExistProveedorCompras(responses));

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
                    text: 'Ocurrio un problema al obtener los productos',
                });
            }
        }
    }
}

export const startGetAllInventariosCompras = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/inventario/ObtenerTodosInventariosCompras`);
            const { status, responses } = data;

            if (status === 0) {

                // Se inserta el resultado en el state
                dispatch(SetAllInventariosCompras(responses));

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
                    text: 'Ocurrio un problema al obtener los productos',
                });
            }
        }
    }
}

export const startUnirInventariosXMLCompras = (product) => {

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
            const { data } = await suvesaApi.put(`/Compras/ActualizarInventarioXML`, product);
            const { status } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                // Se inserta el resultado en el state
                dispatch(SetUpdateStateInventarioCompras(product.codigoProveedor));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException)

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al unir el producto',
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
                    text: 'Ocurrio un problema al unir el producto',
                });
            }
        }
    }
}

export const startGetAllEmpresasCompras = () => {

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
                dispatch(SetEmpresasCompras( empresas ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: currentException
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

    // Se traen las proveedores
    await dispatch(startGetAllProveedores());

    // Se obtiene las monedas
    await dispatch(startGetAllMonedas());

    // Se obtiene los inventarios de compras
    await dispatch(startGetAllInventariosCompras());

    // Se obtiene las bodegas
    await dispatch(startGetAllBodegas());

    // Se obtiene las Empresas
    await dispatch(startGetAllEmpresasCompras());

    
    //Quitar el loading
    Swal.close();

}

// NormalAction

export const comprasAddNewComprasStoreAction = (event) => ({
    type: types.comprasAddNew,
    payload: event
});

export const SetEmpresasCompras = (value) => ({
    type: types.SetEmpresasCompras,
    payload: value
});

export const SetOpenSearchInventoryCompras = (value) => ({
    type: types.SetOpenSearchInventoryCompras,
    payload: value
})

export const SetId_CompraCompras = (value) => ({
    type: types.SetId_CompraCompras,
    payload: value
})

export const SetIdBodegaCompraCompras = (value) => ({
    type: types.SetIdBodegaCompraCompras,
    payload: value
})



export const SetFacturaCompras = (value) => ({
    type: types.SetFacturaCompras,
    payload: value
})

export const SetCodigoProvCompras = (value) => ({
    type: types.SetCodigoProvCompras,
    payload: value
})

export const SetProveedorCompras = (value) => ({
    type: types.SetProveedorCompras,
    payload: value
})

export const SetCedulaProveedorCompras = (value) => ({
    type: types.SetCedulaProveedorCompras,
    payload: value
})

export const SetSubTotalGravadaCompras = (value) => ({
    type: types.SetSubTotalGravadaCompras,
    payload: value
})

export const SetSubTotalExentoCompras = (value) => ({
    type: types.SetSubTotalExentoCompras,
    payload: value
})

export const SetDescuentoCompras = (value) => ({
    type: types.SetDescuentoCompras,
    payload: value
})

export const SetImpuestoCompras = (value) => ({
    type: types.SetImpuestoCompras,
    payload: value
})

export const SetTotalFacturaCompras = (value) => ({
    type: types.SetTotalFacturaCompras,
    payload: value
})

export const SetFechaCompras = (value) => ({
    type: types.SetFechaCompras,
    payload: value
})

export const SetVenceCompras = (value) => ({
    type: types.SetVenceCompras,
    payload: value
})

export const SetTipoCompraCompras = (value) => ({
    type: types.SetTipoCompraCompras,
    payload: value
})

export const SetCod_MonedaCompraCompras = (value) => ({
    type: types.SetCod_MonedaCompraCompras,
    payload: value
})

export const SetTipoCambioCompras = (value) => ({
    type: types.SetTipoCambioCompras,
    payload: value
})

export const SetCambioImpuestoCompras = (value) => ({
    type: types.SetCambioImpuestoCompras,
    payload: value
})

export const SetIdEmpresaCompras = (value) => ({
    type: types.SetIdEmpresaCompras,
    payload: value
})

  


export const SetopenSearchModal = (value) => ({
    type: types.SetopenSearchModal,
    payload: value
})

export const SetValorFiltroSearchModalCompras = (value) => ({
    type: types.SetValorFiltroSearchModalCompras,
    payload: value
})

export const SetProveedorSearchModalCompras = (value) => ({
    type: types.SetProveedorSearchModalCompras,
    payload: value
})

export const SetFacturaSearchModalCompras = (value) => ({
    type: types.SetFacturaSearchModalCompras,
    payload: value
})

export const SetFechasSearchModalCompras = (value) => ({
    type: types.SetFechasSearchModalCompras,
    payload: value
})

export const SetDesdeSearchModalCompras = (value) => ({
    type: types.SetDesdeSearchModalCompras,
    payload: value
})

export const SetHastaSearchModalCompras = (value) => ({
    type: types.SetHastaSearchModalCompras,
    payload: value
})

export const SetidArticuloCompradosDetalleActualCompras = (value) => ({
    type: types.SetidArticuloCompradosDetalleActualCompras,
    payload: value
})

export const SetCodArticuloDetalleActualCompras = (value) => ({
    type: types.SetCodArticuloDetalleActualCompras,
    payload: value
})

export const SetCodigoDetalleActualCompras = (value) => ({
    type: types.SetCodigoDetalleActualCompras,
    payload: value
})

export const SetDescripcionDetalleActualCompras = (value) => ({
    type: types.SetDescripcionDetalleActualCompras,
    payload: value
})

export const SetCantidadDetalleActualCompras = (value) => ({
    type: types.SetCantidadDetalleActualCompras,
    payload: value
})

export const SetRegaliaDetalleActualCompras = (value) => ({
    type: types.SetRegaliaDetalleActualCompras,
    payload: value
})

export const SetBaseDetalleActualCompras = (value) => ({
    type: types.SetBaseDetalleActualCompras,
    payload: value
})

export const SetFleteDetalleActualCompras = (value) => ({
    type: types.SetFleteDetalleActualCompras,
    payload: value
})

export const SetOtrosDetalleActualCompras = (value) => ({
    type: types.SetOtrosDetalleActualCompras,
    payload: value
})

export const SetCostoDetalleActualCompras = (value) => ({
    type: types.SetCostoDetalleActualCompras,
    payload: value
})

export const SetDescuentoDetalleActualCompras = (value) => ({
    type: types.SetDescuentoDetalleActualCompras,
    payload: value
})

export const SetMonto_DescuentoDetalleActualCompras = (value) => ({
    type: types.SetMonto_DescuentoDetalleActualCompras,
    payload: value
})

export const SetImpuestoDetalleActualCompras = (value) => ({
    type: types.SetImpuestoDetalleActualCompras,
    payload: value
})

export const SetMonto_ImpuestoDetalleActualCompras = (value) => ({
    type: types.SetMonto_ImpuestoDetalleActualCompras,
    payload: value
})

export const SetSubtotalGravadoDetalleActualCompras = (value) => ({
    type: types.SetSubtotalGravadoDetalleActualCompras,
    payload: value
})

export const SetSubTotalExcentoDetalleActualCompras = (value) => ({
    type: types.SetSubTotalExcentoDetalleActualCompras,
    payload: value
})

export const SetSubTotalDetalleActualCompras = (value) => ({
    type: types.SetSubTotalDetalleActualCompras,
    payload: value
})

export const SetTotalDetalleActualCompras = (value) => ({
    type: types.SetTotalDetalleActualCompras,
    payload: value
})

export const SetPrecioADetalleActualCompras = (value) => ({
    type: types.SetPrecioADetalleActualCompras,
    payload: value
})

export const SetPrecioBDetalleActualCompras = (value) => ({
    type: types.SetPrecioBDetalleActualCompras,
    payload: value
})

export const SetPrecioCDetalleActualCompras = (value) => ({
    type: types.SetPrecioCDetalleActualCompras,
    payload: value
})

export const SetPrecioDDetalleActualCompras = (value) => ({
    type: types.SetPrecioDDetalleActualCompras,
    payload: value
})

export const SetCabysDetalleActualCompras = (value) => ({
    type: types.SetCabysDetalleActualCompras,
    payload: value
})

export const SetIdBodegaDetalleActualCompras = (value) => ({
    type: types.SetIdBodegaDetalleActualCompras,
    payload: value
})

export const CleanDetalleActualCompras = (value) => ({
    type: types.CleanDetalleActualCompras,
    payload: value
})

export const SetAddDetalleCompras = (value) => ({
    type: types.SetAddDetalleCompras,
    payload: value
})

export const CleanCompras = (value) => ({
    type: types.CleanCompras,
    payload: value
})

export const SetsearchCompras = (value) => ({
    type: types.SetsearchCompras,
    payload: value
})

export const CleanValorFiltroProveedorCompras = () => ({
    type: types.CleanValorFiltroProveedorCompras,
})

export const SetDefaultProveedorFilterCompras = (value) => ({
    type: types.SetDefaultProveedorFilterCompras,
    payload: value
})

export const SetDefaultUbicacionFilterCompras = (value) => ({
    type: types.SetDefaultUbicacionFilterCompras,
    payload: value
})

export const SetOpenModalSearchProveedorCompras = (value) => ({
    type: types.SetOpenModalSearchProveedorCompras,
    payload: value
})

export const SetSearchProveedorFilterCompras = (value) => ({
    type: types.SetSearchProveedorFilterCompras,
    payload: value
})

export const SetValorFiltroProveedorCompras = (value) => ({
    type: types.SetValorFiltroProveedorCompras,
    payload: value
})

export const SetAddDetalleActualCompras = (value) => ({
    type: types.SetAddDetalleActualCompras,
    payload: value
})

export const SetPosicionActualCompra = (value) => ({
    type: types.SetPosicionActualCompra,
    payload: value
})

export const SetEditDetalleCompras = (value) => ({
    type: types.SetEditDetalleCompras,
    payload: value
})

export const SetDeleteDetalleCompra = (value) => ({
    type: types.SetDeleteDetalleCompra,
    payload: value
})

export const isOpenModalAddProveedorCompras = (value) => ({
    type: types.isOpenModalAddProveedorCompras,
    payload: value
})

export const SetnombreProveedorAddCompras = (value) => ({
    type: types.SetnombreProveedorAddCompras,
    payload: value
})

export const SetcedulaProveedorAddCompras = (value) => ({
    type: types.SetcedulaProveedorAddCompras,
    payload: value
})

export const Settelefono1ProveedorAddCompras = (value) => ({
    type: types.Settelefono1ProveedorAddCompras,
    payload: value
})

export const Setfax1ProveedorAddCompras = (value) => ({
    type: types.Setfax1ProveedorAddCompras,
    payload: value
})

export const SetemailProveedorAddCompras = (value) => ({
    type: types.SetemailProveedorAddCompras,
    payload: value
})

export const SetdireccionProveedorAddCompras = (value) => ({
    type: types.SetdireccionProveedorAddCompras,
    payload: value
})

export const SetobservacionesProveedorAddCompras = (value) => ({
    type: types.SetobservacionesProveedorAddCompras,
    payload: value
})

export const SetcontactoProveedorAddCompras = (value) => ({
    type: types.SetcontactoProveedorAddCompras,
    payload: value
})

export const SettelefonoContProveedorAddCompras = (value) => ({
    type: types.SettelefonoContProveedorAddCompras,
    payload: value
})

export const CleanProveedorAddCompras = () => ({
    type: types.CleanProveedorAddCompras
})

export const SetDisableInputsCompras = (value) => ({
    type: types.SetDisableInputsCompras,
    payload: value
})

export const SetActiveButtonSaveCompras = (value) => ({
    type: types.SetActiveButtonSaveCompras,
    payload: value
})

export const SetActiveButtonSearchCompras = (value) => ({
    type: types.SetActiveButtonSearchCompras,
    payload: value
})

export const SetActiveButtonRemoveCompras = (value) => ({
    type: types.SetActiveButtonRemoveCompras,
    payload: value
})

export const SetClaveInternaCompras = (value) => ({
    type: types.SetClaveInternaCompras,
    payload: value
})

export const SetVisiblePasswordCompras = (value) => ({
    type: types.SetVisiblePasswordCompras,
    payload: value
})

export const SetDisableInputsUserCompras = (value) => ({
    type: types.SetDisableInputsUserCompras,
    payload: value
})

export const SetIsOpenImportarXMLModalCompras = (value) => ({
    type: types.SetIsOpenImportarXMLModalCompras,
    payload: value
})

export const SetStartReadingXMLCompras = (value) => ({
    type: types.SetStartReadingXMLCompras,
    payload: value
})

export const SetNameFileReadXMLCompras = (value) => ({
    type: types.SetNameFileReadXMLCompras,
    payload: value
})

export const SetBillingImportXMLCompras = (value) => ({
    type: types.SetBillingImportXMLCompras,
    payload: value
})

export const SetCodigoInternoDetalleCompras = (value) => ({
    type: types.SetCodigoInternoDetalleCompras,
    payload: value
})

export const SetDescripcionInternoDetalleCompras = (value) => ({
    type: types.SetDescripcionInternoDetalleCompras,
    payload: value
})

export const SetRegaliaInternoDetalleCompras = (value) => ({
    type: types.SetRegaliaInternoDetalleCompras,
    payload: value
})

export const SetCleanBillingImportXMLCompras = () => ({
    type: types.SetCleanBillingImportXMLCompras
})

export const SetDisableInputsDiasCompras = (value) => ({
    type: types.SetDisableInputsDiasCompras,
    payload: value
})

export const SetDiasCompras = (value) => ({
    type: types.SetDiasCompras,
    payload: value
})

export const SetDisableInputsDetalleCompras = (value) => ({
    type: types.SetDisableInputsDetalleCompras,
    payload: value
})

export const SetIsOpenModalSearchCodigoCabysCompras = (value) => ({
    type: types.SetIsOpenModalSearchCodigoCabysCompras,
    payload: value
})

export const SetValueSearchCodigoCabysCompras = (value) => ({
    type: types.SetValueSearchCodigoCabysCompras,
    payload: value
})

export const SetSearchCodigoCabysCompras = (value) => ({
    type: types.SetSearchCodigoCabysCompras,
    payload: value
})

export const CleanSearchCodigoCabysCompras = () => ({
    type: types.CleanSearchCodigoCabysCompras
})

export const SetShowMessageHelpCompras = (value) => ({
    type: types.SetShowMessageHelpCompras,
    payload: value
})

export const SetIsDetalleActualEditCompras = (value) => ({
    type: types.SetIsDetalleActualEditCompras,
    payload: value
})

export const SetCedulaUserCompras = (value) => ({
    type: types.SetCedulaUserCompras,
    payload: value
})

export const SetHasCatalogosInternos = (value) => ({
    type: types.SetHasCatalogosInternos,
    payload: value
})

export const SetExistProveedorCompras = (value) => ({
    type: types.SetExistProveedorCompras,
    payload: value
})

export const CleanFacturaCompras = () => ({
    type: types.CleanFacturaCompras
})

export const SetStartOpeningCompras = (value) => ({
    type: types.SetStartOpeningCompras,
    payload: value
})

export const SetIsEditCompras = (value) => ({
    type: types.SetIsEditCompras,
    payload: value
})

export const SetHasChargeFacturaCompras = (value) => ({
    type: types.SetHasChargeFacturaCompras,
    payload: value
})

export const SetAllInventariosCompras = (value) => ({
    type: types.SetAllInventariosCompras,
    payload: value
})

export const SetIsOpenModalSearchInventarioModalCompras = (value) => ({
    type: types.SetIsOpenModalSearchInventarioModalCompras,
    payload: value
})

export const SetValorBusquedaInventariosCompras = (value) => ({
    type: types.SetValorBusquedaInventariosCompras,
    payload: value
})

export const SetSearchInventarioCompras = (value) => ({
    type: types.SetSearchInventarioCompras,
    payload: value
})

export const SetDefaultSearchInventarioCompras = () => ({
    type: types.SetDefaultSearchInventarioCompras
})

export const SetCodigoInventarioSeleccionadoCompras = (value) => ({
    type: types.SetCodigoInventarioSeleccionadoCompras,
    payload: value
})

export const CleanStateSearchInventarioCompras = () => ({
    type: types.CleanStateSearchInventarioCompras
})

export const SetCodigoInternoDetalleManualCompras = (value) => ({
    type: types.SetCodigoInternoDetalleManualCompras,
    payload: value
})

export const SetDescripcionInternoDetalleManualCompras = (value) => ({
    type: types.SetDescripcionInternoDetalleManualCompras,
    payload: value
})

export const SetUpdateStateInventarioCompras = (value) => ({
    type: types.SetUpdateStateInventarioCompras,
    payload: value
})

export const SetIsOpenModalPrecioImportarFacturaCompras = (value) => ({
    type: types.SetIsOpenModalPrecioImportarFacturaCompras,
    payload: value
})

export const SetIsCostaPetsCompras = (value) => ({
    type: types.SetIsCostaPetsCompras,
    payload: value
})

export const SetCantidadInternoDetalleCompras = (value) => ({
    type: types.SetCantidadInternoDetalleCompras,
    payload: value
})

export const SetNuevoCostoInternoDetalleCompras = (value) => ({
    type: types.SetNuevoCostoInternoDetalleCompras,
    payload: value
})

export const SetNuevoCostoPreciosImportarFacturaCompras = (value) => ({
    type: types.SetNuevoCostoPreciosImportarFacturaCompras,
    payload: value
})

export const SetCodigoProSeletedPreciosImportarFacturaCompras = (value) => ({
    type: types.SetCodigoProSeletedPreciosImportarFacturaCompras,
    payload: value
})

export const SetImpuestoNetoPreciosImportarFacturaCompras = (value) => ({
    type: types.SetImpuestoNetoPreciosImportarFacturaCompras,
    payload: value
})

export const CleanPreciosImportarFacturaCompras = () => ({
    type: types.CleanPreciosImportarFacturaCompras
})

export const SetTipoPreciosImportarFacturaCompras = (value) => ({
    type: types.SetTipoPreciosImportarFacturaCompras,
    payload: value
})

export const SetUtilidadPreciosImportarFacturaCompras = (value) => ({
    type: types.SetUtilidadPreciosImportarFacturaCompras,
    payload: value
})

export const SetPrecioPreciosImportarFacturaCompras = (value) => ({
    type: types.SetPrecioPreciosImportarFacturaCompras,
    payload: value
})

export const SetPrecioIVPreciosImportarFacturaCompras = (value) => ({
    type: types.SetPrecioIVPreciosImportarFacturaCompras,
    payload: value
})

export const SetSelectedPricesPreciosImportarFacturaCompras = (value) => ({
    type: types.SetSelectedPricesPreciosImportarFacturaCompras,
    payload: value
})

export const SetOnePrecioPreciosImportarFacturaCompras = (value) => ({
    type: types.SetOnePrecioPreciosImportarFacturaCompras,
    payload: value
})

export const SetAllPrecioPreciosImportarFacturaCompras = (value) => ({
    type: types.SetAllPrecioPreciosImportarFacturaCompras,
    payload: value
})

export const SetIsEditPriceSellPreciosImportarFacturaCompras = (value) => ({
    type: types.SetIsEditPriceSellPreciosImportarFacturaCompras,
    payload: value
})

export const SetChangeUtilidadPreciosImportarFacturaCompras = (value) => ({
    type: types.SetChangeUtilidadPreciosImportarFacturaCompras,
    payload: value
})

export const SetChangePrecioPreciosImportarFacturaCompras = (value) => ({
    type: types.SetChangePrecioPreciosImportarFacturaCompras,
    payload: value
})

export const SetChangePrecioIVPreciosImportarFacturaCompras = (value) => ({
    type: types.SetChangePrecioIVPreciosImportarFacturaCompras,
    payload: value
})

export const CleanStatePricesSellPreciosImportarFacturaCompras = () => ({
    type: types.CleanStatePricesSellPreciosImportarFacturaCompras
})

export const SetEditPricesSellPreciosImportarFacturaCompras = (value) => ({
    type: types.SetEditPricesSellPreciosImportarFacturaCompras,
    payload: value
})

export const SetRemovePricesSellPreciosImportarFacturaCompras = (value) => ({
    type: types.SetRemovePricesSellPreciosImportarFacturaCompras,
    payload: value
})

export const SetNuevosCostosArticuloImportarFacturaCompras = (value) => ({
    type: types.SetNuevosCostosArticuloImportarFacturaCompras,
    payload: value
})

export const SetLoteLotesImportarFacturaCompras = (value) => ({
    type: types.SetLoteLotesImportarFacturaCompras,
    payload: value
})

export const SetVencimientoLotesImportarFacturaCompras = (value) => ({
    type: types.SetVencimientoLotesImportarFacturaCompras,
    payload: value
})

export const SetExistenciaLotesImportarFacturaCompras = (value) => ({
    type: types.SetExistenciaLotesImportarFacturaCompras,
    payload: value
})

export const SetAddLoteLotesImportarFacturaCompras = (value) => ({
    type: types.SetAddLoteLotesImportarFacturaCompras,
    payload: value
})

export const SetEditLoteLotesImportarFacturaCompras = (value) => ({
    type: types.SetEditLoteLotesImportarFacturaCompras,
    payload: value
})

export const SetArrayLotesImportarFacturaCompras = (value) => ({
    type: types.SetArrayLotesImportarFacturaCompras,
    payload: value
})

export const SetNumeroLineaLotesImportarFacturaCompras = (value) => ({
    type: types.SetNumeroLineaLotesImportarFacturaCompras,
    payload: value
})

export const SetCantidadLotesImportarFacturaCompras = (value) => ({
    type: types.SetCantidadLotesImportarFacturaCompras,
    payload: value
})

export const SetIsLoteEditImportarFacturaCompras = (value) => ({
    type: types.SetIsLoteEditImportarFacturaCompras,
    payload: value
})

export const CleanLotesImportarFacturaCompras = () => ({
    type: types.CleanLotesImportarFacturaCompras
})