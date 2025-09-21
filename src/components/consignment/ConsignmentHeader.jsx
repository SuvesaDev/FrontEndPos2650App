import { useDispatch, useSelector } from 'react-redux';

import { MdFactCheck } from "react-icons/md";

import { 
  SetAprobacionConsignment,
  SettipoConsignment 
} from '../../actions/ConsignmentAction';

export const ConsignmentHeader = () => {

  const dispatch = useDispatch();

  const { 
    disableInputsHeader, 
    isEnableActiveCredito,
    isAllowAceptaConsignacion,
    isEditConsignment,
    factura,
  } = useSelector(state => state.consignment);

  const { tipo, aprobacion } = factura.encabezado;

  const {
    allTiposFacturas,
    onlyContadoTiposFacturas
  } = useSelector(state => state.tiposFacturas);

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  const changeTipoFactura = ({ target }) => {
    dispatch(SettipoConsignment(parseInt(target.value)));
  };

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

      </div>

    </>

  )
}

