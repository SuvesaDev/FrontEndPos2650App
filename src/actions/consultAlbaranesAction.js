import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';
import { startGetAllSurcursales, startValidateClaveInterna } from './login';
import { startGetAllTiposFacturas } from './TiposFacturasAction';

//Action with call API
export const startGetAlbaranes = ( url, id, idSucursal) => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando facturas',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const { data } = await suvesaApi.post('/Qvet/TraerFacturasQvet', { url, id});
            
            const { status, responses } = data;
            
            if( status === 0 ) {

                const { exito, resultado } = responses; 

                if( exito === true ) {

                    const { data } = await suvesaApi.post('/Qvet/ObtenerAlbaranesPendientesFacturar');

                    const { status, responses } = data;

                    //Quitar el loading
                    Swal.close();

                    if( status == 0 ) {
                        
                        const albares = responses.map( r => {

                            const date = r.fecha.split('T');
                            
                            return {
                                id            : r.id,
                                cliente       : r.cliente,
                                cedula        : r.cedula,
                                mascota       : r.mascota,
                                fecha         : `${date[0]} ${date[1]} `,
                                subtotal      : r.subtotal,
                                descuento     : r.descuento,
                                impuesto      : r.impuesto,
                                total         : r.total,
                                responsable   : r.responsableVenta,
                                idQvet        : r.idQvet,
                                codCliente    : '',
                                tipo          : '',
                                bodega        : '',
                                idEmpresa     : '',
                                idSucursal    : idSucursal,
                                codMoneda     : 1,
                                numCaja       : '',
                                extranjero    : false,
                                existeUsuario : false,
                            }
                        });

                        dispatch( setAlbaranesConsultAlbaranes( albares ) );

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

                } else {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Ocurrio un problema al obtener las facturas: ${resultado}`,
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

        } catch (error) {
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Obtener las facturas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las facturas',
                });
            }
        }
        
    }
}

export const startSaveAlbaranes = ( billings ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea facturar los albaranes seleccionados?',
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
                    const { data } = await suvesaApi.post('/Qvet/CrearPreventas', billings);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Albaranes facturados',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        // Se retiran los albaranes a facturar
                        dispatch( SetRemoveAllFacturasPendientesConsultAlbaranes() );
                        dispatch( SetRemoveAllAlbaranesFacturarConsultAlbaranes() );

                        // Se debe eliminar los albaranes facturados
                        const idFacturados = billings.map( billing => {
                            return parseInt(billing.id); 
                        });
                        dispatch( SetDeleteAlbaranesFacturasConsultAlbaranes( idFacturados ) );
                        
                        // Se establece los albaranes iniciales table
                        dispatch( SetInitialStateAlbaranesTableConsultAlbaranes() );

                        // Se desmarca todas las lineas 
                        dispatch( checkMarcaTodosConsultAlbaranes(false) );
                        
                        // Cerrar modal
                        dispatch( SetOpenModalGenerarFacturasConsultAlbaranes( false ) );
                        
                        
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
                        text: 'Ocurrio un problema al facturar los albaranes seleccionados',
                    });
                }
            }
        });
    };
}

export const startGetOneAlbaran = ( id ) => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere obtieniendo el albaran',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const { data } = await suvesaApi.post(`/Qvet/ObtenerAlbaran?id=${id}`, {});
            
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if( status === 0 ) {

                const { id, idQvet, cliente, mascota, fecha, total, listaLineas } = responses;

                const newDate = fecha.split('T');
                const date = new Date(newDate[0]).toLocaleDateString('en-GB');

                const albaranActual = {
                    id,
                    idQvet,
                    cliente,
                    mascota,
                    fecha : date,
                    total,
                    listaLineas 
                }
                
                //Se establece el albaran en el estado
                dispatch( setAlbaranActualConsultAlbaranes( albaranActual ) );
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
                    text: 'Obtener las facturas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener el albaran',
                });
            }
        }
        
    }
}

export const startGetOneInventoryBillingConsultAlbaranes = (codigo) => {

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
                
                const { codigo, precio_A, iVenta, descripcion } = responses;

                let precio = parseFloat(precio_A);
                let montoImpuesto = precio * (parseFloat(iVenta) / 100);
                const total = precio + montoImpuesto;
                
                // Seleccinarlo y meterlo en el estado
                dispatch( setInventoryActualModalConsultAlbaranes({
                    codigo,
                    descripcion,
                    precioUnit: total,
                    precioSinIVA: precio,
                    iva: iVenta,
                    total
                }) );

                // Cambiar el foco del input
                dispatch( setautoFocusCantidadConsultAlbaranes( true ) );
                dispatch( setautoFocusDescConsultAlbaranes( false ) );
                dispatch( setautoFocusCodigoConsultAlbaranes( false ) );

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

export const startAddLineAlbaranConsultAlbaranes = ( id, idQvet, albaran ) => {

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
            const { data } = await suvesaApi.post(`/Qvet/InsertarLineaAlbaran?id=${id}&idQvet=${idQvet}`,  albaran );
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {
                
                const { id, total, listaLineas } = responses;

                const lastLine = listaLineas.slice(-1);

                const newAlbaran = {
                    ...albaran,
                    id: lastLine[0].id
                }

                dispatch( setAddInventarioListaLineasConsultAlbaranes( newAlbaran ) );
                dispatch( SetTotalAlbaranConsultAlbaranes({ id, total }) );
                dispatch( CleanInventarioActualConsultAlbaranes() );

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

export const startDeleteLineAlbaranConsultAlbaranes = ( idLine, idAlbaran ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar la linea?`,
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
                    const resp = await suvesaApi.post(`/Qvet/EliminarLineaAlbaran?idLinea=${idLine}&idAlbaran=${idAlbaran}`);
                    const { status, responses } = resp.data;
                    
                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        const { id, total } = responses;

                        dispatch( setDeleteInventarioListaLineasConsultAlbaranes( idLine ) );
                        dispatch( SetTotalAlbaranConsultAlbaranes({ id, total }) );

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
                        text: `Ocurrio un problema al eliminar un linea Albaran`,
                    });
                }
            }
                
        });
        
    }
}

export const startSearchAlbaranesConsultAlbaranes = ( albaranes, filtros ) => {

    return async ( dispatch ) => {

        const searchAlbaranes = albaranes.filter( 
            albaran => albaran.cliente.toUpperCase() === filtros.cliente.toUpperCase() 
                    || albaran.mascota.toUpperCase() === filtros.mascota.toUpperCase()
                    || (albaran.fecha.toUpperCase() >= filtros.fecha_desde.toUpperCase() 
                        && albaran.fecha.toUpperCase() <= filtros.fecha_hasta.toUpperCase()));
        
        if( searchAlbaranes.length > 0 ) {
            
            dispatch( SetSearchAlbaranesConsultAlbaranes( searchAlbaranes ) );

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Consulta Albaranes',
                text: 'No se encontraron albaranes con los filtros de busqueda.',
                timer: 2000
            });
        }
        
    }
}

export const startValidateClaveInternaConsultAlbaranes = ( password, getTipos ) => {

    return async ( dispatch ) => {
          
        try {

            const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
            
            if( status === 1 ) {
                
                // Se activan los inputs
                dispatch( SetDisableInputsConsultAlbaranes( false ) );

                //Guardar el usuario en el state
                dispatch( SetNameUserConsultAlbaranes( userName ) );

                // Desactivan los inputs de password
                dispatch( SetDisableInputPasswordConsultAlbaranes( true ) );

                // Ocultar la password
                dispatch( SetVisablePasswordConsultAlbaranes( false ) );

                // Se carga los catalogos
                await loadCatalogos( dispatch, getTipos );

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

export const startSaveCustomerConsultAlbaranes = ( customer ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar un nuevo cliente?',
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
                    const { data } = await suvesaApi.post('/cliente', customer);
                    const { status, responses } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {

                        // Se edita el cliente se agregar 
                        dispatch( SetEditCodClienteConsultAlbaranes( { cedula: responses.cedula, codCliente: responses.identificacion  }  ) );

                        // Se modifica el existe de usuario
                        dispatch( SetEditExisteUsuarioConsultAlbaranes( { cedula: responses.cedula, existeUsuario: true  } ) );

                        //Clean State
                        dispatch( SetCleanStateCustomerConsultAlbaranes() );

                        //Close modal
                        dispatch( SetOpenModalAddCustomerConsultAlbaranes( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Cliente ingresado correctamente',
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
                        text: 'Ocurrio un problema al ingresar un nuevo cliente',
                    });
                }
            }

        });

    }
}

export const startGetPorcentajeExtranjeroConsultAlbaranes = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Configuracion/PorcentajeExtrajero`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Se guarda en el estado el porcentaje de extranjero
                dispatch( SetAumentoExtranjeroConsultAlbaranes( responses ) );

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
                    text: 'Ocurrio un problema al obtener el porcentaje de extranjero',
                });
            }
        }
        
    }
}

export const startSaveAlbaran = (factura) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar la factura?',
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
                    console.log(factura)
                    //Call end-point 
                    const { data } = await suvesaApi.post('/venta/CrearFactura', factura);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if (status === 0) {
                        dispatch(CleanBilling());
                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Factura agrega correctamente',
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
                        text: 'Ocurrio un problema al agregar la factura',
                    });
                }
            }
        });
    };
}

export const startExistsClientConsultAlbaranes = ( cedula ) => {

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
            const { data } = await suvesaApi.post(`/cliente/obtenerCodigoCliente?cedula=${cedula}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
            
            if( status === 0 ) {

                // Se modifica el existe de usuario
                dispatch( SetEditExisteUsuarioConsultAlbaranes( { cedula, existeUsuario: true  } ) );

                // Se modifica el codigo cliente
                dispatch( SetEditCodClienteConsultAlbaranes( { cedula, codCliente: responses  }  ) );

            } else {

                dispatch( SetEditExisteUsuarioConsultAlbaranes( { cedula, existeUsuario: false  } ) );
                
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
                    text: 'Ocurrio un problema al validar si existe el cliente',
                });
            }
        }
        
    }
}

export const startGetAllCajasConsultAlbaranes = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Caja/ObtenerTodasCajas`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const allCajas = responses.map( caja => {

                    if( caja.numApertura !== 0 ) {
                        return {
                            idCaja: caja.idCaja,
                            numCaja: caja.numCaja,
                        }
                    }

                });

                const cajas = allCajas.filter( c => c !== undefined );
                dispatch( SetInsertCajasConsultAlbaranes( cajas ) );

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las cajas',
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
                    text: 'Ocurrio un problema al obtener las cajas',
                });
            }
        }
        
    }
}

export const startGetAllEmpresasConsultAlbaranes = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/Centros/ObtenerEmpresasFacturacion`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const empresas = responses.map( empresa => {
                    return {
                        id: empresa.id,
                        nombre: empresa.nombre
                    }
                });

                // Se guarda en el estado las empresas
                dispatch( SetInsertEmpresasConsultAlbaranes( empresas ) );

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las empresas',
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
                    text: 'Ocurrio un problema al obtener las empresas',
                });
            }
        }
        
    }
}

export const startGetAllBodegasConsultAlbaranes = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post(`/bodega/ObtenerBodegas`);
            const { status, responses } = data;
            
            if( status === 0 ) {

                const bodegas = responses.map( bodega => {
                    return {
                        id: bodega.idBodega,
                        nombre: bodega.nombreBodega
                    }
                });

                // Se guarda en el estado las bodegas
                dispatch( SetInsertBodegasConsultAlbaranes( bodegas ) );

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las bodegas',
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
                    text: 'Ocurrio un problema al obtener las bodegas',
                });
            }
        }
        
    }
}

const loadCatalogos = async ( dispatch, getTipos ) => {

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

    // Obtener el porcentaje de extranjero
    await dispatch( startGetPorcentajeExtranjeroConsultAlbaranes() );

    // Obtener las cajas 
    await dispatch( startGetAllCajasConsultAlbaranes() );

    if( getTipos ) {
        // Obtener los tipos de Facturas
        await dispatch( startGetAllTiposFacturas() );
    }

    // Obtener las empresas
    await dispatch( startGetAllEmpresasConsultAlbaranes() );

    // Obtener las bodegas
    await dispatch( startGetAllBodegasConsultAlbaranes() );

    // Obtener las surcursales
    await dispatch( startGetAllSurcursales() );

    //Quitar el loading
    Swal.close();

}

//Normal Actions
export const setAlbaranesConsultAlbaranes = ( value ) => ({
    type: types.setAlbaranesConsultAlbaranes,
    payload: value
});

export const openModalConsultAlbaranes = ( value ) => ({
    type: types.openModalConsultAlbaranes,
    payload: value
});

export const checkMarcaTodosConsultAlbaranes = ( value ) => ({
    type: types.checkMarcaTodosConsultAlbaranes,
    payload: value
});

export const checkExtranjeroTodosConsultAlbaranes = ( value ) => ({
    type: types.checkExtranjeroTodosConsultAlbaranes,
    payload: value
});

export const setAlbaranActualConsultAlbaranes = ( value ) => ({
    type: types.setAlbaranActualConsultAlbaranes,
    payload: value
});

export const CleanAlbaranActualConsultAlbaranes = () => ({
    type: types.CleanAlbaranActualConsultAlbaranes
});

export const setOpenModalSearchInventoryConsultAlbaranes = ( value ) => ({
    type: types.setOpenModalSearchInventoryConsultAlbaranes,
    payload: value
});

export const setInventoryActualModalConsultAlbaranes = ( value ) => ({
    type: types.setInventoryActualModalConsultAlbaranes,
    payload: value
});

export const setCantidadInventoryActualConsultAlbaranes = ( value ) => ({
    type: types.setCantidadInventoryActualConsultAlbaranes,
    payload: value
});

export const setDescuentoInventoryActualConsultAlbaranes = ( value ) => ({
    type: types.setDescuentoInventoryActualConsultAlbaranes,
    payload: value
});

export const setTotalInventoryActualConsultAlbaranes = ( value ) => ({
    type: types.setTotalInventoryActualConsultAlbaranes,
    payload: value
});

export const setautoFocusDescConsultAlbaranes = ( value ) => ({
    type: types.setautoFocusDescConsultAlbaranes,
    payload: value
});

export const setautoFocusCantidadConsultAlbaranes = ( value ) => ({
    type: types.setautoFocusCantidadConsultAlbaranes,
    payload: value
});

export const setautoFocusCodigoConsultAlbaranes = ( value ) => ({
    type: types.setautoFocusCodigoConsultAlbaranes,
    payload: value
});

export const setAddInventarioListaLineasConsultAlbaranes = ( value ) => ({
    type: types.setAddInventarioListaLineasConsultAlbaranes,
    payload: value
});

export const setDeleteInventarioListaLineasConsultAlbaranes = ( value ) => ({
    type: types.setDeleteInventarioListaLineasConsultAlbaranes,
    payload: value
});

export const CleanInventarioActualConsultAlbaranes = () => ({
    type: types.CleanInventarioActualConsultAlbaranes
});

export const SetTotalAlbaranConsultAlbaranes = ( value ) => ({
    type: types.SetTotalAlbaranConsultAlbaranes,
    payload: value
});

export const SetclienteConsultAlbaranes = ( value ) => ({
    type: types.SetclienteConsultAlbaranes,
    payload: value
});

export const SetmascotaConsultAlbaranes = ( value ) => ({
    type: types.SetmascotaConsultAlbaranes,
    payload: value
});

export const Setfecha_desdeConsultAlbaranes = ( value ) => ({
    type: types.Setfecha_desdeConsultAlbaranes,
    payload: value
});

export const Setfecha_hastaConsultAlbaranes = ( value ) => ({
    type: types.Setfecha_hastaConsultAlbaranes,
    payload: value
});

export const SetSearchAlbaranesConsultAlbaranes = ( value ) => ({
    type: types.SetSearchAlbaranesConsultAlbaranes,
    payload: value
});

export const SetMostrarTodosAlbaranesConsultAlbaranes = () => ({
    type: types.SetMostrarTodosAlbaranesConsultAlbaranes
});

export const SetOpenModalGenerarFacturasConsultAlbaranes = ( value ) => ({
    type: types.SetOpenModalGenerarFacturasConsultAlbaranes,
    payload: value
});

export const SetAddAlbaranFacturarConsultAlbaranes = ( value ) => ({
    type: types.SetAddAlbaranFacturarConsultAlbaranes,
    payload: value
});

export const SetRemoveAlbaranFacturarConsultAlbaranes = ( value ) => ({
    type: types.SetRemoveAlbaranFacturarConsultAlbaranes,
    payload: value
});

export const SetAddAllAlbaranesFacturarConsultAlbaranes = ( value ) => ({
    type: types.SetAddAllAlbaranesFacturarConsultAlbaranes,
    payload: value
});

export const SetRemoveAllAlbaranesFacturarConsultAlbaranes = () => ({
    type: types.SetRemoveAllAlbaranesFacturarConsultAlbaranes
});

export const SetAddAllFacturasPendientesConsultAlbaranes = ( value ) => ({
    type: types.SetAddAllFacturasPendientesConsultAlbaranes,
    payload: value
});

export const SetRemoveAllFacturasPendientesConsultAlbaranes = () => ({
    type: types.SetRemoveAllFacturasPendientesConsultAlbaranes
});

export const SetOpenModalSearchCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetOpenModalSearchCustomerConsultAlbaranes,
    payload: value
});

export const SetIndexCustomerSeletedTableConsultAlbaranes = ( value ) => ({
    type: types.SetIndexCustomerSeletedTableConsultAlbaranes,
    payload: value
});

export const SetUpdateCustomerFacturasPendientesConsultAlbaranes = ( value ) => ({
    type: types.SetUpdateCustomerFacturasPendientesConsultAlbaranes,
    payload: value
});

export const SetDisableInputsConsultAlbaranes = ( value ) => ({
    type: types.SetDisableInputsConsultAlbaranes,
    payload: value
});

export const SetUserClaveInternaConsultAlbaranes = ( value ) => ({
    type: types.SetUserClaveInternaConsultAlbaranes,
    payload: value
});

export const SetNameUserConsultAlbaranes = ( value ) => ({
    type: types.SetNameUserConsultAlbaranes,
    payload: value
});

export const SetDisableInputPasswordConsultAlbaranes = ( value ) => ({
    type: types.SetDisableInputPasswordConsultAlbaranes,
    payload: value
});

export const SetVisablePasswordConsultAlbaranes = ( value ) => ({
    type: types.SetVisablePasswordConsultAlbaranes,
    payload: value
});

export const CleanStateConsultAlbaranes = () => ({
    type: types.CleanStateConsultAlbaranes
});

export const SetOpenModalAddCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetOpenModalAddCustomerConsultAlbaranes,
    payload: value
});

export const SetIdTipoClienteCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetIdTipoClienteCustomerConsultAlbaranes,
    payload: value
});

export const SetCedulaCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetCedulaCustomerConsultAlbaranes,
    payload: value
});

export const SetNombreCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetNombreCustomerConsultAlbaranes,
    payload: value
});

export const SetTelefonoCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetTelefonoCustomerConsultAlbaranes,
    payload: value
});

export const SetEmailCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetEmailCustomerConsultAlbaranes,
    payload: value
});

export const SetDireccionCustomerConsultAlbaranes = ( value ) => ({
    type: types.SetDireccionCustomerConsultAlbaranes,
    payload: value
});

export const SetCleanStateCustomerConsultAlbaranes = () => ({
    type: types.SetCleanStateCustomerConsultAlbaranes
});

export const SetAumentoExtranjeroConsultAlbaranes = ( value ) => ({
    type: types.SetAumentoExtranjeroConsultAlbaranes,
    payload: value
});

export const SetEditLineaAlbaranConsultAlbaranes = ( value ) => ({
    type: types.SetEditLineaAlbaranConsultAlbaranes,
    payload: value
});

export const SetEditExtranjeroConsultAlbaranes = ( value ) => ({
    type: types.SetEditExtranjeroConsultAlbaranes,
    payload: value
});

export const SetEditExisteUsuarioConsultAlbaranes = ( value ) => ({
    type: types.SetEditExisteUsuarioConsultAlbaranes,
    payload: value
});

export const SetEditCodClienteConsultAlbaranes = ( value ) => ({
    type: types.SetEditCodClienteConsultAlbaranes,
    payload: value
});

export const SetEditCajaConsultAlbaranes = ( value ) => ({
    type: types.SetEditCajaConsultAlbaranes,
    payload: value
});

export const SetEditTipoConsultaAlbaranes = ( value ) => ({
    type: types.SetEditTipoConsultaAlbaranes,
    payload: value
});

export const SetInsertCajasConsultAlbaranes = ( value ) => ({
    type: types.SetInsertCajasConsultAlbaranes,
    payload: value
});

export const SetInsertTiposConsultAlbaranes = ( value ) => ({
    type: types.SetInsertTiposConsultAlbaranes,
    payload: value
});

export const SetEditIdEmpresaConsultAlbaranes = ( value ) => ({
    type: types.SetEditIdEmpresaConsultAlbaranes,
    payload: value
});

export const SetInsertEmpresasConsultAlbaranes = ( value ) => ({
    type: types.SetInsertEmpresasConsultAlbaranes,
    payload: value
});

export const SetEditBodegaConsultAlbaranes = ( value ) => ({
    type: types.SetEditBodegaConsultAlbaranes,
    payload: value
});

export const SetInsertBodegasConsultAlbaranes = ( value ) => ({
    type: types.SetInsertBodegasConsultAlbaranes,
    payload: value
});

export const SetInitialStateAlbaranesTableConsultAlbaranes = () => ({
    type: types.SetInitialStateAlbaranesTableConsultAlbaranes
});

export const SetDeleteAlbaranesFacturasConsultAlbaranes = ( value ) => ({
    type: types.SetDeleteAlbaranesFacturasConsultAlbaranes,
    payload: value
});
