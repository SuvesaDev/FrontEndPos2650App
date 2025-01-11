import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const familiaStartAddNewFamiliaAction = ( familia ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'familia', familia, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...familia,
			id: body.event.id			
		  };
  
		  dispatch( familiaAddNewFamiliaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const familiaAddNewfamiliaStoreAction = ( event ) => ( {
	type: types.familiaAddNew,
	payload: event
  } );


