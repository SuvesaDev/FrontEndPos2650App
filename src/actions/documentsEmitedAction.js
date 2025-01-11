import Swal from 'sweetalert2';
import { types } from '../types/types';

import loadingImage from '../assets/loading_snipiner.gif';

import { suvesaApi } from '../api';

//Action with call API
export const startSearchFacturasDocumentsEmited = ( codCliente, desde, hasta, monto, documento ) => {

    return async ( dispatch ) => {
          
        try {

            let resp;

            const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando facturas',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });

            //Call end-point 
            if( codCliente !== '' && desde === today && hasta === today && monto === '' && documento === '' ) {
                //Busqueda solo de cliente
                resp = await suvesaApi.post('/venta/SeleccionarFacturaCliente', { 'codCliente': `${codCliente}` });

            } else if( codCliente === '' && desde !== today && hasta !== today && monto === '' && documento === '' ) {
                //Busqueda solo de fechas
                resp = await suvesaApi.post('/venta/SeleccionarFacturaFechas', { 'desde' : `${desde}`, 'hasta' : `${hasta}` });

            } else if (codCliente === '' && desde === today && hasta === today && monto !== '' && documento === '') {
                //Busqueda solo de Monto //TODO: FALTA
                // resp = await suvesaApi.post('/cliente/Buscar', { 'cedula' : value1, 'nombre' : value2});

            } else if (codCliente === '' && desde === today && hasta === today && monto === '' && documento !== '') {
                //Busqueda solo de Documento
                resp = await suvesaApi.post(`/venta/SeleccionarFacturaNumero?numero=${documento}`);

            } else  {
                //Busqueda todos los filtros //TODO: FALTA
                // resp = await suvesaApi.post('/venta/SeleccionarFacturaNumero', { 'cedula' : value1, 'nombre' : value2});
            }

            const { status, responses } = resp.data;

             //Quitar el loading
             Swal.close();
            
            if( status === 0 ) {
                // Establece las Facturas en el estado
                dispatch( setFacturasDocumentsEmited(responses) );
                
            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = resp.data;
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
                    text: 'Obtener las facturas Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al obtener las facturas',
                });
            }
        }
        
    }
}

export const startSearchCustomerDocumentsEmited = (cedula) => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere buscando cliente',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            //Call end-point 
            const { data } = await suvesaApi.post('/cliente/BuscarUnoCedula', { cedula });
            const { status, responses } = data;

            //Quitar el loading
            Swal.close();

            if (status === 0) {

                if(responses !== null ) {
                    
                    const { nombre, cedula, identificacion } = responses;
    
                    const customerDocumentsEmited = {
                        identificacion : identificacion,
                        cedula         : cedula,
                        nombre         : nombre,
                    }
        
                    dispatch( setCustomerDocumentsEmited( customerDocumentsEmited ) );
                    dispatch( setCustomerIDSearchDocumentsEmited( identificacion ) );

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `No existe ningun cliente con la cédula ${cedula}`
                    });
                }


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
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema al buscar un cliente',
                });
            }
        }

    }
}

//Normal Actions
export const setFacturasDocumentsEmited = ( value ) => ({
    type: types.setFacturasDocumentsEmited,
    payload: value
});

export const openSearchCustomerModalDocumentsEmited = ( value ) => ({
    type: types.openSearchCustomerModalDocumentsEmited,
    payload: value
});

export const setCustomerDocumentsEmited = ( value ) => ({
    type: types.setCustomerDocumentsEmited,
    payload: value
});

export const setCustomerIDSearchDocumentsEmited = ( value ) => ({
    type: types.setCustomerIDSearchDocumentsEmited,
    payload: value
});

export const setCedulaCustomerDocumentsEmited = ( value ) => ({
    type: types.setCedulaCustomerDocumentsEmited,
    payload: value
});

export const setFechaDesdeSearchDocumentsEmited = ( value ) => ({
    type: types.setFechaDesdeSearchDocumentsEmited,
    payload: value
});

export const setFechaHastaSearchDocumentsEmited = ( value ) => ({
    type: types.setFechaHastaSearchDocumentsEmited,
    payload: value
});

export const setMontoSearchDocumentsEmited = ( value ) => ({
    type: types.setMontoSearchDocumentsEmited,
    payload: value
});

export const setDocumentoSearchDocumentsEmited = ( value ) => ({
    type: types.setDocumentoSearchDocumentsEmited,
    payload: value
});

export const setcheckCustomerDocumentsEmited = ( value ) => ({
    type: types.setcheckCustomerDocumentsEmited,
    payload: value
});

export const setcheckDatesDocumentsEmited = ( value ) => ({
    type: types.setcheckDatesDocumentsEmited,
    payload: value
});

export const setdisableInputsCustomerDocumentsEmited = ( value ) => ({
    type: types.setdisableInputsCustomerDocumentsEmited,
    payload: value
});

export const setdisableInputsDatesDesdeDocumentsEmited = ( value ) => ({
    type: types.setdisableInputsDatesDesdeDocumentsEmited,
    payload: value
});

export const setdisableInputsDatesHastaDocumentsEmited = ( value ) => ({
    type: types.setdisableInputsDatesHastaDocumentsEmited,
    payload: value
});

export const setdisableInputsMontoDocumentsEmited = ( value ) => ({
    type: types.setdisableInputsMontoDocumentsEmited,
    payload: value
});

export const setdisableInputsDocumentoDocumentsEmited = ( value ) => ({
    type: types.setdisableInputsDocumentoDocumentsEmited,
    payload: value
});