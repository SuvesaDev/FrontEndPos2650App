import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

export const PurchaseOrderBodyArticulosTable = ({ columns, data }) => {

  const dispatch = useDispatch();

  const { codigoFamiliasSeleted } = useSelector((state) => state.familias);

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

  const handleEditSubFamily = async (cell) => {
      
    // if( cell.column.id == 'icon') {
      
    //   // Obtiene la subfamilia seleccionada
    //   const { codigo, subCodigo, descripcion, observaciones } = cell.row.original;
      
    //   dispatch( SetIdSubFamiliasSeletedFamily(codigo) );
    //   dispatch( SetCodigoSubFamiliaFamiliasFamily(codigo) );
    //   dispatch( SetDescripcionSubFamiliaFamiliasFamily(descripcion) );
    //   dispatch( SetObservacionesSubFamiliaFamiliasFamily(observaciones) );

    //   dispatch( SetIsCreateSubFamiliasFamily( false ) );
    //   dispatch( SetClosingModalSubFamiliasFamily(false) );

    // }
  
  };

  const handleDeleteSubFamily = async (cell) => {
      
    // if( cell.column.id == 'icon') {
    //   // Obtiene la Subfamilia seleccionada
    //   const { codigo, descripcion } = cell.row.original;
    
    //   dispatch( startDeleteSubFamilias( codigo, descripcion, codigoFamiliasSeleted ) );
    // }
      
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
                                            className='btn btn-success' 
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalSubFamilia"
                                            onClick={ () => handleEditSubFamily(cell)}
                                          >
                                            <FaEdit className='iconSizeBtn' />
                                          </button>
                                        </div>

                                        <div class="col-auto">
                                          <button 
                                            className='btn btn-danger' 
                                            onClick={ () => handleDeleteSubFamily(cell)}
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
