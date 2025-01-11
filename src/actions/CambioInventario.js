import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const cambioinventarioStartAddNewCambioInventarioAction = ( cambioinventario ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'cambioinventario', cambioinventario, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...cambioinventario,
			id: body.event.id			
		  };
  
		  dispatch( cambioinventarioAddNewCambioInventarioStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const cambioinventarioAddNewCambioInventarioStoreAction = ( event ) => ( {
	type: types.cambioinventarioAddNew,
	payload: event
  } );


