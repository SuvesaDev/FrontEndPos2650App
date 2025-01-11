import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllTiposExoneracion = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.get('/TipoExoneracion');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los tipos en el estado
                dispatch( GetAllTiposExoneracion(responses) );
                
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

//Normal Actions
export const GetAllTiposExoneracion = ( value ) => ({
    type: types.GetAllTiposExoneracion,
    payload: value
});

export const CleanTiposExoneracion = ( value ) => ({
    type: types.CleanTiposExoneracion
});