import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const autorizacionventaStartAddNewAutorizacionVentaAction = ( autorizacionventa ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'autorizacionventa', autorizacionventa, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...autorizacionventa,
			id: body.event.id			
		  };
  
		  dispatch( autorizacionventaAddNewAutorizacionVentaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const autorizacionventaAddNewAutorizacionVentaStoreAction = ( event ) => ( {
	type: types.autorizacionventaAddNew,
	payload: event
  } );


