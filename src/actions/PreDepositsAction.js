import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';
import { startValidateClaveInterna } from './login';


// API Actions
export const startSavePreDeposits = (preDeposits) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea Guardar el Pre Depósito?`,
            html: `
              Datos del Cajero
            <br />
            <strong>
             ${preDeposits.cedula} 
             </strong>
             <br />
            <strong>
             ${preDeposits.cajero} 
             </strong>`,
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
                    const { data } = await suvesaApi.post('/Bancos/CrearPreDeposito', preDeposits);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito!',
                            html: `
                            <h4>Pre Depósito Agregado correctamente.</h4>
                            <br />
                              Datos del Cajero
                            <br />
                            <strong>
                             ${preDeposits.cedula} 
                             </strong>
                             <br />
                            <strong>
                             ${preDeposits.cajero} 
                             </strong>`,
                            showConfirmButton: false,
                            timer: 4500
                        });

                        // Se limpia el estado
                        dispatch(CleanPreDeposits());
                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException)

                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
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
                        title: 'Error!',
                        text: 'Usuario no valido',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un problema a la guardar el pre depósito.',
                    });
                }
            }
        });
    };
}

export const startValidateClaveInternaPreDeposits = (password) => {

    return async (dispatch) => {

        try {

            const { status, userName, message } = await dispatch(startValidateClaveInterna(password));

            if (status === 1) {

                // Se activan los inputs
                dispatch(SetDisableInputsPreDeposits(false));

                // Se establece la fecha de hoy
                const date = new Date();
                const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
                dispatch(SetFechaPreDeposits(isoDateTime));

                // Se establece el depositante
                dispatch(SetDepositantePreDeposits(userName));

                // Se cargar los catalogos
                loadCatalogos(dispatch);

                // Se cambia los icons
                dispatch(SetActiveButtonSavePreDeposits(true));
                dispatch(SetActiveButtonSearchPreDeposits(true));

                // Se inicia openingPreDeposito
                dispatch(SetStartOpeningPreDepositoPreDeposits(true));

                // Desactivar los inputs de usuario
                dispatch(SetDisableInputsUserPreDeposits(true));

                // Ocultar la password
                dispatch(SetVisiblePasswordPreDeposits(false));


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

export const startGetAllCajerosPreDeposits = () => {

    return async (dispatch) => {

        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Caja/ObtenerUsuariosCajaAbierta`);

            const { status, responses } = data;

            if (status === 0 && responses != null) {

                dispatch(SetCajerosPreDeposits(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener los cajeros.',
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
                    text: 'Ocurrio un problema al obtener los cajeros.',
                });
            }
        }
    }
}


export const startSearchPreDeposits = (searchPreDeposits) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerPreDepositos`, searchPreDeposits);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {

                // Se ingresa en el estado los valores buscados
                dispatch(SetResultSearchPreDepositos(responses));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al buscar los Pre Depósitos.',
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
                    text: 'Ocurrio un problema al buscar los Pre Depósitos.',
                });
            }
        }
    }
}

export const startGetOnePreDeposits = (idPreDeposits) => {

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
            const { data } = await suvesaApi.post(`/Bancos/ObtenerPreDepositoPorId?id=${idPreDeposits}`);

            const { status, responses } = data;
            Swal.close();

            if (status === 0 && responses != null) {
                console.log(responses)
                // Se ingresa en el estado los valores buscados
                dispatch(SetOneSeletedPreDepositos(responses));

                dispatch(SetIsEditPreDeposits(true));

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener un Pre Depósitos.',
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
                    text: 'Ocurrio un problema al obtener un Pre Depósitos.',
                });
            }
        }
    }
}

export const startEditPreDeposits = (preDeposits) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea Editar el Pre Depósito?`,
            html: `Datos del Cajero
            <br />
            <strong>
             ${preDeposits.cedula} 
             </strong>
             <br />
            <strong>
             ${preDeposits.cajero} 
             </strong>`,
            icon: "question",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Editar',
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
                    const { data } = await suvesaApi.post('/Bancos/ModificarPreDeposito', preDeposits);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito!',
                            html: `
                            <h4>Pre Depósito Editado correctamente.</h4>
                            <br />
                              Datos del Cajero
                            <br />
                            <strong>
                             ${preDeposits.cedula} 
                             </strong>
                             <br />
                            <strong>
                             ${preDeposits.cajero} 
                             </strong>`,
                            showConfirmButton: false,
                            timer: 4500
                        });

                        // Se limpia el estado
                        dispatch(CleanPreDeposits());

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException)

                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Ocurrio un problema al Editar el Pre Depósito.',
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
                        text: 'Ocurrio un problema a la editar el Pre Depósito.',
                    });
                }
            }
        });
    };
}

// export const startGetAllEmpresasPreDeposits = () => {

//     return async ( dispatch ) => {

//         try {

//             //Mostrar el loading
//             Swal.fire({
//                 title: 'Por favor, espere',
//                 allowEscapeKey: false,
//                 allowOutsideClick: false,
//                 showConfirmButton: false,
//                 imageUrl: loadingImage,
//                 customClass: 'alert-class-login',
//                 imageHeight: 100,
//             });

//             //Call end-point 
//             const { data } = await suvesaApi.post(`/Centros/ObtenerEmpresasFacturacion`);
//             const { status, responses } = data;

//             //Quitar el loading
//             Swal.close();

//             if( status === 0 ) {

//                 const empresas = responses.map( empresa => {
//                     return {
//                         id: empresa.id,
//                         nombre: empresa.nombre
//                     }
//                 });

//                 // Se guarda en el estado las empresas
//                 dispatch( SetEmpresasPreDeposits( empresas ) );

//             } else {

//                 //Caso contrario respuesta incorrecto mostrar mensaje de error
//                 const { currentException } = data;
//                 console.log( currentException );

//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Ocurrio un problema al obtener las empresas',
//                 });

//             }

//         } catch (error) {

//             Swal.close();
//             console.log(error);
//             if( error.message === 'Request failed with status code 401') {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Usuario no valido',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Ocurrio un problema al obtener las empresas',
//                 });
//             }
//         }

//     }
// }

// Normal Actions

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

    // Se traen los cajeros
    await dispatch(startGetAllCajerosPreDeposits());

    //Quitar el loading
    Swal.close();

}

export const SetActiveButtonSavePreDeposits = (value) => ({
    type: types.SetActiveButtonSavePreDeposits,
    payload: value
})

export const SetActiveButtonSearchPreDeposits = (value) => ({
    type: types.SetActiveButtonSearchPreDeposits,
    payload: value
})

export const SetActiveButtonRemovePreDeposits = (value) => ({
    type: types.SetActiveButtonRemovePreDeposits,
    payload: value
})

export const SetDisableInputsPreDeposits = (value) => ({
    type: types.SetDisableInputsPreDeposits,
    payload: value
})

export const SetClaveInternaPreDeposits = (value) => ({
    type: types.SetClaveInternaPreDeposits,
    payload: value
})

export const SetVisiblePasswordPreDeposits = (value) => ({
    type: types.SetVisiblePasswordPreDeposits,
    payload: value
})

export const SetDisableInputsUserPreDeposits = (value) => ({
    type: types.SetDisableInputsUserPreDeposits,
    payload: value
})


export const SetIsOpenModalSearchPreDeposits = (value) => ({
    type: types.SetIsOpenModalSearchPreDeposits,
    payload: value
})

export const SetValorFiltroSearchPreDeposits = (value) => ({
    type: types.SetValorFiltroSearchPreDeposits,
    payload: value
})

export const SetNumeroSearchPreDeposits = (value) => ({
    type: types.SetNumeroSearchPreDeposits,
    payload: value
})

export const SetNumeroAperturaSearchPreDeposits = (value) => ({
    type: types.SetNumeroAperturaSearchPreDeposits,
    payload: value
})

export const SetFechasSearchPreDeposits = (value) => ({
    type: types.SetFechasSearchPreDeposits,
    payload: value
})

export const SetFechaDesdeSearchPreDeposits = (value) => ({
    type: types.SetFechaDesdeSearchPreDeposits,
    payload: value
})

export const SetFechaHastaSearchPreDeposits = (value) => ({
    type: types.SetFechaHastaSearchPreDeposits,
    payload: value
})

export const CleanStateSearchPreDeposits = () => ({
    type: types.CleanStateSearchPreDeposits,
    payload: value

})

export const SetResultSearchPreDepositos = (value) => ({
    type: types.SetResultSearchPreDepositos,
    payload: value
})

export const SetOneSeletedPreDepositos = (value) => ({
    type: types.SetOneSeletedPreDepositos,
    payload: value
})

export const SetIsEditPreDeposits = (value) => ({
    type: types.SetIsEditPreDeposits,
    payload: value
})

export const SetCajerosPreDeposits = (value) => ({
    type: types.SetCajerosPreDeposits,
    payload: value
})



export const SetEmpresasPreDeposits = (value) => ({
    type: types.SetEmpresasPreDeposits,
    payload: value
})

export const SetIdPreDeposits = (value) => ({
    type: types.SetIdPreDeposits,
    payload: value
})

export const SetFechaPreDeposits = (value) => ({
    type: types.SetFechaPreDeposits,
    payload: value
})

export const SetCajeroPreDeposits = (value) => ({
    type: types.SetCajeroPreDeposits,
    payload: value
})

export const SetNombreCajeroPreDeposits = (value) => ({
    type: types.SetNombreCajeroPreDeposits,
    payload: value
})

export const SetCedulaPreDeposits = (value) => ({
    type: types.SetCedulaPreDeposits,
    payload: value
})

export const SetDepositantePreDeposits = (value) => ({
    type: types.SetDepositantePreDeposits,
    payload: value
})

export const SetNumAperturaPreDeposits = (value) => ({
    type: types.SetNumAperturaPreDeposits,
    payload: value
})

export const SetMontoPreDeposits = (value) => ({
    type: types.SetMontoPreDeposits,
    payload: value
})

export const SetObservacionesPreDeposits = (value) => ({
    type: types.SetObservacionesPreDeposits,
    payload: value
})

export const CleanPreDeposits = () => ({
    type: types.CleanPreDeposits
})

export const SetStartOpeningPreDepositoPreDeposits = (value) => ({
    type: types.SetStartOpeningPreDepositoPreDeposits,
    payload: value
})