import { useTable } from "react-table";
import { useDispatch, useSelector } from "react-redux";

import { 
    SetCantidadMaximaFollowingConsignment,
    SetDetalleActualFollowingConsignment, 
    SetIsEditDetalleFollowingConsignment, 
    SetPosicionActualFollowingConsignment
} from "../../../../actions/FollowingConsignmentAction";

export const FollowingConsignmentBodyDetailsItemsTable = ({ columns, data }) => {

    const dispatch = useDispatch();

    const { factura } = useSelector(state => state.followingConsignment);

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
    });

    const handleSelectedRow = async (cell) => {
                    
        //Obtener el CodArticulo de articulo seleccionado
        const detalleActual = factura.detalle[cell.row.id];
        
        if (detalleActual !== null) {

            //Agregarlo al detalle Actual
            dispatch( SetPosicionActualFollowingConsignment( cell.row.id ));
            dispatch( SetDetalleActualFollowingConsignment( detalleActual ));
            dispatch( SetIsEditDetalleFollowingConsignment( true ));
            dispatch( SetCantidadMaximaFollowingConsignment( detalleActual.CantidadMaxima ) );

        }

    }

    return (
        <>
            <div class="table-responsive-md tablaP">

                <table
                    {...getTableProps()}
                    className="table table-bordered table-hover text-lg-center"
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

                    <tbody className="table-white"
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell),
                                                })}

                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        )
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
