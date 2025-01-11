import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const clientesStartAddNewClientesAction = ( clientes ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'clientes', clientes, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...clientes,
			id: body.event.id			
		  };
  
		  dispatch( clientesAddNewClientesStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const clientesAddNewClientesStoreAction = ( event ) => ( {
	type: types.clientesAddNew,
	payload: event
  } );


