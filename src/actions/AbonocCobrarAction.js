import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const abonoccobrarStartAddNewAbonocCobrarAction = ( abonoccobrar ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'abonoccobrar', abonoccobrar, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...abonoccobrar,
			id: body.event.id			
		  };
  
		  dispatch( abonoccobrarAddNewAbonocCobrarStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const abonoccobrarAddNewAbonocCobrarStoreAction = ( event ) => ( {
	type: types.abonoccobrarAddNew,
	payload: event
  } );


