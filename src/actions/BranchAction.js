import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startSaveBranch = ( branch ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar la surcursal ${branch.nombreComercial}?`,
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
                    const { data } = await suvesaApi.post('/Centros/crearSucursal', branch);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Surcursal ${branch.nombreComercial} agregada correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( SetCleanBranch() );

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
                        text: 'Ocurrio un problema a la guardar la surcursal',
                    });
                }
            }
        });
    };
}

// Normal Actions
export const SetNombreComercialBranch = (value) => ({
    type: types.SetNombreComercialBranch,
    payload: value
})

export const SetNombreFiscalBranch = (value) => ({
    type: types.SetNombreFiscalBranch,
    payload: value
})

export const SetTipoDocumentoBranch = (value) => ({
    type: types.SetTipoDocumentoBranch,
    payload: value
})

export const SetNumeroDocumentoBranch = (value) => ({
    type: types.SetNumeroDocumentoBranch,
    payload: value
})

export const SetAliasBranch = (value) => ({
    type: types.SetAliasBranch,
    payload: value
})

export const SetTelefonoBranch = (value) => ({
    type: types.SetTelefonoBranch,
    payload: value
})

export const SetEmailBranch = (value) => ({
    type: types.SetEmailBranch,
    payload: value
})

export const SetActiveButtonNewBranch = (value) => ({
    type: types.SetActiveButtonNewBranch,
    payload: value
})

export const SetActiveButtonSaveBranch = (value) => ({
    type: types.SetActiveButtonSaveBranch,
    payload: value
})

export const SetActiveButtonSearchBranch = (value) => ({
    type: types.SetActiveButtonSearchBranch,
    payload: value
})

export const SetActiveButtonRemoveBranch = (value) => ({
    type: types.SetActiveButtonRemoveBranch,
    payload: value
})

export const SetDisableInputsBranch = (value) => ({
    type: types.SetDisableInputsBranch,
    payload: value
})

export const SetStartOpeningBranch = (value) => ({
    type: types.SetStartOpeningBranch,
    payload: value
})

export const SetCleanBranch = (value) => ({
    type: types.SetCleanBranch,
    payload: value
})