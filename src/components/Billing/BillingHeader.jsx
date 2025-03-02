import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import {
  SetSearchFichaBilling,
  SetTipoEncabezadoBilling,
  startSearchPreventaBilling
} from '../../actions/billing';
import moment from 'moment';
import { MdFactCheck } from "react-icons/md";
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { ImSortNumbericDesc } from 'react-icons/im';
export const BillingHeader = () => {

  const dispatch = useDispatch();

  const [numberScreen, setnumberScreen] = useState(null);

  const { currentTab } = useSelector(state => state.tabs);

  const {
    allTiposFacturas,
    onlyContadoTiposFacturas
  } = useSelector(state => state.tiposFacturas);

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

  const changeTipoFactura = ({ target }) => {

    if (billings[numberScreen] === undefined) return;

    dispatch(SetTipoEncabezadoBilling({ value: parseInt(target.value), number: numberScreen }));
  };

  const handleSearchPreventa = (e) => {

    if (billings[numberScreen] === undefined) return;

    e.preventDefault();

    if (billings[numberScreen].searchFicha !== '' && /^\d+$/.test(billings[numberScreen].searchFicha) === true) {
      dispatch(startSearchPreventaBilling(parseInt(billings[numberScreen].searchFicha), moment(new Date()).format("DD/MM/YYYY"), numberScreen));
    } else {

      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Número de ficha vacio o no valido.'
      });
    }
  }

  const handleKeyDownSearchPreventa = (e) => {

    if (billings[numberScreen] === undefined) return;

    if (e.key === 'Enter') {
      handleSearchPreventa(e);
    }

  }

  return (

    <>

      <div className="row mb-2">

        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-3 mb-2 d-none" : "col-md-3 mb-2" :  "col-md-3 mb-2"}>
          <hr />

          <h4>Número de Ficha: {
            (billings[numberScreen] !== undefined)
              ? billings[numberScreen].factura.encabezado.ficha
              : ''
          }</h4>
        </div>

        <div className="col-md-3 mb-2">
          <h5>Tipo Factura</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdFactCheck className="iconSize" />
            </span>
            <select
              name="tipo"
              className='form-select'
              disabled={
                (billings[numberScreen] !== undefined)
                  ? billings[numberScreen].disableInputsHeader
                  : true
              }
              value={
                (billings[numberScreen] !== undefined)
                  ? billings[numberScreen].factura.encabezado.tipo
                  : ''
              }
              onChange={e => changeTipoFactura(e)}
            >
              <option value={0} selected disabled hidden> Seleccione... </option>
              {
                (billings[numberScreen] !== undefined)
                  ? (billings[numberScreen].isEnableActiveCredito)
                    ?
                    (allTiposFacturas != null)
                      ? (allTiposFacturas.length === 0)
                        ? <option value=''>No tipos de Factura</option>
                        : allTiposFacturas.map(tipoF => {
                          return <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                        })
                      : <option value=''>No tipos de Factura</option>

                    : (onlyContadoTiposFacturas != null)
                      ? (onlyContadoTiposFacturas.length === 0)
                        ? <option value=''>No tipos de Factura</option>
                        : onlyContadoTiposFacturas.map(tipoF => {
                          return <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                        })
                      : <option value=''>No tipos de Factura</option>
                  : <option value=''>No tipos de Factura</option>
              }
            </select>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <h5>Buscar Preventa</h5>
          <div className="input-group">
            <span className="input-group-text">
              <ImSortNumbericDesc className="iconSize" />
            </span>
            <input
              name="searchFicha"
              type='number'
              min="0"
              className="form-control"

              disabled={
                (billings[numberScreen] !== undefined)
                  ? billings[numberScreen].disableInputsHeader
                  : true
              }
              value={
                (billings[numberScreen] !== undefined)
                  ? billings[numberScreen].searchFicha
                  : ''
              }
              onChange={e => handleInputChangeWithDispatch(e, SetSearchFichaBilling)}
              onKeyDown={handleKeyDownSearchPreventa}
            />
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <hr />
          <button
            className={
              (billings[numberScreen] !== undefined)
                ? (billings[numberScreen].disableInputsHeader) ? 'btn btn-primary disabled' : 'btn btn-primary'
                : 'btn btn-primary'
            }
            onClick={handleSearchPreventa}
          >
            Buscar <FaMagnifyingGlass className="iconSize" />
          </button>
        </div>

      </div>

    </>

  )
}

