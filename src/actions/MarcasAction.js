import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllMarcas = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/marca/ObtenerMarcasInventario');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los tipos en el estado
                dispatch( GetAllMarcasInventory(responses) );
                
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
                    text: 'Obtener las Marcas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las Marcas',
                });
            }
        }
        
    }
}

//Normal Actions
export const GetAllMarcasInventory = ( value ) => ({
    type: types.GetAllMarcasInventory,
    payload: value
});

// export const CleanTiposExoneracion = ( value ) => ({
//     type: types.CleanTiposExoneracion
// });