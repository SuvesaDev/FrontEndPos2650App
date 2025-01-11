import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const fichasxusuarioStartAddNewFichasxUsuarioAction = ( fichasxusuario ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'fichaxusuario', fichasxusuario, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...fichasxusuario,
			id: body.event.id			
		  };
  
		  dispatch( fichasxusuarioAddNewFichasxUsuarioStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const fichasxusuarioAddNewFichasxUsuarioStoreAction = ( event ) => ( {
	type: types.fichasxusuarioAddNew,
	payload: event
  } );


