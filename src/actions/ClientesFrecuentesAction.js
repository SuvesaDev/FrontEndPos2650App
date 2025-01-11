import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const clientesfrecuentesStartAddNewClientesFrecuentesAction = ( clientesfrecuentes ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'clientefrecuente', clientesfrecuentes, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...clientesfrecuentes,
			id: body.event.id			
		  };
  
		  dispatch( clientesfrecuentesAddNewClientesFrecuentesStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const clientesfrecuentesAddNewClientesFrecuentesStoreAction = ( event ) => ( {
	type: types.clientesfrecuentesAddNew,
	payload: event
  } );


