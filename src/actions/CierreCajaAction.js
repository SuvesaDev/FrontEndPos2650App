import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const cierrecajaStartAddNewCierreCajaAction = ( cierrecaja ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'cierrecaja', cierrecaja, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...cierrecaja,
			id: body.event.id			
		  };
  
		  dispatch( cierrecajaAddNewCierreCajaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const cierrecajaAddNewCierreCajaStoreAction = ( event ) => ( {
	type: types.cierrecajaAddNew,
	payload: event
  } );


