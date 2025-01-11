import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const ordencompraStartAddNewOrdenCompraAction = ( ordencompra ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'ordencompra', ordencompra, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...ordencompra,
			id: body.event.id			
		  };
  
		  dispatch( ordencompraAddNewOrdenCompraStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const ordencompraAddNewOrdenCompraStoreAction = ( event ) => ( {
	type: types.ordencompraAddNew,
	payload: event
  } );


