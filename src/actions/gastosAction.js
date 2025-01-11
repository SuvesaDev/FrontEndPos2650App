import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const gastosStartAddNewGastosAction = ( gastos ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'gastos', gastos, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...gastos,
			id: body.event.id			
		  };
  
		  dispatch( gastosAddNewGastosStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const gastosAddNewGastosStoreAction = ( event ) => ( {
	type: types.gastosAddNew,
	payload: event
  } );


