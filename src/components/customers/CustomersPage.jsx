import { useEffect } from "react";
import { CustomersBody } from "./CustomersBody";
import { CustomersIcons } from "./CustomersIcons";
import { useDispatch, useSelector } from "react-redux";
import { SetHasPermisosCustomers, SetPermisosCustomers } from "../../actions/customers";

export const CustomersPage = () => {

  const dispatch = useDispatch();

  const { hasPermisos } = useSelector((state) => state.customers);
  const { accionesPantalla } = useSelector((state) => state.login);
  const { currentTab } = useSelector((state) => state.tabs);

  useEffect(() => {
    
    if( !hasPermisos ) {

      const newPermisos = accionesPantalla.map( accion => {
        if(accion.pantalla == currentTab.name) {
          return {
            borrar : accion.acciones.borrar,
            crear : accion.acciones.crear,
            modificar : accion.acciones.modificar,
            ver : accion.acciones.ver,
          }
        }
      });

      dispatch(SetPermisosCustomers(newPermisos[0]));
      dispatch( SetHasPermisosCustomers(true));
    }
    

  
    return () => {}
  }, [])
  

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-header cartaMods">
            <h3>Formulario de Clientes</h3>
          </div>

          <div className="card-body">
            <CustomersBody />
          </div>

          <div className="card-footer cartaP">
            <CustomersIcons />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};
