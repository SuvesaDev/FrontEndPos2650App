import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  SetagenteEncabezadoBilling,
  SetCod_AgenteEncabezadoBilling,
  SetCod_MonedaEncabezadoBilling,
  SetEnableItemsBilling,
  SetOrdenEncabezadoBilling,
  SetPDEncabezadoBilling
} from '../../actions/billing';

import { startGetAllMonedas } from '../../actions/MonedasAction';
import { startGetAllAgentesVenta } from '../../actions/AgenteVentaAction';
import { Fa0, FaCoins, FaRightLong } from 'react-icons/fa6';
import { MdMarkEmailUnread } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs';

export const BillingConditions = () => {

  const dispatch = useDispatch();

  const [numberScreen, setnumberScreen] = useState(null);

  const { currentTab } = useSelector(state => state.tabs);
  const { agentesBilling } = useSelector(state => state.agenteVentas);
  const { monedasInventory } = useSelector(state => state.monedas);
  const { billings } = useSelector(state => state.billing);

  useEffect(() => {

    if (currentTab.name.includes("Venta")) {
      setnumberScreen(currentTab.routePage.split('/')[3] - 1);
    }

  }, [billings]);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    if (billings[numberScreen] === undefined) return;
    dispatch(action({ value: target.value, number: numberScreen }));
  };

  const handleChangeMoneda = ({ target }) => {

    if (billings[numberScreen] === undefined) return;

    dispatch(SetCod_MonedaEncabezadoBilling({ value: target.value, number: numberScreen }));

    if (billings[numberScreen].hasCustomerBilling) {
      dispatch(SetEnableItemsBilling({ value: true, number: numberScreen }));
    }
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    if (billings[numberScreen] === undefined) return;
    dispatch(action({ value: target.checked, number: numberScreen }));
  };

  return (
    <>
      <div className='card'>

        <div className="card-header">
          <h5>Condiciones de Factura</h5>
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
                  disabled={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].disableInputsHeader
                      : true
                  }
                  value={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].factura.encabezado.Cod_Moneda
                      : ''
                  }
                  onChange={e => handleChangeMoneda(e)}
                >
                  <option value={''} selected disabled hidden> Seleccione... </option>
                  {
                    (monedasInventory != null)
                      ? (monedasInventory.length === 0)
                        ? <option value=''>No Monedas</option>
                        : monedasInventory.map(moneda => {
                          return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                        })
                      : <option value=''>No Monedas</option>
                  }
                </select>
              </div>

            </div>

            <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-6 mb-2 d-none" : "col-md-6 mb-2" :  "col-md-6 mb-2"}>
              <div className="inline-container">
                <h5>Agente</h5>
                <div className="form-check">
                  <input
                    id="checkAgente"
                    type="checkbox"
                    name="agente"
                    class="form-check-input checkP"
                    disabled={
                      (billings[numberScreen] !== undefined)
                        ? billings[numberScreen].disableInputsHeader
                        : true
                    }
                    checked={
                      (billings[numberScreen] !== undefined)
                        ? billings[numberScreen].factura.encabezado.agente
                        : false
                    }
                    onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetagenteEncabezadoBilling)}
                  />
                  <h5 className="form-check-label" for="checkAgente">Sin Agente</h5>
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">
                  <BsPersonLinesFill className="iconSize" />
                </span>
                <select
                  name="cod_agente"
                  className="form-select"
                  disabled={
                    (billings[numberScreen] !== undefined)
                      ? (billings[numberScreen].disableInputsHeader)
                        ? billings[numberScreen].disableInputsHeader
                        : billings[numberScreen].factura.encabezado.agente
                      : true
                  }
                  value={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].factura.encabezado.cod_agente
                      : 0
                  }
                  onChange={e => handleInputChangeWithDispatch(e, SetCod_AgenteEncabezadoBilling)}
                >
                  <option value={0} selected disabled hidden> Seleccione... </option>
                  {
                    (agentesBilling != null)
                      ? (agentesBilling.length === 0)
                        ? <option value=''>No Agentes</option>
                        : agentesBilling.map(agente => {
                          return <option key={agente.id} value={agente.id}> {agente.name} </option>
                        })
                      : <option value=''>No Agentes</option>
                  }
                </select>

              </div>

            </div>

          </div>

          <div className="row mb-2">
            <hr />
            <div className="col-md-8 mb-3">
              <div className="input-group inline-container">
                <h5 className='espacio'>Orden de Compra</h5>
                <span className="input-group-text">
                  <FaRightLong className="iconSize" />
                </span>
                <input
                  type="text"
                  name='Orden'
                  className='form-control'
                  disabled={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].disableInputsHeader
                      : true
                  }
                  value={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].factura.encabezado.Orden
                      : ''
                  }
                  onChange={e => handleInputChangeWithDispatch(e, SetOrdenEncabezadoBilling)}
                />
              </div>
            </div>

            <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-4 mb-0 d-none" : "col-md-4 mb-0" :  "col-md-4 mb-0"}>
              <div className="form-check">
                <input
                  id="checkPD"
                  type="checkbox"
                  name="PD"
                  class="form-check-input checkP"

                  disabled={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].disableInputsHeader
                      : true
                  }
                  checked={
                    (billings[numberScreen] !== undefined)
                      ? billings[numberScreen].factura.encabezado.PD
                      : false
                  }
                  onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetPDEncabezadoBilling)}
                />
                <h5 className="form-check-label" for="checkPD">PD</h5>
              </div>
              <hr />
            </div>
          </div>

        </div>

      </div>

    </>

  )
}

//OLD LAYOUT
{/* <div className="billing_conditions-check-buttons-one">

<div className="billing_conditions-check-buttons-one-taller">
  <div className="billing_conditions-check-buttons-one-taller-input"> 
    <input type="checkbox" id="checkTaller" name="taller" value="taller" />
  </div>
  <label for="checkTaller" id="lblTaller">Taller</label>
</div>

<div className="billing_conditions-check-buttons-one-mascota">
  <div className="billing_conditions-check-buttons-one-mascota-input"> 
    <input type="checkbox" id="checkMascota" name="mascota" value="mascota" />
  </div>
  <label for="checkMascota" id="lblMascota">Mascota</label>
</div>

</div> */}

{/* <div className="billing_conditions-check-buttons-two">

    <div className="billing_conditions-check-buttons-two-agente">
      <div className="billing_conditions-check-buttons-two-agente-input"> 
        <input type="checkbox" id="checkAgente" name="agente" value="agente" />
      </div>
      <label for="checkAgente" id="lblAgente">Agente</label>
    </div>

    <div className="billing_conditions-check-buttons-two-pd">
      <div className="billing_conditions-check-buttons-two-PD-input"> 
        <input type="checkbox" id="checkPD" name="PD" value="PD" />
      </div>
      <label for="checkPD" id="lblPD">PD</label>
    </div>
</div> */}