import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  SetBonificacionBonificaciones, 
  SetCantidadRequeridaBonificaciones, 
  SetIdArticuloBonificaciones,
  SetIndexSeletedBonificaciones,
  SetIsEditBonificaciones,
  SetNombreArticuloBonificaciones,
  startDeleteBonificaciones
} from "../../actions/BonificacionesAction";

export const BonusesTable = ({ columns, data }) => {

  const dispatch = useDispatch();

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

  const handleEditBonificacion = async (cell) => {
    
    if( cell.column.id == 'icon') {
      
      // Obtiene la familia seleccionada
      const { cantidadRequerida, bonificacion, idArticulo, nombreArticulo } = cell.row.original;
      const { index } = cell.row;
      
      dispatch( SetCantidadRequeridaBonificaciones(cantidadRequerida) );
      dispatch( SetBonificacionBonificaciones(bonificacion) );
      dispatch( SetIdArticuloBonificaciones(idArticulo) );
      dispatch( SetNombreArticuloBonificaciones(nombreArticulo) );

      dispatch( SetIsEditBonificaciones( true ) );
      dispatch( SetIndexSeletedBonificaciones(index) );

    }
    

  };

  const handleDeleteFamily = async (cell) => {
    
    if( cell.column.id == 'icon') {
      // Obtiene la bonificacion seleccionada
      const { nombreArticulo,  } = cell.row.original;
      const { index } = cell.row;

      dispatch( startDeleteBonificaciones( index, nombreArticulo ) );
    }
    
  };

  return (
    <>
      <div style={{ overflowX: "auto", maxHeight: "285px" }} className="table-responsive-lg tablaP">
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
                          onClick: () => {},
                        })}
                      >
                        {
                            (cell.column.id === 'icon')
                                ? <>
                                  <div class="container">

                                      <div class="row d-flex justify-content-center">

                                        <div class="col-auto">
                                          <button 
                                            className='btn btn-success' 
                                            onClick={ () => handleEditBonificacion(cell)}
                                          >
                                            <FaEdit className='iconSizeBtn' />
                                          </button>
                                        </div>

                                        <div class="col-auto">
                                          <button 
                                            className='btn btn-danger' 
                                            onClick={ () => handleDeleteFamily(cell)}
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
