import Swal from 'sweetalert2';
import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";
import loadingImage from '../assets/loading_snipiner.gif';
import { suvesaApi } from '../api';

export const startGetOneInventoryInventoryAdjustment = (codigo) => {

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
            console.log(codigo);
            console.log(resp);
            const { status, responses } = resp.data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                //seleccionarlo y meterlo al estado en el metodo de action                                
                dispatch(SetCodArticuloDetalleActualInventoryAdjustment(responses.cod_Articulo));
                dispatch(SetDescArticuloDetalleActualInventoryAdjustment(responses.descripcion));
                dispatch(SetCantidadDetalleActualInventoryAdjustment(1));
                dispatch(SetEntradaDetalleActualInventoryAdjustment(true));
                dispatch(SetSalidaDetalleActualInventoryAdjustment(false));
                dispatch(SetCostoUnitDetalleActualInventoryAdjustment(responses.precioBase));
                dispatch(SetobservacionDetalleActualInventoryAdjustment(''));
                dispatch(SetExistenciaDetalleActualInventoryAdjustment(responses.existencia));
                dispatch(SetCodigoDetalleActualInventoryAdjustment(responses.codigo));

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

export const startAddDetalleActualInventoryAdjustment = (detalle) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar este artículo al Detalle?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {
    
                dispatch(SetAddDetalleInventoryAdjustment(detalle));
                //dispatch(CleanDetalleActualBilling());

            }

        });
    }
}

export const startDeleteDetalleActualInventoryAdjustment = (deleteLinea) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea eliminar este artículo del detalle?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            allowEnterKey: false
        }).then(async (result) => {

            if (result.isConfirmed) {

                dispatch(SetDeleteDetalleInventoryAdjustment(deleteLinea));
                
            }

        });
    }
}

//Consulta
export const SetIsOpenSearchInventoryAdjustment = (value) => ({
    type: types.SetIsOpenSearchInventoryAdjustment,
    payload: value
})
export const SetopenSearchModalInventoryAdjustment = (value) => ({
    type: types.SetopenSearchModalInventoryAdjustment,
    payload: value
})
export const SetsearchInventoryAdjustment = (value) => ({
    type: types.SetsearchInventoryAdjustment,
    payload: value
})
export const SetValorFiltroSearchModalInventoryAdjustment = (value) => ({
    type: types.SetValorFiltroSearchModalInventoryAdjustment,
    payload: value
})
export const SetFacturaSearchModalInventoryAdjustment = (value) => ({
    type: types.SetFacturaSearchModalInventoryAdjustment,
    payload: value
})
export const SetFechasSearchModalInventoryAdjustment = (value) => ({
    type: types.SetFechasSearchModalInventoryAdjustment,
    payload: value
})
export const SetDesdeSearchModalInventoryAdjustment = (value) => ({
    type: types.SetDesdeSearchModalInventoryAdjustment,
    payload: value
})
export const SetHastaSearchModalInventoryAdjustment = (value) => ({
    type: types.SetHastaSearchModalInventoryAdjustment,
    payload: value
})

//Encabezado AjusteInventario
export const SetConsecutivoInventoryAdjustment = (value) => ({
    type: types.SetConsecutivoInventoryAdjustment,
    payload: value
})
export const SetFechaInventoryAdjustment = (value) => ({
    type: types.SetFechaInventoryAdjustment,
    payload: value
})
export const SetAnulaInventoryAdjustment = (value) => ({
    type: types.SetAnulaInventoryAdjustment,
    payload: value
})
export const SetCedulaInventoryAdjustment = (value) => ({
    type: types.SetCedulaInventoryAdjustment,
    payload: value
})
export const SetTotalEntradaInventoryAdjustment = (value) => ({
    type: types.SetTotalEntradaInventoryAdjustment,
    payload: value
})
export const SetTotalSalidaInventoryAdjustment = (value) => ({
    type: types.SetTotalSalidaInventoryAdjustment,
    payload: value
})
export const SetSaldoAjusteInventoryAdjustment = (value) => ({
    type: types.SetSaldoAjusteInventoryAdjustment,
    payload: value
})
export const SetidSucursalInventoryAdjustment = (value) => ({
    type: types.SetidSucursalInventoryAdjustment,
    payload: value
})
export const CleanInventoryAdjustment = (value) => ({
    type: types.CleanInventoryAdjustment,
    payload: value
})

//Detalle AjusteInventario
export const SetCodigoDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetCodigoDetalleActualInventoryAdjustment,
    payload: value
})
export const SetCodArticuloDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetCodArticuloDetalleActualInventoryAdjustment,
    payload: value
})
export const SetDescArticuloDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetDescArticuloDetalleActualInventoryAdjustment,
    payload: value
})
export const SetCantidadDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetCantidadDetalleActualInventoryAdjustment,
    payload: value
})
export const SetEntradaDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetEntradaDetalleActualInventoryAdjustment,
    payload: value
})
export const SetSalidaDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetSalidaDetalleActualInventoryAdjustment,
    payload: value
})
export const SetCostoUnitDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetCostoUnitDetalleActualInventoryAdjustment,
    payload: value
})
export const SetobservacionDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetobservacionDetalleActualInventoryAdjustment,
    payload: value
})
export const SetTotalEntradaDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetTotalEntradaDetalleActualInventoryAdjustment,
    payload: value
})
export const SetTotalSalidaDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetTotalSalidaDetalleActualInventoryAdjustment,
    payload: value
})
export const SetExistenciaDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetExistenciaDetalleActualInventoryAdjustment,
    payload: value
})
export const SetmuerteDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetmuerteDetalleActualInventoryAdjustment,
    payload: value
})
export const SetAddDetalleInventoryAdjustment = (value) => ({
    type: types.SetAddDetalleInventoryAdjustment,
    payload: value
})
export const SetAddDetalleActualInventoryAdjustment = (value) => ({
    type: types.SetAddDetalleActualInventoryAdjustment,
    payload: value
})
export const SetDeleteDetalleInventoryAdjustment = (value) => ({
    type: types.SetDeleteDetalleInventoryAdjustment,
    payload: value
})
