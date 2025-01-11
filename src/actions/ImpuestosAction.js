import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllImpuestos = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/impuesto/ObtenerImpuestos');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece las monedas en el estado
                dispatch( GetAllImpuestosInventory(responses) );
                
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
                    text: 'Obtener los impuestos Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los impuestos',
                });
            }
        }
        
    }
}

//Normal Actions
export const GetAllImpuestosInventory = ( value ) => ({
    type: types.GetAllImpuestosInventory,
    payload: value
});

// export const CleanTiposExoneracion = ( value ) => ({
//     type: types.CleanTiposExoneracion
// });