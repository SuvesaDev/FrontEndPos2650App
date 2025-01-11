import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ChargeBodyTable } from './ChargeBodyTable'
import { SetIsTiqueteAbonoCajaCharge } from '../../actions/ChargeAction';

export const ChargeBodyLeft = () => {

    const dispatch = useDispatch();
    const { preventa, isTiqueteAbono } = useSelector(state => state.charge);

    const columns = [
        {
            Header: "Número Ficha",
            accessor: "ficha",
        },
        {
            Header: "Tipo",
            accessor: "tipoFactura",
        },
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Nombre Cliente",
            accessor: "cliente",
        },
        {
            Header: "Fecha",
            accessor: "fecha",
        },
        {
            Header: "Total",
            accessor: "total",
            Cell: ({ value }) => {
                const numericValue = Number(parseFloat(value.replace(/[^\d.]/g, '')).toFixed(2));
                const formattedValue = numericValue.toLocaleString('es-CR', {
                  style: 'currency',
                  currency: 'CRC',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                });
              
                return formattedValue;
              },
              
        },
    ];

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header bg-primary cartaHMod2">
                        <h4>Detalle PreVenta</h4>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <ChargeBodyTable columns={columns} data={preventa} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
