import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllSubFamilias = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/subFamilias/ObtenerSubFamiliasInventario');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece los tipos en el estado
                dispatch( GetAllSubFamiliasInventory(responses) );
                
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
                    text: 'Obtener las subfamilias Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las subfamilias',
                });
            }
        }
        
    }
}

//Normal Actions
export const GetAllSubFamiliasInventory = ( value ) => ({
    type: types.GetAllSubFamiliasInventory,
    payload: value
});

// export const CleanTiposExoneracion = ( value ) => ({
//     type: types.CleanTiposExoneracion
// });