import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const ubicacionStartAddNewUbicacionAction = ( ubicacion ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'ubicacion', ubicacion, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...ubicacion,
			id: body.event.id			
		  };
  
		  dispatch( ubicacionAddNewUbicacionStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const ubicacionAddNewUbicacionStoreAction = ( event ) => ( {
	type: types.ubicacionAddNew,
	payload: event
  } );


