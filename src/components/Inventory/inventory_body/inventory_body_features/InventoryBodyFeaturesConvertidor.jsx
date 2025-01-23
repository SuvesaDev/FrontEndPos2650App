import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TbNumber } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import { VscGitPullRequestCreate } from "react-icons/vsc";

import {
  SetCantidadConvertirConvertidorIntentory,
  SetIdBodegaSelectedConvertidorIntentory,
  startCalculateCantidadDisponiblesConvertidorInventory,
  startConvetirCantidadDisponiblesConvertidorInventory
} from "../../../../actions/inventory";


export const InventoryBodyFeaturesConvertidor = () => {
  const dispatch = useDispatch();

  const [disableInputs, setDisableInputs] = useState(false);

  const {
    relatedArticlesInventory,
    currentTabInventory,
    idBodegaSelectedConvertidor,
    cantidadDisponibleConvertidor,
    calculoRealizadoConvertidor,
    cantidadConvertirConvertidor,
    disableInputBodegaConvertidor,
    inventory
  } = useSelector((state) => state.inventory);

  const { bodegasInventory } = useSelector(state => state.bodegas);
  const { codigo, codigoPadre } = inventory;

  useEffect(() => {
    
    if(currentTabInventory === "Convertidor") {
      
      if(relatedArticlesInventory.length == 0) {
        //Se muestra mensaje que no tiene relacionados
        Swal.fire({
          icon: 'warning',
          title: 'Este artículo no tiene articulos relacionados no se puede Ingresar a este Tab.',
          showConfirmButton: true,
        });

        setDisableInputs(true);
      }

    }

    if( codigoPadre == 0 ) {
      //Se muestra mensaje que no tiene padre
      Swal.fire({
        icon: 'warning',
        title: 'Este artículo no tiene artículo padre relacionado.',
        showConfirmButton: true,
      });

      setDisableInputs(true);
    }

  }, [currentTabInventory])

  useEffect(() => {
    
    if(cantidadDisponibleConvertidor == 0 && calculoRealizadoConvertidor ) {
      
      //Se muestra mensaje que no tiene relacionados
      Swal.fire({
        icon: 'warning',
        title: 'Las cantidades disponibles son cero no se puede convertir.',
        showConfirmButton: true,
      });

      setDisableInputs(true);

    }

  }, [cantidadDisponibleConvertidor])
  

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleGetCantidadDisponibles = () => {

    if( idBodegaSelectedConvertidor == 0 ) {
      //Se muestra mensaje que no tiene padre
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un bodega para realizar el calculo.',
        showConfirmButton: true,
      });
    }
    
    dispatch( startCalculateCantidadDisponiblesConvertidorInventory( codigo, idBodegaSelectedConvertidor ) );
  }

  const handleConvertirCantidadDisponibles = () => {

    if( idBodegaSelectedConvertidor == 0 ) {
      //Se muestra mensaje que no tiene padre
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un bodega para realizar el calculo.',
        showConfirmButton: true,
      });
    }
    
    dispatch( startConvetirCantidadDisponiblesConvertidorInventory( codigo, idBodegaSelectedConvertidor, cantidadConvertirConvertidor) );
  }

  return (
    <>
      <div className="container-fluid mt-2">

        <div className='row mb-2'>

          <div className='col-md-5 mb-3'>
            <h5>Bodegas</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaDatabase className="iconSize" />
              </span>
              <select
                name="idTipoArticuloSelected"
                disabled={(disableInputs) ? disableInputs : disableInputBodegaConvertidor}
                value={idBodegaSelectedConvertidor}
                className="form-select"
                onChange={(e) =>  handleInputChangeWithDispatch( e, SetIdBodegaSelectedConvertidorIntentory)}
              >
                <option value={0} selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {bodegasInventory != null ? (
                  bodegasInventory.map((bodega) => {
                    return (
                      <option value={bodega.idBodega}> {bodega.nombreBodega} </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron las bodegas</option>
                )}
              </select>
            </div>
          </div>

          <div className='col-md-4 mb-3'>
            <h5>Cantidad Disponiles</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber className="iconSize" />
              </span>
              <input
                type="text"
                name="cantidad"
                className="form-control"
                placeholder="Cantidad de Producto"
                disabled={true}
                value={cantidadDisponibleConvertidor}
              />
            </div>
          </div>

          <div className='col-md-3 mb-1'>
            <div className="w-100 pt-4"></div>
            <button
                className={
                  disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
                }
                disabled={disableInputs}
                onClick={ handleGetCantidadDisponibles }
              >
                Calcular <FaCalculator className="iconSize" />
            </button>
          </div>
          
        </div>

        <div className="row mb-2">

          <div className="col-md-4 mb-3">
            <h5>Cantidades a Convertir</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber className="iconSize" />
              </span>
              <input
                type="number"
                name="codigo"
                className="form-control"
                placeholder="Cantidades a Convertir"
                disabled={disableInputs}
                value={ cantidadConvertirConvertidor }
                onChange={(e) => 
                  handleInputChangeWithDispatch(
                    e,
                    SetCantidadConvertirConvertidorIntentory
                  )
                }
              />
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="w-100 pt-4"></div>
            <button
                className={
                  disableInputs ? "btn btn-success disabled" : "btn btn-success"
                }
                disabled={disableInputs}
                onClick={ handleConvertirCantidadDisponibles }
              >
                Convertir <VscGitPullRequestCreate className="iconSize" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
