import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const cajacantidadStartAddNewCajaCantidadAction = ( cajacantidad ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'cajacantidad', cajacantidad, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...cajacantidad,
			id: body.event.id			
		  };
  
		  dispatch( cajacantidadAddNewCajaCantidadStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const cajacantidadAddNewCajaCantidadStoreAction = ( event ) => ( {
	type: types.cajacantidadAddNew,
	payload: event
  } );


