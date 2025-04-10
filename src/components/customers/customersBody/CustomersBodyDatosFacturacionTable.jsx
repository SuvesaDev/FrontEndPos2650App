import React from "react";
import Swal from 'sweetalert2';

import { useDispatch } from "react-redux";
import { useTable } from "react-table";

import { MdDeleteForever } from 'react-icons/md';

import { 
  SetContactoDatosFacturacionCustomers,
  SetCorreoDatosFacturacionCustomers,
  SetDeleteDatosFacturacionCustomers,
  SetIdEditDatosFacturacionCustomers,
  SetIsEditDatosFacturacionCustomers,
  SetnombreFantasiaDatosFacturacionCustomers,
  SetSucursalDatosFacturacionCustomers,
  SetTelefonoDatosFacturacionCustomers
} from "../../../actions/customers";

export const CustomersBodyDatosFacturacionTable = ({ columns, data }) => {

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

    if( cell.column.id == 'icon' ) {
      return;
    }

    const { id, sucursal, nombreFantasia, telefono, correo, contacto } = cell.row.original;

    dispatch( SetSucursalDatosFacturacionCustomers(sucursal) );
    dispatch( SetnombreFantasiaDatosFacturacionCustomers(nombreFantasia) );
    dispatch( SetTelefonoDatosFacturacionCustomers(telefono) );
    dispatch( SetCorreoDatosFacturacionCustomers(correo) );
    dispatch( SetContactoDatosFacturacionCustomers(contacto) );

    dispatch( SetIdEditDatosFacturacionCustomers( id ) );
    dispatch( SetIsEditDatosFacturacionCustomers( true ) );

  };

  const handleDeleteFile = async (cell) => {
  
      // Obtiene el file seleccionado
      const { id } = cell.row.original;
  
      if (id != undefined) {
        
        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: `¿Desea eliminar el registro?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
  
          if (result.isConfirmed) {
    
            dispatch( SetDeleteDatosFacturacionCustomers( id ) ); 
  
          }
  
        });
  
      }
  
    };

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
                <tr
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          onClick: () => handleSelectedRow(cell),
                        })}
                      >
                        {
                            (cell.column.id === 'icon')
                                ? <>                                   
                                    <div class="col-auto">
                                      <button className='btn btn-danger' onClick={ () => handleDeleteFile(cell)}>
                                        <MdDeleteForever className='iconSizeBtn' />
                                      </button>
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
