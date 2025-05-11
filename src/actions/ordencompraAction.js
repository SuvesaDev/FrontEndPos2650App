import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

import { startValidateClaveInterna } from './login';

// API Actions
export const startSaveOrdenCompra = ( ordenCompra ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea agregar un nueva orden compra?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

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
                    const { data } = await suvesaApi.post('/OrdenCompra/CreateOrdenCompra', ordenCompra);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Orden de compra ingresada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        
                        dispatch( CleanStateArticuloOrdenCompra() );
                        dispatch( CleanStateOrdenCompra() );

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

            });

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
                    text: 'Ocurrio un problema a la guardar la orden de compra',
                });
            }
        }
    };
}

export const startEditOrdenCompra = ( ordenCompra ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea editar esta orden compra?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Editar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

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
                    const { data } = await suvesaApi.put('/OrdenCompra/UpdateOrdenCompra', ordenCompra);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Orden de compra editada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        
                        dispatch( CleanStateArticuloOrdenCompra() );
                        dispatch( CleanStateOrdenCompra() );

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

            });

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
                    text: 'Ocurrio un problema a la guardar la orden de compra',
                });
            }
        }
    };
}

export const startChangeStateOrdenCompra = ( idOrdenCompra, state ) => {

    return async (dispatch) => {

        try {
            let message = (state) ? '¿Desea anular esta orden compra?' : '¿Desea activar esta orden compra?';
            let messageButtton = (state) ? 'Anular' : 'Activar';
            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title:  message,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: messageButtton,
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

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
                    const { data } = await suvesaApi.delete(`/OrdenCompra/DesactivateOrdenCompra?idOrdenCompra=${idOrdenCompra}&state=${state}`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Orden de compra anulada correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        
                        dispatch( CleanStateArticuloOrdenCompra() );
                        dispatch( CleanStateOrdenCompra() );

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

            });

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
                    text: 'Ocurrio un problema a la guardar la orden de compra',
                });
            }
        }
    };
}

export const startValidateClaveInternaOrdenCompra = ( password ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message, usuario }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                dispatch( SetActiveButtonNewOrdenCompra(true) );
                dispatch( SetActiveButtonSearchOrdenCompra(true) );
                dispatch( SetNombreEntregaOrdenCompra(userName) );
                dispatch( SetUsuarioOrdenCompra(usuario) );
                dispatch( SetVisibleClaveInternaOrdenCompra(false) );
                dispatch( SetDisableInputsUserOrdenCompra(true) );

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

export const startGetOneInventoryOrdenCompra = (codigo) => {

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
            const resp = await suvesaApi.post('/inventario/ObtenerUnInventario', { codigo });
            const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {
                
                const { codigo, cod_Articulo, descripcion, iVenta, costo } = responses;
                let precio = parseFloat(costo);
                let subTotal = precio * 1;
                let montoImpuesto = (subTotal * iVenta) / 100;
                let total = subTotal + montoImpuesto;
                
                // Seleccinarlo y meterlo en el estado
                dispatch( SetIdArticuloArticuloOrdenCompra(codigo) );
                dispatch( SetCodigoArticuloOrdenCompra(cod_Articulo) );
                dispatch( SetDescripcionArticuloOrdenCompra(descripcion) );
                dispatch( SetPrecioUnitarioArticuloOrdenCompra(precio) );
                dispatch( SetImpuestoArticuloOrdenCompra(parseFloat(iVenta)) );
                dispatch( SetSubtotalArticuloOrdenCompra(parseFloat(subTotal).toFixed(2)) );
                dispatch( SetTotalArticuloOrdenCompra(parseFloat(total).toFixed(2)) );

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
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startSearchOrdenCompra = ( value, type, anuladas) => {

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

            let endPoint = (type == 'proveedor') ? `/OrdenCompra/GetOrdenCompraAllProvedor?idProveedor=${value}&state=${anuladas}` : `/OrdenCompra/GetOrdenComprasDataBasic?orden=${value}&state=${anuladas}`;
            
            //Call end-point 
            const { data } = await suvesaApi.get(endPoint);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();
            
            if (status === 0) {
                
                const searchOrdenesCompra = responses.map( ordenCompra => {
                    return {
                        orden: ordenCompra.orden,
                        fecha: ordenCompra.fecha.split('T')[0],
                        nombreUsuario: ordenCompra.nombreUsuario
                    }
                });

                dispatch( SetOrdenesComprasSearchOrdenCompra(searchOrdenesCompra) );

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
                    text: 'Ocurrio un problema al buscar orden de compra',
                });
            }
        }
    };
}

export const startGetOneOrdenCompra = ( idOrdenCompra, proveedores ) => {

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
            const { data } = await suvesaApi.get(`/OrdenCompra/GetOrdenCompra?idOrdenCompra=${idOrdenCompra}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();
            
            if (status === 0) {
                
                const {
                    orden,
                    proveedor,
                    fecha,                   
                    codMoneda,
                    contado,
                    credito,
                    diascredito,
                    anulado,
                    observaciones,
                    usuario,
                    nombreUsuario,
                    detalleOrdenCompra
                } = responses;
                console.log(responses)
                const nameProveedor = proveedores.find( prov => prov.codigo == proveedor );
                
                dispatch( SetNumeroOrdenCompra(orden) );
                dispatch( SetIdProveedorOrdenCompra(proveedor) );
                dispatch( SetNombreProveedorOrdenCompra(( nameProveedor != null) ? nameProveedor.descripcion : '') );
                dispatch( SetFechaEmisionOrdenCompra(fecha.split('T')[0]) );
                dispatch( SetMonedaOrdenCompra(codMoneda) );
                dispatch( SetFormaPagoContadoOrdenCompra(contado) );
                dispatch( SetFormaPagoCreditoOrdenCompra(credito) );
                dispatch( SetCantidadDiasOrdenCompra(diascredito) );
                dispatch( SetObservacionesOrdenCompra(observaciones) );
                dispatch( SetAnuladoOrdenCompra(anulado) );
                dispatch( SetUsuarioCreacionOrdenCompra(usuario) );
                dispatch( SetNombreUsuarioCreacionOrdenCompra(nombreUsuario) );
                
                const articulos = detalleOrdenCompra.map( detalle => {

                    let subTotal = parseFloat(detalle.costoUnitario) * parseInt(detalle.cantidad);

                    return {
                        id: detalle.id,
                        idArticulo : detalle.codigo,
                        codigo : detalle.codigoArticulo,
                        descripcion : detalle.descripcion,
                        precioUnitario : detalle.costoUnitario,
                        descuento : detalle.porcDescuento,
                        impuesto : detalle.porcImpuesto,
                        cantidad : detalle.cantidad,
                        subtotal : subTotal,
                        total : detalle.totalCompra,
                        montoDescuento: detalle.descuento,
                        montoImpuesto: detalle.impuesto
                    }
                });

                dispatch( SetAddAllArticulosOrdenCompra(articulos) );
                dispatch( SetIsEditOrdenCompra(true) );

                if( anulado ) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: `La Orden de compra #${orden} esta anulada`
                    });

                    dispatch( SetActiveButtonSaveOrdenCompra(false) );
                    dispatch( SetActiveButtonNewOrdenCompra(false) );
                    dispatch( SetActiveButtonSearchOrdenCompra(true) );
                    dispatch( SetActiveButtonDisableOrdenCompra(true) );
                    dispatch( SetDisableInputsOrdenCompra(true) );
                    dispatch( SetDisableInputsArticuloOrdenCompra(true) );
                    
                } else {
                    dispatch( SetActiveButtonSaveOrdenCompra(true) );
                    dispatch( SetActiveButtonDisableOrdenCompra(true) );
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
                    text: 'Ocurrio un problema al buscar orden de compra',
                });
            }
        }
    };
}

// Normal Actions
export const SetActiveButtonNewOrdenCompra = (value) => ({
    type: types.SetActiveButtonNewOrdenCompra,
    payload: value
})

export const SetActiveButtonSearchOrdenCompra = (value) => ({
    type: types.SetActiveButtonSearchOrdenCompra,
    payload: value
})

export const SetActiveButtonSaveOrdenCompra = (value) => ({
    type: types.SetActiveButtonSaveOrdenCompra,
    payload: value
})

export const SetActiveButtonDisableOrdenCompra = (value) => ({
    type: types.SetActiveButtonDisableOrdenCompra,
    payload: value
})

export const SetDisableInputsOrdenCompra = (value) => ({
    type: types.SetDisableInputsOrdenCompra,
    payload: value
})

export const SetNumeroOrdenCompra = (value) => ({
    type: types.SetNumeroOrdenCompra,
    payload: value
})

export const SetIdProveedorOrdenCompra = (value) => ({
    type: types.SetIdProveedorOrdenCompra,
    payload: value
})

export const SetNombreProveedorOrdenCompra = (value) => ({
    type: types.SetNombreProveedorOrdenCompra,
    payload: value
})

export const SetFechaEmisionOrdenCompra = (value) => ({
    type: types.SetFechaEmisionOrdenCompra,
    payload: value
})

export const SetNombreEntregaOrdenCompra = (value) => ({
    type: types.SetNombreEntregaOrdenCompra,
    payload: value
})

export const SetMonedaOrdenCompra = (value) => ({
    type: types.SetMonedaOrdenCompra,
    payload: value
})

export const SetFormaPagoContadoOrdenCompra = (value) => ({
    type: types.SetFormaPagoContadoOrdenCompra,
    payload: value
})

export const SetFormaPagoCreditoOrdenCompra = (value) => ({
    type: types.SetFormaPagoCreditoOrdenCompra,
    payload: value
})

export const SetCantidadDiasOrdenCompra = (value) => ({
    type: types.SetCantidadDiasOrdenCompra,
    payload: value
})

export const SetObservacionesOrdenCompra = (value) => ({
    type: types.SetObservacionesOrdenCompra,
    payload: value
})

export const SetAddOneArticulosOrdenCompra = (value) => ({
    type: types.SetAddOneArticulosOrdenCompra,
    payload: value
})

export const SetAddAllArticulosOrdenCompra = (value) => ({
    type: types.SetAddAllArticulosOrdenCompra,
    payload: value
})

export const SetTotalSubTotalOrdenCompra = (value) => ({
    type: types.SetTotalSubTotalOrdenCompra,
    payload: value
})

export const SetTotalDescuentoOrdenCompra = (value) => ({
    type: types.SetTotalDescuentoOrdenCompra,
    payload: value
})

export const SetTotalImpuestosOrdenCompra = (value) => ({
    type: types.SetTotalImpuestosOrdenCompra,
    payload: value
})

export const SetTotalFinalOrdenCompra = (value) => ({
    type: types.SetTotalFinalOrdenCompra,
    payload: value
})

export const SetAnuladoOrdenCompra = (value) => ({
    type: types.SetAnuladoOrdenCompra,
    payload: value
})

export const SetIdArticuloArticuloOrdenCompra = (value) => ({
    type: types.SetIdArticuloArticuloOrdenCompra,
    payload: value
})

export const SetCodigoArticuloOrdenCompra = (value) => ({
    type: types.SetCodigoArticuloOrdenCompra,
    payload: value
})

export const SetDescripcionArticuloOrdenCompra = (value) => ({
    type: types.SetDescripcionArticuloOrdenCompra,
    payload: value
})

export const SetPrecioUnitarioArticuloOrdenCompra = (value) => ({
    type: types.SetPrecioUnitarioArticuloOrdenCompra,
    payload: value
})

export const SetFletesArticuloOrdenCompra = (value) => ({
    type: types.SetFletesArticuloOrdenCompra,
    payload: value
})

export const SetCostoArticuloOrdenCompra = (value) => ({
    type: types.SetCostoArticuloOrdenCompra,
    payload: value
})

export const SetDescuentoArticuloOrdenCompra = (value) => ({
    type: types.SetDescuentoArticuloOrdenCompra,
    payload: value
})

export const SetImpuestoArticuloOrdenCompra = (value) => ({
    type: types.SetImpuestoArticuloOrdenCompra,
    payload: value
})

export const SetCantidadArticuloOrdenCompra = (value) => ({
    type: types.SetCantidadArticuloOrdenCompra,
    payload: value
})

export const SetSubtotalArticuloOrdenCompra = (value) => ({
    type: types.SetSubtotalArticuloOrdenCompra,
    payload: value
})

export const SetTotalArticuloOrdenCompra = (value) => ({
    type: types.SetTotalArticuloOrdenCompra,
    payload: value
})

export const CleanStateOrdenCompra = () => ({
    type: types.CleanStateOrdenCompra
})

export const SetIsOpenModalSearchInventoryOrdenCompra = (value) => ({
    type: types.SetIsOpenModalSearchInventoryOrdenCompra,
    payload: value
})

export const SetClaveInternaOrdenCompra = (value) => ({
    type: types.SetClaveInternaOrdenCompra,
    payload: value
})

export const SetVisibleClaveInternaOrdenCompra = (value) => ({
    type: types.SetVisibleClaveInternaOrdenCompra,
    payload: value
})

export const SetDisableInputsUserOrdenCompra = (value) => ({
    type: types.SetDisableInputsUserOrdenCompra,
    payload: value
})

export const SetDisableInputsArticuloOrdenCompra = (value) => ({
    type: types.SetDisableInputsArticuloOrdenCompra,
    payload: value
})

export const SetIsEditArticuloOrdenCompra = (value) => ({
    type: types.SetIsEditArticuloOrdenCompra,
    payload: value
})

export const SetIndexArticuloSeletedOrdenCompra = (value) => ({
    type: types.SetIndexArticuloSeletedOrdenCompra,
    payload: value
})

export const SetEditArticuloOrdenCompra = (value) => ({
    type: types.SetEditArticuloOrdenCompra,
    payload: value
})

export const SetDeleteArticuloOrdenCompra = (value) => ({
    type: types.SetDeleteArticuloOrdenCompra,
    payload: value
})

export const SetCheckSearchByProveedorOrdenCompra = (value) => ({
    type: types.SetCheckSearchByProveedorOrdenCompra,
    payload: value
})

export const SetCheckSearchByOrdenCompra = (value) => ({
    type: types.SetCheckSearchByOrdenCompra,
    payload: value
})

export const SetTextSearchOrdenCompra = (value) => ({
    type: types.SetTextSearchOrdenCompra,
    payload: value
})

export const SetIdProveedorSearchOrdenCompra = (value) => ({
    type: types.SetIdProveedorSearchOrdenCompra,
    payload: value
})

export const SetOrdenesComprasSearchOrdenCompra = (value) => ({
    type: types.SetOrdenesComprasSearchOrdenCompra,
    payload: value
})

export const SetUsuarioOrdenCompra = (value) => ({
    type: types.SetUsuarioOrdenCompra,
    payload: value
})

export const SetIsEditOrdenCompra = (value) => ({
    type: types.SetIsEditOrdenCompra,
    payload: value
})

export const SetUsuarioCreacionOrdenCompra = (value) => ({
    type: types.SetUsuarioCreacionOrdenCompra,
    payload: value
})

export const SetNombreUsuarioCreacionOrdenCompra = (value) => ({
    type: types.SetNombreUsuarioCreacionOrdenCompra,
    payload: value
})

export const SetCheckAnuladasSearchOrdenCompra = (value) => ({
    type: types.SetCheckAnuladasSearchOrdenCompra,
    payload: value
})

export const CleanStateArticuloOrdenCompra = () => ({
    type: types.CleanStateArticuloOrdenCompra
})