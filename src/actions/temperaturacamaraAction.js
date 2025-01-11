import { fetchWithoutToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const temperaturacamaraStartAddNewTemperaturaCamaraAction = ( temperaturacamara ) => {
  
	return async( dispatch ) => {
  
	  try {
  
		const resp = await fetchWithoutToken( 'temperaturacamara', temperaturacamara, 'POST' );
  
		const body = await resp.json(); 
  
		if ( body.ok ) {
   
		  const newEvent = {
			...temperaturacamara,
			id: body.event.id			
		  };
  
		  dispatch( temperaturacamaraAddNewTemperaturaCamaraStoreAction( newEvent ) );
  
		} else {
  
		  Swal.fire( 'Error', body.msg, 'error' );
  
		}
  
	  } catch ( error ) {
  
		Swal.fire( 'Error', error, 'error' );
  
	  }
  
	};
  
  };
  
  export const temperaturacamaraAddNewTemperaturaCamaraStoreAction = ( event ) => ( {
	type: types.temperaturacamaraAddNew,
	payload: event
  } );


