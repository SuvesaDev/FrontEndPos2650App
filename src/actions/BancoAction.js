import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const bancoStartAddNewBancoAction = ( banco ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'banco', banco, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...banco,
			id: body.event.id			
		  };
  
		  dispatch( bancoAddNewBancoStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const bancoAddNewBancoStoreAction = ( event ) => ( {
	type: types.bancoAddNew,
	payload: event
  } );


