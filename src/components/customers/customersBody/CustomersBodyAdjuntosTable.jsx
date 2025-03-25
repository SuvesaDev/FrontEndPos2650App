import React from "react";
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { FaEye, FaCloudUploadAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { 
  SetDeleteAdjuntoCustomers, 
  startDeleteOneFileCustomer, 
  startSaveOneFileCustomer 
} from "../../../actions/customers";

export const CustomersBodyAdjuntosTable = ({ columns, data }) => {

  const dispatch = useDispatch();

  const { customer } = useSelector((state) => state.customers);
  const { identificacion } = customer;

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

  const handleOpenFile = async (cell) => {

    // Obtiene el file seleccionado
    const { base64 } = cell.row.original;
    
    if (base64) {

      const newTab = window.open();
      newTab.document.write(`<iframe src="${base64}" width="100%" height="100%"></iframe>`);

    } else {

      Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'No se puede abrir el archivo en este momento. Intento más tarde por favor.'
      });

    }
    

  };

  const handleDeleteFile = async (cell) => {

    // Obtiene el file seleccionado
    const { codigo, nombre } = cell.row.original;

    if (codigo != undefined) {
      
      //Mostrar un mensaje de confirmacion
      Swal.fire({
          title: `¿Desea eliminar el adjunto ${nombre}?`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Eliminar',
          denyButtonText: `Cancelar`,
      }).then(async (result) => {

        if (result.isConfirmed) {

          if( codigo == 0 ) {

            dispatch( SetDeleteAdjuntoCustomers( cell.row.index ) );

          } else {

            dispatch( startDeleteOneFileCustomer( codigo, identificacion ) );

          }


        }

      });

    }

  };

  const handleSaveFile = async (cell) => {

    const { codigo, nombre, base64 } = cell.row.original;

    if (codigo != undefined) {
      
      //Mostrar un mensaje de confirmacion
      Swal.fire({
          title: `¿Desea guardar el adjunto ${nombre}?`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Guardar',
          denyButtonText: `Cancelar`,
      }).then(async (result) => {

        if (result.isConfirmed) {

          const newFile = {
            id: codigo,
            idCliente: identificacion,
            archivo: base64,
            tipo: obtenerExtension(nombre),
            extencion: nombre
          }

          dispatch(startSaveOneFileCustomer( newFile, identificacion ));

        }

      });

    }
    

  }

  const obtenerExtension = (nameFile) => {
    return nameFile.slice((nameFile.lastIndexOf(".") - 1 >>> 0) + 2);
}

  return (
    <>
      <div className="table-responsive-lg tablaP">
        <table
          {...getTableProps()}
          className="table table-hover text-lg-center"
          key={data}
        >
          <thead className="table-dark">
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
                                          <button className='btn btn-primary' onClick={ () => handleOpenFile(cell)}>
                                            <FaEye className='iconSizeBtn' />
                                          </button>
                                        </div>

                                        {
                                          (cell.row.values.codigo == 0)
                                            ? <div class="col-auto">
                                                <button className='btn btn-success' onClick={ () => handleSaveFile(cell)}>
                                                  <FaCloudUploadAlt className='iconSizeBtn' />
                                                </button>
                                              </div>
                                            : null
                                        }

                                        <div class="col-auto">
                                          <button className='btn btn-danger' onClick={ () => handleDeleteFile(cell)}>
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
