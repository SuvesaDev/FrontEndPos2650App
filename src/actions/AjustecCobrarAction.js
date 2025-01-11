import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const ajusteccobrarStartAddNewAjustecCobrarAction = ( ajusteccobrar ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'ajusteccobrar', ajusteccobrar, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...ajusteccobrar,
			id: body.event.id			
		  };
  
		  dispatch( ajusteccobrarAddNewAjustecCobrarStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const ajusteccobrarAddNewAjustecCobrarStoreAction = ( event ) => ( {
	type: types.ajusteccobrarAddNew,
	payload: event
  } );


