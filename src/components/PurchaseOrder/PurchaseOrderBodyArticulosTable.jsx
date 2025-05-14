import React from "react";
import Swal from 'sweetalert2';
import { useTable } from "react-table";

import { useDispatch, useSelector } from "react-redux";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  CleanStateArticuloOrdenCompra,
  SetCantidadArticuloOrdenCompra,
  SetCodigoArticuloOrdenCompra,
  SetDeleteArticuloOrdenCompra,
  SetDescripcionArticuloOrdenCompra,
  SetDescuentoArticuloOrdenCompra,
  SetIdArticuloArticuloOrdenCompra, 
  SetImpuestoArticuloOrdenCompra, 
  SetIndexArticuloSeletedOrdenCompra, 
  SetIsEditArticuloOrdenCompra,
  SetPrecioUnitarioArticuloOrdenCompra,
  SetSubtotalArticuloOrdenCompra,
  SetTotalArticuloOrdenCompra
} from "../../actions/ordenCompraAction";

export const PurchaseOrderBodyArticulosTable = ({ columns, data }) => {

  const dispatch = useDispatch();
  const { DisableInputs } = useSelector((state) => state.ordenCompra);

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

  const handleEditArticulo = async (cell) => {

      if( DisableInputs ) return;
      
      if( cell.column.id == 'icon') {
        
        // Obtiene el articulo seleccionado
        const { 
          idArticulo,
          codigo, 
          descripcion, 
          precioUnitario,
          descuento,
          impuesto,
          cantidad, 
          subtotal,
          total
        } = cell.row.original;

        const { index } = cell.row;

        dispatch( SetIdArticuloArticuloOrdenCompra(idArticulo) );
        dispatch( SetCodigoArticuloOrdenCompra(codigo) );
        dispatch( SetDescripcionArticuloOrdenCompra(descripcion) );
        dispatch( SetPrecioUnitarioArticuloOrdenCompra(precioUnitario) );
        dispatch( SetDescuentoArticuloOrdenCompra(descuento) );
        dispatch( SetImpuestoArticuloOrdenCompra(impuesto) );
        dispatch( SetCantidadArticuloOrdenCompra(cantidad) );
        dispatch( SetSubtotalArticuloOrdenCompra(parseFloat(subtotal).toFixed(2)) );
        dispatch( SetTotalArticuloOrdenCompra(parseFloat(total).toFixed(2)) );

        dispatch( SetIndexArticuloSeletedOrdenCompra(index) );

        dispatch( SetIsEditArticuloOrdenCompra(true) );
        
      }
  
  };

  const handleDeleteArticulo = async (cell) => {

    if( DisableInputs ) return;
      
    if( cell.column.id == 'icon') {

      // Obtiene la Subfamilia seleccionada
      const { codigo, descripcion } = cell.row.original;
      const { index } = cell.row;

      //Mostrar un mensaje de confirmacion
      Swal.fire({
          title: `¿Desea eliminar el Articulo ${codigo} - ${descripcion}?`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Eliminar',
          denyButtonText: `Cancelar`,
      }).then(async (result) => {
      
          if (result.isConfirmed) {                            
              // Se ingresa nuevo banco a la tabla
              dispatch( SetDeleteArticuloOrdenCompra(index) );
              dispatch( SetIsEditArticuloOrdenCompra(false) );
              dispatch( CleanStateArticuloOrdenCompra() );
          }

      });
    
    }
      
  };

  return (
    <>
      <div style={{ overflowX: "auto", maxHeight: "200px" }} className="table-responsive-lg tablaP">
        <table
          {...getTableProps()}
          className="table table-hover text-lg-center"
          key={data}
        >
          <thead className="table-dark" style={{ position: "sticky", top: 0}}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="table-white" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          // onClick: () => handleSelectedRow(cell),
                        })}
                      >
                        {
                            (cell.column.id === 'icon')
                                ? <>
                                  <div class="container">

                                      <div class="row d-flex justify-content-center">

                                        <div class="col-auto">
                                          <button 
                                            className={ (DisableInputs) ? 'btn btn-success disabled' : 'btn btn-success' }
                                            onClick={ () => handleEditArticulo(cell)}
                                          >
                                            <FaEdit className='iconSizeBtn' />
                                          </button>
                                        </div>

                                        <div class="col-auto">
                                          <button 
                                            className={ (DisableInputs) ? 'btn btn-danger disabled' : 'btn btn-danger' }
                                            onClick={ () => handleDeleteArticulo(cell)}
                                          >
                                            <MdDeleteForever className='iconSizeBtn' />
                                          </button>
                                        </div>

                                      </div>

                                    </div>
                                </>
                                : cell.render("Cell")
                        }
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
