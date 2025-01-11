import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const nomagStartAddNewNoMAGAction = ( nomag ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'nomag', nomag, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...nomag,
			id: body.event.id			
		  };
  
		  dispatch( nomagAddNewNoMAGStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const nomagAddNewNoMAGStoreAction = ( event ) => ( {
	type: types.nomagAddNew,
	payload: event
  } );


