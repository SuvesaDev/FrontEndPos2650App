import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const credomaticStartAddNewCredomaticAction = ( credomatic ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'credomatic', credomatic, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...credomatic,
			id: body.event.id			
		  };
  
		  dispatch( credomaticAddNewCredomaticStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const credomaticAddNewCredomaticStoreAction = ( event ) => ( {
	type: types.credomaticAddNew,
	payload: event
  } );


