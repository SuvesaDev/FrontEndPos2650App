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

export const ConsignmentConditions = () => {

  const dispatch = useDispatch();

  // const [numberScreen, setnumberScreen] = useState(null);

  // const { currentTab } = useSelector(state => state.tabs);
  // const { agentesBilling } = useSelector(state => state.agenteVentas);
  // const { monedasInventory } = useSelector(state => state.monedas);
  // const { billings } = useSelector(state => state.billing);

  // useEffect(() => {

  //   if (currentTab.name.includes("Venta")) {
  //     setnumberScreen(currentTab.routePage.split('/')[3] - 1);
  //   }

  // }, [billings]);

  // const handleInputChangeWithDispatch = ({ target }, action) => {
  //   if (billings[numberScreen] === undefined) return;
  //   dispatch(action({ value: target.value, number: numberScreen }));
  // };

  // const handleChangeMoneda = ({ target }) => {

  //   if (billings[numberScreen] === undefined) return;

  //   dispatch(SetCod_MonedaEncabezadoBilling({ value: target.value, number: numberScreen }));

  //   if (billings[numberScreen].hasCustomerBilling) {
  //     dispatch(SetEnableItemsBilling({ value: true, number: numberScreen }));
  //   }
  // };

  // const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
  //   if (billings[numberScreen] === undefined) return;
  //   dispatch(action({ value: target.checked, number: numberScreen }));
  // };

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
                  // disabled={
                  //   (billings[numberScreen] !== undefined)
                  //     ? billings[numberScreen].disableInputsHeader
                  //     : true
                  // }
                  // value={
                  //   (billings[numberScreen] !== undefined)
                  //     ? billings[numberScreen].factura.encabezado.Cod_Moneda
                  //     : ''
                  // }
                  // onChange={e => handleChangeMoneda(e)}
                >
                  <option value={''} selected disabled hidden> Seleccione... </option>
                  {/* {
                    (monedasInventory != null)
                      ? (monedasInventory.length === 0)
                        ? <option value=''>No Monedas</option>
                        : monedasInventory.map(moneda => {
                          return <option key={moneda.codMoneda} value={moneda.codMoneda}> {moneda.monedaNombre} </option>
                        })
                      : <option value=''>No Monedas</option>
                  } */}
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
                  // disabled={
                  //   (billings[numberScreen] !== undefined)
                  //     ? billings[numberScreen].disableInputsHeader
                  //     : true
                  // }
                  // value={
                  //   (billings[numberScreen] !== undefined)
                  //     ? billings[numberScreen].factura.encabezado.Orden
                  //     : ''
                  // }
                  // onChange={e => handleInputChangeWithDispatch(e, SetOrdenEncabezadoBilling)}
                />
              </div>
              
            </div>

          </div>

        </div>

      </div>

    </>

  )
}