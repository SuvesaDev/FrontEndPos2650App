import { OpenCashDatosCajero } from "./OpenCashDatosCajero";
import { OpenCashDetalleDenominacion } from "./OpenCashDetalleDenominacion";
import { OpenCashDetalleTotal } from "./OpenCashDetalleTotal";
import { OpenCashFooter } from "./OpenCashFooter";
import { OpenCashIcons } from "./OpenCashIcons";

export const OpenCashPage = () => {
  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-header cartaMods">
            <h3>Registro de Apertura de Caja</h3>
          </div>
          <div className="card-body">
            <OpenCashDatosCajero />
            <OpenCashDetalleTotal />
            <OpenCashDetalleDenominacion />
          </div>
          <div className="card-footer cartaP">
            <OpenCashIcons />
            {/* <OpenCashFooter /> */}
          </div>
        </div>
        <br />
      </div>
    </>
  );
};
