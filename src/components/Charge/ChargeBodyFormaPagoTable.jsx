import React, { useEffect } from 'react'
import { useTable } from 'react-table';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import {
    SetCambioCharge,
    SetDisableInputMontoEFECharge,
    SetDisableInputMontoTARCharge,
    SetEntregadoCharge,
    SetMontoPagoCharge,
    SetTotalCobrarCharge
} from '../../actions/ChargeAction';

export const ChargeBodyFormaPagoTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const {
        isSearchPreventa,
        totalCobrarOriginal,
        cobrar,
        disableInputMontoEFE,
        disableInputMontoTAR
    } = useSelector(state => state.charge);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
    } = useTable({
        columns,
        data,
    }
    );

    useEffect(() => {

        let newTotal = 0.00;
        let totalEfectivo = 0.00;
        let totalTarjeta = 0.00;
        let cambio = 0.00;

        // Se obtiene el total
        cobrar.forEach(c => {
            newTotal += (!isNaN(c.montoPago) && c.montoPago !== '') ? parseFloat(c.montoPago) : 0
        });

        // Se obtiene el total del efectivo
        cobrar.forEach(c => {
            if (c.formaPago === 'EFE') {
                totalEfectivo += parseFloat(c.montoPago)
            }
        });

        // Se obtiene el total de tarjeta
        cobrar.forEach(c => {
            if (c.formaPago === 'TAR') {
                totalTarjeta += parseFloat(c.montoPago)
            }
        });

        // Se modifica el total
        if (!isNaN(newTotal)) {
            if (totalEfectivo > totalCobrarOriginal) {
                dispatch(SetTotalCobrarCharge(0));
            } else {
                dispatch(SetTotalCobrarCharge(totalCobrarOriginal - newTotal));
            }
        } else {
            dispatch(SetTotalCobrarCharge(totalCobrarOriginal));
        }

        // se actualiza el entregado
        if (!isNaN(newTotal)) {
            dispatch(SetEntregadoCharge(newTotal));
        } else {
            dispatch(SetEntregadoCharge(0));
        }

        //Se actualiza el cambio
        if (!isNaN(newTotal)) {
            if (totalEfectivo > totalCobrarOriginal) {
                cambio = totalEfectivo - totalCobrarOriginal;
                dispatch(SetCambioCharge(cambio));
            } else {
                dispatch(SetCambioCharge(0));
            }
        } else {
            dispatch(SetCambioCharge(0));
        }

        //Se valida si se debe desactivar el input de tarjeta
        if (!isNaN(newTotal)) {
            if (totalEfectivo > totalCobrarOriginal || totalEfectivo === totalCobrarOriginal && newTotal !== 0) {
                dispatch(SetDisableInputMontoTARCharge(true));
            } else {
                dispatch(SetDisableInputMontoTARCharge(false));
            }
        }

        //Se valida si se debe desactivar el input de efectivo
        if (!isNaN(newTotal)) {
            if (totalTarjeta === totalCobrarOriginal && newTotal !== 0) {
                dispatch(SetDisableInputMontoEFECharge(true));
            } else {
                dispatch(SetDisableInputMontoEFECharge(false));
            }
        }

    }, [cobrar])

    const handleChangeMontoPago = async ({ target }, cell) => {

        if (cell.column.id !== 'montoPago') return;

        if (!isSearchPreventa) return;

        const { formaPago } = cell.row.original;

        if (formaPago !== undefined || formaPago !== null) {

            // Validacion de monto de tarjeta
            if (formaPago === 'TAR') {
                if (parseFloat(target.value) > totalCobrarOriginal) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'El monto a cobrar de la tarjeta no puede ser mayor al total a cobrar. Por favor intentelo de nuevo.'
                    });

                    // Se modifica el monto de pago de la forma de pago
                    dispatch(SetMontoPagoCharge({
                        formaPago,
                        montoPago: ''
                    }));

                    return;
                }
            }

            // Se modifica el monto de pago de la forma de pago
            dispatch(SetMontoPagoCharge({
                formaPago,
                montoPago: parseFloat(target.value)
            }));

        }
    }

    return (
        <>
            <div className="table-responsive-lg tablaP">
                <table className="table table-hover text-lg-center" {...getTableProps()}>
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
                        className='table-white'
                        {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                        >
                                            {
                                                (cell.column.id === 'montoPago')
                                                    ? <input
                                                        type='number'
                                                        className='form-control'
                                                        min="0"
                                                        // step="0.25"
                                                        // pattern="^\d*(\.\d{0,2})?$"
                                                        placeholder='0'
                                                        disabled={
                                                            (isSearchPreventa)
                                                                ? (cell.row.values.nombreFormaPago === 'EFECTIVO')
                                                                    ? disableInputMontoEFE
                                                                    : disableInputMontoTAR
                                                                : true
                                                        }
                                                        value={cell.value}
                                                        onChange={(e) => handleChangeMontoPago(e, cell)}
                                                    />
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
