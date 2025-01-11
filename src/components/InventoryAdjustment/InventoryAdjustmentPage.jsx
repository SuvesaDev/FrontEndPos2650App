import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InventoryAdjustmentDatos } from './InventoryAdjustmentDatos';
import { InventoryAdjustmentIcons } from './InventoryAdjustmentIcons';
import { InventoryAdjustmentTable } from './InventoryAdjustmentTable';
import { MdDeleteForever } from 'react-icons/md';

export const InventoryAdjustmentPage = () => {
    const dispatch = useDispatch();

    const { ajuste } = useSelector(state => state.InventoryAdjustment);

    const columns = [
        {
            Header: "Cantidad",
            accessor: "Cantidad",
        },
        {
            Header: "Código",
            accessor: "CodArticulo",
        },
        {
            Header: "Descripción",
            accessor: "DescArticulo",
        },
        {
            Header: "Muerte",
            accessor: "muerte",
        },
        {
            Header: "Entrada",
            accessor: "Entrada",
        },
        {
            Header: "Salida",
            accessor: "Salida",
        },
        {
            Header: "Observación",
            accessor: "observacion",
        },
        {
            Header: "T.Entrada",
            accessor: "TotalEntrada",
        },
        {
            Header: "T.Salida",
            accessor: "TotalSalida",
        },
        {
            Header: "",
            accessor: "icon",
            Cell: () => (
                <MdDeleteForever />
            ),

        },
    ];

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Ajuste de Inventario</h3>
                    </div>

                    <div className="card-body">
                        <InventoryAdjustmentDatos />

                        <hr />
                        <InventoryAdjustmentTable columns={columns} data={ajuste.detalle} />
                    </div>

                    <div className="card-footer cartaP">
                        <InventoryAdjustmentIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
