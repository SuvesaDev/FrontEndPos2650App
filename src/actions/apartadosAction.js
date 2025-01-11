import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const apartadosStartAddNewApartadosAction = ( apartados ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'apartados', apartados, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...apartados,
			id: body.event.id			
		  };
  
		  dispatch( apartadosAddNewApartadosStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const apartadosAddNewApartadosStoreAction = ( event ) => ( {
	type: types.apartadosAddNew,
	payload: event
  } );


