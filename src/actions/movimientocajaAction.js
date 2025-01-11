import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const movimientocajaStartAddNewMovimientoCajaAction = ( movimientocaja ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'movimientocaja', movimientocaja, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...movimientocaja,
			id: body.event.id			
		  };
  
		  dispatch( movimientocajaAddNewMovimientoCajaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const movimientocajaAddNewMovimientoCajaStoreAction = ( event ) => ( {
	type: types.movimientoscajaAddNew,
	payload: event
  } );


