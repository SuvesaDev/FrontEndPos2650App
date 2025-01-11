import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

import { 
    CleanCategoriaActualInventory, 
    IsCategoriaEditInventory, 
    IsOpenModalCreateCategoriaInventory, 
    SetDeleteCategoriaInventory, 
    SetIndexCategoriaInventory 
} from './inventory';

//Action with call API
export const startGetAllCategoriasInventory = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/categorias/ObtenerCategoriasInventario');
            const { status, responses } = data;
            
            if( status === 0 ) {

                const categorias = responses.map( category => {
                    return {
                        id: category.id,
                        descripcion: category.descripcion
                    }
                });
                // Establece las categorias en el estado
                dispatch( GetAllCategoriasInventory(categorias) );
                
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
                    text: 'Obtener los tipos Identificacion Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los tipos Exoneracion',
                });
            }
        }
        
    }
}

export const startCreateCategoria = ( categoria, user ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea agregar la categoria ${ categoria } ?`,
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
                    const { data } = await suvesaApi.post('/categorias/CrearCategoria', {
                        idUsuarioCreacion: user,
                        estado: true,
                        descripcion: categoria
                    } );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if( status === 0) {

                        //Call new categories
                        await dispatch( startGetAllCategoriasInventory() );

                        //Clean State
                        dispatch( CleanNewCategoria());

                        //Close modal
                        dispatch( IsOpenModalCreateCategoriaInventory(false));

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Categoria ingresada correctamente',
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
                        text: 'Ocurrio un problema al ingresar una nueva categoria',
                    });
                }
            }
                
        });
        
    }
}

export const startDisableCategoriaxInventario = ( idCategoria, descripcion, idInventario, category, user ) => {

    return async ( dispatch ) => {
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar la categoria ${ descripcion } ?`,
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
                    const { data } = await suvesaApi.post('/categorias/DesactivarCategoriaxInventario', {
                        idInventario,
                        idCategoria,
                        idUsuarioModificacion: user
                    } );
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();

                    if( status === 0) {

                        dispatch( SetDeleteCategoriaInventory( category ) );
                        dispatch( CleanCategoriaActualInventory() );
                        dispatch( SetIndexCategoriaInventory( null ) );
                        dispatch( IsCategoriaEditInventory( false ) );

                        //Si es correcta entonces mostrar un mensaje de afirmacion
                        Swal.fire({
                            icon: 'success',
                            title: 'Categoria eliminada correctamente',
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
                        text: 'Ocurrio un problema al eliminar una categoria',
                    });
                }
            }
                
        });
        
    }
}

//Normal Actions
export const GetAllCategoriasInventory = ( value ) => ({
    type: types.GetAllCategoriasInventory,
    payload: value
});

export const SetNewCategoria = (value) => ({
    type: types.SetNewCategoria,
    payload: value
})

export const CleanNewCategoria = () => ({
    type: types.CleanNewCategoria,
})


// export const CleanTiposExoneracion = ( value ) => ({
//     type: types.CleanTiposExoneracion
// });