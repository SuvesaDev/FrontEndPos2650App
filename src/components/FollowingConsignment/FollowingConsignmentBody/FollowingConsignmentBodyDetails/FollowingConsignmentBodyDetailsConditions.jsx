import { useSelector } from 'react-redux';

import { FaCoins } from 'react-icons/fa6';

export const FollowingConsignmentBodyDetailsConditions = () => {

  const { monedasInventory } = useSelector(state => state.monedas);

  const { plazos, factura} = useSelector(state => state.followingConsignment);

  const { 
        Cod_Moneda,
        plazo
    } = factura.encabezado;

  return (
    <>
      <div className='card'>

        <div className="card-header">
          <h5>Condiciones de Consignacion</h5>
        </div>
        
        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-6 mb-2">
              <h5>Moneda</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCoins className="iconSize" />
                </span>
                <select
                  name="Cod_Moneda"
                  className="form-select"
                  disabled={true}
                  value={Cod_Moneda}
                >
                  <option value={''} selected disabled hidden> Seleccione... </option>
                  {
                    (monedasInventory != null && monedasInventory.length > 0)
                      ? monedasInventory.map(moneda => {
                          return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                        })
                      : <option value=''>No Monedas</option>
                  }
                </select>
              </div>

            </div>

            <div className="col-md-6 mb-3">
              <h5>Plazo</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCoins className="iconSize" />
                </span>
                <select
                  name="plazo"
                  className="form-select"
                  disabled={true}
                  value={plazo}
                >
                  <option value={0} selected disabled hidden> Seleccione... </option>
                  {
                    (plazos != null && plazos.length > 0)
                      ? plazos.map(plazo => {
                          return <option key={plazo.idPlazo} value={plazo.idPlazo}> {plazo.descripcion} </option>
                        })
                      : <option value=''>No Plazos</option>
                  }
                </select>
              </div>
              
            </div>

          </div>

        </div>

      </div>

    </>

  )
}