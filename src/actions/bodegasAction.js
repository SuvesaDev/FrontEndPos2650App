import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllBodegas = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/bodega/ObtenerBodegas');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece las monedas en el estado
                dispatch( GetAllBodegasInventory(responses) );
                
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
                    text: 'Obtener las bodegas Usuario no valido',
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

//Normal Actions
export const GetAllBodegasInventory = ( value ) => ({
    type: types.GetAllBodegasInventory,
    payload: value
});

// export const CleanTiposExoneracion = ( value ) => ({
//     type: types.CleanTiposExoneracion
// });