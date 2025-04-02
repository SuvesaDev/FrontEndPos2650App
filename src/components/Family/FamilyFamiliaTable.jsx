import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  SetClosingModalFamiliasFamily,
  SetCodigoFamiliaFamiliasFamily, 
  SetDescripcionFamiliaFamiliasFamily, 
  SetIsCreateFamiliasFamily, 
  SetObservacionesFamiliaFamiliasFamily, 
  startDeleteFamilias
} from "../../actions/FamiliasAction";

export const FamilyFamiliaTable = ({ columns, data }) => {

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

  const handleEditFamily = async (cell) => {

    // Obtiene la familia seleccionada
    const { codigo, descripcion, observaciones } = cell.row.original;
    
    dispatch( SetCodigoFamiliaFamiliasFamily(codigo) );
    dispatch( SetDescripcionFamiliaFamiliasFamily(descripcion) );
    dispatch( SetObservacionesFamiliaFamiliasFamily(observaciones) );

    dispatch( SetIsCreateFamiliasFamily( false ) );
    dispatch( SetClosingModalFamiliasFamily(false) );

  };

  const handleDeleteFamily = async (cell) => {

    // Obtiene la familia seleccionada
    const { codigo, descripcion } = cell.row.original;
    
    dispatch( startDeleteFamilias( codigo, descripcion ) );

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
                                            onClick={ () => handleEditFamily(cell)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalFamilia"
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
