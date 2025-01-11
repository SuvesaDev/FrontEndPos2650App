import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const rifaStartAddNewRifaAction = ( rifa ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'rifa', rifa, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...rifa,
			id: body.event.id			
		  };
  
		  dispatch( rifaAddNewRifaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const rifaAddNewRifaStoreAction = ( event ) => ( {
	type: types.rifaAddNew,
	payload: event
  } );


