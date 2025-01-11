import { CustomersBody } from "./CustomersBody";
import { CustomersIcons } from "./CustomersIcons";

export const CustomersPage = () => {
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
