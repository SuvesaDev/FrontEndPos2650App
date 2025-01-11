import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';
import { 
    CleanStateCartaExoneracion,
    startEditCartaExoneracion, 
    startRemoveCartaExoneracion, 
    startSaveCartaExoneracion 
} from './CartaExoneracionAction';

//Action with call API
export const startSaveCustomer = ( customer, carta ) => {

    return async ( dispatch ) => {
        
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar un nuevo cliente?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            
            try {
                var resultCarta = null;

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
                    // console.log(customer.toJson());

                    //Call end-point 
                    const { data } = await suvesaApi.post('/cliente', customer.toJson() );
                    const { status } = data;
                    
                    if( status === 0) {

                        //Clean State Customers
                        dispatch( CleanStateCustomers() );

                        // Clean State Carta Exoneracion
                        dispatch( CleanStateCartaExoneracion());

                        //Save CartaExoneracion
                        if( carta.cedula != undefined || carta.motivo != undefined 
                            || carta.numeroDocumento != undefined || carta.fechaEmision != undefined 
                            || carta.fechaVence != undefined || carta.porcentajeCompra != 0 
                            || carta.impuesto != 0 || carta.nota != undefined ) {

                            resultCarta = await dispatch( startSaveCartaExoneracion( carta ));
                        }

                        //Quitar el loading
                        Swal.close();
                    
                        if(resultCarta === 'ok' ) {
                        
                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente ingresado correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            })
                            
                        } else {

                            //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                            Swal.fire({
                                icon: 'warning',
                                title: 'Cliente ingresado sin carta de exoneracion',
                                showConfirmButton: true,
                            })
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
                        text: 'Ocurrio un problema al ingresar un nuevo cliente',
                    });
                }
            }
                
        });
        
    }
}

export const startSearchCustomerHacienda = (cedula) => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando cliente',
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

                const { nombre, idTipoIdentificacion } = responses;
                
                dispatch( SetNombreCustomers(nombre) );
                dispatch( SetTipoClienteCustomers(idTipoIdentificacion) );

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
                    text: 'Ocurrio un problema al buscar un cliente',
                });
            }
        }

    }
}

export const startCustomerExist = ( cedula ) => {

    return async ( dispatch ) => {

        try {

            var resp;

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
            resp = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula' : cedula });
            
            const { status } = resp.data;
            console.log(resp.data)
            Swal.close();
    
            if( status === 0 ) {
                return false;
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = resp.data;
    
                if( currentException === 'No se encontraron Clientes.' ) {
                    return true;
                }

                console.log(currentException);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar clientes',
                });

                return null
    
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
                    text: 'Ocurrio un problema al buscar clientes',
                });
            }
            return null
        }
    }
}

export const startSearchCustomer = ( value1, value2, tipo ) => {

    return async ( dispatch ) => {

        try {

            var resp;

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
            if( tipo === 'cedula' ) {
                resp = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula' : value1 });
            } else if( tipo === 'nombre' ) {
                resp = await suvesaApi.post('/cliente/BuscarNombre', { 'nombre' : value1 });
            } else if (tipo === 'filtro') {
                resp = await suvesaApi.post('/cliente/Buscar', { 'cedula' : value1, 'nombre' : value2});
            }
            
            const { status, responses } = resp.data;
            Swal.close();
    
            if( status === 0 ) {
                dispatch(SetSearchCustomers( responses ));
            } else {
    
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                console.log(currentException);
                
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
                    text: 'Ocurrio un problema al buscar clientes',
                });
            }
        }
    }
}

export const startEditCustomer = ( customer, hasCarta, carta) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el cliente con la cedúla ${ customer.cedula } ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {
                var resultCarta = null;
                var insertedCarta = true;

                if( result.isConfirmed ) {
                    
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
                    console.log(customer);
                    //Call end-point 
                    const { data } = await suvesaApi.post('/cliente/Actualizar', customer.toJson() );
                    const { status } = data;
    
                    if( status === 0 ) {

                        // if( carta.motivo != undefined || carta.numeroDocumento != undefined || carta.fechaEmision != undefined 
                        //     || carta.fechaVence != undefined || carta.porcentajeCompra != undefined 
                        //     || carta.impuesto != undefined || carta.nota != undefined ) {

                        //     resultCarta = await dispatch( startSaveCartaExoneracion( carta ));
                        // } else {
                        //     insertedCarta = false;
                        // }

                        if( hasCarta === true ) {

                            //TODO: Edit Carta
                            if( carta.motivo != undefined || carta.numeroDocumento != undefined || carta.fechaEmision != undefined 
                                || carta.fechaVence != undefined || carta.porcentajeCompra != undefined
                                || carta.impuesto != undefined || carta.nota != undefined ) {
    
                                resultCarta = await dispatch( startEditCartaExoneracion( carta ) );
                            }  

                        } else if( hasCarta === false ) {

                            //TODO: Save a new carta if has data
                            if( carta.motivo != undefined || carta.numeroDocumento != undefined || carta.fechaEmision != undefined 
                                || carta.fechaVence != undefined || carta.porcentajeCompra != undefined
                                || carta.impuesto != undefined || carta.nota != undefined ) {
    
                                resultCarta = await dispatch( startSaveCartaExoneracion( carta ));
                            }  

                        } 

                        //Quitar el loading
                        Swal.close();

                        // dispatch( IsCustomerEditCustomers( false ));
                        // dispatch( IsCustomerDisable( false ));
                        // dispatch( SetDefautlButtonsCustomers() );
                        // dispatch( DisableInputsCustomers( true ) );

                        // Clean State Customers
                        dispatch( CleanStateCustomers() );

                        // Clean State Carta Exoneracion
                        dispatch( CleanStateCartaExoneracion());
                        
                        if( resultCarta === 'ok' && hasCarta ) {

                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente y Carta Exoneración editados correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            
                        } else {

                            if ( resultCarta === 'ok' && hasCarta === false) {
                                
                                //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cliente editado y Carta Exoneración creado correctamente',
                                    showConfirmButton: false,
                                    timer: 2500
                                })
                            } else if( hasCarta === null || resultCarta != 'ok') {

                                //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cliente editado correctamente',
                                    showConfirmButton: false,
                                    timer: 2500
                                })

                            } 
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
                        text: 'Ocurrio un problema al editar cliente'
                    });
                }

            }

        });
    }
}

export const startDeleteCustomer = ( cedula, nombre, usuario, tipo) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: (tipo === 'disable') 
                    ? `¿Desea desactivar Cliente y Carta Exoneracion con la cédula ${cedula} ?`
                    : `¿Desea activar Cliente y la Carta Exoneracion con la cédula ${cedula} ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: (tipo === 'disable') ? 'Desactivar' : 'Activar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {
                
                if( result.isConfirmed ) {
                    
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
                    const { data } = await suvesaApi.post( (tipo === 'disable') ? '/cliente/Desactivar' : '/cliente/Activar', { 
                        'cedula' : cedula, 
                        'nombre' : nombre,
                        'idUsuarioModificacion' : usuario
                    });

                    const { status } = data;
                    Swal.close();

                    if( status === 0 ) {

                        //Dispatch la action para desactivar / activar la carta exoneracion
                        const respCarta = await dispatch( startRemoveCartaExoneracion( cedula, tipo ) );

                        dispatch( IsCustomerEditCustomers( false ));
                        dispatch( IsCustomerDisable( false ));
                        dispatch( SetDefautlButtonsCustomers() );
                        dispatch( DisableInputsCustomers( true ) );
                        dispatch( CleanStateCustomers() );

                        if(respCarta === 'ok' || respCarta === 'No aplica') {

                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: (tipo === 'disable') ? 'Cliente y Carta Exoneración desactivados correctamente' : 'Cliente y Carta Exoneración activados correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            
                        } else {

                            //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                            Swal.fire({
                                icon: 'warning',
                                title: (tipo === 'disable') ? 'Cliente desactivado sin Carta Exoneración' : 'Cliente activado sin Carta Exoneración',
                                showConfirmButton: true,
                            })
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
                        text: (tipo === 'disable') ? 'Ocurrio un problema al desactivar clientes' : 'Ocurrio un problema al activar clientes',
                    });
                }

            }

        });
    }
}

// export const startGetAllProvincias = () => {

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
//             const { data } = await suvesaApi.post('/Geografia/getProvincias');
            
//             const { status, responses } = data;
//             Swal.close();
    
//             if( status === 0 ) {
//                 // Se ingresan al estado las provincias
//                 dispatch( SetProvinciasCustomers( responses ) );
                
//             } else {
    
//                 //Caso contrario respuesta incorrecto mostrar mensaje de error
//                 const { currentException } = data;
//                 const msj = currentException.split(',');
                
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: (currentException.includes(',')) ? msj[3] : currentException,
//                 });
    
//             }

//         } catch (error) {
            
//             Swal.close();
//             console.log(error);
//             if( error.message === 'Request failed with status code 401') {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Usuario no valido',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Ocurrio un problema al obtener las provincias',
//                 });
//             }
//         }
//     }
// }

export const startGetAllCantones = ( idProvincia ) => {

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
                dispatch( SetCantonesCustomers( responses ) );
                
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

export const startGetAllDistritos = ( idCanton ) => {

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
                dispatch( SetDistritosCustomers( responses ) );
                
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

//Normal Actions
export const SelectTabCustomers = ( nameTab ) => ({
    type: types.SelectTabCustomers,
    payload: {
        nameTab
    }
});

export const SetNombreCustomers = ( value ) => ({
    type: types.SetNombreCustomers,
    payload: value
});

export const SetCedulaCustomers = ( value ) => ({
    type: types.SetCedulaCustomers,
    payload: value
});

export const SetObservacionesCustomers = ( value ) => ({
    type: types.SetObservacionesCustomers,
    payload: value
});

export const SetTelefonoCustomers = ( value ) => ({
    type: types.SetTelefonoCustomers,
    payload: value
});

export const SetFaxCustomers = ( value ) => ({
    type: types.SetFaxCustomers,
    payload: value
});

export const SetProvinciaCustomers = ( value ) => ({
    type: types.SetProvinciaCustomers,
    payload: value
});

export const SetCantonCustomers = ( value ) => ({
    type: types.SetCantonCustomers,
    payload: value
});

export const SetDistritoCustomers = ( value ) => ({
    type: types.SetDistritoCustomers,
    payload: value
});

export const SetDireccionCustomers = ( value ) => ({
    type: types.SetDireccionCustomers,
    payload: value
});

export const SetCorreocuentasCustomers = ( value ) => ({
    type: types.SetCorreocuentasCustomers,
    payload: value
});

export const SetCorreoFacturacionCustomers = ( value ) => ({
    type: types.SetCorreoFacturacionCustomers,
    payload: value
});

export const SetTipoClienteCustomers = ( value ) => ({
    type: types.SetTipoClienteCustomers,
    payload: value
});

export const SetAgenteCustomers = ( value ) => ({
    type: types.SetAgenteCustomers,
    payload: value
});

export const SetActualizadoCustomers = ( value ) => ({
    type: types.SetActualizadoCustomers,
    payload: value
});

export const SetFallecidoCustomers = ( value ) => ({
    type: types.SetFallecidoCustomers,
    payload: value
});

export const SetEnviaReciboCustomers = ( value ) => ({
    type: types.SetEnviaReciboCustomers,
    payload: value
});

export const SetCorreoReciboCustomers = ( value ) => ({
    type: types.SetCorreoReciboCustomers,
    payload: value
});

export const SetTipoPrecioCustomers = ( value ) => ({
    type: types.SetTipoPrecioCustomers,
    payload: value
});

export const SetDescuentoEspecialCustomers = ( value ) => ({
    type: types.SetDescuentoEspecialCustomers,
    payload: value
});

export const SetInactivoCustomers = ( value ) => ({
    type: types.SetInactivoCustomers,
    payload: value
});

export const SetMagCustomers = ( value ) => ({
    type: types.SetMagCustomers,
    payload: value
});

export const ActiveCredito = ( value ) => ({
    type: types.ActiveCredito,
    payload: value
});

export const SetAbiertoCustomers = ( value ) => ({
    type: types.SetAbiertoCustomers,
    payload: value
});

export const SetCodMonenaCreditoCustomers = ( value ) => ({
    type: types.SetCodMonenaCreditoCustomers,
    payload: value
});

export const SetPlazoCreditoCustomers = ( value ) => ({
    type: types.SetPlazoCreditoCustomers,
    payload: value
});

export const SetMaxCreditoCustomers = ( value ) => ({
    type: types.SetMaxCreditoCustomers,
    payload: value
});

export const SetDescuentoCustomers = ( value ) => ({
    type: types.SetDescuentoCustomers,
    payload: value
});

export const SetEmpresaCustomers = ( value ) => ({
    type: types.SetEmpresaCustomers,
    payload: value
});

export const SetSinRestriccionCustomers = ( value ) => ({
    type: types.SetSinRestriccionCustomers,
    payload: value
});

export const SetClienteMorosoCustomers = ( value ) => ({
    type: types.SetClienteMorosoCustomers,
    payload: value
});

export const SetOrdenCompraCustomers = ( value ) => ({
    type: types.SetOrdenCompraCustomers,
    payload: value
});

export const CleanStateCustomers = () => ({
    type: types.CleanStateCustomers
});

export const ActiveButtonNewCustomers = ( value ) => ({
    type: types.ActiveButtonNewCustomers,
    payload: value
});

export const ActiveButtonSearchCustomers = ( value ) => ({
    type: types.ActiveButtonSearchCustomers,
    payload: value
});

export const ActiveButtonSaveCustomers = ( value ) => ({
    type: types.ActiveButtonSaveCustomers,
    payload: value
});

export const ActiveButtonRemoveCustomers = ( value ) => ({
    type: types.ActiveButtonRemoveCustomers,
    payload: value
});

export const SetDefautlButtonsCustomers = () => ({
    type: types.SetDefautlButtonsCustomers
});

export const DisableInputsCustomers = ( value ) => ({
    type: types.DisableInputsCustomers,
    payload: value
});

const SetSearchCustomers = ( value ) => ({
    type: types.SetSearchCustomers,
    payload: value
});

export const OpenSearchModalCustomers = () => ({
    type: types.OpenSearchModalCustomers
});

export const CloseSearchModalCustomers = () => ({
    type: types.CloseSearchModalCustomers
});

export const CleanSearchCustomers = () => ({
    type: types.CleanSearchCustomers
});

export const SelectedSearchCustomers = ( value ) => ({
    type: types.SelectedSearchCustomers,
    payload: value
});

export const IsCustomerEditCustomers = ( value ) => ({
    type: types.IsCustomerEditCustomers,
    payload: value
});

export const IsCustomerDisable = ( value ) => ({
    type: types.IsCustomerDisable,
    payload: value
});

export const HasCartaExoneracion = ( value ) => ({
    type: types.HasCartaExoneracion,
    payload: value
});

export const SetProvinciasCustomers = ( value ) => ({
    type: types.SetProvinciasCustomers,
    payload: value
});

export const SetCantonesCustomers = ( value ) => ({
    type: types.SetCantonesCustomers,
    payload: value
});

export const SetDistritosCustomers = ( value ) => ({
    type: types.SetDistritosCustomers,
    payload: value
});

export const SetDisableCantonesCustomers = ( value ) => ({
    type: types.SetDisableCantonesCustomers,
    payload: value
});

export const SetDisableDistritosCustomers = ( value ) => ({
    type: types.SetDisableDistritosCustomers,
    payload: value
});

export const SetSinAgenteCustomers = ( value ) => ({
    type: types.SetSinAgenteCustomers,
    payload: value
});

export const SetStartOpeningCustomers = ( value ) => ({
    type: types.SetStartOpeningCustomers,
    payload: value
});