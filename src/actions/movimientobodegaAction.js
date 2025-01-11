import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const movimientobodegaStartAddNewMovimientoBodegaAction = ( movimientobodega ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'movimientobodega', movimientobodega, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...movimientobodega,
			id: body.event.id			
		  };
  
		  dispatch( movimientobodegaAddNewMovimientoBodegaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const movimientobodegaAddNewMovimientoBodegaStoreAction = ( event ) => ( {
	type: types.movimientobodegaAddNew,
	payload: event
  } );


