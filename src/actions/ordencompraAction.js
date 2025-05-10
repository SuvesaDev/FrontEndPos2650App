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

export const startValidateClaveInternaOrdenCompra = ( password ) => {

    return async ( dispatch ) => {
          
        try {
            
            const { status, userName, message }  = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {

                dispatch( SetActiveButtonNewOrdenCompra(true) );
                dispatch( SetActiveButtonSearchOrdenCompra(true) );
                dispatch( SetNombreEntregaOrdenCompra(userName) );
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

export const startSearchOrdenCompra = ( value, type ) => {

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

            let endPoint = (type == 'proveedor') ? `/OrdenCompra/GetOrdenCompraAllProvedor?idProveedor=${value}&state=${false}` : `/OrdenCompra/GetOrdenComprasDataBasic?orden=${value}&state=${false}`;
            
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

export const SetAddOneArticulosOrdenCompra = (value) => ({
    type: types.SetAddOneArticulosOrdenCompra,
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

export const SetObservacionesArticuloOrdenCompra = (value) => ({
    type: types.SetObservacionesArticuloOrdenCompra,
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

export const CleanStateArticuloOrdenCompra = () => ({
    type: types.CleanStateArticuloOrdenCompra
})