import moment from 'moment';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
    SetCod_MonedaCompraCompras,
    SetDiasCompras,
    SetDisableInputsDetalleCompras,
    SetDisableInputsDiasCompras,
    SetFacturaCompras,
    SetFechaCompras,
    SetTipoCompraCompras,
    SetVenceCompras,
    SetIdBodegaCompraCompras,
    SetIdEmpresaCompras
} from '../../actions/ComprasAction';
import { FaBuilding, FaCalendar, FaCoins, FaHashtag, FaListOl } from 'react-icons/fa';
import { FaBoxesPacking, FaCalendarDays } from 'react-icons/fa6';

export const BuysHeaderFactura = () => {

    const dispatch = useDispatch();

    const { monedasInventory } = useSelector(state => state.monedas);
    const { compras, disableInputs, disableInputDias, empresas, idEmpresa } = useSelector(state => state.compras);
    const { bodegasInventory } = useSelector(state => state.bodegas);

    const {
        Factura,
        TipoCompra,
        Fecha,
        Vence,
        Dias,
        Cod_MonedaCompra,
        Proveedor,
        CedulaProveedor,
        idBodega,
    } = compras.encabezado;

    useEffect(() => {

        if (Factura !== '' && TipoCompra !== '' && Fecha !== ''
            && Vence !== '' && Cod_MonedaCompra !== 0 && Proveedor !== ''
            && CedulaProveedor !== '') {
            dispatch(SetDisableInputsDetalleCompras(false));
        } else {
            dispatch(SetDisableInputsDetalleCompras(true));
        }

    }, [Factura, TipoCompra, Fecha, Cod_MonedaCompra, Proveedor, CedulaProveedor]);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleChangeTipoFactura = ({ target }) => {

        dispatch(SetTipoCompraCompras(target.value));

        if (target.value === "credito") {
            dispatch(SetDisableInputsDiasCompras(false));
        } else {
            dispatch(SetDisableInputsDiasCompras(true));
        }
    }

    const handleChangeDias = ({ target }) => {

        const days = parseInt(target.value);

        dispatch(SetDiasCompras(days));

        var new_date = moment(Fecha, "YYYY-MM-DD").add('days', days);
        dispatch(SetVenceCompras(new_date.format("YYYY-MM-DD")));

    }

    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-3 mb-3">
                    <h5>Número Factura</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Número de la Factura"
                            name='numeroFactura'
                            type='number'
                            disabled={disableInputs}
                            value={Factura}
                            onChange={e => handleInputChangeWithDispatch(e, SetFacturaCompras)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Factura</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaListOl className="iconSize" />
                        </span>
                        <select
                            name="tipoPrecio"
                            type='text'
                            className='form-select'
                            disabled={disableInputs}
                            value={TipoCompra}
                            onChange={e => handleChangeTipoFactura(e)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            <option value="credito">CRE</option>
                            <option value="contado">CON</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Fecha</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            name="fecha"
                            className="form-control"
                            disabled={disableInputs}
                            value={Fecha}
                            onChange={e => handleInputChangeWithDispatch(e, SetFechaCompras)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Bodega</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBoxesPacking className="iconSize" />
                        </span>

                        <select
                            name="Id_Bodega"
                            autoComplete="off"
                            className='form-select'
                            disabled={disableInputs}
                            value={idBodega}
                            onChange={e => handleInputChangeWithDispatch(e, SetIdBodegaCompraCompras)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (bodegasInventory != null)
                                    ? bodegasInventory.map(tipo => {
                                        return <option value={tipo.idBodega}> {tipo.nombreBodega} </option>
                                    })
                                    : <option value=''>No Bodegas</option>
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-2 mb-3">
                    <h5>Días</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendarDays className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            name='dias'
                            type='number'
                            min="0"
                            disabled={(disableInputs) ? disableInputs : disableInputDias}
                            value={Dias}
                            onChange={e => handleChangeDias(e)}
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Vencimiento</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCalendar className="iconSize" />
                        </span>
                        <input
                            type="date"
                            className="form-control"
                            name="fechaVencimiento"
                            disabled={true}
                            value={Vence}
                        // onChange={e => handleInputChangeWithDispatch(e, SetVenceCompras )}
                        />
                    </div>
                </div>

                {/* <div className="col-md-3 mb-3">
                    <h5>Orden</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={disableInputs}
                            name='orden'
                            placeholder='Número de Orden'
                        />
                    </div>
                </div> */}

                <div className="col-md-3 mb-3">
                    <h5>Moneda</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <select
                            name="tipoMoneda"
                            className='form-select'
                            disabled={disableInputs}
                            value={Cod_MonedaCompra}
                            onChange={e => handleInputChangeWithDispatch(e, SetCod_MonedaCompraCompras)}
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

                <div className="col-md-4 mb-3">
                    <h5>Empresa</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuilding className="iconSize" />
                        </span>
                        <select
                            name="empresa"
                            className="form-select"
                            disabled={disableInputs}
                            value={idEmpresa}
                            onChange={e => handleInputChangeWithDispatch(e, SetIdEmpresaCompras)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (empresas != null)
                                    ? (empresas.length === 0)
                                        ? <option value=''></option>
                                        : empresas.map(empresa => {
                                            return <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>

    )
}