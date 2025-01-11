import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const arqueocajaStartAddNewArqueoCajaAction = ( arqueocaja ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'arqueocaja', arqueocaja, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...arqueocaja,
			id: body.event.id			
		  };
  
		  dispatch( arqueocajaAddNewArqueoCajaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const arqueocajaAddNewArqueoCajaStoreAction = ( event ) => ( {
	type: types.arqueocajaAddNew,
	payload: event
  } );


