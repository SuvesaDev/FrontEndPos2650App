import { useDispatch, useSelector } from 'react-redux';

import { MdFactCheck } from "react-icons/md";

import { SetAprobacionConsignacionFollowingConsignment } from '../../../../actions/FollowingConsignmentAction';

export const FollowingConsignmentBodyDetailsHeader = () => {

  const dispatch = useDispatch();

  const { factura, aprobacionConsignacion } = useSelector(state => state.followingConsignment);
  const { tipo } = factura.encabezado;

  const { onlyContadoTiposFacturas } = useSelector(state => state.tiposFacturas);

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
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
              disabled={true}
              value={ tipo }
            >
              <option value={0} selected disabled hidden> Seleccione... </option>
              {
                 (onlyContadoTiposFacturas != null && onlyContadoTiposFacturas.length > 0)
                    ? onlyContadoTiposFacturas.map(tipoF => (tipoF.consignacion) ?
                         <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                         : null
                      )
                    : <option value=''>No tipos de Factura</option>
              }
            </select>
          </div>
        </div>

        <div className='col-md-2 mt-4'>
            <div className="form-check">
              <input
                  type="checkbox"
                  id="checkAprobacion"
                  name="aprobacionConsignacion"
                  class="form-check-input checkP"
                  checked={aprobacionConsignacion}
                  onChange={(e) =>
                      handleInputChangeCheckBoxWithDispatch(
                          e,
                          SetAprobacionConsignacionFollowingConsignment
                      )
                  }
              />
              <h5 className="form-check-label" for="checkAprobacion">Aprobacion Consignacion</h5>
            </div>
        </div>
      
      </div>

    </>

  )
}

