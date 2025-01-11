import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const ajustecpagarStartAddNewAjustecPagarAction = ( ajustecpagar ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'ajustecpagar', ajustecpagar, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...ajustecpagar,
			id: body.event.id			
		  };
  
		  dispatch( ajustecpagarAddNewAjustecPagarStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const ajustecpagarAddNewAjustecPagarStoreAction = ( event ) => ( {
	type: types.ajustecpagarAddNew,
	payload: event
  } );


