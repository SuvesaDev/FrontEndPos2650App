import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const empresaStartAddNewEmpresaAction = ( empresa ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'empresa', empresa, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...empresa,
			id: body.event.id			
		  };
  
		  dispatch( empresaAddNewEmpresaStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const empresaAddNewEmpresaStoreAction = ( event ) => ( {
	type: types.empresaAddNew,
	payload: event
  } );


