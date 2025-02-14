import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

export const startSaveInventory = ( inventory, relatedArticle ) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea agregar un nuevo inventario?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            
            try {
                var resultRelatedArticle = null;
                let relatedArticles = [];

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
                    const { data } = await suvesaApi.post('/inventario', inventory.toJson() );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if( status === 0) {

                        //Clean State
                        dispatch( CleanStateInventory() );

                        // Disable inputs inventory
                        dispatch( DisableInputsInventory( true ) );

                        //Set default buttons
                        dispatch( SetDefaultButtonsInventory() );

                        //Clear state Price Sell
                        dispatch( CleanArrayStatePricesSellInventory() );

                        //Save Articulos Relacionados
                        if( relatedArticle.length > 0 ) {

                            relatedArticle.forEach(article => {
                                if(!article.isNewEdit)
                                    relatedArticles.push( article.toJson() );
                            });
            
                            const { data } = await suvesaApi.post('/articulosRelacionados', relatedArticles );
                            const { status } = data;
                            
                            if( status === 0 ) {
                                resultRelatedArticle = 'ok'
                            } 

                        }

                        //Quitar el loading
                        Swal.close();

                        //Clear state Related Articles
                        dispatch( CleanInputsRelatedArticleInventory() );

                        //False is Selected Related Articles
                        dispatch( IsSelectedRelatedArticleInventory( false ) );

                        //Clear state Related Articles
                        dispatch( CleanRelatedArticleInventory() );

                        if(resultRelatedArticle === 'ok' ) {
                        
                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Inventario ingresado correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            })
                            
                        } else {

                            //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                            Swal.fire({
                                icon: 'warning',
                                title: 'Inventario ingresado sin articulos relacionados',
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
                        text: 'Ocurrio un problema al ingresar un nuevo inventario',
                    });
                }
            }
                
        });
        
    }
}

export const startEditInventory = ( inventory, relatedArticle ) => {

    return async (dispatch) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea editar el inventario con la codigo ${ inventory.cod_Articulo } ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            try {

                var resultRelatedArticle = null;
                let relatedArticles = [];
                
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
                    console.log(inventory.toJson());
                    //Call end-point 
                    const { data } = await suvesaApi.post('/inventario/Actualizar', inventory.toJson() );
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();

                    if( status === 0 ) {

                        // Disable Inventory Edit
                        dispatch( IsEditInventory( false ));

                        // Disable inventory False
                        dispatch( IsInventoryDisable( false ));

                        //Clean State
                        dispatch( CleanStateInventory() );

                        // Disable inputs inventory
                        dispatch( DisableInputsInventory( true ) );

                        //Set default buttons
                        dispatch( SetDefaultButtonsInventory() );

                        //Clear state Price Sell
                        dispatch( CleanArrayStatePricesSellInventory() );

                        //Save Articulos Relacionados
                        if( relatedArticle.length > 0 ) {
                            relatedArticle.forEach(article => {
                                if( article.isNewEdit )
                                    relatedArticles.push( article.toJson() );
                            });
                            
                            const { data } = await suvesaApi.post('/articulosRelacionados', relatedArticles );
                            const { status } = data;
                            
                            if( status === 0 ) {
                                resultRelatedArticle = 'ok'
                            } 

                        }

                        //Is Seleted related article false
                        dispatch( IsSelectedRelatedArticleInventory( false ) );

                        //Clear state Related Articles
                        dispatch( CleanRelatedArticleInventory() );

                        if(resultRelatedArticle === 'ok' ) {
                        
                            //Si es correcta entonces mostrar un mensaje de afirmacion
                            Swal.fire({
                                icon: 'success',
                                title: 'Inventario editado correctamente',
                                showConfirmButton: false,
                                timer: 2500
                            })
                            
                        } else {

                            //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                            Swal.fire({
                                icon: 'warning',
                                title: 'Inventario editado sin articulos relacionados',
                                showConfirmButton: true,
                            })
                        }
                    } else {

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
                        text: 'Ocurrio un problema al editar inventario'
                    });
                }

            }

        });

    }
}

export const startSearchInventory = ( tipoFiltro, valorFiltro, mostrarInhabilitados, coincidir ) => {
   
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
            const resp = await suvesaApi.post('/inventario/Buscar', { 
                'tipoFiltro' : tipoFiltro,
                'valorFiltro' : valorFiltro,
                'mostrarInhabilitados' : mostrarInhabilitados,
                'coincidir' : coincidir
            });
            
            const { status, responses } = resp.data;
            Swal.close();

            if( status === 0 ) {
                const inventory = responses.map( 
                    (inventory) => ({ 
                                        ...inventory,
                                        estado: inventory.estado ? 'Activo' : 'Inhabilitado',
                                        receta: inventory.receta ? 'SI' : 'NO',
                                        consignacion: inventory.consignacion ? 'SI' : 'NO',
                                    }));

                dispatch(SetSearchInventory( inventory ));
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
                    text: 'Ocurrio un problema al buscar inventarios',
                });
            }
        }
    }
}

export const startGetOneInventory = ( codigo ) => {
   
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
            const resp = await suvesaApi.post('/inventario/ObtenerUnInventario', { codigo });
            const { status, responses } = resp.data;
            
            if( status === 0 ) {

                // Se limpia la tabla de precios
                dispatch( CleanArrayStatePricesSellInventory() );
                
                //seleccionarlo y meterlo al estado en el metodo de action
                dispatch( SelectedSearchInventory( responses ) );

                // Se indica si es articulo relacionado
                dispatch( SetIsArticleRelatedInventory(responses.esRelacionado) );
                
                const { categorias, codigoBarras, descripcion } = responses;
                const codArt = responses.cod_Articulo;
                const costArt = responses.costo;
                const nombreArt = responses.descripcion;

                //Inserta las categorias 
                if( categorias != null ) {
                    
                    const newCategorias = categorias.map( categoria => {
                        return {
                            idCategoriaxInventario: categoria.idCategoriaxInventario,
                            id: categoria.idCategoria,
                            descripcion: categoria.descripcion
                        }
                    });
                    
                    dispatch( SelectCategoriasSearchInventory( newCategorias ) );
                }

                //Inserta los codigos de barras 
                if( codigoBarras != null ) {

                    const newCodigoBarras = codigoBarras.map( codigo => {
                        return {
                            idCodigoBarrasInventario: codigo.idCodigoBarrasInventario,
                            descripcion: descripcion,
                            codigoBarras: codigo.descripcion,
                            tarifa: codigo.tarifa,
                        }
                    });
                    
                    dispatch( IsShowTabCodigoBarrasInventory( true ) );
                    dispatch( SelectCodigoBarrasSearchInventory( newCodigoBarras ) );
                }

                // Aplicar los precios en el estado
                if( responses.precio_A != null || responses.precio_B != null || responses.precio_C != null || responses.precio_D != null ) {

                    const { 
                        precioBase, 
                        fletes, 
                        otrosCargos, 
                        iVenta, 
                        precio_A,
                        precio_B,
                        precio_C,
                        precio_D
                    } = responses;

                    let base = parseFloat(precioBase);
                    let flete = parseFloat(fletes);
                    let otroC = parseFloat(otrosCargos);
                    let impuesto = parseFloat(iVenta);

                    if( precio_A != 0 ) {

                        let pre = parseFloat(precio_A);
                        const dataPrecio = CalculatePreciosVenta( base, flete, otroC, impuesto, pre );
                
                        dispatch( SetPreciosVentaInventory( { 
                            tipo     : 'A', 
                            utilidad : dataPrecio.utilidad, 
                            precio   : precio_A, 
                            precioIV : dataPrecio.precioIV 
                        }));
                
                    }

                    if( precio_B != 0 ) {

                        let pre = parseFloat(precio_B);
                        const dataPrecio = CalculatePreciosVenta( base, flete, otroC, impuesto, pre );
                
                        dispatch( SetPreciosVentaInventory( { 
                            tipo     : 'B', 
                            utilidad : dataPrecio.utilidad, 
                            precio   : precio_B, 
                            precioIV : dataPrecio.precioIV 
                        }));
                
                    }

                    if( precio_C != 0 ) {

                        let pre = parseFloat(precio_C);
                        const dataPrecio = CalculatePreciosVenta( base, flete, otroC, impuesto, pre );
                
                        dispatch( SetPreciosVentaInventory( { 
                            tipo     : 'C', 
                            utilidad : dataPrecio.utilidad, 
                            precio   : precio_C, 
                            precioIV : dataPrecio.precioIV 
                        }));
                
                    }

                    if( precio_D != 0 ) {

                        let pre = parseFloat(precio_D);
                        const dataPrecio = CalculatePreciosVenta( base, flete, otroC, impuesto, pre );
                
                        dispatch( SetPreciosVentaInventory( { 
                            tipo     : 'D', 
                            utilidad : dataPrecio.utilidad, 
                            precio   : precio_D, 
                            precioIV : dataPrecio.precioIV 
                        }));
                
                    }
                }

                // Validar si es padre
                if( responses.codigoPadre !== 0 ) {
                    dispatch( SetIdTipoArticuloSelectedIntentory( 3 ));
                    dispatch( SetCodigoPadreSelectedInventory( responses.codigoPadre ) );
                }

                // Validar si es padre
                if( responses.esPadre === true ) {
                    dispatch( SetIdTipoArticuloSelectedIntentory( 2 ));
                }
                
                // Se activa el campo de stock
                dispatch( SetIsDisableInputStockInventory( false ) );

                // Se obtiene el stock del articulo
                await GetStockArticulo(dispatch, responses.codigo);

                //Call end-point de la Articulos relacionados
                const { data } = await suvesaApi.post('/articulosRelacionados/BuscarArticulosRelacionados', { codigoPrincipal: responses.codigo } );
                
               // Cerrar el modal de espera
               Swal.close();

                // Si tiene rebajaOtro se activa el checkbox en el metodo de action
                // if( responses.descargaOtro ) {
                //     dispatch(ActiveCredito(true));
                // }

                //Habilitar los inputs en el metodo de action
                dispatch( DisableInputsInventory( ( responses.estado ) ? false : true ) );

                //Modificar los botones en el metodo de action
                dispatch( ActiveButtonSearchInventory( true ) );
                dispatch( ActiveButtonSaveInventory( ( responses.estado ) ? true : false ) );
                dispatch( ActiveButtonNewInventory( false ) );
                dispatch( ActiveButtonRemoveInventory( true ) );

                //Se indica si el inventory esta disable
                if(!responses.estado) {
                    dispatch( IsInventoryDisable( true ) )
                }

                //Se indica si el inventory se puede editar
                dispatch( IsEditInventory( ( responses.estado ) ? true : false ) );

                // Verificar la respuesta de articulos relacionados
                if( data.status === 0 ) {

                    // Se obtiene los articulos formula
                    let articulosFormula = data.responses.filter( art => art.esFormula === true );

                    // Se obtiene los articulos relacionados
                    let articulosRelacionados = data.responses.filter( art => art.esFormula === false );

                    // Meter los articulos relacionados en el estado
                    dispatch( SetArrayRelatedArticleInventory( articulosRelacionados ) );

                    // Meter los articulos formula en el estado
                    dispatch( SetArrayFormulaArticleInventory( articulosFormula ) );
                } else {
                     //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                     Swal.fire({
                        icon: 'warning',
                        title: 'Artículos Relacionados no cargados correctamente',
                        showConfirmButton: true,
                    });
                }

                if( responses.esPadre === false ) {
                    // Se realiza el tema de costo
                    await GetCostoArticulo(codArt, costArt, nombreArt);
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
                    text: 'Ocurrio un problema al obtener un inventario',
                });
            }
        }
    }
}

export const startDeleteRelatedArticle = ( codigoPrincipal, codigoArticuloRelacionado , Cantidad, Activo ) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el Artículo Relacionado?`,
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
                    const { data } = await suvesaApi.put(`/articulosRelacionados/putArticuloRelacionado?codigoPrincipal=${codigoPrincipal}&codigoArticuloRelacionado=${codigoArticuloRelacionado}&Cantidad=${Cantidad}&Activo=${Activo}`);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();
                
                    if( status === 0) {

                        //Delete data in array
                        dispatch( RemoveRelatedArticleInventory( codigoArticuloRelacionado ) );

                        //Is Seleted related article false
                        dispatch( IsSelectedRelatedArticleInventory( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Articulo Relacionado eliminado correctamente',
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
                        text: 'Ocurrio un problema al ingresar un nuevo inventario',
                    });
                }
            }
                
        });
        
    }
}

export const startDeleteInventory = ( cod_Articulo, descripcion, usuario, tipo ) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: (tipo === 'disable') 
                    ? `¿Desea desactivar Inventario con la Código ${cod_Articulo} ?`
                    : `¿Desea activar Inventario con la Código ${cod_Articulo} ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: (tipo === 'disable') ? 'Desactivar' : 'Activar',
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
                    const { data } = await suvesaApi.post( (tipo === 'disable') ? '/inventario/Desactivar' : '/inventario/Activar', { 
                        'cod_Articulo' : cod_Articulo, 
                        'descripcion' : descripcion,
                        'idUsuarioModificacion' : usuario
                    });

                    const { status } = data;
                    Swal.close();

                    if( status === 0 ) {

                        // Disable Inventory Edit
                        dispatch( IsEditInventory( false ));

                        // Disable inventory False
                        dispatch( IsInventoryDisable( false ));

                        //Clean State
                        dispatch( CleanStateInventory() );

                        // Disable inputs inventory
                        dispatch( DisableInputsInventory( true ) );

                        //Set default buttons
                        dispatch( SetDefaultButtonsInventory() );

                        //Clear state Price Sell
                        dispatch( CleanArrayStatePricesSellInventory() );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: (tipo === 'disable') ? 'Inventario desactivado correctamente' : 'Inventario activado correctamente',
                            showConfirmButton: false,
                            timer: 1500
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
                        text: 'Ocurrio un problema al desactivar o activar un Inventario',
                    });
                }
            }
                
        });
        
    }
}

export const startDisableCodigoBarrasInventory = ( descripcion, idInventario, codigo, user ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el codigo de barras ${ descripcion } ?`,
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
                    const { data } = await suvesaApi.post('/inventario/EliminarCodigoBarrasInventario', {
                        idInventario,
                        descripcion,
                        idUsuarioModificacion: user
                    } );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if( status === 0) {

                        dispatch( SetDeleteCodigoBarrasInventory( codigo ) );
                        dispatch( CleanCodigoBarrasActualInventory() );
                        dispatch( SetIndexCodigoBarrasInventory( null ) );
                        dispatch( IsCodigoBarrasEditInventory( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Codigo de barras eliminado correctamente',
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
                        text: 'Ocurrio un problema al eliminar un codigo de barras',
                    });
                }
            }
                
        });
        
    }
}

export const startSearchCodigoCabysInventory = ( codigoCabys ) => {
   
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
            const { data } = await suvesaApi.get(`/Hacienda/Empresa/ObtenerCabys?dato=${codigoCabys}`);
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                // Insertar en el state
                dispatch( SetFilterCodigoCabysIntentory( responses ) );

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
                    text: 'Ocurrio un problema al buscar el codigo cabys',
                });
            }
        }
    }
}

export const startCalculateCantidadDisponiblesConvertidorInventory = ( CodArticuloHijo, CodBodega ) => {
   
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
            const { data } = await suvesaApi.get(`/CalculadoraProduccion/CalcularCantidadHijos`, { params: { 
                CodArticuloHijo,
                CodBodega
             } });
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                // Insertar en el state
                dispatch( SetCantidadDisponiblesConvertidorIntentory( responses ) );

                dispatch( SetCalculoRealizadoConvertidorIntentory(true) );

                dispatch( SetDisableInputBodegaConvertidorIntentory( true ) );

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
                    text: 'Ocurrio un problema al obtener las cantidades disponibles',
                });
            }
        }
    }
}

export const startConvetirCantidadDisponiblesConvertidorInventory = ( CodArticuloHijo, CodBodega, Cantidad ) => {
   
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
            const { data } = await suvesaApi.post(`/CalculadoraProduccion/ConvertirCantidadHijos?CodArticuloHijo=${CodArticuloHijo}&CodBodega=${CodBodega}&Cantidad=${Cantidad}`);
            const { status } = data;
            
            // Cerrar modal
            Swal.close();
            
            if( status === 0 ) {

                await GetStockArticulo(dispatch, CodArticuloHijo);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Convertidor',
                    text: `Se convertido la cantidad ${Cantidad} correctamente.`
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
                    text: 'Ocurrio un problema al obtener las cantidades disponibles',
                });
            }
        }
    }
}

export const startGetAllProductsPadreInventory = () => {
   
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
            const { data } = await suvesaApi.get(`/inventario/ObtenerTodosInventariosPadre`);
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                dispatch( SetAllProductsPadreIntentory( responses ) );

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
                    text: 'Ocurrio un problema al obtener las cantidades disponibles',
                });
            }
        }
    }
}

export const startSetCodPadreInventory = ( CodPadre, codArticulo ) => {
   
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
            const { data } = await suvesaApi.put(`/inventario/putIDInventario?cod_articulo=${codArticulo}&CodPadre=${CodPadre}`);
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {

                dispatch( SetCodigoPadreSelectedInventory( codArticulo ) );

                Swal.fire({
                    icon: 'success',
                    title: 'Codigo Padre',
                    text: `Se configurado correctamente el codigo padre.`,
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
                    text: 'Ocurrio un problema al obtener las cantidades disponibles',
                });
            }
        }
    }
}

export const startSaveArticleFormulaInventory = ( formulaArticle ) => {
   
    return async ( dispatch ) => {

        try {

            let formulaArticles = [];

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

            formulaArticle.forEach(article => {
                if(!article.isNewEdit)
                    formulaArticles.push( article.toJson() );
            });
    
            //Call end-point 
            const { data } = await suvesaApi.post(`/articulosRelacionados`, formulaArticles );
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {

                dispatch(
                    SetFormulaArticleInventory({
                        id: 0,
                        codigo: formulaArticle[0].codigo,
                        cod_Articulo : formulaArticle[0].cod_Articulo,
                        descripcion : formulaArticle[0].descripcion,
                        cantidad : formulaArticle[0].cantidad,
                        isNewEdit: false,
                    })
                );

                dispatch(CleanInputsFormulaArticleInventory());

                Swal.fire({
                    icon: 'success',
                    title: 'Articulo Formula',
                    text: `Se agrego correctamente el articulo de formula.`,
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
                    text: 'Ocurrio un problema al guardar el articulo formula',
                });
            }
        }
    }
}

export const startSetStockInventory = ( Cantidad, codArticulo , CodBodega) => {
   
    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea actualizar el stock del inventario actual?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Actualizar',
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
                    const { data } = await suvesaApi.post(`/Stocks/ActualizarExistenciaArticulo?Cantidad=${Cantidad}&CodBodega=${CodBodega}&CodArticulo=${codArticulo}`);
                    const { status } = data;
                    
                    // Cerrar modal
                    Swal.close();

                    if( status === 0 ) {

                        dispatch( SetLastStockUpdateInventory( Cantidad ) );

                        Swal.fire({
                            icon: 'success',
                            title: 'Stock',
                            text: `Se cambio el stock correctamente.`,
                            timer: 1000,
                            showConfirmButton: false
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
                        text: 'Ocurrio un problema al actualizar el stock',
                    });
                }
            }

        });
        
    }
}

export const startUpdateArticleRelatedInventory = ( codigoPrincipal, codigoArticuloRelacionado , Cantidad, Activo) => {
   
    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea actualizar el Artículo relacionado?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Actualizar',
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
                    const { data } = await suvesaApi.put(`/articulosRelacionados/putArticuloRelacionado?codigoPrincipal=${codigoPrincipal}&codigoArticuloRelacionado=${codigoArticuloRelacionado}&Cantidad=${Cantidad}&Activo=${Activo}`);
                    const { status } = data;
                    
                    // Cerrar modal
                    Swal.close();

                    if( status === 0 ) {

                        dispatch( SetEditRelatedArticleInventory({
                            codigo: codigoArticuloRelacionado,
                            cantidad: Cantidad
                        }));

                        dispatch( IsSelectedRelatedArticleInventory(false) );
                        dispatch( CleanInputsRelatedArticleInventory() );

                        Swal.fire({
                            icon: 'success',
                            title: 'Stock',
                            text: `Se cambio el artículo relacionado correctamente.`,
                            timer: 1000,
                            showConfirmButton: false
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
                        text: 'Ocurrio un problema al actualizar el artículo relacionados',
                    });
                }
            }

        });
        
    }
}

export const startUpdateArticleFormulaInventory = ( codigoPrincipal, codigoArticuloRelacionado , Cantidad, Activo) => {
   
    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea actualizar el Artículo Formula?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Actualizar',
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
                    const { data } = await suvesaApi.put(`/articulosRelacionados/putArticuloRelacionadoFormula?codigoPrincipal=${codigoPrincipal}&codigoArticuloRelacionado=${codigoArticuloRelacionado}&Cantidad=${Cantidad}&Activo=${Activo}`);
                    const { status } = data;
                    
                    // Cerrar modal
                    Swal.close();

                    if( status === 0 ) {

                        dispatch( SetEditFormulaArticleInventory({
                            codigo: codigoArticuloRelacionado,
                            cantidad: Cantidad
                        }));

                        dispatch( SetIsSelectedFormulaArticleInventory(false) );
                        dispatch( CleanInputsFormulaArticleInventory() );

                        Swal.fire({
                            icon: 'success',
                            title: 'Stock',
                            text: `Se cambio el artículo formula correctamente.`,
                            timer: 1000,
                            showConfirmButton: false
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
                        text: 'Ocurrio un problema al actualizar el artículo formula',
                    });
                }
            }

        });
        
    }
}

export const startDeleteFormulaArticle = ( codigoPrincipal, codigoArticuloRelacionado , Cantidad, Activo ) => {

    return async ( dispatch ) => {

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el Artículo Formula?`,
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
                    const { data } = await suvesaApi.put(`/articulosRelacionados/putArticuloRelacionadoFormula?codigoPrincipal=${codigoPrincipal}&codigoArticuloRelacionado=${codigoArticuloRelacionado}&Cantidad=${Cantidad}&Activo=${Activo}`);
                    const { status } = data;

                    //Quitar el loading
                    Swal.close();
                
                    if( status === 0) {

                        //Delete data in array
                        dispatch( RemoveFormulaArticleInventory( codigoArticuloRelacionado ) );

                        //Is Seleted related article false
                        dispatch( SetIsSelectedFormulaArticleInventory( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Articulo Formula eliminado correctamente',
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
                        text: 'Ocurrio un problema al eliminar un articulo Formula',
                    });
                }
            }
                
        });
        
    }
}

export const startGetStockLotesArticulo = ( codigoPrincipal) => {

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
            const { data } = await suvesaApi.get(`/StockLote/getStockLotesArticulo?Request=${codigoPrincipal}`);
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();
        
            if( status === 0) {

                const lotes = responses.map( lot => {
                    return {
                        lote: lot.lote,
                        vencimiento: lot.vencimiento,
                        existencia: lot.existencia
                    }
                });

                dispatch( SetArrayLotesInventory(lotes) );

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
                    text: 'Ocurrio un problema al obtener el stock del lote',
                });
            }
        }

    }
}

export const startValidarLotesVencidos = () => {

    return async ( dispatch ) => {
        //Call end-point 
        await suvesaApi.put(`/StockLote/ValidarLotesVencidos`);
    }
}

export const startSaveLote = ( lote, codArticulo) => {

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
            
            const jsonLote = {
                id: 0,
                lote: lote.lote,
                vencimiento: lote.vencimiento,
                activo: true
            }
    
            //Call end-point para crear el lote
            const { data } = await suvesaApi.post(`/StockLote/InsertLote`, jsonLote );
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {

                const { id } = responses;

                //Call end-point para actualizar el stock del lote
                const { data } = await suvesaApi.put(`/Stocks/ActualizarExistenciaArticuloLote?Cantidad=${lote.existencia}&CodBodega=6&CodArticulo=${codArticulo}&Lote=${id}` );

                if( data.status === 0 ) {

                    dispatch( SetLotesInventory(lote) );
                    dispatch( CleanInputsLotesInventory() );

                    Swal.fire({
                        icon: 'success',
                        title: 'Lotes',
                        text: `Se agrego correctamente el lote.`,
                    });

                } else {

                    //Si es correcta entonces mostrar un mensaje de afirmacion pero con error en carta
                    Swal.fire({
                        icon: 'warning',
                        title: 'Lote ingresado sin actualizar la existencia.',
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
                    text: 'Ocurrio un problema al crear un nuevo lote.',
                });
            }
        }
    }
}

// Functions
const CalculatePreciosVenta = ( base, flete, otroC, impuesto, pre ) => {

    if(!isNaN(base) && !isNaN(impuesto) && !isNaN(pre)){
                
        if(isNaN(flete)) flete = 0;

        if(isNaN(otroC)) otroC = 0;

        const utilidad = (((pre - flete - otroC) / base) -1) * 100;
        const precioIV = pre * ( impuesto / 100 ) + pre;

        return {
            utilidad : parseInt(utilidad),
            precioIV 
        }
    }
}

const GetStockArticulo = async ( dispatch, idInventario ) => {

    try {

        //Call end-point
        const resp = await suvesaApi.post(`/Stocks/ExistenciaArticuloCostaPets?id=${idInventario}&tipo=1`);
        const { status, responses } = resp.data;

        // Verificar la respuesta
        if( status === 0 ) {

            // Meter el stock
            dispatch( SetStockInventory( responses ) );

            dispatch( SetLastStockUpdateInventory( responses ) );

       } else {

            Swal.fire({
               icon: 'warning',
               title: 'Stock del articulo no cargado correctamente',
               showConfirmButton: true,
           });
       }

    } catch(error) {
        throw error;
    }
}

const GetCostoArticulo = async ( codArticulo, costoArt, nombreArt ) => {

    try {
        
        //Call end-point
        const resp = await suvesaApi.post(`/articulosRelacionados/getObtenerCostoRelacionados?CodArticulo=${codArticulo}`);
        const { status, responses } = resp.data;

        // Verificar la respuesta
        if( status === 0 ) {

            let costoArticulo = parseFloat(costoArt);
            let costoCalculado = parseFloat(responses);

            if(costoArticulo < costoCalculado) {

                //Mostrar un mensaje de confirmacion
                Swal.fire({
                    title: `¿El artículo ${nombreArt} tiene un costo actual de ${costoArt} y el costo calculado es de ${costoCalculado} desea cambiarlo?`,
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Cambiar',
                    denyButtonText: `Cancelar`,
                }).then(async (result) => {

                    if( result.isConfirmed ) {

                        //Call end-point
                        const resp = await suvesaApi.put(`/inventario/putActualizarCosto?CodigoArticulo=${codArticulo}&CostoNuevo=${costoCalculado}`);
                        const { status, responses } = resp.data;

                        // Verificar la respuesta
                        if( status === 0 ) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Costo',
                                text: `Se cambio el costo del artículo ${nombreArt} se cambio correctamente.`,
                                timer: 1000,
                                showConfirmButton: false
                            });

                        } else {

                            Swal.fire({
                                icon: 'warning',
                                title: 'Error al cambiar el costo del articulo',
                                showConfirmButton: true,
                            });

                        }

                    }

                });

            }

        } else {

            Swal.fire({
               icon: 'warning',
               title: 'Error al obtener el costo del articulo',
               showConfirmButton: true,
           });
        }

    } catch(error) {
        throw error;
    }
}

//Normal Actions
export const SelectTabInventory = ( nameTab ) => ({
    type: types.SelectTabInventory,
    payload: {
        nameTab
    }
});

export const SetCodigoInventory = ( value ) => ({
    type: types.SetCodigoInventory,
    payload: value
});

export const SetCod_ArticuloInventory = ( value ) => ({
    type: types.SetCod_ArticuloInventory,
    payload: value
});

export const SetBarrasInventory = ( value ) => ({
    type: types.SetBarrasInventory,
    payload: value
});

export const SetDescripcionInventory = ( value ) => ({
    type: types.SetDescripcionInventory,
    payload: value
});

export const SetPresentaCantInventory = ( value ) => ({
    type: types.SetPresentaCantInventory,
    payload: value
});

export const SetCodPresentacionInventory = ( value ) => ({
    type: types.SetCodPresentacionInventory,
    payload: value
});

export const SetCodMarcaInventory = ( value ) => ({
    type: types.SetCodMarcaInventory,
    payload: value
});

export const SetSubFamiliaInventory = ( value ) => ({
    type: types.SetSubFamiliaInventory,
    payload: value
});

export const SetMinimaInventory = ( value ) => ({
    type: types.SetMinimaInventory,
    payload: value
});

export const SetPuntoMedioInventory = ( value ) => ({
    type: types.SetPuntoMedioInventory,
    payload: value
});

export const SetMaximaInventory = ( value ) => ({
    type: types.SetMaximaInventory,
    payload: value
});

export const SetExistenciaInventory = ( value ) => ({
    type: types.SetExistenciaInventory,
    payload: value
});

export const SetSubUbicacionInventory = ( value ) => ({
    type: types.SetSubUbicacionInventory,
    payload: value
});

export const SetObservacionesInventory = ( value ) => ({
    type: types.SetObservacionesInventory,
    payload: value
});

export const SetMonedaCostoInventory = ( value ) => ({
    type: types.SetMonedaCostoInventory,
    payload: value
});

export const SetPrecioBaseInventory = ( value ) => ({
    type: types.SetPrecioBaseInventory,
    payload: value
});

export const SetFletesInventory = ( value ) => ({
    type: types.SetFletesInventory,
    payload: value
});

export const SetOtrosCargosInventory = ( value ) => ({
    type: types.SetOtrosCargosInventory,
    payload: value
});

export const SetCostoInventory = ( value ) => ({
    type: types.SetCostoInventory,
    payload: value
});

export const SetMonedaVentaInventory = ( value ) => ({
    type: types.SetMonedaVentaInventory,
    payload: value
});

export const SetIVentaInventory = ( value ) => ({
    type: types.SetIVentaInventory,
    payload: value
});

export const SetPrecio_AInventory = ( value ) => ({
    type: types.SetPrecio_AInventory,
    payload: value
});

export const SetPrecio_BInventory = ( value ) => ({
    type: types.SetPrecio_BInventory,
    payload: value
});

export const SetPrecio_CInventory = ( value ) => ({
    type: types.SetPrecio_CInventory,
    payload: value
});

export const SetPrecio_DInventory = ( value ) => ({
    type: types.SetPrecio_DInventory,
    payload: value
});

export const SetPrecio_PromoInventory = ( value ) => ({
    type: types.SetPrecio_PromoInventory,
    payload: value
});

export const SetPromo_ActivaInventory = ( value ) => ({
    type: types.SetPromo_ActivaInventory,
    payload: value
});

export const SetPromo_InicioInventory = ( value ) => ({
    type: types.SetPromo_InicioInventory,
    payload: value
});

export const SetPromo_FinalizaInventory = ( value ) => ({
    type: types.SetPromo_FinalizaInventory,
    payload: value
});

export const SetMax_ComisionInventory = ( value ) => ({
    type: types.SetMax_ComisionInventory,
    payload: value
});

export const SetMax_DescuentoInventory = ( value ) => ({
    type: types.SetMax_DescuentoInventory,
    payload: value
});

export const SetServicioInventory = ( value ) => ({
    type: types.SetServicioInventory,
    payload: value
});

export const SetInhabilitadoInventory = ( value ) => ({
    type: types.SetInhabilitadoInventory,
    payload: value
});

export const SetProveedorInventory = ( value ) => ({
    type: types.SetProveedorInventory,
    payload: value
});

export const SetPrecio_SugeridoInventory = ( value ) => ({
    type: types.SetPrecio_SugeridoInventory,
    payload: value
});

export const SetSugeridoIVInventory = ( value ) => ({
    type: types.SetSugeridoIVInventory,
    payload: value
});

export const SetPreguntaPrecioInventory = ( value ) => ({
    type: types.SetPreguntaPrecioInventory,
    payload: value
});

export const SetLoteInventory = ( value ) => ({
    type: types.SetLoteInventory,
    payload: value
});

export const SetConsignacionInventory = ( value ) => ({
    type: types.SetConsignacionInventory,
    payload: value
});

export const SetId_BodegaInventory = ( value ) => ({
    type: types.SetId_BodegaInventory,
    payload: value
});

export const SetExistenciaBodegaInventory = ( value ) => ({
    type: types.SetExistenciaBodegaInventory,
    payload: value
});

export const SetMaX_InventarioInventory = ( value ) => ({
    type: types.SetMaX_InventarioInventory,
    payload: value
});

export const SetMaX_BodegaInventory = ( value ) => ({
    type: types.SetMaX_BodegaInventory,
    payload: value
});

export const SetCantidadDescargaInventory = ( value ) => ({
    type: types.SetCantidadDescargaInventory,
    payload: value
});

export const SetCodigoDescargaInventory = ( value ) => ({
    type: types.SetCodigoDescargaInventory,
    payload: value
});

export const SetDescargaOtroInventory = ( value ) => ({
    type: types.SetDescargaOtroInventory,
    payload: value
});

export const SetCod_PresentOtroInventory = ( value ) => ({
    type: types.SetCod_PresentOtroInventory,
    payload: value
});

export const SetCantidadPresentOtroInventory = ( value ) => ({
    type: types.SetCantidadPresentOtroInventory,
    payload: value
});

export const SetExistenciaForzadaInventory = ( value ) => ({
    type: types.SetExistenciaForzadaInventory,
    payload: value
});

export const SetBloqueadoInventory = ( value ) => ({
    type: types.SetBloqueadoInventory,
    payload: value
});

export const SetPantallaInventory = ( value ) => ({
    type: types.SetPantallaInventory,
    payload: value
});

export const SetClinicaInventory = ( value ) => ({
    type: types.SetClinicaInventory,
    payload: value
});

export const SetMascotasInventory = ( value ) => ({
    type: types.SetMascotasInventory,
    payload: value
});

export const SetRecetaInventory = ( value ) => ({
    type: types.SetRecetaInventory,
    payload: value
});

export const SetPecesInventory = ( value ) => ({
    type: types.SetPecesInventory,
    payload: value
});

export const SetTallerInventory = ( value ) => ({
    type: types.SetTallerInventory,
    payload: value
});

export const SetBarras2Inventory = ( value ) => ({
    type: types.SetBarras2Inventory,
    payload: value
});

export const SetBarras3Inventory = ( value ) => ({
    type: types.SetBarras3Inventory,
    payload: value
});

export const SetApartadoInventory = ( value ) => ({
    type: types.SetApartadoInventory,
    payload: value
});

export const SetPromo3x1Inventory = ( value ) => ({
    type: types.SetPromo3x1Inventory,
    payload: value
});

export const SetOrdenInventory = ( value ) => ({
    type: types.SetOrdenInventory,
    payload: value
});

export const SetBonificadoInventory = ( value ) => ({
    type: types.SetBonificadoInventory,
    payload: value
});

export const SetEncargadoInventory = ( value ) => ({
    type: types.SetEncargadoInventory,
    payload: value
});

export const SetSerieInventory = ( value ) => ({
    type: types.SetSerieInventory,
    payload: value
});

export const SetArmamentoInventory = ( value ) => ({
    type: types.SetArmamentoInventory,
    payload: value
});

export const SetTiendaInventory = ( value ) => ({
    type: types.SetTiendaInventory,
    payload: value
});

export const SetPrestamoInventory = ( value ) => ({
    type: types.SetPrestamoInventory,
    payload: value
});

export const SetMaquinariaInventory = ( value ) => ({
    type: types.SetMaquinariaInventory,
    payload: value
});

export const SetProductos_organicosInventory = ( value ) => ({
    type: types.SetProductos_organicosInventory,
    payload: value
});

export const SetRifaInventory = ( value ) => ({
    type: types.SetRifaInventory,
    payload: value
});

export const SetPromoCONInventory = ( value ) => ({
    type: types.SetPromoCONInventory,
    payload: value
});

export const SetPromoCREInventory = ( value ) => ({
    type: types.SetPromoCREInventory,
    payload: value
});

export const SetCostoRealInventory = ( value ) => ({
    type: types.SetCostoRealInventory,
    payload: value
});

export const SetValidaExistenciaInventory = ( value ) => ({
    type: types.SetValidaExistenciaInventory,
    payload: value
});

export const SetActualizadoInventory = ( value ) => ({
    type: types.SetActualizadoInventory,
    payload: value
});

export const SetId_ImpuestoInventory = ( value ) => ({
    type: types.SetId_ImpuestoInventory,
    payload: value
});

export const SetActivarBodega2Inventory = ( value ) => ({
    type: types.SetActivarBodega2Inventory,
    payload: value
});

export const SetExistenciaBodega2Inventory = ( value ) => ({
    type: types.SetExistenciaBodega2Inventory,
    payload: value
});

export const SetEnTomaInventory = ( value ) => ({
    type: types.SetEnTomaInventory,
    payload: value
});

export const SetUsaGalonInventory = ( value ) => ({
    type: types.SetUsaGalonInventory,
    payload: value
});

export const SetApicarDescuentoTarjetaInventory = ( value ) => ({
    type: types.SetApicarDescuentoTarjetaInventory,
    payload: value
});

export const SetSoloContadoInventory = ( value ) => ({
    type: types.SetSoloContadoInventory,
    payload: value
});

export const SetSoloConExistenciaInventory = ( value ) => ({
    type: types.SetSoloConExistenciaInventory,
    payload: value
});

export const SetMagInventory = ( value ) => ({
    type: types.SetMagInventory,
    payload: value
});

export const SetSinDecimalInventory = ( value ) => ({
    type: types.SetSinDecimalInventory,
    payload: value
});

export const SetCodcabysInventory = ( value ) => ({
    type: types.SetCodcabysInventory,
    payload: value
});

export const SetCodigoPrestamoInventory = ( value ) => ({
    type: types.SetCodigoPrestamoInventory,
    payload: value
});

export const SetMuestraInventory = ( value ) => ({
    type: types.SetMuestraInventory,
    payload: value
});

export const SetWebInventory = ( value ) => ({
    type: types.SetWebInventory,
    payload: value
});

export const SetSoloUsoInternoInventory = ( value ) => ({
    type: types.SetSoloUsoInternoInventory,
    payload: value
});

export const SetCodigoIntQVETInventory = ( value ) => ({
    type: types.SetCodigoIntQVETInventory,
    payload: value
});

export const SetCodigoProInventory = ( value ) => ({
    type: types.SetCodigoProInventory,
    payload: value
});

export const SetDescripcionProInventory = ( value ) => ({
    type: types.SetDescripcionProInventory,
    payload: value
});

export const SetEsPadreInventory = ( value ) => ({
    type: types.SetEsPadreInventory,
    payload: value
});

export const ActiveButtonNewInventory = ( value ) => ({
    type: types.ActiveButtonNewInventory,
    payload: value
});

export const ActiveButtonSearchInventory = ( value ) => ({
    type: types.ActiveButtonSearchInventory,
    payload: value
});

export const ActiveButtonSaveInventory = ( value ) => ({
    type: types.ActiveButtonSaveInventory,
    payload: value
});

export const ActiveButtonRemoveInventory = ( value ) => ({
    type: types.ActiveButtonRemoveInventory,
    payload: value
});

export const SetDefaultButtonsInventory = () => ({
    type: types.SetDefaultButtonsInventory
});

export const DisableInputsInventory = ( value ) => ({
    type: types.DisableInputsInventory,
    payload: value
});

export const SetHasRebajaOtroArt = ( value ) => ({
    type: types.SetHasRebajaOtroArt,
    payload: value
});

export const CleanStateInventory = () => ({
    type: types.CleanStateInventory
});

export const IsNewInventory = ( value ) => ({
    type: types.IsNewInventory,
    payload: value
});

export const SetPreciosVentaInventory = ( value ) => ({
    type: types.SetPreciosVentaInventory,
    payload: value
});

export const SetWasFullPricesSellInventory = ( value ) => ({
    type: types.SetWasFullPricesSellInventory,
    payload: value
});

export const SelectedPricesSellInventory = ( value ) => ({
    type: types.SelectedPricesSellInventory,
    payload: value
});

export const SetTipoPricesSellInventory = ( value ) => ({
    type: types.SetTipoPricesSellInventory,
    payload: value
});

export const SetUtilidadPricesSellInventory = ( value ) => ({
    type: types.SetUtilidadPricesSellInventory,
    payload: value
});

export const SetPrecioPricesSellInventory = ( value ) => ({
    type: types.SetPrecioPricesSellInventory,
    payload: value
});

export const SetPrecioIVPricesSellInventory = ( value ) => ({
    type: types.SetPrecioIVPricesSellInventory,
    payload: value
});

export const CleanStatePricesSellInventory = () => ({
    type: types.CleanStatePricesSellInventory
});

export const CleanArrayStatePricesSellInventory = () => ({
    type: types.CleanArrayStatePricesSellInventory
});

export const IsEditPricesSellInventory = ( value ) => ({
    type: types.IsEditPricesSellInventory,
    payload: value
});

export const EditPricesSellInventory = ( value ) => ({
    type: types.EditPricesSellInventory,
    payload: value
});

export const RemovePricesSellInventory = ( value ) => ({
    type: types.RemovePricesSellInventory,
    payload: value
});

export const SetHasChangeUtilidadPricesSellInventory = ( value ) => ({
    type: types.SetHasChangeUtilidadPricesSellInventory,
    payload: value
});

export const SetHasChangePrecioPricesSellInventory = ( value ) => ({
    type: types.SetHasChangePrecioPricesSellInventory,
    payload: value
});

export const SetHasChangePrecioIVPricesSellInventory = ( value ) => ({
    type: types.SetHasChangePrecioIVPricesSellInventory,
    payload: value
});

export const OpenSearchModalInventory = () => ({
    type: types.OpenSearchModalInventory
});

export const CloseSearchModalInventory = () => ({
    type: types.CloseSearchModalInventory
});

export const SetValorFiltroSearchModalInventory = ( value ) => ({
    type: types.SetValorFiltroSearchModalInventory,
    payload: value
})

export const SetDescripcionSearchModalInventory = ( value ) => ({
    type: types.SetDescripcionSearchModalInventory,
    payload: value
})

export const SetUbicacionSearchModalInventory = ( value ) => ({
    type: types.SetUbicacionSearchModalInventory,
    payload: value
})

export const SetBarrasSearchModalInventory = ( value ) => ({
    type: types.SetBarrasSearchModalInventory,
    payload: value
})

export const SetCodigoSearchModalInventory = ( value ) => ({
    type: types.SetCodigoSearchModalInventory,
    payload: value
})

export const SetInicioCampoSearchModalInventory = ( value ) => ({
    type: types.SetInicioCampoSearchModalInventory,
    payload: value
})

export const SetCualquierParteSearchModalInventory = ( value ) => ({
    type: types.SetCualquierParteSearchModalInventory,
    payload: value
})

export const SetMostrarInhabilitadosSearchModalInventory = ( value ) => ({
    type: types.SetMostrarInhabilitadosSearchModalInventory,
    payload: value
})

export const SetMostrarImpuestosSearchModalInventory = ( value ) => ({
    type: types.SetMostrarImpuestosSearchModalInventory,
    payload: value
})

export const CleanOptionsSearchModalInventory = () => ({
    type: types.CleanOptionsSearchModalInventory
})

export const SetSearchInventory = ( value ) => ({
    type: types.SetSearchInventory,
    payload: value
})

export const CleanSearchInventory = () => ({
    type: types.CleanSearchInventory
})

export const SelectedSearchInventory = ( value ) => ({
    type: types.SelectedSearchInventory,
    payload: value
})

export const SetCodigoRelatedArticleInventory = ( value ) => ({
    type: types.SetCodigoRelatedArticleInventory,
    payload: value
})

export const SetCodigoArtRelatedArticleInventory = ( value ) => ({
    type: types.SetCodigoArtRelatedArticleInventory,
    payload: value
})

export const SetDescripcionRelatedArticleInventory = ( value ) => ({
    type: types.SetDescripcionRelatedArticleInventory,
    payload: value
})

export const SetCantidadRelatedArticleInventory = ( value ) => ({
    type: types.SetCantidadRelatedArticleInventory,
    payload: value
})

export const SetRelatedArticleInventory = ( value ) => ({
    type: types.SetRelatedArticleInventory,
    payload: value
})

export const SetEditRelatedArticleInventory = ( value ) => ({
    type: types.SetEditRelatedArticleInventory,
    payload: value
})

export const CleanInputsRelatedArticleInventory = () => ({
    type: types.CleanInputsRelatedArticleInventory
})

export const SelectedRelatedArticleInventory = ( value ) => ({
    type: types.SelectedRelatedArticleInventory,
    payload: value
})

export const IsSelectedRelatedArticleInventory = ( value ) => ({
    type: types.IsSelectedRelatedArticleInventory,
    payload: value
})

export const RemoveRelatedArticleInventory = ( value ) => ({
    type: types.RemoveRelatedArticleInventory,
    payload: value
})

export const SetArrayRelatedArticleInventory = ( value ) => ({
    type: types.SetArrayRelatedArticleInventory,
    payload: value
})

export const CleanRelatedArticleInventory = () => ({
    type: types.CleanRelatedArticleInventory
})

export const IsEditInventory = ( value ) => ({
    type: types.IsEditInventory,
    payload: value
})

export const IsInventoryDisable = ( value ) => ({
    type: types.IsInventoryDisable,
    payload: value
})

export const IsOpenSearchModalRebaja = ( value ) => ({
    type: types.IsOpenSearchModalRebaja,
    payload: value
})

export const SetDescripcionRebajaOtro = ( value ) => ({
    type: types.SetDescripcionRebajaOtro,
    payload: value
})

export const IsOpenSearchModalRelacionados = ( value ) => ({
    type: types.IsOpenSearchModalRelacionados,
    payload: value
})

export const SetDefaultPresentacionFilterInventory = ( value ) => ({
    type: types.SetDefaultPresentacionFilterInventory,
    payload: value
})

export const SetSearchPresentacionFilterInventory = ( value ) => ({
    type: types.SetSearchPresentacionFilterInventory,
    payload: value
})

export const SetValorFiltroPresentacionInventory = ( value ) => ({
    type: types.SetValorFiltroPresentacionInventory,
    payload: value
})

export const SetOpenModalSearchPresentacionInventory = ( value ) => ({
    type: types.SetOpenModalSearchPresentacionInventory,
    payload: value
})

export const CleanValorFiltroPresentacionInventory = () => ({
    type: types.CleanValorFiltroPresentacionInventory,
})

export const SetDefaultFamiliasFilterInventory = ( value ) => ({
    type: types.SetDefaultFamiliasFilterInventory,
    payload: value
})

export const SetSearchFamiliasFilterInventory = ( value ) => ({
    type: types.SetSearchFamiliasFilterInventory,
    payload: value
})

export const SetValorFiltroFamiliasInventory = ( value ) => ({
    type: types.SetValorFiltroFamiliasInventory,
    payload: value
})

export const SetOpenModalSearchFamiliasInventory = ( value ) => ({
    type: types.SetOpenModalSearchFamiliasInventory,
    payload: value
})

export const CleanValorFiltroFamiliasInventory = () => ({
    type: types.CleanValorFiltroFamiliasInventory,
})

export const SetDefaultUbicacionFilterInventory = ( value ) => ({
    type: types.SetDefaultUbicacionFilterInventory,
    payload: value
})

export const SetSearchUbicacionFilterInventory = ( value ) => ({
    type: types.SetSearchUbicacionFilterInventory,
    payload: value
})

export const SetValorFiltroUbicacionInventory = ( value ) => ({
    type: types.SetValorFiltroUbicacionInventory,
    payload: value
})

export const SetOpenModalSearchUbicacionInventory = ( value ) => ({
    type: types.SetOpenModalSearchUbicacionInventory,
    payload: value
})

export const CleanValorFiltroUbicacionInventory = () => ({
    type: types.CleanValorFiltroUbicacionInventory,
})

export const SetDefaultProveedorFilterInventory = ( value ) => ({
    type: types.SetDefaultProveedorFilterInventory,
    payload: value
})

export const SetSearchProveedorFilterInventory = ( value ) => ({
    type: types.SetSearchProveedorFilterInventory,
    payload: value
})

export const SetValorFiltroProveedorInventory = ( value ) => ({
    type: types.SetValorFiltroProveedorInventory,
    payload: value
})

export const SetOpenModalSearchProveedorInventory = ( value ) => ({
    type: types.SetOpenModalSearchProveedorInventory,
    payload: value
})

export const CleanValorFiltroProveedorInventory = () => ({
    type: types.CleanValorFiltroProveedorInventory,
})

export const SetDefaultBodegaFilterInventory = ( value ) => ({
    type: types.SetDefaultBodegaFilterInventory,
    payload: value
})

export const SetSearchBodegaFilterInventory = ( value ) => ({
    type: types.SetSearchBodegaFilterInventory,
    payload: value
})

export const SetValorFiltroBodegaInventory = ( value ) => ({
    type: types.SetValorFiltroBodegaInventory,
    payload: value
})

export const SetOpenModalSearchBodegaInventory = ( value ) => ({
    type: types.SetOpenModalSearchBodegaInventory,
    payload: value
})

export const CleanValorFiltroBodegaInventory = () => ({
    type: types.CleanValorFiltroBodegaInventory,
})

export const SetIdBodegaDetalleArticuloBodega = (value) => ({
    type: types.SetIdBodegaDetalleArticuloBodega,
    payload: value
})

export const SetDescripcionDetalleArticuloBodega = (value) => ({
    type: types.SetDescripcionDetalleArticuloBodega,
    payload: value
})

export const SetExistenciaDetalleArticuloBodega = (value) => ({
    type: types.SetExistenciaDetalleArticuloBodega,
    payload: value
})

export const SetAddDetalleArticuloBodega = (value) => ({
    type: types.SetAddDetalleArticuloBodega,
    payload: value
})

export const SetAddCategoriaInventory = (value) => ({
    type: types.SetAddCategoriaInventory,
    payload: value
})

export const SetCategoriaActualInventory = (value) => ({
    type: types.SetCategoriaActualInventory,
    payload: value
})

export const CleanCategoriaActualInventory = () => ({
    type: types.CleanCategoriaActualInventory
})

export const IsCategoriaEditInventory = (value) => ({
    type: types.IsCategoriaEditInventory,
    payload: value
})

export const SetIndexCategoriaInventory = (value) => ({
    type: types.SetIndexCategoriaInventory,
    payload: value
})

export const SetEditCategoriaInventory = (value) => ({
    type: types.SetEditCategoriaInventory,
    payload: value
})

export const SetDeleteCategoriaInventory = (value) => ({
    type: types.SetDeleteCategoriaInventory,
    payload: value
})

export const IsOpenModalCreateCategoriaInventory = (value) => ({
    type: types.IsOpenModalCreateCategoriaInventory,
    payload: value
})

export const SetAddCodigoBarrasInventory = (value) => ({
    type: types.SetAddCodigoBarrasInventory,
    payload: value
})

export const SetDescripcionCodigoBarrasActualInventory = (value) => ({
    type: types.SetDescripcionCodigoBarrasActualInventory,
    payload: value
})

export const SetCodigoCodigoBarrasActualInventory = (value) => ({
    type: types.SetCodigoCodigoBarrasActualInventory,
    payload: value
})

export const SetTarifaCodigoBarrasActualInventory = (value) => ({
    type: types.SetTarifaCodigoBarrasActualInventory,
    payload: value
})

export const CleanCodigoBarrasActualInventory = (value) => ({
    type: types.CleanCodigoBarrasActualInventory,
    payload: value
})

export const IsCodigoBarrasEditInventory = (value) => ({
    type: types.IsCodigoBarrasEditInventory,
    payload: value
})

export const SetEditCodigoBarrasInventory = (value) => ({
    type: types.SetEditCodigoBarrasInventory,
    payload: value
})

export const SetIndexCodigoBarrasInventory = (value) => ({
    type: types.SetIndexCodigoBarrasInventory,
    payload: value
})

export const SetDeleteCodigoBarrasInventory = (value) => ({
    type: types.SetDeleteCodigoBarrasInventory,
    payload: value
})

export const IsShowTabCodigoBarrasInventory = (value) => ({
    type: types.IsShowTabCodigoBarrasInventory,
    payload: value
})

export const SelectCategoriasSearchInventory = (value) => ({
    type: types.SelectCategoriasSearchInventory,
    payload: value
})

export const SelectCodigoBarrasSearchInventory = (value) => ({
    type: types.SelectCodigoBarrasSearchInventory,
    payload: value
})

export const SetOpenModalSearchCodigoCabysInventory = (value) => ({
    type: types.SetOpenModalSearchCodigoCabysInventory,
    payload: value
})

export const SetValorFiltroCodigoCabysInventory = (value) => ({
    type: types.SetValorFiltroCodigoCabysInventory,
    payload: value
})

export const SetFilterCodigoCabysIntentory = (value) => ({
    type: types.SetFilterCodigoCabysIntentory,
    payload: value
})

export const CleanStateSearchCodigoCabysInventory = () => ({
    type: types.CleanStateSearchCodigoCabysInventory
})

export const SetIdTipoArticuloSelectedIntentory = (value) => ({
    type: types.SetIdTipoArticuloSelectedIntentory,
    payload: value
})

export const SetIdBodegaSelectedConvertidorIntentory = (value) => ({
    type: types.SetIdBodegaSelectedConvertidorIntentory,
    payload: value
})

export const SetCantidadDisponiblesConvertidorIntentory = (value) => ({
    type: types.SetCantidadDisponiblesConvertidorIntentory,
    payload: value
})

export const SetCalculoRealizadoConvertidorIntentory = (value) => ({
    type: types.SetCalculoRealizadoConvertidorIntentory,
    payload: value
})

export const SetCantidadConvertirConvertidorIntentory = (value) => ({
    type: types.SetCantidadConvertirConvertidorIntentory,
    payload: value
})

export const SetDisableInputBodegaConvertidorIntentory = (value) => ({
    type: types.SetDisableInputBodegaConvertidorIntentory,
    payload: value
})

export const SetAllProductsPadreIntentory = (value) => ({
    type: types.SetAllProductsPadreIntentory,
    payload: value
})

export const SetCodigoFormulaArticleInventory = (value) => ({
    type: types.SetCodigoFormulaArticleInventory,
    payload: value
})

export const SetCodigoArtFormulaArticleInventory = (value) => ({
    type: types.SetCodigoArtFormulaArticleInventory,
    payload: value
})

export const SetDescripcionFormulaArticleInventory = (value) => ({
    type: types.SetDescripcionFormulaArticleInventory,
    payload: value
})

export const SetCantidadFormulaArticleInventory = (value) => ({
    type: types.SetCantidadFormulaArticleInventory,
    payload: value
})

export const SetIsSelectedFormulaArticleInventory = (value) => ({
    type: types.SetIsSelectedFormulaArticleInventory,
    payload: value
})

export const SetFormulaArticleInventory = (value) => ({
    type: types.SetFormulaArticleInventory,
    payload: value
})

export const SetEditFormulaArticleInventory = (value) => ({
    type: types.SetEditFormulaArticleInventory,
    payload: value
})

export const RemoveFormulaArticleInventory = (value) => ({
    type: types.RemoveFormulaArticleInventory,
    payload: value
})

export const CleanInputsFormulaArticleInventory = (value) => ({
    type: types.CleanInputsFormulaArticleInventory,
    payload: value
})

export const IsOpenSearchModalFormulaInventory = (value) => ({
    type: types.IsOpenSearchModalFormulaInventory,
    payload: value
})

export const SetCodigoPadreSelectedInventory = (value) => ({
    type: types.SetCodigoPadreSelectedInventory,
    payload: value
})

export const SetIsDisableInputStockInventory = (value) => ({
    type: types.SetIsDisableInputStockInventory,
    payload: value
})

export const SetStockInventory = (value) => ({
    type: types.SetStockInventory,
    payload: value
})

export const SetLastStockUpdateInventory = (value) => ({
    type: types.SetLastStockUpdateInventory,
    payload: value
})

export const SetArrayFormulaArticleInventory = (value) => ({
    type: types.SetArrayFormulaArticleInventory,
    payload: value
})

export const SetIsArticleRelatedInventory = (value) => ({
    type: types.SetIsArticleRelatedInventory,
    payload: value
})

export const SetNumLoteLotesInventory = (value) => ({
    type: types.SetNumLoteLotesInventory,
    payload: value
})

export const SetVencimientoLotesInventory = (value) => ({
    type: types.SetVencimientoLotesInventory,
    payload: value
})

export const SetExistenciaLotesInventory = (value) => ({
    type: types.SetExistenciaLotesInventory,
    payload: value
})

export const SetIsSelectedLoteInventory = (value) => ({
    type: types.SetIsSelectedLoteInventory,
    payload: value
})

export const SetLotesInventory = (value) => ({
    type: types.SetLotesInventory,
    payload: value
})

export const SetArrayLotesInventory = (value) => ({
    type: types.SetArrayLotesInventory,
    payload: value
})

export const SetEditLotesInventory = (value) => ({
    type: types.SetEditLotesInventory,
    payload: value
})

export const RemoveLotesInventory = (value) => ({
    type: types.RemoveLotesInventory,
    payload: value
})

export const CleanInputsLotesInventory = () => ({
    type: types.CleanInputsLotesInventory
})