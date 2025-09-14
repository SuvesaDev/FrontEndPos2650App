import { useDispatch, useSelector } from 'react-redux';

import { MdFactCheck } from "react-icons/md";

export const FollowingConsignmentBodyDetailsHeader = () => {

  // const dispatch = useDispatch();

  // const { 
  //   disableInputsHeader, 
  //   isEnableActiveCredito,
  //   isAllowAceptaConsignacion,
  //   isEditConsignment,
  //   factura,
  // } = useSelector(state => state.consignment);

  // const { tipo, aprobacion } = factura.encabezado;

  const { onlyContadoTiposFacturas } = useSelector(state => state.tiposFacturas);

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
              // value={ tipo }
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

        {/* {
          (isAllowAceptaConsignacion && isEditConsignment) 
            ? <div className='col-md-2 mt-4'>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="checkAprobacion"
                        name="variasSurcursales"
                        class="form-check-input checkP"
                        checked={aprobacion}
                        onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(
                                e,
                                SetAprobacionConsignment
                            )
                        }
                    />
                    <h5 className="form-check-label" for="checkAprobacion">Aprobacion Consignacion</h5>
                </div>
              </div>
            : null
        } */}
      

      </div>

    </>

  )
}

