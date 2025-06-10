import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  SetActivoTipoBonificacionSettings,
  SetDescripcionTipoBonificacionSettings, 
  SetIndexTipoBonificacionSettings, 
  SetIsEditTipoBonificacionSettings, 
  SetNombreTipoBonificacionSettings, 
  startDeleteTipoBonificaciones
} from "../../../actions/settings";

export const SettingsBodyTiposBonificacionesTable = ({ columns, data }) => {

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

  const handleEditTipoBonificacion = async (cell) => {
    
    if( cell.column.id == 'icon') {
      
      // Obtiene la familia seleccionada
      const { nombre, descripcion, activo } = cell.row.original;
      const { index } = cell.row;
      
      dispatch( SetNombreTipoBonificacionSettings(nombre) );
      dispatch( SetDescripcionTipoBonificacionSettings(descripcion) );
      dispatch( SetActivoTipoBonificacionSettings(activo) );

      dispatch( SetIsEditTipoBonificacionSettings( true ) );
      dispatch( SetIndexTipoBonificacionSettings(index) );

    }
    
  };

  const handleDeleteTipoBonificacion = async (cell) => {
    
    if( cell.column.id == 'icon') {

      // Obtiene la bonificacion seleccionada
      const { nombre } = cell.row.original;
      const { index } = cell.row;

      dispatch( startDeleteTipoBonificaciones( index, 0, nombre ) );
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
                                            onClick={ () => handleEditTipoBonificacion(cell)}
                                          >
                                            <FaEdit className='iconSizeBtn' />
                                          </button>
                                        </div>

                                        <div class="col-auto">
                                          <button 
                                            className='btn btn-danger' 
                                            onClick={ () => handleDeleteTipoBonificacion(cell)}
                                          >
                                            <MdDeleteForever className='iconSizeBtn' />
                                          </button>
                                        </div>

                                      </div>

                                    </div>
                                </>
                                : (cell.column.id === 'activo')
                                   ?  (cell.value) ? <p>Activo</p> : <p>Desactivo</p>
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
