import { suvesaApi } from "../api/suvesaAPI";
import { types } from "../types/types";
import { startValidateClaveInterna } from './login';
import Swal from 'sweetalert2';
//---------------------------------------------INICIO API Actions

export const startGetMedicalTest = () => {
  return async (dispatch) => {
    try {
      //Call end-point
      const { data } = await suvesaApi.get("Qvet/ObtenerPruebasMedicas");
      const { status, responses } = data;
      if (status === 0) {
        dispatch(
          SetDataMedicalTest(
            responses.map((test) => {
              return {
                idPrueba: test.codigo,
                nombrePrueba: test.descripcion,
              };
            })
          )
        );
      } else {
        const { currentException } = data;
        const msj = currentException.split(",");
        console.log(currentException.includes(",") ? msj[3] : currentException);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetStates = () => {
  return async (dispatch) => {
    try {
      //Call end-point
      const { data } = await suvesaApi.get("Qvet/ObtenerEstadosAlbaranes");
      const { status, responses } = data;
      if (status === 0) {
        dispatch(
          SetDataStates(
            responses.map((dato) => {
              return {
                idEstado: dato.idEstado,
                nombreEstado: dato.nombre,
              };
            })
          )
        );
      } else {
        const { currentException } = data;
        const msj = currentException.split(",");
        console.log(currentException.includes(",") ? msj[3] : currentException);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetCards = () => {
  return async (dispatch) => {
    try {
      //Call end-point
      const { data } = await suvesaApi.post(
        "Qvet/ObtenerAlbaranesPendientesFacturarFiltrado"
      );
      const { status, responses } = data;
      const datoResponsableVenta = [];
      const datoAlbaranes = [];
      if (status === 0) {
        const dataAlbaranes = responses.map((dato) => {
          datoResponsableVenta.push(dato.responsableVenta);
             const albaran = dato.listaLineas.map((linea) => {
              const albaranDetalle ={
                cliente: dato.cliente,
                mascota: dato.mascota,
                fecha: dato.fecha,
                idReferenciaQvet: dato.idQvet,
                responsableVenta: dato.responsableVenta,
                descripcion: linea.descripcion,
                idQvet: linea.idQvet,
                estado: linea.estado,
              }
              datoAlbaranes.push(albaranDetalle)
            })
        });
        dispatch(SetDataCards(datoAlbaranes));
        dispatch(SetDataCardsFilter(datoAlbaranes));
        
        let personalMedico = [...new Set(datoResponsableVenta)];
        dispatch(
          SetDataPersonal(
            personalMedico.map((perso) => {
              return {
                nombrePersonal: perso,
              };
            })
          )
        );
      } else {
        const { currentException } = data;
        const msj = currentException.split(",");
        console.log(currentException.includes(",") ? msj[3] : currentException);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//---------------------------------------------FIN API Actions

//---------------------------------------------CLAVE INTERNA Action
export const startValidateClaveInternaState = ( password ) => {

  return async ( dispatch ) => {
        
      try {

          const { status, userName, message } = await dispatch( startValidateClaveInterna( password ) );
          if( status === 1 ) {
              // Se activan los inputs
              dispatch( SetDisableInputState(false) );
              // Se desactiva el Input de password
              dispatch( SetDisablePasswordState(true) );
              // Se establece el nameUser
              dispatch( SetNameUserState(userName) );
              // Se traen los datos de inputs y cartas
              dispatch(startGetMedicalTest());
              dispatch(startGetStates());
              dispatch(startGetCards());

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
//---------------------------------------------Normal Actions
export const SetCurrentTab = (value) => ({
  type: types.SetCurrentTab,
  payload: value,
});

export const SetDataPersonal = (value) => ({
  type: types.SetDataPersonal,
  payload: value,
});

export const SetSelectPersonal = (value) => ({
  type: types.SetSelectPersonal,
  payload: value,
});

export const SetDataMedicalTest = (value) => ({
  type: types.SetDataMedicalTest,
  payload: value,
});

export const SetSelectMedicalTest = (value) => ({
  type: types.SetSelectMedicalTest,
  payload: value,
});

export const SetDataStates = (value) => ({
  type: types.SetDataStates,
  payload: value,
});

export const SetSelectState = (value) => ({
  type: types.SetSelectState,
  payload: value,
});

export const SetDataCards = (value) => ({
  type: types.SetDataCards,
  payload: value,
});

export const SetDataCardsFilter = (value) => ({
  type: types.SetDataCardsFilter,
  payload: value,
});


export const SetClaveInternaState = (value) => ({
  type: types.SetClaveInternaState,
  payload: value,
});


export const SetDisableInputState = (value) => ({
  type: types.SetDisableInputState,
  payload: value,
});

export const SetNameUserState = (value) => ({
  type: types.SetNameUserState,
  payload: value,
});

export const SetDisablePasswordState = (value) => ({
  type: types.SetDisablePasswordState,
  payload: value,
});



//---------------------------------------------FIN Normal Actions
