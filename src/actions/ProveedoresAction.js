import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllProveedores = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/proveedor/ObtenerProveedoresInventario');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los tipos en el estado
                dispatch( GetAllProveedoresInventory(responses) );
                
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
            if( error.message === 'Request failed with status code 401') {
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

export const startGetAllProveedoresSearch = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/proveedor/ObtenerProveedoresInventario');
            const { status, responses } = data;
            
            if( status === 0 ) {

                const proveedores = responses.map( proveedor => {
                    return {
                        codigo: proveedor.codigo,
                        descripcion: proveedor.descripcion
                    }
                });
                
                // Establece los tipos en el estado
                dispatch( SetGetAllSearchProveedores( proveedores ) );

                dispatch( SetSearchProveedoresOriginalProveedores( proveedores ) );
                
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
            if( error.message === 'Request failed with status code 401') {
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

export const startCreateProveedores = ( proveedor ) => {

    return async ( dispatch ) => {
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
                    const { data } = await suvesaApi.post('/proveedor/CreateProveedor', proveedor );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if( status === 0) {

                        //Clean State
                        dispatch( CleanStateProveedores());

                        dispatch( SetIsProveedorDisableProveedores(false));
                        dispatch( SetIsProveedorEditProveedores(false));

                        dispatch( SetDefautlButtonsProveedores() );

                        dispatch( SetDisableInputsProveedores(true));

                        dispatch( SetHasDataProveedores( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Proveedor ingresado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        //Call new proveedores
                        await dispatch( startGetAllProveedoresSearch() );

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
                        text: 'Ocurrio un problema al ingresar un nuevo proveedor',
                    });
                }
            }
                
        });
        
    }
}

export const startGetOneProveedor = ( codigo ) => {

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
            const resp = await suvesaApi.post(`/proveedor/ObtenerProveedor?codigo=${ codigo }`);
            const { status, responses } = resp.data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                //seleccionarlo y meterlo al estado en el metodo de action
                dispatch( SelectedSearchProveedores( responses ) );

                const { cuentasBancariasProveedors } = responses;

                if(cuentasBancariasProveedors !== null) {
                    dispatch( SelectedSearchCuentasBancariasProveedores( cuentasBancariasProveedors ) );
                }

                dispatch( SetHasDataProveedores( true ) );

                if( responses.inhabilitado ) {
                    // Cambiar a proveedor disable
                    dispatch( SetIsProveedorDisableProveedores( true ) );

                    dispatch( SetActiveButtonSearchProveedores(true));
                    dispatch( SetActiveButtonSaveProveedores(false));

                    dispatch( SetDisableInputsProveedores(true));
                } else {                    
                    //Cambiar a proveedor editado
                    dispatch( SetIsProveedorEditProveedores( true ) );
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
                    text: 'Ocurrio un problema al obtener un proveedor',
                });
            }
        }
    }
}

export const startEditProveedores = ( codigo, proveedor ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar proveedor codigo ${ codigo } ?`,
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
                    const { data } = await suvesaApi.post(`/proveedor/EditarProveedoresNuevo?codigo=${ codigo }`, proveedor );
                    const { status } = data;
                    console.log(data);

                    //Quitar el loading
                    Swal.close();

                    if( status === 0) {

                        //Clean State
                        dispatch( CleanStateProveedores());

                        dispatch( SetIsProveedorDisableProveedores(false));
                        dispatch( SetIsProveedorEditProveedores(false));

                        dispatch( SetDefautlButtonsProveedores() );

                        dispatch( SetDisableInputsProveedores(false));

                        dispatch( SetHasDataProveedores( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Proveedor editado correctamente',
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
                        text: 'Ocurrio un problema al editar un proveedor',
                    });
                }
            }
                
        });
        
    }
}

export const startActiveDisablesProveedores = ( codigo, estado, tipo ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea ${ (tipo === 1 ? 'Deshabilitar' : 'Activar') } proveedor codigo ${ codigo } ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: (tipo === 1 ? 'Deshabilitar' : 'Activar'),
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            console.log(estado)
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
                    const { data } = await suvesaApi.post(`/proveedor/HabilitarInhabilitarProveedor?codigo=${ codigo }&estado=${ estado }`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if( status === 0) {

                        if( tipo === 1 ) {
                            //Clean State
                            dispatch( CleanStateProveedores());

                            dispatch( SetIsProveedorDisableProveedores(false));
                            dispatch( SetIsProveedorEditProveedores(false));

                            dispatch( SetDefautlButtonsProveedores() );

                            dispatch( SetDisableInputsProveedores(false));

                            dispatch( SetHasDataProveedores( false ) );
                        } else {
                            dispatch( SetIsProveedorDisableProveedores(false));

                            dispatch( SetIsProveedorEditProveedores(true));

                            dispatch( SetDisableInputsProveedores(false));

                            dispatch( SetHasDataProveedores( true ) );

                            dispatch( SetActiveButtonSaveProveedores(true));

                            dispatch( SetActiveButtonSearchProveedores(true));
                        }
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        if( tipo === 1 ){
                            Swal.fire({
                                icon: 'success',
                                title: 'Proveedor Deshabilitado correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Proveedor Activado correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });
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
                        text: `Ocurrio un problema al ${ (tipo === 1 ? 'Deshabilitar' : 'Activar') } un proveedor`,
                    });
                }
            }
                
        });
        
    }
}

export const startDeleteCuentaBancariaProveedores = ( cuenta ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar la cuenta ${ cuenta.cuenta } ?`,
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
                    const { data } = await suvesaApi.post(`/proveedor/EliminarCuentaProveedore?codigo=${ cuenta.idCuenta }`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    if( status === 0) {

                        dispatch( SetDeleteCuentasBancariasActualProveedores( cuenta ) );

                        Swal.fire({
                            icon: 'success',
                            title: 'Cuenta eliminada correctamente',
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
                        text: `Ocurrio un problema al ${ (tipo === 1 ? 'Deshabilitar' : 'Activar') } un proveedor`,
                    });
                }
            }
                
        });
        
    }
}

export const startSearchProveedorHacienda = ( cedula ) => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando proveedor',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            //Call end-point 
            const { data } = await suvesaApi.post('/cliente/BuscarClienteHacienda', { cedula });
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                const { nombre } = responses;
                
                dispatch( SetNombreProveedores(nombre) );

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
                    text: 'Ocurrio un problema al buscar proveedor en Hacienda.',
                });
            }
        }

    }
}

//Normal Actions
export const GetAllProveedoresInventory = ( value ) => ({
    type: types.GetAllProveedoresInventory,
    payload: value
});

export const SetIdentificacionProveedores = ( value ) => ({
    type: types.SetIdentificacionProveedores,
    payload: value
});

export const SetCedulaProveedores = ( value ) => ({
    type: types.SetCedulaProveedores,
    payload: value
});

export const SetNombreProveedores = ( value ) => ({
    type: types.SetNombreProveedores,
    payload: value
});

export const SetContactoProveedores = ( value ) => ({
    type: types.SetContactoProveedores,
    payload: value
});

export const SetTelefonoContProveedores = ( value ) => ({
    type: types.SetTelefonoContProveedores,
    payload: value
});

export const SetObservacionesProveedores = ( value ) => ({
    type: types.SetObservacionesProveedores,
    payload: value
});

export const SetTelefono1Proveedores = ( value ) => ({
    type: types.SetTelefono1Proveedores,
    payload: value
});

export const SetFax1Proveedores = ( value ) => ({
    type: types.SetFax1Proveedores,
    payload: value
});

export const SetEmailProveedores = ( value ) => ({
    type: types.SetEmailProveedores,
    payload: value
});

export const SetDireccionProveedores = ( value ) => ({
    type: types.SetDireccionProveedores,
    payload: value
});

export const SetCuentaContableProveedores = ( value ) => ({
    type: types.SetCuentaContableProveedores,
    payload: value
});

export const SetDescripcionCuentaContableProveedores = ( value ) => ({
    type: types.SetDescripcionCuentaContableProveedores,
    payload: value
});

export const SetActualizadoProveedores = ( value ) => ({
    type: types.SetActualizadoProveedores,
    payload: value
});

export const SetInhabilitadoProveedores = ( value ) => ({
    type: types.SetInhabilitadoProveedores,
    payload: value
});

export const SetActiveButtonNewProveedores = ( value ) => ({
    type: types.SetActiveButtonNewProveedores,
    payload: value
});

export const SetActiveButtonSearchProveedores = ( value ) => ({
    type: types.SetActiveButtonSearchProveedores,
    payload: value
});

export const SetActiveButtonSaveProveedores = ( value ) => ({
    type: types.SetActiveButtonSaveProveedores,
    payload: value
});

export const SetActiveButtonRemoveProveedores = ( value ) => ({
    type: types.SetActiveButtonRemoveProveedores,
    payload: value
});

export const SetDisableInputsProveedores = ( value ) => ({
    type: types.SetDisableInputsProveedores,
    payload: value
});

export const SetIsProveedorEditProveedores = ( value ) => ({
    type: types.SetIsProveedorEditProveedores,
    payload: value
});

export const SetIsProveedorDisableProveedores = ( value ) => ({
    type: types.SetIsProveedorDisableProveedores,
    payload: value
});

export const CleanStateProveedores = () => ({
    type: types.CleanStateProveedores
});

export const SetDefautlButtonsProveedores = () => ({
    type: types.SetDefautlButtonsProveedores
});

export const OpenSearchModalProveedores = ( value ) => ({
    type: types.OpenSearchModalProveedores,
    payload: value
});

export const SelectedSearchProveedores = ( value ) => ({
    type: types.SelectedSearchProveedores,
    payload: value
});

export const SelectedSearchCuentasBancariasProveedores = ( value ) => ({
    type: types.SelectedSearchCuentasBancariasProveedores,
    payload: value
});

export const SetGetAllSearchProveedores = ( value ) => ({
    type: types.SetGetAllSearchProveedores,
    payload: value
});

export const SetHasDataProveedores = ( value ) => ({
    type: types.SetHasDataProveedores,
    payload: value
});

export const SetTipocuentasBancariasActualesProveedores = ( value ) => ({
    type: types.SetTipocuentasBancariasActualesProveedores,
    payload: value
});

export const SetBancocuentasBancariasActualesProveedores = ( value ) => ({
    type: types.SetBancocuentasBancariasActualesProveedores,
    payload: value
});

export const SetCuentacuentasBancariasActualesProveedores = ( value ) => ({
    type: types.SetCuentacuentasBancariasActualesProveedores,
    payload: value
});

export const SetMonedacuentasBancariasActualesProveedores = ( value ) => ({
    type: types.SetMonedacuentasBancariasActualesProveedores,
    payload: value
});

export const SetCod_monedacuentasBancariasActualesProveedores = ( value ) => ({
    type: types.SetCod_monedacuentasBancariasActualesProveedores,
    payload: value
});

export const SetAddCuentasBancariasProveedores = ( value ) => ({
    type: types.SetAddCuentasBancariasProveedores,
    payload: value
});

export const CleanCuentasBancariasActualProveedores = ( value ) => ({
    type: types.CleanCuentasBancariasActualProveedores,
    payload: value
});

export const SetSelectedCuentasBancariasActualProveedores = ( value ) => ({
    type: types.SetSelectedCuentasBancariasActualProveedores,
    payload: value
});

export const SetIsEditCuentasBancariasActualProveedores = ( value ) => ({
    type: types.SetIsEditCuentasBancariasActualProveedores,
    payload: value
});

export const SetEditCuentasBancariasActualProveedores = ( value ) => ({
    type: types.SetEditCuentasBancariasActualProveedores,
    payload: value
});

export const SetIndexCuentasBancariasActualProveedores = ( value ) => ({
    type: types.SetIndexCuentasBancariasActualProveedores,
    payload: value
});

export const SetDeleteCuentasBancariasActualProveedores = ( value ) => ({
    type: types.SetDeleteCuentasBancariasActualProveedores,
    payload: value
});

export const SetIsOpenModalSearchProveedores = ( value ) => ({
    type: types.SetIsOpenModalSearchProveedores,
    payload: value
});

export const SetValorFilterSearchProveedores = ( value ) => ({
    type: types.SetValorFilterSearchProveedores,
    payload: value
});

export const SetDefaultStateSearchProveedores = () => ({
    type: types.SetDefaultStateSearchProveedores
});

export const SetSearchProveedoresOriginalProveedores = ( value ) => ({
    type: types.SetSearchProveedoresOriginalProveedores,
    payload: value
});