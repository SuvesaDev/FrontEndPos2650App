import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const tokenpermisonegativoStartAddNewTokenPermisoNegativoAction = ( tokenpermisonegativo ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'tokenpermisonegativo', tokenpermisonegativo, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...tokenpermisonegativo,
			id: body.event.id			
		  };
  
		  dispatch( tokenpermisonegativoAddNewTokenPermisoNegativoStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const tokenpermisonegativoAddNewTokenPermisoNegativoStoreAction = ( event ) => ( {
	type: types.tokenpermisonegativoAddNew,
	payload: event
  } );


