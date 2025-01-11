import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const descuentosStartAddNewDescuentosAction = ( descuentos ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'descuentos', descuentos, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...descuentos,
			id: body.event.id			
		  };
  
		  dispatch( descuentosAddNewDescuentosStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const descuentosAddNewDescuentosStoreAction = ( event ) => ( {
	type: types.descuentosAddNew,
	payload: event
  } );


