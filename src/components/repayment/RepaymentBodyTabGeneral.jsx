import React from 'react';
import { useSelector } from 'react-redux';

import { RepaymentBody } from './RepaymentBody';
import { RepaymentTable } from './RepaymentTable';
import { RepaymentTotals } from './RepaymentTotals';

export const RepaymentBodyTabGeneral = () => {

    const { devolucion } = useSelector(state => state.repayment);

    const columns = [
        {
            Header: "Código",
            accessor: "codFxArticulo",
        },
        {
            Header: "Descripción",
            accessor: "Descripcion",
        },
        {
            Header: "Cant. Dev",
            accessor: "Cantidad",
        },
        {
            Header: "Precio Uni",
            accessor: "Precio_Unit",
        },
        {
            Header: "% Descuento",
            accessor: "Descuento",
        },
        {
            Header: "% Impuesto",
            accessor: "Impuesto",
        }
    ];

    return (
        <>
            <div className='row mb-2 text-center'>
                <div className='col-md-12'>
                    <RepaymentBody />
                </div>
            </div>

            <div className='row mb-2 text-center'>
                <div className='col-md-12'>
                    <RepaymentTable columns={columns} data={devolucion.detalle} />
                </div>
            </div>

            <div className='row mb-2 text-center'>
                <div className='col-md-12'>
                    <RepaymentTotals />
                </div>
            </div>
        </>

    )
}


