import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MdDeleteForever } from 'react-icons/md';

import { FollowingConsignmentBodyDetailsItemsTable } from './FollowingConsignmentBodyDetailsItemsTable';

export const FollowingConsignmentBodyDetailsItems = () => {

    const { factura } = useSelector(state => state.followingConsignment);

    const columns = useMemo(
        () => [
            {
                Header: "Código",
                accessor: "CodArticulo",
            },
            {
                Header: "Descripcion",
                accessor: "Descripcion",
            },
            {
                Header: "Cantidad",
                accessor: "Cantidad",
            },
            ...( false
                    ? []
                    : [
                        {
                            Header: "Precio Uni.",
                            accessor: "Precio_Unit",
                            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
                        },
                        {
                            Header: "IV",
                            accessor: "Monto_Impuesto",
                            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
                        },
                        {
                            Header: "Lote",
                            accessor: "nombreLote",
                        },
                    ]
                ),
            {
                Header: "SubTotal",
                accessor: "SubTotal",
                Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
            }
        ],
        [true]
    );

    return (

        <>
            <div className='card'>

                <div className="card-header inline-container">
                    <h5>Articulos de la consignacion: </h5>
                </div>

                <div className="card-body">

                    <div className='row mb-3'>
                        <div className='col-md-12 mb-2'>
                            <FollowingConsignmentBodyDetailsItemsTable 
                                columns={columns} 
                                data={factura.detalle}
                            />
                        </div>
                    </div>

                </div>

            </div>

            {/* <InventorySearchModal /> */}

        </>

    )
}
