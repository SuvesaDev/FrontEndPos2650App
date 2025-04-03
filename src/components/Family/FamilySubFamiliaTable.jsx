import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  SetClosingModalSubFamiliasFamily,
  SetCodigoSubFamiliaFamiliasFamily,
  SetDescripcionSubFamiliaFamiliasFamily,
  SetIdSubFamiliasSeletedFamily,
  SetIsCreateSubFamiliasFamily,
  SetObservacionesSubFamiliaFamiliasFamily
} from "../../actions/FamiliasAction";

export const FamilySubFamiliaTable = ({ columns, data }) => {

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

  const handleSelectedRow = async (cell) => {

    // Obtiene el file seleccionado
    // const { base64, nombre } = cell.row.original;
    
    // if (base64) {

    //   const extensionFile = obtenerExtension(nombre);

    //   const seletedAdjunto = {
    //     nombre,
    //     type: ( extensionFile == 'pdf' ) ? 'pdf' :( extensionFile == 'docx' || extensionFile == 'doc') ? 'word' :'image',
    //     base64
    //   }

    //   dispatch( SetSeletedAdjuntoCustomers( seletedAdjunto ) );

    // } else {

    //   Swal.fire({
    //       icon: 'warning',
    //       title: 'Advertencia',
    //       text: 'No se puede abrir el archivo en este momento. Intento más tarde por favor.'
    //   });

    // }
    

  };

  const handleEditSubFamily = async (cell) => {
      
      if( cell.column.id == 'icon') {
        
        // Obtiene la subfamilia seleccionada
        const { codigo, subCodigo, descripcion, observaciones } = cell.row.original;
        
        dispatch( SetIdSubFamiliasSeletedFamily(codigo) );
        dispatch( SetCodigoSubFamiliaFamiliasFamily(subCodigo) );
        dispatch( SetDescripcionSubFamiliaFamiliasFamily(descripcion) );
        dispatch( SetObservacionesSubFamiliaFamiliasFamily(observaciones) );
  
        dispatch( SetIsCreateSubFamiliasFamily( false ) );
        dispatch( SetClosingModalSubFamiliasFamily(false) );
  
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
                                            // onClick={ () => handleDeleteFile(cell)}
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
