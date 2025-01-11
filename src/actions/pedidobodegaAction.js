import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const pedidobodegaStartAddNewPedidoBodegaAction = ( pedidobodega ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'pedidobodega', pedidobodega, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...pedidobodega,
			id: body.event.id			
		  };
  
		  dispatch( pedidobodegaAddNewPedidoBodegaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const pedidobodegaAddNewPedidoBodegaStoreAction = ( event ) => ( {
	type: types.pedidobodegaAddNew,
	payload: event
  } );


