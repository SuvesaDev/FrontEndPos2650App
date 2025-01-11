import Swal from 'sweetalert2';
import { suvesaApi } from '../api';
import { types } from "../types/types";
import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';
import { useSelector } from 'react-redux';

export const startGetAllProveedoresWihoutPay = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/proveedor/ObtenerProveedores');
            const { status, responses } = data;

            if (status === 0) {
                // Establece los tipos en el estado
                dispatch(SetProveedoresWihoutPay(responses));

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
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Obtener los proveedores Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los proveedores',
                });
            }
        }

    }
}

export const startGetDatosSucursalActual = (idSucursalOF) => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerSucursalId?id=${idSucursalOF}`);
            const { status, responses } = data;

            if (status === 0) {
                // Establece los tipos en el estado
                dispatch(SetDatosSucursalWihoutPay(responses));

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

export const startValidateClaveInternaWihoutPay = (password) => {

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
                dispatch(SetDisableInputsWihoutPay(false));

                // Ocultar la password
                dispatch(SetVisiblePasswordWihoutPay(false));

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserWihoutPay(true));

                // Se establece el nameUser
                dispatch(SetNameUserWihoutPay(userName));

                // Se establece el idUsuario
                dispatch(SetIdUsuarioWihoutPay(idUsuario));

                // Se inserta el numApertura
                dispatch(SetNumAperturaWihoutPay(userResult.idApertura));

                // Se inserta el numCaja
                dispatch(SetNumCajaWihoutPay(userResult.numCaja));

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

    await dispatch(startGetAllProveedoresWihoutPay());

    Swal.close();

}

export const SetDisableInputsWihoutPay = (value) => ({
    type: types.SetDisableInputsWihoutPay,
    payload: value
});

export const SetClaveInternaWihoutPay = (value) => ({
    type: types.SetClaveInternaWihoutPay,
    payload: value
});

export const SetVisiblePasswordWihoutPay = (value) => ({
    type: types.SetVisiblePasswordWihoutPay,
    payload: value
});

export const SetDisableInputsUserWihoutPay = (value) => ({
    type: types.SetDisableInputsUserWihoutPay,
    payload: value
});

export const SetNameUserWihoutPay = (value) => ({
    type: types.SetNameUserWihoutPay,
    payload: value
});

export const SetIdUsuarioWihoutPay = (value) => ({
    type: types.SetIdUsuarioWihoutPay,
    payload: value
});

export const SetNumAperturaWihoutPay = (value) => ({
    type: types.SetNumAperturaWihoutPay,
    payload: value
});

export const SetNumCajaWihoutPay = (value) => ({
    type: types.SetNumCajaWihoutPay,
    payload: value
});

export const SetProveedoresWihoutPay = (value) => ({
    type: types.SetProveedoresWihoutPay,
    payload: value
});

export const SetCedulaProveedorWihoutPay = (value) => ({
    type: types.SetCedulaProveedorWihoutPay,
    payload: value
});

export const SetNombreProveedorWihoutPay = (value) => ({
    type: types.SetNombreProveedorWihoutPay,
    payload: value
});

export const SetFechaDesdeWihoutPay = (value) => ({
    type: types.SetFechaDesdeWihoutPay,
    payload: value
});

export const SetFechaHastaWihoutPay = (value) => ({
    type: types.SetFechaHastaWihoutPay,
    payload: value
});

export const SetDatosReporteWihoutPay = (value) => ({
    type: types.SetDatosReporteWihoutPay,
    payload: value
});

export const SetProveedoresDefaultWihoutPay = (value) => ({
    type: types.SetProveedoresDefaultWihoutPay,
    payload: value
});


export const SetCodigoProveedorWihoutPay = (value) => ({
    type: types.SetCodigoProveedorWihoutPay,
    payload: value
});

export const SetTelefonoProveedorWihoutPay = (value) => ({
    type: types.SetTelefonoProveedorWihoutPay,
    payload: value
});

export const SetDireccionProveedorWihoutPay = (value) => ({
    type: types.SetDireccionProveedorWihoutPay,
    payload: value
});

export const SetPlazoDiasProveedorWihoutPay = (value) => ({
    type: types.SetPlazoDiasProveedorWihoutPay,
    payload: value
});

export const SetFechaReporteWihoutPay = (value) => ({
    type: types.SetFechaReporteWihoutPay,
    payload: value
});

export const SetDatosSucursalWihoutPay = (value) => ({
    type: types.SetDatosSucursalWihoutPay,
    payload: value
});



export const SetCleanWihoutPay = () => ({
    type: types.SetCleanWihoutPay
})


