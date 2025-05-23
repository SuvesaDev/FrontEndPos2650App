import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaCalendarDay, FaCoins, FaUser } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";

import { 
    SetCantidadDiasOrdenCompra,
    SetDisableInputsArticuloOrdenCompra,
    SetFechaEmisionOrdenCompra,
    SetFormaPagoContadoOrdenCompra, 
    SetFormaPagoCreditoOrdenCompra, 
    SetMonedaOrdenCompra, 
    SetNombreEntregaOrdenCompra, 
    SetObservacionesOrdenCompra
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyOpciones = () => {

    const dispatch = useDispatch();
    
    const { monedasInventory } = useSelector(state => state.monedas);
    const { DisableInputs, ordenCompra } = useSelector((state) => state.ordenCompra);
    const { 
        fechaEmision,
        nombreEntrega,
        moneda,
        formaPagoContado,
        formaPagoCredito,
        cantidadDias,
        idProveedor,
        observaciones
    } = ordenCompra;

    useEffect(() => {
      
        if( idProveedor != 0 && fechaEmision != '' && moneda != 0 
            && (formaPagoContado != false || formaPagoCredito != false ) ) {
            dispatch( SetDisableInputsArticuloOrdenCompra(false) );
        }
    
        return () => {}

    }, [idProveedor, fechaEmision, moneda, formaPagoContado, formaPagoCredito])
    

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeContado = () => {
        dispatch(SetFormaPagoContadoOrdenCompra(true));
        dispatch(SetFormaPagoCreditoOrdenCompra(false));
    };

    const handleChangeCredito = () => {
        dispatch(SetFormaPagoCreditoOrdenCompra(true));
        dispatch(SetFormaPagoContadoOrdenCompra(false));
    };

    return (
        <>

            <div className="row mb-3 text-center">

                <div className="col-md-12 mb-3">

                    <div className="card">

                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Opciones de Orden</h4>
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-3 mb-3">
                                    <h5>Fecha Emision</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='date'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
                                            disabled={DisableInputs}
                                            value={fechaEmision}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetFechaEmisionOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Nombre</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Nombre de Persona a Entregar'
                                            disabled={true}
                                            value={nombreEntrega}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetNombreEntregaOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Moneda</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCoins className="iconSize" />
                                        </span>
                                        <select
                                            name='monedaPurchaseOrden'
                                            className="form-select"
                                            disabled={DisableInputs}
                                            value={moneda}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetMonedaOrdenCompra)
                                            }
                                        >
                                            <option value={0} selected disabled hidden> Seleccione... </option>
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

                                <div className="col-md-3 mb-3">
                                    <h5>Forma de Pago</h5>

                                    <div className="inline-containerCenter">
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioContado"
                                                class="form-check-input checkP"
                                                disabled={DisableInputs}
                                                checked={formaPagoContado}
                                                onClick={handleChangeContado}
                                            />
                                            <h5 className="form-check-label" for="radioContado">Contado</h5>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="radioCrédito"
                                                class="form-check-input checkP"
                                                disabled={DisableInputs}
                                                checked={formaPagoCredito}
                                                onClick={handleChangeCredito}
                                            />
                                            <h5 className="form-check-label" for="radioCrédito">Crédito</h5>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-9 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Observaciones Extras'
                                            disabled={DisableInputs}
                                            value={observaciones}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetObservacionesOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>

                                
                                <div className={ (formaPagoCredito) ? 'col-md-3 mb-3' : 'col-md-3 mb-3 d-none' }>
                                    <h5>Días</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDay className="iconSize" />
                                        </span>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Cantidad de Días'
                                            disabled={DisableInputs}
                                            value={cantidadDias}
                                            onChange={(e) =>
                                                handleInputChangeWithDispatch(e, SetCantidadDiasOrdenCompra)
                                            }
                                        />
                                    </div>
                                </div>
                                
                            </div>                            

                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}
