import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const devolucionprestamoStartAddNewDevolucionPrestamoAction = ( devolucionprestamo ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'devolucionesprestamos', devolucionprestamo, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...devolucionprestamo,
			id: body.event.id			
		  };
  
		  dispatch( devolucionprestamoAddNewDevolucionPrestamoStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const devolucionprestamoAddNewDevolucionPrestamoStoreAction = ( event ) => ( {
	type: types.devolucionprestamoAddNew,
	payload: event
  } );


