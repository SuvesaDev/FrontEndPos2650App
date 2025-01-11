import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const aperturacajaStartAddNewAperturaCajaAction = ( aperturacaja ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'aperturacaja', aperturacaja, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...aperturacaja,
			id: body.event.id			
		  };
  
		  dispatch( aperturacajaAddNewAperturaCajaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const aperturacajaAddNewAperturaCajaStoreAction = ( event ) => ( {
	type: types.aperturacajaAddNew,
	payload: event
  } );


