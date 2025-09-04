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

import { 
  SetSearchFichaConsignment, 
  SettipoConsignment 
} from '../../actions/ConsignmentAction';

export const ConsignmentHeader = () => {

  const dispatch = useDispatch();

  const { 
    disableInputsHeader, 
    isEnableActiveCredito,
    aceptaConsignacion,
    isEditConsignment,
    factura,
  } = useSelector(state => state.consignment);

  const { tipo } = factura.encabezado;

  const {
    allTiposFacturas,
    onlyContadoTiposFacturas
  } = useSelector(state => state.tiposFacturas);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const changeTipoFactura = ({ target }) => {
    dispatch(SettipoConsignment(parseInt(target.value)));
  };

  const handleSearchPreventa = (e) => {

    // if (billings[numberScreen] === undefined) return;

    // e.preventDefault();

    // if (billings[numberScreen].searchFicha !== '' && /^\d+$/.test(billings[numberScreen].searchFicha) === true) {
    //   dispatch(startSearchPreventaBilling(parseInt(billings[numberScreen].searchFicha), moment(new Date()).format("DD/MM/YYYY"), numberScreen));
    // } else {

    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Advertencia',
    //     text: 'Número de ficha vacio o no valido.'
    //   });
    // }
  }

  const handleKeyDownSearchPreventa = (e) => {

    // if (billings[numberScreen] === undefined) return;

    // if (e.key === 'Enter') {
    //   handleSearchPreventa(e);
    // }

  }

  return (

    <>

      <div className="row mb-2">

        <div className="col-md-3 mb-2">
          <h5>Tipo Factura</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdFactCheck className="iconSize" />
            </span>
            <select
              name="tipo"
              className='form-select'
              disabled={disableInputsHeader}
              value={ tipo }
              onChange={e => changeTipoFactura(e)}
            >
              <option value={0} selected disabled hidden> Seleccione... </option>
              {
                (isEnableActiveCredito)
                  ? (allTiposFacturas != null && allTiposFacturas.length > 0)
                    ? allTiposFacturas.map(tipoF => (tipoF.consignacion) ? 
                        <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                        : null
                      )
                    : <option value=''>No tipos de Factura</option>

                  : (onlyContadoTiposFacturas != null && onlyContadoTiposFacturas.length > 0)
                    ? onlyContadoTiposFacturas.map(tipoF => (tipoF.consignacion) ?
                         <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                         : null
                      )
                    : <option value=''>No tipos de Factura</option>
              }
            </select>
          </div>
        </div>

        {
          (aceptaConsignacion && isEditConsignment) 
            ? <div className='col-md-2 mt-4'>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="checkAprobacion"
                        name="variasSurcursales"
                        class="form-check-input checkP"
                        // checked={variasSurcursales}
                        // onChange={(e) =>
                        //     handleInputChangeCheckBoxWithDispatch(
                        //         e,
                        //         SetVariasSurcursalesCustomers
                        //     )
                        // }
                    />
                    <h5 className="form-check-label" for="checkAprobacion">Aprobacion Consignacion</h5>
                </div>
              </div>
            : null
        }
      

      </div>

    </>

  )
}

