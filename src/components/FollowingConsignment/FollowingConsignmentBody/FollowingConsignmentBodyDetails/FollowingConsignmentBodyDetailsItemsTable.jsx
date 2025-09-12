import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from "react-table";

// import { 
//     SetAddDetalleActualConsignment,
//     SetDescuentoConsignment,
//     SetImp_VentaConsignment,
//     SetIsEditDetalleConsignment,
//     SetPosicionActualConsignment,
//     SetSubTotalConsignment, 
//     SetSubTotalExentoConsignment, 
//     SetSubTotalGravadaConsignment,
//     SetTotalConsignment,
//     startDeleteDetalleActualConsignment,
//     startDeleteLineDetalleConsignacion,
//     startGetLotesByArticleConsignment
// } from '../../actions/ConsignmentAction';


export const FollowingConsignmentBodyDetailsItemsTable = ({ columns, data }) => {

    // const dispatch = useDispatch();

    // const { 
    //     enableItems,
    //     detalleArticuloActual,
    //     factura,
    // } = useSelector(state => state.consignment);

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

    // Cuando cambia la data de ingreso se calculan los totales
    useEffect(() => {

        // calculateTotalsGeneral();

    }, [data]);

    const calculateTotalsGeneral = () => {
        
        // let SubTotalGeneral = 0;
        // let SubTotalExcentoGeneral = 0;
        // let SubTotalGravadoGeneral = 0;
        // let MontoDescuentoGeneral = 0;
        // let MontoImpuestoGeneral = 0;

        // data.forEach(linea => {
            
        //     SubTotalGeneral = Number(parseFloat(SubTotalGeneral).toFixed(2)) + Number(parseFloat(linea.SubTotal).toFixed(2));
        //     SubTotalExcentoGeneral = Number(parseFloat(SubTotalExcentoGeneral).toFixed(2)) + Number(parseFloat(linea.SubTotalExcento).toFixed(2));
        //     SubTotalGravadoGeneral = Number(parseFloat(SubTotalGravadoGeneral).toFixed(2)) + Number(parseFloat(linea.SubtotalGravado).toFixed(2));
        //     MontoDescuentoGeneral = Number(parseFloat(MontoDescuentoGeneral).toFixed(2)) + Number(parseFloat(linea.Monto_Descuento).toFixed(2));
        //     MontoImpuestoGeneral = Number(parseFloat(MontoImpuestoGeneral).toFixed(2)) + Number(parseFloat(linea.Monto_Impuesto).toFixed(2));
        // });
        
        // dispatch(SetSubTotalConsignment( parseFloat(SubTotalGeneral).toFixed(2) ));
        // dispatch(SetSubTotalGravadaConsignment( parseFloat(SubTotalGravadoGeneral).toFixed(2) ));
        // dispatch(SetSubTotalExentoConsignment( parseFloat(SubTotalExcentoGeneral).toFixed(2) ));
        // dispatch(SetDescuentoConsignment( parseFloat(MontoDescuentoGeneral).toFixed(2) ));
        // dispatch(SetImp_VentaConsignment( parseFloat(MontoImpuestoGeneral).toFixed(2) ));
        // dispatch(SetTotalConsignment( parseFloat( SubTotalGeneral - MontoDescuentoGeneral + MontoImpuestoGeneral).toFixed(2) ));
        // // dispatch(SetAplicaDescuento( false ));

    }

    const handleSelectedRow = async (cell) => {
        
        // if (!enableItems) return;
        
        // //Obtener el CodArticulo de articulo seleccionado
        // const { CodArticulo, codFxArticulo } = cell.row.original;
        
        // if (CodArticulo !== null) {

        //     const detalleActual = factura.detalle[cell.row.id];
            
        //     //Agregarlo al detalle Actual
        //     dispatch(SetPosicionActualConsignment( cell.row.id ));
        //     dispatch(SetAddDetalleActualConsignment( detalleActual ));

        //     dispatch( SetIsEditDetalleConsignment(true) );

        //     // Se vuelven a traer los lotes
        //     dispatch( startGetLotesByArticleConsignment( codFxArticulo, true) );

        // }

    }

    const handleDeleteRow = (cell) => {

        // if (!enableItems) return;

        // //Obtener el CodArticulo de articulo seleccionado
        // const { CodArticulo } = cell.row.values;

        // const deleteLine = factura.detalle[cell.row.id];

        // if (CodArticulo !== null) {

        //     if (deleteLine.idVentaDetalle !== undefined) {

        //         // Se elimina la linea junto API
        //         dispatch(startDeleteLineDetalleConsignacion( deleteLine ));

        //     } else {

        //         // Se elimina la linea solo el estado
        //         dispatch(startDeleteDetalleActualConsignment( deleteLine ));
        //     }
        // }
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
                                                    onClick: (cell.column.id === 'icon')
                                                        ? () => handleDeleteRow(cell)
                                                        : () => handleSelectedRow(cell),
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
