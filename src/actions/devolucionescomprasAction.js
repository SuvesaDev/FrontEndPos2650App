import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const devolucionescomprasStartAddNewDevolucionesComprasAction = ( devolucionescompras ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'devolucionescompras', devolucionescompras, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...devolucionescompras,
			id: body.event.id			
		  };
  
		  dispatch( devolucionescomprasAddNewDevolucionesComprasStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const devolucionescomprasAddNewDevolucionesComprasStoreAction = ( event ) => ( {
	type: types.devolucionescomprasAddNew,
	payload: event
  } );


