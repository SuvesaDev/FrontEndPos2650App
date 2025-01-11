import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

import { startValidateClaveInterna } from './login';
import { startGetAllMonedas } from './MonedasAction';

// API Actions
export const startSaveCollect = ( collect ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea guardar el abono?`,
            icon: 'question',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            console.log(collect)
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
                    const { data } = await suvesaApi.post('/AbonoCobrar/CreateAbonoCobrar', collect );
                    const { status, responses } = data;
                    
                    //Quitar el loading
                     Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: `Abono agregado correctamente`,
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se limpia el estado
                        dispatch( CleanCollect() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        console.log(currentException);

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrio un problema a la guardar el abono',
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
                        text: 'Ocurrio un problema a la guardar el abono',
                    });
                }
            }
        });
    };
}

export const startSearchOneCustomerCollect = ( cedula ) => {

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
            const { data } = await suvesaApi.post('/cliente/BuscarCedula', { 'cedula' : cedula });
            
            const { status, responses } = data;
            Swal.close();
    
            if( status === 0 ) {
                
                const users =  responses.map( user => {
                    return {
                        identificacion : user.identificacion,
                        cedula : user.cedula,
                        nombre: user.nombre,
                        telefono_01: user.telefono_01
                    }
                });

                // Se ingresa la identificacion del cliente
                dispatch( SetIdentificacionCustomerAbonoCollect( users[0].identificacion ) );

                // Se ingresa la cedula
                dispatch( SetCedulaCustomerAbonoCollect( users[0].cedula ) );

                // Se ingresa el nombre
                dispatch( SetNombreCustomerAbonoCollect( users[0].nombre ) );
               

            } else {
    
                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                if( currentException === 'No se encontraron Clientes.' ) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: `No se encontro ningún cliente con la cédula ${cedula}`
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrio un problema al buscar clientes',
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
                    text: 'Ocurrio un problema al buscar clientes',
                });
            }
        }
    }
}


export const startValidateClaveInternaCollect = ( password ) => {

    return async ( dispatch ) => {
          
        try {
            const { status, userName, message, idUsuario } = await dispatch( startValidateClaveInterna( password ) );
            if( status === 1 ) {

                // Validar si el usuario tiene una caja abierta
                const resp = await suvesaApi.post('/Caja/ObtenerUsuariosCajaAbierta');
                const users = resp.data.responses;

                if( users.length === 0 ) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen usuarios con caja abierta.'
                    });

                    return;
                }

                const userResult = users.find( u => u.id === parseInt(idUsuario) && u.nombre === userName );

                if( userResult === undefined ) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Este usuario no presenta ninguna caja abierta. Por favor intentalo con otro usuario'
                    });

                    return
                }
 
                // Se activan los inputs
                dispatch( SetDisableInputsCollect( false ) );

                // Se establece el nameUser
                dispatch( SetNameUserCollect( userName ) );

                // Se establece el idUsuario
                dispatch( SetIdUsuarioCollect( idUsuario ) );

                // Se cambia los icons
                dispatch( SetActiveButtonSaveCollect( true ) );
                dispatch( SetActiveButtonSearchCollect( true ) );

                // Se inserta el numApertura
                dispatch( SetNumAperturaCollect( userResult.idApertura ) );

                // Se inserta el numCaja
                dispatch( SetNumCajaCollect( userResult.numCaja ) );

                // Se traen los catalogos
                await loadCatalogos( dispatch );

                // Desactivar los inputs de usuario
                dispatch( SetDisableInputsUserCollect( true ) );

                // Ocultar la password
                dispatch( SetVisiblePasswordCollect( false ) );

                // Se activa StartOpeningCollect
                dispatch( SetStartOpeningCollect( true ) );
               

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


export const startAllCustomersFacturasCollect = () => {

    return async ( dispatch ) => {
          
        try {
            
            //Call end-point 
            const { data } = await suvesaApi.get('/AbonoCobrar/ObtenerFacturasPendientesCobros');
            
            const { status, responses } = data;
            Swal.close();
            
            if( status === 0 ) {
                
                dispatch( SetAllCustomersFacturasCollect( responses ) );

                const customers = responses.map( customer => {
                    return {
                        idCliente: customer.idCliente,
                        nombre: customer.nombre,
                        cedula: customer.cedula
                    }
                });

                dispatch( SetCustomerResulCollect( customers ) );
                dispatch( SetAllCustomerResulCollect( customers ) );
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los clientes con deuda',
                });

            }

        } catch (error) {
            
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
                    text: 'Ocurrio un problema al obtener los clientes con deuda',
                });
            }
        }
        
    }
}

export const startGetOneFichaCollect = () => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere cargando ficha',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.post(`/Fichas/ObtenerFicha?sucursal=1`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {
                
                const { numero } = responses;

                // Se guarda en el estado la ficha
                dispatch( SetNumeroFichaAbonoCollect( numero ) );

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
                    text: 'Ocurrio un problema al obtener la ficha',
                });
            }
        }
        
    }
}

export const startGetOneDetalleFacturaCollect = ( idFactura ) => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere cargando detalle factura',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.get(`/AbonoCobrar/GetFacturaAbonarCobro?id=${idFactura}`);
            const { status, responses } = data;
            Swal.close();
            if( status === 0 ) {
                
                const billing = {
                    numero : responses.numero,
                    factura: responses.id,
                    fecha : responses.fecha.split('T')[0],
                    monto : responses.monto,
                    montoTotal : responses.montoTotal,
                    intereses : 0,
                    saldoPrevio : responses.monto,
                    abono : responses.monto,
                    saldoActual : 0
                }
                dispatch( SetAddFacturaActualCollect( billing ) );
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
                    text: 'Ocurrio un problema al obtener el detalle de factura',
                });
            }
        }
        
    }
}

// Private methods
const loadCatalogos = async ( dispatch ) => {

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

    await dispatch( startGetAllMonedas() );

    await dispatch( startAllCustomersFacturasCollect() );

    //Quitar el loading
    Swal.close();
}

// export const startGetAllBancosBank = () => {

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
//             const { data } = await suvesaApi.post(`/Bancos/ObtenerBancos`);
//             const { status, responses } = data;

//             //Quitar el loading
//             Swal.close();
            
//             if( status === 0 ) {
                
//                 // Se guarda en el estado los bancos
//                 dispatch( SetBancosBank( responses ) );

//             } else {

//                 //Caso contrario respuesta incorrecto mostrar mensaje de error
//                 const { currentException } = data;
//                 console.log( currentException );
                
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Ocurrio un problema al obtener los bancos',
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
//                     text: 'Ocurrio un problema al obtener los bancos',
//                 });
//             }
//         }
        
//     }
// }

// Normal Actions

export const SetActiveButtonSaveCollect = (value) => ({
    type: types.SetActiveButtonSaveCollect,
    payload: value
})

export const SetActiveButtonSearchCollect = (value) => ({
    type: types.SetActiveButtonSearchCollect,
    payload: value
})

export const SetActiveButtonRemoveCollect = (value) => ({
    type: types.SetActiveButtonRemoveCollect,
    payload: value
})

export const SetDisableInputsCollect = (value) => ({
    type: types.SetDisableInputsCollect,
    payload: value
})

export const SetClaveInternaCollect = (value) => ({
    type: types.SetClaveInternaCollect,
    payload: value
})

export const SetNameUserCollect = (value) => ({
    type: types.SetNameUserCollect,
    payload: value
})


export const SetIdUsuarioCollect = (value) => ({
    type: types.SetIdUsuarioCollect,
    payload: value
})

export const SetNumAperturaCollect = (value) => ({
    type: types.SetNumAperturaCollect,
    payload: value
})

export const SetNumCajaCollect = (value) => ({
    type: types.SetNumCajaCollect,
    payload: value
})


export const SetVisiblePasswordCollect = (value) => ({
    type: types.SetVisiblePasswordCollect,
    payload: value
})

export const SetDisableInputsUserCollect = (value) => ({
    type: types.SetDisableInputsUserCollect,
    payload: value
})

export const SetShowInfoMessageCollect = (value) => ({
    type: types.SetShowInfoMessageCollect,
    payload: value
})

export const SetDisableBtnAddCollect = (value) => ({
    type: types.SetDisableBtnAddCollect,
    payload: value
})

export const SetIsOpenModalSearchCustomerCollect = (value) => ({
    type: types.SetIsOpenModalSearchCustomerCollect,
    payload: value
})

export const SetCedulaSearchCustomerCollect = (value) => ({
    type: types.SetCedulaSearchCustomerCollect,
    payload: value
})

export const SetNombreSearchCustomerCollect = (value) => ({
    type: types.SetNombreSearchCustomerCollect,
    payload: value
})

export const SetCustomerResulCollect = (value) => ({
    type: types.SetCustomerResulCollect,
    payload: value
})

export const CleanStateSearchCustomerModalCollect = () => ({
    type: types.CleanStateSearchCustomerModalCollect
})

export const SetCedulaCustomerAbonoCollect = (value) => ({
    type: types.SetCedulaCustomerAbonoCollect,
    payload: value
})

export const SetNombreCustomerAbonoCollect = (value) => ({
    type: types.SetNombreCustomerAbonoCollect,
    payload: value
})

export const SetIdentificacionCustomerAbonoCollect = (value) => ({
    type: types.SetIdentificacionCustomerAbonoCollect,
    payload: value
})

export const SetAllCustomerResulCollect = (value) => ({
    type: types.SetAllCustomerResulCollect,
    payload: value
})

export const SetAllCustomersFacturasCollect = (value) => ({
    type: types.SetAllCustomersFacturasCollect,
    payload: value
})

export const SetFacturasPendientesCollect = (value) => ({
    type: types.SetFacturasPendientesCollect,
    payload: value
})

export const SetNumeroFichaAbonoCollect = (value) => ({
    type: types.SetNumeroFichaAbonoCollect,
    payload: value
})

export const SetMonedaAbonoCollect = (value) => ({
    type: types.SetMonedaAbonoCollect,
    payload: value
})

export const SetFechaAbonoCollect = (value) => ({
    type: types.SetFechaAbonoCollect,
    payload: value
})

export const SetNumeroFacturaAbonoCollect = (value) => ({
    type: types.SetNumeroFacturaAbonoCollect,
    payload: value
})

export const SetIdFacturaAbonoCollect = (value) => ({
    type: types.SetIdFacturaAbonoCollect,
    payload: value
})

export const SetFechaFacturaAbonoCollect = (value) => ({
    type: types.SetFechaFacturaAbonoCollect,
    payload: value
})

export const SetMontoFacturaAbonoCollect = (value) => ({
    type: types.SetMontoFacturaAbonoCollect,
    payload: value
})

export const SetSaldoAnteriorAbonoCollect = (value) => ({
    type: types.SetSaldoAnteriorAbonoCollect,
    payload: value
})

export const SetInteresesAbonoCollect = (value) => ({
    type: types.SetInteresesAbonoCollect,
    payload: value
})

export const SetAbonoAbonoCollect = (value) => ({
    type: types.SetAbonoAbonoCollect,
    payload: value
})

export const SetSaldoActualAbonoCollect = (value) => ({
    type: types.SetSaldoActualAbonoCollect,
    payload: value
})

export const SetObservacionesAbonoCollect = (value) => ({
    type: types.SetObservacionesAbonoCollect,
    payload: value
})

export const SetTotalSaldoAnteriorAbonoCollect = (value) => ({
    type: types.SetTotalSaldoAnteriorAbonoCollect,
    payload: value
})

export const SetTotalMontoRecibidoAbonoCollect = (value) => ({
    type: types.SetTotalMontoRecibidoAbonoCollect,
    payload: value
})

export const SetTotalSaldoActualAbonoCollect = (value) => ({
    type: types.SetTotalSaldoActualAbonoCollect,
    payload: value
})

export const SetNumeroFacturaActualCollect = (value) => ({
    type: types.SetNumeroFacturaActualCollect,
    payload: value
})

export const SetIdFacturaActualCollect = (value) => ({
    type: types.SetIdFacturaActualCollect,
    payload: value
})

SetIdFacturaActualCollect

export const SetFechaFacturaActualCollect = (value) => ({
    type: types.SetFechaFacturaActualCollect,
    payload: value
})

export const SetMontoFacturaActualCollect = (value) => ({
    type: types.SetMontoFacturaActualCollect,
    payload: value
})

export const SetMontoTotalFacturaActualCollect = (value) => ({
    type: types.SetMontoTotalFacturaActualCollect,
    payload: value
})

export const SetInteresesFacturaActualCollect = (value) => ({
    type: types.SetInteresesFacturaActualCollect,
    payload: value
})

export const SetSaldoPrevioFacturaActualCollect = (value) => ({
    type: types.SetSaldoPrevioFacturaActualCollect,
    payload: value
})

export const SetAbonoFacturaActualCollect = (value) => ({
    type: types.SetAbonoFacturaActualCollect,
    payload: value
})

export const SetSaldoActualFacturaActualCollect = (value) => ({
    type: types.SetSaldoActualFacturaActualCollect,
    payload: value
})

export const SetAddFacturaActualCollect = (value) => ({
    type: types.SetAddFacturaActualCollect,
    payload: value
})

export const SetNewAbonoCollect = (value) => ({
    type: types.SetNewAbonoCollect,
    payload: value
})

export const SetStartOpeningCollect = (value) => ({
    type: types.SetStartOpeningCollect,
    payload: value
})

export const CleanFacturaActualCollect = () => ({
    type: types.CleanFacturaActualCollect
})

export const CleanCollect = () => ({
    type: types.CleanCollect
})