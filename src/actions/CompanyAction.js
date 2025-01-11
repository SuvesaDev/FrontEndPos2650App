import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startSaveCompany = ( company ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar la empresa ${company.identificacion}?`,
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
                    const { data } = await suvesaApi.post('Emisor/crearEmpresa', company);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Empresa ${company.identificacion} agregada correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        dispatch( SetCleanCompany() );

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
                        text: 'Ocurrio un problema a la guardar la empresa',
                    });
                }
            }
        });
    };
}

export const startGetAllActividadesEmpresasHacienda = ( identificacion ) => {

    return async ( dispatch ) => {

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
            const { data } = await suvesaApi.get(`/Hacienda/Empresa/obtenerDatosActividades?dato=${identificacion}`);
            
            const { status, responses } = data;
            Swal.close();
    
            if( status === 0 ) {

                // Se registra la cedula buscada
                // dispatch( SetIdentificacionBuscadaCompany( identificacion ) );

                // Se desactiva el button de buscar actividades empresa
                dispatch( SetDisableBtnSearchAcitividadesEmpresaCompany( true ) );

                // Se desactiva el input de identificacion
                dispatch( SetDisableInputIdentificacionCompany( true ) );

                // Se ingresan al estado las actividades
                dispatch( SetInsertActividadesEmpresaCompany( responses ) );
                
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
                    text: 'Ocurrio un problema al obtener las actividades de empresa',
                });
            }
        }
    }
}

export const startGetAllCantonesCompany = ( idProvincia ) => {

    return async ( dispatch ) => {

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
            const { data } = await suvesaApi.post(`/Geografia/getCanton?provincia=${idProvincia}`);
            
            const { status, responses } = data;
            Swal.close();
    
            if( status === 0 ) {
                // Se ingresan al estado los cantones
                dispatch( SetInsertCantonesCompany( responses ) );
                
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
                    text: 'Ocurrio un problema al obtener los cantones',
                });
            }
        }
    }
}

export const startGetAllDistritosCompany = ( idCanton ) => {

    return async ( dispatch ) => {

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
            const { data } = await suvesaApi.post(`/Geografia/getDistrito?canton=${idCanton}`);
            
            const { status, responses } = data;
            Swal.close();
    
            if( status === 0 ) {
                // Se ingresan al estado los distritos
                dispatch( SetInsertDistritoCompany( responses ) );
                
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
                    text: 'Ocurrio un problema al obtener los cantones',
                });
            }
        }
    }
}

export const startGetAllBancosCompany = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Se guarda en el estado los bancos
                dispatch( SetBancosCompany( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los bancos',
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
                    text: 'Ocurrio un problema al obtener los bancos',
                });
            }
        }
        
    }
}

export const startGetAllMonedasCompany = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/moneda/ObtenerMonedasInventario`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const monedas = responses.map( moneda => {
                    return {
                        codMoneda: moneda.codMoneda,
                        monedaNombre: moneda.monedaNombre
                    }
                });

                // Se guarda en el estado los bancos
                dispatch( SetMonedasCompany( monedas ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log( currentException );
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las monedas',
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
                    text: 'Ocurrio un problema al obtener las monedas',
                });
            }
        }
        
    }
}

// Normal Actions
export const SetSelectedTabCompany = (value) => ({
    type: types.SetSelectedTabCompany,
    payload: value
})

export const SetNameFileUploadCompany = (value) => ({
    type: types.SetNameFileUploadCompany,
    payload: value
})

export const SetTipoIdentificacionCompany = (value) => ({
    type: types.SetTipoIdentificacionCompany,
    payload: value
})

export const SetIdentificacionCompany = (value) => ({
    type: types.SetIdentificacionCompany,
    payload: value
})

export const SetNombreCompany = (value) => ({
    type: types.SetNombreCompany,
    payload: value
})

export const SetCorreoCompany = (value) => ({
    type: types.SetCorreoCompany,
    payload: value
})

export const SetTelefonoCompany = (value) => ({
    type: types.SetTelefonoCompany,
    payload: value
})

export const SetSucursalCompany = (value) => ({
    type: types.SetSucursalCompany,
    payload: value
})

export const SetProvinciaCompany = (value) => ({
    type: types.SetProvinciaCompany,
    payload: value
})

export const SetCantonCompany = (value) => ({
    type: types.SetCantonCompany,
    payload: value
})

export const SetDistritoCompany = (value) => ({
    type: types.SetDistritoCompany,
    payload: value
})

export const SetOtrasSeñasCompany = (value) => ({
    type: types.SetOtrasSeñasCompany,
    payload: value
})

export const SetUsuarioCompany = (value) => ({
    type: types.SetUsuarioCompany,
    payload: value
})

export const SetClaveCompany = (value) => ({
    type: types.SetClaveCompany,
    payload: value
})

export const SetCertificadoCompany = (value) => ({
    type: types.SetCertificadoCompany,
    payload: value
})

export const SetNumeroResolucionCompany = (value) => ({
    type: types.SetNumeroResolucionCompany,
    payload: value
})

export const SetFechaResolucionCompany = (value) => ({
    type: types.SetFechaResolucionCompany,
    payload: value
})

export const SetVenceCertificadoCompany = (value) => ({
    type: types.SetVenceCertificadoCompany,
    payload: value
})

export const SetContrasenaCertificadoCompany = (value) => ({
    type: types.SetContrasenaCertificadoCompany,
    payload: value
})

export const SetInsertCantonesCompany = (value) => ({
    type: types.SetInsertCantonesCompany,
    payload: value
})

export const SetInsertDistritoCompany = (value) => ({
    type: types.SetInsertDistritoCompany,
    payload: value
})

export const SetDisableInputCantonesCompany = (value) => ({
    type: types.SetDisableInputCantonesCompany,
    payload: value
})

export const SetDisableInputDistritoCompany = (value) => ({
    type: types.SetDisableInputDistritoCompany,
    payload: value
})

export const SetInsertActividadesEmpresaCompany = (value) => ({
    type: types.SetInsertActividadesEmpresaCompany,
    payload: value
})

export const SetIdentificacionBuscadaCompany = (value) => ({
    type: types.SetIdentificacionBuscadaCompany,
    payload: value
})

export const SetDisableBtnSearchAcitividadesEmpresaCompany = (value) => ({
    type: types.SetDisableBtnSearchAcitividadesEmpresaCompany,
    payload: value
})

export const SetDisableInputIdentificacionCompany = (value) => ({
    type: types.SetDisableInputIdentificacionCompany,
    payload: value
})

export const SetActiveButtonNewCompany = (value) => ({
    type: types.SetActiveButtonNewCompany,
    payload: value
})

export const SetActiveButtonSaveCompany = (value) => ({
    type: types.SetActiveButtonSaveCompany,
    payload: value
})

export const SetActiveButtonSearchCompany = (value) => ({
    type: types.SetActiveButtonSearchCompany,
    payload: value
})

export const SetActiveButtonRemoveCompany = (value) => ({
    type: types.SetActiveButtonRemoveCompany,
    payload: value
})

export const SetDisableInputsCompany = (value) => ({
    type: types.SetDisableInputsCompany,
    payload: value
})

export const SetStartOpeningCompany = (value) => ({
    type: types.SetStartOpeningCompany,
    payload: value
})

export const SetVisablePasswordHaciendaCompany = (value) => ({
    type: types.SetVisablePasswordHaciendaCompany,
    payload: value
})

export const SetCleanCompany = (value) => ({
    type: types.SetCleanCompany,
    payload: value
})

export const SetBancosCompany = (value) => ({
    type: types.SetBancosCompany,
    payload: value
})

export const SetMonedasCompany = (value) => ({
    type: types.SetMonedasCompany,
    payload: value
})

export const SetNumeroCuentaBancariaActualCompany = (value) => ({
    type: types.SetNumeroCuentaBancariaActualCompany,
    payload: value
})

export const SetIdBancoCuentaBancariaActualCompany = (value) => ({
    type: types.SetIdBancoCuentaBancariaActualCompany,
    payload: value
})

export const SetIdMonedaCuentaBancariaActualCompany = (value) => ({
    type: types.SetIdMonedaCuentaBancariaActualCompany,
    payload: value
})

export const SetNameBancoCuentaBancariaActualCompany = (value) => ({
    type: types.SetNameBancoCuentaBancariaActualCompany,
    payload: value
})

export const SetNameMonedaCuentaBancariaActualCompany = (value) => ({
    type: types.SetNameMonedaCuentaBancariaActualCompany,
    payload: value
})

export const SetAddCuentaBancariaCompany = (value) => ({
    type: types.SetAddCuentaBancariaCompany,
    payload: value
})

export const CleanCuentaBancariaActualCompany = () => ({
    type: types.CleanCuentaBancariaActualCompany
})

export const SetIsCuentaBancariaEditCompany = (value) => ({
    type: types.SetIsCuentaBancariaEditCompany,
    payload: value
})

export const SetIndexCuentaBancariaSeletedCompany = (value) => ({
    type: types.SetIndexCuentaBancariaSeletedCompany,
    payload: value
})

export const SetEditCuentaBancariaCompany = (value) => ({
    type: types.SetEditCuentaBancariaCompany,
    payload: value
})

export const SetRemoveCuentaBancariaCompany = (value) => ({
    type: types.SetRemoveCuentaBancariaCompany,
    payload: value
})