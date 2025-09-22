import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startGetAllPlazos = () => {

    return async ( dispatch ) => {
          
        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            const { data } = await suvesaApi.get(`/ConfiguracionPlazo/getPlazos`);
            const { status, responses } = data;

            // Cerrar modal
            Swal.close();
            
            if( status === 0 ) {
                
                dispatch( SetPlazosDeadlines(responses) );
                
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
                    text: 'Obtener los plazos Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener los plazos',
                });
            }
        }
        
    }
}

export const startSaveDeadline = ( dealine ) => {
   
    return async ( dispatch ) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
    
            //Call end-point 
            const { data } = await suvesaApi.post(`/ConfiguracionPlazo/CreatePlazo`, dealine );
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                dispatch( SetAddNewDeadlineDeadlines(dealine) );
                dispatch( SetDescripcionDeadlines('') );
                dispatch( SetCantidadDiasDeadlines(0) );

                Swal.fire({
                    icon: 'success',
                    title: 'Plazos Consignacion',
                    text: `Se agrego correctamente el plazo.`,
                });

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
                    text: 'Ocurrio un problema al guardar un plazo',
                });
            }
        }
    }
}

export const startEditDeadline = ( dealine ) => {
   
    return async ( dispatch ) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
    
            //Call end-point 
            const { data } = await suvesaApi.put(`/ConfiguracionPlazo/EditPlazo`, dealine );
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                dispatch( SetEditDeadlines(dealine) );
                dispatch( SetDescripcionDeadlines('') );
                dispatch( SetCantidadDiasDeadlines(0) );
                dispatch( SetIsEditPlazoDeadlines(false) );

                Swal.fire({
                    icon: 'success',
                    title: 'Plazos Consignacion',
                    text: `Se edito correctamente el plazo.`,
                });

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
                    text: 'Ocurrio un problema al guardar un plazo',
                });
            }
        }
    }
}

export const startDeleteDeadline = ( dealine ) => {
   
    return async ( dispatch ) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const { data } = await suvesaApi.delete(`/ConfiguracionPlazo/DeletePlazo`, {data: dealine } );
            const { status } = data;
            
            // Cerrar modal
            Swal.close();

            if( status === 0 ) {
                
                dispatch( SetDeleteDeadlines(dealine) );
                dispatch( SetDescripcionDeadlines('') );
                dispatch( SetCantidadDiasDeadlines(0) );
                dispatch( SetIsEditPlazoDeadlines(false) );

                Swal.fire({
                    icon: 'success',
                    title: 'Plazos Consignacion',
                    text: `Se elimino correctamente el plazo.`,
                });

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
                    text: 'Ocurrio un problema al eliminar un plazo',
                });
            }
        }
    }
}

//Normal Actions
export const SetPlazosDeadlines = ( value ) => ({
    type: types.SetPlazosDeadlines,
    payload: value
});

export const SetDescripcionDeadlines = ( value ) => ({
    type: types.SetDescripcionDeadlines,
    payload: value
});

export const SetCantidadDiasDeadlines = ( value ) => ({
    type: types.SetCantidadDiasDeadlines,
    payload: value
});

export const SetAddNewDeadlineDeadlines = ( value ) => ({
    type: types.SetAddNewDeadlineDeadlines,
    payload: value
});

export const SetIdPlazoDeadlines = ( value ) => ({
    type: types.SetIdPlazoDeadlines,
    payload: value
});

export const SetIsEditPlazoDeadlines = ( value ) => ({
    type: types.SetIsEditPlazoDeadlines,
    payload: value
});

export const SetEditDeadlines = ( value ) => ({
    type: types.SetEditDeadlines,
    payload: value
});

export const SetDeleteDeadlines = ( value ) => ({
    type: types.SetDeleteDeadlines,
    payload: value
});