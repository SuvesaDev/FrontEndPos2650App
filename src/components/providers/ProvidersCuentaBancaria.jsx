import { useDispatch, useSelector } from "react-redux";

import { MdDeleteForever } from 'react-icons/md';

import {
    CleanCuentasBancariasActualProveedores,
    SetAddCuentasBancariasProveedores,
    SetBancocuentasBancariasActualesProveedores,
    SetCod_monedacuentasBancariasActualesProveedores,
    SetCuentacuentasBancariasActualesProveedores,
    SetEditCuentasBancariasActualProveedores,
    SetIsEditCuentasBancariasActualProveedores,
    SetMonedacuentasBancariasActualesProveedores,
    SetTipocuentasBancariasActualesProveedores,
} from "../../actions/ProveedoresAction";
import { ProvidersCuentaBancariaTable } from "./ProvidersCuentaBancariaTable";
import { FaCoins, FaListOl, FaWallet } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";

export const ProvidersCuentaBancaria = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        cuentasBancariasProveedoresActuales,
        proveedor,
        isEditcuentasBancariasActuales,
        indexSelectedcuentasBancariasActuales
    } = useSelector(state => state.proveedores);

    const {
        tipo,
        banco,
        cuenta,
        moneda,
        cod_moneda,
        idCuenta
    } = cuentasBancariasProveedoresActuales;

    const { identificacion, cuentasBancariasProveedors } = proveedor;

    const columns = [
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Banco",
            accessor: "banco",
        },
        {
            Header: "Cuenta",
            accessor: "cuenta",
        },
        {
            Header: "Moneda",
            accessor: "moneda",
        },
        {
            Header: "Opciones",
            accessor: "icon",
            Cell: () => (
                <button className="btn btn-danger">
                    <MdDeleteForever className="iconSizeBtn" />
                </button>

            ),

        },
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeMoneda = ({ target }) => {

        const newCoin = parseInt(target.value);

        // Se estable el cod_moneda
        dispatch(SetCod_monedacuentasBancariasActualesProveedores(newCoin));

        if (newCoin === 1) {
            dispatch(SetMonedacuentasBancariasActualesProveedores('COLON'));
        } else {
            dispatch(SetMonedacuentasBancariasActualesProveedores('DOLAR'));
        }
    }

    const handleClickAddCuentasBancariasProveedores = (e) => {

        e.preventDefault();

        if (tipo === '' || banco === '' || cuenta === '' || moneda === '') return;

        const newCuentaBancaria = {
            codigoProv: (identificacion !== '') ? identificacion : 0,
            tipo,
            banco,
            cuenta,
            moneda,
            cod_moneda,
            idCuenta,
            estado: 1
        }

        dispatch(SetAddCuentasBancariasProveedores(newCuentaBancaria));
        dispatch(CleanCuentasBancariasActualProveedores());
    }

    const handleClickEditCuentasBancariasProveedores = (e) => {

        e.preventDefault();

        if (tipo === '' || banco === '' || cuenta === '' || moneda === '') return;

        dispatch(SetEditCuentasBancariasActualProveedores({
            index: parseInt(indexSelectedcuentasBancariasActuales),
            tipo,
            banco,
            cuenta,
            moneda,
            cod_moneda,
            idCuenta,
            estado: 2
        }));

        dispatch(SetIsEditCuentasBancariasActualProveedores(false));
        dispatch(CleanCuentasBancariasActualProveedores());
    }

    return (
        <>

            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <h4>Datos Bancarios del Proveedor</h4>
                </div>
                <div className="card-body">
                    <div className="row mb-2 text-center" >
                        <div className="col-md-2 mb-3">
                            <h5>Tipo</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaListOl className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tipo de Cuenta"
                                    name="tipo"
                                    disabled={disableInputs}
                                    value={tipo}
                                    onChange={e => handleInputChangeWithDispatch(e, SetTipocuentasBancariasActualesProveedores)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Banco</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <BsBank2 className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Banco"
                                    name="banco"
                                    disabled={disableInputs}
                                    value={banco}
                                    onChange={e => handleInputChangeWithDispatch(e, SetBancocuentasBancariasActualesProveedores)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h5>Cuenta</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaWallet className="iconSize" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número de Cuenta"
                                    name="cuenta"
                                    disabled={disableInputs}
                                    value={cuenta}
                                    onChange={e => handleInputChangeWithDispatch(e, SetCuentacuentasBancariasActualesProveedores)}
                                />
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5>Moneda</h5>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCoins className="iconSize" />
                                </span>
                                <select
                                    name="cod_moneda"
                                    className="form-select"
                                    disabled={disableInputs}
                                    value={cod_moneda}
                                    onChange={e => handleInputChangeMoneda(e)}
                                >
                                    <option value={1}>COLON</option>
                                    <option value={2}>DOLAR</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <hr />
                            <button
                                className={(!disableInputs) ? "btn btn-dark" : 'btn btn-dark disabled'}
                                disabled={disableInputs}
                                onClick={
                                    (isEditcuentasBancariasActuales)
                                        ? handleClickEditCuentasBancariasProveedores
                                        : handleClickAddCuentasBancariasProveedores
                                }
                            >
                                {(isEditcuentasBancariasActuales) ?
                                    <>
                                        Editar <TbEditCircle className="iconSize" />
                                    </>
                                    :
                                    <>
                                        Agregar <IoAddCircle className="iconSize" />
                                    </>
                                }
                            </button>
                        </div>

                    </div>
                    <div className="row mb-0 text-center">
                        <div className="col-md-12 mb-0">
                            <hr />
                            <ProvidersCuentaBancariaTable columns={columns} data={cuentasBancariasProveedors} />
                        </div>
                    </div>
                </div>
            </div>
   
        </>

    )
}
