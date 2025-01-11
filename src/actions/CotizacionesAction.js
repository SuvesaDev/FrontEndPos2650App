import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const cotizacionesStartAddNewCotizacionesAction = ( cotizaciones ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'cotizaciones', cotizaciones, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...cotizaciones,
			id: body.event.id			
		  };
  
		  dispatch( cotizacionesAddNewCotizacionesStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const cotizacionesAddNewCotizacionesStoreAction = ( event ) => ( {
	type: types.cotizacionesAddNew,
	payload: event
  } );


