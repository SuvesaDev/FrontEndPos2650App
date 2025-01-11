import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const devolucionesventasStartAddNewDevolucionesVentasAction = ( devolucionesventas ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'devolucionesventas', devolucionesventas, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...devolucionesventas,
			id: body.event.id			
		  };
  
		  dispatch( devolucionesventasAddNewDevolucionesVentasStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const devolucionesventasAddNewDevolucionesVentasStoreAction = ( event ) => ( {
	type: types.devolucionesventasAddNew,
	payload: event
  } );


