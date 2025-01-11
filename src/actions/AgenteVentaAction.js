import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllAgentesVenta = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/agenteventa/ObtenerAgentesVentas');
            const { status, responses } = data;
            
            if( status === 0 ) {
                // Establece las monedas en el estado
                dispatch( GetAllAgentesBilling(responses) );
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                console.log(currentException)

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los agentes',
                });
                
            }

        } catch (error) {
            console.log(error);
            if( error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Obtener las monedas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los agentes',
                });
            }
        }
        
    }
}

//Normal Actions
export const GetAllAgentesBilling = ( value ) => ({
    type: types.GetAllAgentesBilling,
    payload: value
});


