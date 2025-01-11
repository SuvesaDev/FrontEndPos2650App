import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCantidadDetalleActualInventoryAdjustment, SetCodArticuloDetalleActualInventoryAdjustment, SetEntradaDetalleActualInventoryAdjustment, SetIsOpenSearchInventoryAdjustment, SetmuerteDetalleActualInventoryAdjustment, SetobservacionDetalleActualInventoryAdjustment, SetSaldoAjusteInventoryAdjustment, SetSalidaDetalleActualInventoryAdjustment, SetTotalEntradaDetalleActualInventoryAdjustment, SetTotalEntradaInventoryAdjustment, SetTotalSalidaDetalleActualInventoryAdjustment, SetTotalSalidaInventoryAdjustment, startAddDetalleActualInventoryAdjustment } from '../../actions/InventoryAdjustmentAction';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';
import { OpenSearchModalInventory } from '../../actions/inventory';
import { BsSortNumericDownAlt } from 'react-icons/bs';
import { TbNotes } from 'react-icons/tb';
import { FaColonSign, FaHashtag, FaListOl, FaWallet } from 'react-icons/fa6';


export const InventoryAdjustmentDatos = () => {
    const dispatch = useDispatch();

    const {
        detalleArticuloActual,
        ajuste
    } = useSelector(state => state.InventoryAdjustment);

    const {
        codFxArticulo,
        CodArticulo,
        DescArticulo,
        Cantidad,
        Entrada,
        Salida,
        CostoUnit,
        observacion,
        TotalEntrada,
        TotalSalida,
        Existencia,
        muerte } = detalleArticuloActual;

    const { detalle } = ajuste;

    const columns = [
        {
            Header: "Cantidad",
            accessor: "",
        },
        {
            Header: "Código",
            accessor: "",
        },
        {
            Header: "Descripción",
            accessor: "",
        },
        {
            Header: "Muerte",
            accessor: "",
        },
        {
            Header: "Entrada",
            accessor: "",
        },
        {
            Header: "Observación",
            accessor: "",
        },
        {
            Header: "T.Entrada",
            accessor: "",
        },
        {
            Header: "T.Salida",
            accessor: "",
        },
        {
            Header: "",
            accessor: "icon",
            Cell: () => (
                <MdDeleteForever />
            ),

        },
    ];

    //Calcula los totales del detalle actual
    useEffect(async () => {

        let costo = parseFloat(CostoUnit);
        let cant = parseFloat(Cantidad);
        let MontoAjuste = costo * cant;

        if (Entrada === true) {
            dispatch(SetTotalEntradaDetalleActualInventoryAdjustment(MontoAjuste));
            dispatch(SetTotalSalidaDetalleActualInventoryAdjustment(0));
        } else {
            dispatch(SetTotalEntradaDetalleActualInventoryAdjustment(0));
            dispatch(SetTotalSalidaDetalleActualInventoryAdjustment(MontoAjuste));
        }
    }, [codFxArticulo, Entrada, Cantidad]);

    //Calcula los totales Generales
    useEffect(async () => {
        let TEntrada = 0;
        let TSalida = 0;
        if (detalle.length !== 0) {
            detalle.forEach(linea => {
                TEntrada = TEntrada + linea.TotalEntrada;
                TSalida = TSalida + linea.TotalSalida;
            });
        }
        dispatch(SetTotalEntradaInventoryAdjustment(TEntrada));
        dispatch(SetTotalSalidaInventoryAdjustment(TSalida));
        dispatch(SetSaldoAjusteInventoryAdjustment(TEntrada - TSalida));
    }, [detalle]);

    const handleSearchInventory = (e) => {
        dispatch(OpenSearchModalInventory());
        dispatch(SetIsOpenSearchInventoryAdjustment(true));
        //dispatch(CleanDetalleActualCompras());
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleClickDownCantidad = (e) => {
        //   e.preventDefault();
        if (e.key === 'Enter') {

            dispatch(startAddDetalleActualInventoryAdjustment(detalleArticuloActual));

        }
    }

    return (

        <>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Datos de Inventario</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='CodArticulo'
                                            placeholder='Código del Artículo'
                                            value={CodArticulo}
                                            onKeyDown={handleSearchInventory}
                                            onChange={e => handleInputChangeWithDispatch(e, SetCodArticuloDetalleActualInventoryAdjustment)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Descripción del Ajuste'
                                            value={DescArticulo}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Existencia</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <BsSortNumericDownAlt className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={Existencia}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Costo Unitario</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaColonSign className="iconSize" />
                                        </span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Costo'
                                            value={CostoUnit}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0 text-center">
                                <div className="col-md-3 mb-3">
                                    <div className="col-md-12 mb-3">
                                        <h5>Movimientos</h5>
                                        <div className="inline-container">
                                            <div className="form-check">
                                                <input
                                                    class="form-check-input checkP"
                                                    type="radio"
                                                    name="Entrada"
                                                    onChange={e => handleInputChangeWithDispatch(e, SetEntradaDetalleActualInventoryAdjustment)}
                                                    //value={Entrada}
                                                    checked={Entrada}
                                                />
                                                <h5 className="form-check-label" for="rbMovimientosEntrada">Entrada</h5>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <FaListOl className="iconSize" />
                                                    </span>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        value={TotalEntrada}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    class="form-check-input checkP"
                                                    type="radio"
                                                    name="Salida"
                                                    onChange={e => handleInputChangeWithDispatch(e, SetSalidaDetalleActualInventoryAdjustment)}
                                                    //value= { Salida }
                                                    checked={Salida}
                                                />
                                                <h5 className="form-check-label" for="rbMovimientosEntrada">Salida</h5>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <FaListOl className="iconSize" />
                                                    </span>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        value={TotalSalida}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-check">
                                            <input
                                                class="form-check-input checkP"
                                                type="checkbox"
                                                id="checkMuerteA"
                                                name="muerte"
                                                onChange={e => handleInputChangeWithDispatch(e, SetmuerteDetalleActualInventoryAdjustment)}
                                                checked={muerte}
                                            />
                                            <h5 className="form-check-label textRed" for="checkMuerteA">Muerte Animales</h5>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div className="col-md-9 mb-3">
                                    <div className='row'>
                                        <div className="col-md-8 mb-3">
                                            <h5>Observación</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <TbNotes className="iconSize" />
                                                </span>
                                                <textarea
                                                    class="form-control"
                                                    rows="1"
                                                    name='observacion'
                                                    onChange={e => handleInputChangeWithDispatch(e, SetobservacionDetalleActualInventoryAdjustment)}
                                                    value={observacion}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <h5>Cantidad</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <BsSortNumericDownAlt className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    name='Cantidad'
                                                    onKeyDown={handleClickDownCantidad}
                                                    onChange={e => handleInputChangeWithDispatch(e, SetCantidadDetalleActualInventoryAdjustment)}
                                                    value={Cantidad}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col-md-4 mb-3">
                                            <h5>Cuenta Contable</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaWallet className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Número de Cuenta'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <h5>Descripción</h5>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <TbNotes className="iconSize" />
                                                </span>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Descripción del Movimiento'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <br />
                                            <div className="form-check">
                                                <input
                                                    class="form-check-input checkP"
                                                    type="checkbox"
                                                    id="checkproductoAct"
                                                />
                                                <h5 className="form-check-label" for="checkproductoAct">Producto Actualizado</h5>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InventorySearchModal />
        </>

    )
}

