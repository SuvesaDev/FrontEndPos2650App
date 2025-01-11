import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllMonedas = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/moneda/ObtenerMonedasInventario');
            const { status, responses } = data;

            if( status === 0 ) {
                // Establece las monedas en el estado
                dispatch( GetAllMonedasInventory(responses) );
                
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
                    text: 'Obtener las monedas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las monedas',
                });
            }
        }
        
    }
}

export const startGetAllTiposIdentificacion = () => {

    return async ( dispatch ) => {
          
        try {

            //Call end-point 
            const { data } = await suvesaApi.post('/Identificacion/Obtener');
            const { status, responses } = data;

            if( status === 0 ) {
                // Establece las monedas en el estado
                dispatch( GetAllTiposIdentificacion(responses) );
                
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
                    title: 'Error!',
                    text: 'Usuario no válido.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un problema al obtener los tipos de identificación.',
                });
            }
        }
        
    }
}


//Normal Actions
export const GetAllMonedasInventory = ( value ) => ({
    type: types.GetAllMonedasInventory,
    payload: value
});

export const GetAllTiposIdentificacion = ( value ) => ({
    type: types.GetAllTiposIdentificacion,
    payload: value
});

export const SetCleanAllMonedas = ( ) => ({
    type: types.SetCleanAllMonedas
});