import { useSelector } from "react-redux";

import { BuysArticulosHeader } from "./BuysArticulosHeader";
import { BuysArticulosFooter } from "./BuysArticulosFooter";
import { BuysArticuloTable } from "./BuysArticuloTable";

export const BuysArticulos = () => {

    const { compras } = useSelector(state => state.compras);

    const { detalle } = compras;

    const columns = [
        {
            Header: "Código",
            accessor: "CodArticulo",
        },
        {
            Header: "Cabys",
            accessor: "Cabys",
        },
        {
            Header: "Descripcion",
            accessor: "Descripcion",
        },
        {
            Header: "Costo Compra",
            accessor: "Costo",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Nueva Base",
            accessor: "Base",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Cantidad",
            accessor: "Cantidad",
        },
        {
            Header: "Regalia",
            accessor: "Regalia",
        },
        {
            Header: "Gravado",
            accessor: "SubtotalGravado",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Excento",
            accessor: "SubTotalExcento",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "% Des.",
            accessor: "Descuento",
        },
        {
            Header: "% IV.",
            accessor: "Impuesto",
        },
        {
            Header: "Total",
            accessor: "Total",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Acciones",
            accessor: "icon",

        },
    ];

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Artículos en Detalle de Compra</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2 text-center">
                                <BuysArticulosHeader />
                                <hr />
                                <BuysArticuloTable columns={columns} data={detalle} />
                            </div>
                        </div>
                        <div className="card-footer">
                            <BuysArticulosFooter />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
