import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllPresentaciones = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/presentacion/ObtenerPresentaciones');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los tipos en el estado
                dispatch( GetAllPresentacionesInventory(responses) );
                
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
                    text: 'Obtener las presentaciones Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las presentaciones',
                });
            }
        }
        
    }
}

export const startAllPresentaciones = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/presentacion/ObtenerPresentaciones');
            const { status, responses } = data;
            
            if( status === 0 ) {
                
                const presentations = responses.map( presen => {
                    return {
                        codigo: presen.codPres,
                        estado: (presen.estado) ? 'Activo' : 'Desactivo',
                        nombre: presen.presentaciones
                    }
                });

                dispatch( SetPresentacionesPresentations(presentations) );
                
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
                    text: 'Obtener las presentaciones Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las presentaciones',
                });
            }
        }
        
    }
}

export const startSavePresentacion = ( presentation ) => {
   
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
            const { data } = await suvesaApi.post(`/presentacion/postPresentaciones`, presentation );
            const { status, responses } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                const newPresentations = {
                    codigo: responses.codPres,
                    estado: (responses.estado) ? 'Activo' : 'Desactivo',
                    nombre: responses.presentaciones
                }

                dispatch( SetAddPresentacionPresentations(newPresentations) );
                dispatch( SetNombrePresentacionPresentations('') );

                Swal.fire({
                    icon: 'success',
                    title: 'Presentaciones',
                    text: `Se agrego correctamente la presentacion.`,
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
                    text: 'Ocurrio un problema al guardar una presentacion',
                });
            }
        }
    }
}

//Normal Actions
export const GetAllPresentacionesInventory = ( value ) => ({
    type: types.GetAllPresentacionesInventory,
    payload: value
});

export const SetNombrePresentacionPresentations = ( value ) => ({
    type: types.SetNombrePresentacionPresentations,
    payload: value
});

export const SetPresentacionesPresentations = ( value ) => ({
    type: types.SetPresentacionesPresentations,
    payload: value
});

export const SetAddPresentacionPresentations = ( value ) => ({
    type: types.SetAddPresentacionPresentations,
    payload: value
});

export const CleanPresentations = () => ({
    type: types.CleanPresentations
});