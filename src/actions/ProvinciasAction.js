import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllProvincias = () => {

    return async ( dispatch ) => {

        try {
    
            //Call end-point 
            const { data } = await suvesaApi.post('/Geografia/getProvincias');
            
            const { status, responses } = data;
    
            if( status === 0 ) {
                // Se ingresan al estado las provincias
                dispatch( GetAllProvincias( responses ) );
                
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
                    text: 'Ocurrio un problema al obtener las provincias',
                });
            }
        }
    }
}

//Normal Actions
export const GetAllProvincias = ( value ) => ({
    type: types.GetAllProvincias,
    payload: value
});

export const CleanProvincias = () => ({
    type: types.CleanProvincias
});