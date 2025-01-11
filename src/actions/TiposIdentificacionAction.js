import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllTiposIdentificacionBranch = () => {

    return async ( dispatch ) => {

        try {
    
            //Call end-point 
            const { data } = await suvesaApi.post('/Identificacion/Obtener');
            
            const { status, responses } = data;
    
            if( status === 0 ) {
                // Se ingresan al estado las provincias
                dispatch( GetAllTiposIdentificacion( responses ) );
                
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
                    text: 'Ocurrio un problema al obtener los tipos de identificacion',
                });
            }
        }
    }
}

//Normal Actions
export const GetAllTiposIdentificacion = ( value ) => ({
    type: types.GetAllTiposIdentificacion,
    payload: value
});

export const CleanTiposIdentificacion = () => ({
    type: types.CleanTiposIdentificacion
});