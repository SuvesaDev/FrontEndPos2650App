import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { usePagination, useTable } from 'react-table';

import {
    SetEditBodegaConsultAlbaranes,
    SetEditCajaConsultAlbaranes,
    SetEditIdEmpresaConsultAlbaranes,
    SetEditTipoConsultaAlbaranes,
    SetIndexCustomerSeletedTableConsultAlbaranes,
    SetOpenModalSearchCustomerConsultAlbaranes
} from '../../actions/consultAlbaranesAction';
import { OpenSearchModalCustomers } from '../../actions/customers';

export const ConsultAlbaranesGenerarFacturasModalTable = ({ columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    },
        usePagination
    );

    const { cajas, empresas, bodegas } = useSelector(state => state.consultAlbaranes);
    const { allTiposFacturas } = useSelector(state => state.tiposFacturas);

    const dispatch = useDispatch();

    const handleDobleClickUser = async (cell) => {

        if (cell.column.Header === 'Cliente') {
            dispatch(OpenSearchModalCustomers());
            dispatch(SetIndexCustomerSeletedTableConsultAlbaranes(cell.row.id));
            dispatch(SetOpenModalSearchCustomerConsultAlbaranes(true));
        }
    }

    const handleChangeCaja = ({ target }, cell) => {

        dispatch(SetEditCajaConsultAlbaranes({ cedula: cell.row.original.cedula, numCaja: target.value }));
    }

    const handleChangeTipo = ({ target }, cell) => {
        dispatch(SetEditTipoConsultaAlbaranes({ cedula: cell.row.original.cedula, tipo: target.value }));
    }

    const handleChangeEmpresa = ({ target }, cell) => {
        dispatch(SetEditIdEmpresaConsultAlbaranes({ cedula: cell.row.original.cedula, idEmpresa: target.value }));
    }

    const handleChangeBodega = ({ target }, cell) => {
        dispatch(SetEditBodegaConsultAlbaranes({ cedula: cell.row.original.cedula, bodega: target.value }));
    }

    return (
        <>
            <div className="table-responsive-md tablaP">
                <table
                    {...getTableProps()}
                    className="table table-dark table-hover table-bordered text-md-center"
                >
                    <thead className="table-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody
                        className='table-secondary'
                        {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} >
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                            {...cell.getCellProps({
                                                onDoubleClick: () => handleDobleClickUser(cell)
                                            })}
                                        >
                                            {
                                                (cell.column.id === 'caja')
                                                    ? <select
                                                        className='form-select'
                                                        onChange={(e) => handleChangeCaja(e, cell)}
                                                    >
                                                        <option value={0} selected disabled hidden>... </option>
                                                        {
                                                            (cajas !== "")
                                                                ? cajas.map(caja => {
                                                                    return <option value={caja.numCaja}> {caja.numCaja} </option>
                                                                })
                                                                : <option value={0}></option>
                                                        }
                                                    </select>
                                                    : (cell.column.id === 'tipo')
                                                        ? <select
                                                            className='form-select'
                                                            onChange={(e) => handleChangeTipo(e, cell)}
                                                        >
                                                            <option value={0} selected disabled hidden>... </option>
                                                            {
                                                                (allTiposFacturas.length !== 0)
                                                                    ? allTiposFacturas.map(tipoF => {
                                                                        return <option key={tipoF.codigo} value={tipoF.codigo}> {tipoF.descripcion} </option>
                                                                    })
                                                                    : <option value={0}></option>
                                                            }
                                                        </select>
                                                        : (cell.column.id === 'empresa')
                                                            ? <select
                                                                className='form-select'
                                                                onChange={(e) => handleChangeEmpresa(e, cell)}
                                                            >
                                                                <option value={0} selected disabled hidden>... </option>
                                                                {
                                                                    (empresas !== "")
                                                                        ? empresas.map(empresa => {
                                                                            return <option value={empresa.id}> {empresa.nombre} </option>
                                                                        })
                                                                        : <option value={0}></option>
                                                                }
                                                            </select>
                                                            : (cell.column.id === 'bodega')
                                                                ? <select
                                                                    className='form-select'
                                                                    onChange={(e) => handleChangeBodega(e, cell)}
                                                                >
                                                                    <option value={0} selected disabled hidden>... </option>
                                                                    {
                                                                        (bodegas !== ""
                                                                        )
                                                                            ? bodegas.map(bodega => {
                                                                                return <option value={bodega.id}> {bodega.nombre} </option>
                                                                            })
                                                                            : <option value={0}></option>
                                                                    }
                                                                </select>
                                                                : cell.render("Cell")
                                            }
                                        </td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
