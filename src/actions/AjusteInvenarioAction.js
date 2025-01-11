import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const ajusteinvenatioStartAddNewAjusteInvenatioAction = ( ajusteinvenatio ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'ajusteinventario', ajusteinvenatio, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...ajusteinvenatio,
			id: body.event.id			
		  };
  
		  dispatch( ajusteinvenatioAddNewAjusteInvenatioStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const ajusteinvenatioAddNewAjusteInvenatioStoreAction = ( event ) => ( {
	type: types.ajusteinvenatioAddNew,
	payload: event
  } );


