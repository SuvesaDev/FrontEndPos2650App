import { suvesaApi } from "../api/suvesaAPI";
import { types } from "../types/types";
import { startValidateClaveInterna } from './login';
import Swal from 'sweetalert2';
//---------------------------------------------INICIO API Actions



//---------------------------------------------CLAVE INTERNA Action
export const startValidateClaveInternaReports = ( password ) => {

  return async ( dispatch ) => {
        
      try {

          const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
          if( status === 1 ) {
              // Se activan los inputs
              dispatch( SetDisableInputReports(false) );
              // Se desactiva el Input de password
              dispatch( SetDisablePasswordReports(true) );
              // Se establece el nameUser
              dispatch( SetNameUserReports(userName) );
      

          } else if ( status === 0 && message === 'Contraseña Incorrecta' ) {
              
              Swal.fire({
                  icon: 'warning',
                  title: 'Advertencia!',
                  text: message
              });
              
          } else {

              Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: message,
              });

          }
      } catch (error) {
          console.log(error);
          Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Ocurrio un problema al validar usuario',
          });
      }
      
  }
}
//---------------------------------------------FIN CLAVE INTERNA Action


//---------------------------------------------FIN API Actions


//---------------------------------------------Normal Actions
export const SetCurrentTabReports = (value) => ({
  type: types.SetCurrentTabReports,
  payload: value,
});

export const SetClaveInternaReports = (value) => ({
    type: types.SetClaveInternaReports,
    payload: value,
  });

  export const SetNameUserReports = (value) => ({
    type: types.SetNameUserReports,
    payload: value,
  });

  export const SetDisableInputReports = (value) => ({
    type: types.SetDisableInputReports,
    payload: value,
  });

  export const SetDisablePasswordReports = (value) => ({
    type: types.SetDisablePasswordReports,
    payload: value,
  });
//---------------------------------------------FIN Normal Actions
