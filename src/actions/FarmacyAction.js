import { suvesaApi } from "../api/suvesaAPI";
import { types } from "../types/types";
import { startValidateClaveInterna } from './login';
import Swal from 'sweetalert2';
//---------------------------------------------INICIO API Actions



//---------------------------------------------CLAVE INTERNA Action
export const startValidateClaveInternaFarmacy = ( password ) => {

  return async ( dispatch ) => {
        
      try {

          const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
          if( status === 1 ) {
              // Se activan los inputs
              dispatch( SetDisableInputFarmacy(false) );
              // Se desactiva el Input de password
              dispatch( SetDisablePasswordFarmacy(true) );
              // Se establece el nameUser
              dispatch( SetNameUserFarmacy(userName) );
      

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
export const SetCurrentTabFarmacy = (value) => ({
  type: types.SetCurrentTabFarmacy,
  payload: value,
});

export const SetClaveInternaFarmacy = (value) => ({
    type: types.SetClaveInternaFarmacy,
    payload: value,
  });

  export const SetNameUserFarmacy = (value) => ({
    type: types.SetNameUserFarmacy,
    payload: value,
  });

  export const SetDisableInputFarmacy = (value) => ({
    type: types.SetDisableInputFarmacy,
    payload: value,
  });

  export const SetDisablePasswordFarmacy = (value) => ({
    type: types.SetDisablePasswordFarmacy,
    payload: value,
  });
//---------------------------------------------FIN Normal Actions
