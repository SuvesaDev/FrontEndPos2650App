import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const cellarStartAddNewCellarAction = ( cellar ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'bodega', cellar, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...cellar,
			id: body.event.id			
		  };
  
		  dispatch( cellarAddNewCellarStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const cellarAddNewCellarStoreAction = ( event ) => ( {
	type: types.cellarAddNew,
	payload: event
  } );


