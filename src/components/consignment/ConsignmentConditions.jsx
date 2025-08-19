import { useSelector, useDispatch } from 'react-redux';

import { FaCoins, FaRightLong } from 'react-icons/fa6';

import { 
  SetCod_MonedaConsignment, 
  SetenableItemsConsignment, 
  SetOrdenConsignment 
} from '../../actions/ConsignmentAction';

export const ConsignmentConditions = () => {

  const dispatch = useDispatch();

  const { monedasInventory } = useSelector(state => state.monedas);

  const { 
    disableInputsHeader,
    hasCustomerBilling,
    factura
  } = useSelector(state => state.consignment);

  const { 
    Cod_Moneda,
    Orden
  } = factura.encabezado;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleChangeMoneda = ({ target }) => {

    dispatch(SetCod_MonedaConsignment(target.value));

    if (hasCustomerBilling) {
      dispatch(SetenableItemsConsignment(true));
    }
  };

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
                  disabled={disableInputsHeader}
                  value={Cod_Moneda}
                  onChange={e => handleChangeMoneda(e)}
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
              <h5>Orden de Compra</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <FaRightLong className="iconSize" />
                </span>
                <input
                  type="text"
                  name='Orden'
                  className='form-control'
                  disabled={disableInputsHeader}
                  value={Orden}
                  onChange={e => handleInputChangeWithDispatch(e, SetOrdenConsignment)}
                />
              </div>
              
            </div>

          </div>

        </div>

      </div>

    </>

  )
}