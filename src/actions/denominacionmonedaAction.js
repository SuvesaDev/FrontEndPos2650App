import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const denominacionmonedaStartAddNewDenominacionMonedaAction = ( denominacionmoneda ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'denominacionmoneda', denominacionmoneda, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...denominacionmoneda,
			id: body.event.id			
		  };
  
		  dispatch( denominacionmonedaAddNewDenominacionMonedaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const denominacionmonedaAddNewDenominacionMonedaStoreAction = ( event ) => ( {
	type: types.denominacionmonedaAddNew,
	payload: event
  } );


