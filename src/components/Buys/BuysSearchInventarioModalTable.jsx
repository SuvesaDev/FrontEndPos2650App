import React from 'react';
import { useTable } from "react-table";

import { useSelector, useDispatch } from 'react-redux';

import { 
    CleanStateSearchInventarioCompras,
    SetCodigoInternoDetalleManualCompras,
    SetDefaultSearchInventarioCompras,
    SetDescripcionInternoDetalleManualCompras, 
    SetIsOpenModalSearchInventarioModalCompras 
} from '../../actions/ComprasAction';

export const BuysSearchInventarioModalTable = ({ columns, data }) => {

    const dispatch = useDispatch();
    const { codigoInventarioSeleccionado } = useSelector( state => state.compras );

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
        
        //Obtener los valores del inventario seleccionado
        const { cod_Articulo, descripcion } = cell.row.original;

        if( cod_Articulo !== "" && descripcion !== "" ) {
            
            dispatch( SetCodigoInternoDetalleManualCompras({
                codigoPro: codigoInventarioSeleccionado,
                codigoInt: cod_Articulo
            }) );

            dispatch( SetDescripcionInternoDetalleManualCompras( {
                codigoPro: codigoInventarioSeleccionado,
                descripcionInt: descripcion
            } ) );
    
            //Clean el state de busqueda de inventarios
            dispatch( CleanStateSearchInventarioCompras() );
    
            //Set default filter
            dispatch( SetDefaultSearchInventarioCompras() );

            //Cerrar el modal
            const btnCloseModal = document.getElementById("btnCloseModalInventory");
            btnCloseModal.click();
        }

    }

    return (

        <>
            <div className="table-responsive-md tablaP">

                <table className="table table-dark table-hover table-bordered text-md-center"
                    {...getTableProps()}
                >
                    <thead className="table-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th 
                                        // className={
                                        //     (column.render("id") === "cod_Articulo") 
                                        //     ? 'modal-searchInventarioBuys-table-header-codigo'
                                        //     : (column.render("id") === "descripcion") 
                                        //         ? 'modal-searchInventarioBuys-table-header-descripcion'
                                        //         : 'modal-searchInventarioBuys-table-header-codigoCabys'
                                        // }
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody
                        className="table-secondary"
                        {...getTableBodyProps()}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} 
                                    // className='modal-searchInventarioBuys-table-body-row'
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                // className='modal-searchInventarioBuys-table-body-cell'
                                                {...cell.getCellProps({
                                                    onClick: () => handleSelectedRow(cell)
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

                <div className="invisible">
                    <button
                        id="btnCloseModalInventory"
                        data-bs-toggle="modal"
                        data-bs-target="#modalImportarFactura"
                    />
                </div>

            </div>
        </>
        
    )
}
