import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllTiposFacturas = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.get('/TipoFactura/ObtenerTipoFacturas');
            const { status, responses } = data;
            
            if( status === 0 ) {

                // Set all types of Facturas in the State
                dispatch( GetAllTiposFacturas(responses) );

                // Set only contado types of Facturas in the State
                const typesContado = responses.filter( type => type.credito === false);
                dispatch( GetOnlyContadoTiposFacturas(typesContado) );
                
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
                    text: 'Obtener los tipos Facturas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los tipos Facturas',
                });
            }
        }
        
    }
}

//Normal Actions
export const GetAllTiposFacturas = ( value ) => ({
    type: types.GetAllTiposFacturas,
    payload: value
});

export const GetOnlyContadoTiposFacturas = ( value ) => ({
    type: types.GetOnlyContadoTiposFacturas,
    payload: value
});