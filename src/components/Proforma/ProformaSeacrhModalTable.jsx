import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaSearch, FaUser } from "react-icons/fa";
import { SetCedulaProveedorWihoutPay, SetCodigoProveedorWihoutPay, SetDireccionProveedorWihoutPay, SetNombreProveedorWihoutPay, SetPlazoDiasProveedorWihoutPay, SetTelefonoProveedorWihoutPay } from "../../actions/countswihoutpay";
import { SetActiveButtonEditBudgets, SetActiveButtonPrintBudgets, SetActiveButtonSaveBudgets, SetCedulaClienteDataBudgets, SetCodigoClienteDataBudgets, SetCodigoCotizacionBudgets, SetContactoClienteDataBudgets, SetCostoTransporteBudgets, SetDatosReporteBudgets, SetDescuentoGeneralBudgets, SetDetalleFacturaBudgets, SetDisableInputsArticlesBudgets, SetImpuestoVentaGeneralBudgets, SetIsAnulateBudgets, SetIsConfirmBudgets, SetIsContadoBudgets, SetIsCreditoBudgets, SetMonedaBudgets, SetMonedaNombreBudgets, SetNombreClienteDataBudgets, SetNombreQuienConfirmaBudgets, SetNombreQuienCotizaBudgets, SetObservacionesBudgets, SetSubTotalExentoGeneralBudgets, SetSubTotalGeneralBudgets, SetSubTotalGravadoGeneralBudgets, SetTelefonoClienteDataBudgets, SetTiempoEntregaBudgets, SetTipoCedulaClienteDataBudgets, SetTotalGeneralBudgets, SetValidezDiasBudgets, startPrintBudget, startSearchCustomerCedulaBudget } from "../../actions/budgetsAction";

export const ProformaSeacrhModalTable = ({ columns, data }) => {

    const { auth, idSurcursal } = useSelector(state => state.login);
    const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;

    const dispatch = useDispatch();
    const [filtro, setFiltro] = useState("");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter
    );


    const [filtroNumeroCotizacion, setFiltroNumeroCotizacion] = useState("");
    const [filtroCliente, setFiltroCliente] = useState("");


    const handleFilterNumeroCotizacion = (e) => {
        const value = e.target.value.toLowerCase();
        setFiltroNumeroCotizacion(value);
        setGlobalFilter(value, ["Cotizacion1"]); // Filtrar por Número de Cotización
    };

    const handleFilterCliente = (e) => {
        const value = e.target.value.toLowerCase();
        setFiltroCliente(value);
        setGlobalFilter(value, ["NombreCliente"]); // Filtrar por Cliente
    };


    const handleSelectedRow = async (cell) => {
        const { Cotizacion1, QuienCotiza, Validez, TiempoEntrega, Contado,
            Credito, Anulado, Observaciones, SubTotalGravada, SubTotalExento, Descuento,
            Total, CodMoneda, MonedaNombre, SubTotal,
            ImpVenta, Transporte,
            ConfirmadaPor,
            CedulaCliente,
            detalle } = cell.row.original;
        const datosP = cell.row.original;
        function convertKeysToLowercase(datosP) {
            const jsonFormateado = {};
            for (const key in datosP) {
                if (datosP.hasOwnProperty(key)) {
                    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                    jsonFormateado[newKey] = datosP[key];
                }
            }
            return jsonFormateado;
        }
        const jsonFormateado = convertKeysToLowercase(datosP);

        dispatch(SetIsAnulateBudgets(Anulado))
        dispatch(SetMonedaBudgets(CodMoneda))
        dispatch(SetIsConfirmBudgets(false))
        dispatch(SetNombreQuienConfirmaBudgets(ConfirmadaPor))
        dispatch(SetIsContadoBudgets(Contado))
        dispatch(SetCodigoCotizacionBudgets(Cotizacion1))
        dispatch(SetIsCreditoBudgets(Credito))
        dispatch(SetDescuentoGeneralBudgets(Descuento))
        dispatch(SetDetalleFacturaBudgets(detalle))
        dispatch(SetValidezDiasBudgets(Validez))
        dispatch(SetImpuestoVentaGeneralBudgets(ImpVenta))
        dispatch(SetMonedaNombreBudgets(MonedaNombre))
        dispatch(SetObservacionesBudgets(Observaciones))
        dispatch(SetSubTotalGeneralBudgets(SubTotal))
        dispatch(SetSubTotalGravadoGeneralBudgets(SubTotalGravada))
        dispatch(SetTiempoEntregaBudgets(TiempoEntrega))
        dispatch(SetTotalGeneralBudgets(Total))
        dispatch(SetCostoTransporteBudgets(Transporte))
        dispatch(SetSubTotalExentoGeneralBudgets(SubTotalExento))
        dispatch(SetMonedaBudgets(CodMoneda))
        dispatch(SetNombreQuienCotizaBudgets(QuienCotiza))
        dispatch(startSearchCustomerCedulaBudget(CedulaCliente))


        //Acciones par Editar y Re-Imprimir
        dispatch(startPrintBudget(jsonFormateado, idSucursalOF))
        dispatch(SetDisableInputsArticlesBudgets(false))
        dispatch(SetActiveButtonPrintBudgets(true))
        dispatch(SetActiveButtonEditBudgets(true))
        dispatch(SetActiveButtonSaveBudgets(false))



    }

    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-6 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch className="iconSize" />
                        </span>
                        <input
                            type="number"
                            value={filtroNumeroCotizacion}
                            className="form-control"
                            placeholder="Buscar por N° Cotización..."
                            onChange={handleFilterNumeroCotizacion}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            type="text"
                            value={filtroCliente}
                            className="form-control"
                            placeholder="Buscar por Cliente..."
                            onChange={handleFilterCliente}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-dark table-hover table-bordered text-md-center"
                >
                    <thead className="table-dark">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="table-secondary" {...getTableBodyProps()}>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <center>
                                        <div className="toast show">
                                            <div className={"card-header toast-warning"}>
                                                <strong className="me-auto">
                                                    2650 Informa{" "}
                                                    <AiFillExclamationCircle className="iconSize" />
                                                </strong>
                                            </div>
                                            <div className="toast-body">
                                                <p className="text-danger">
                                                    No existen cotizaciones con lo ingresado en los
                                                    filtros.
                                                </p>
                                            </div>
                                        </div>
                                    </center>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell),
                                                })}
                                                data-bs-dismiss="modal"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <hr />
        </>
    );


};