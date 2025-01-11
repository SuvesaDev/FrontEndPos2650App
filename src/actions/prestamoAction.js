import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const prestamoStartAddNewPrestamoAction = ( prestamo ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'prestamo', prestamo, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...prestamo,
			id: body.event.id			
		  };
  
		  dispatch( prestamoAddNewPrestamoStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const prestamoAddNewPrestamoStoreAction = ( event ) => ( {
	type: types.prestamoAddNew,
	payload: event
  } );


