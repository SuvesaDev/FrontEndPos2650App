import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";
import { AiFillShop } from "react-icons/ai";
import { TbNumber, TbNumbers, TbEditCircle } from "react-icons/tb";
import { FaCalculator } from "react-icons/fa6";
import { VscGitPullRequestCreate } from "react-icons/vsc";

import { InventoryBodyFormulaLotesTable } from "./InventoryBodyFormulaLotesTable";

import { 
  CleanInputsFormulaLotesInventory,
  SetCantidadConvertirConvertidorLotesIntentory,
  SetCantidadFormulaLotesInventory,
  SetDeleteLotesFormulaInventory,
  SetEditArrayLotesFormulaInventory,
  SetEditLotesFormulaInventory,
  SetIdArticuloFormulaLotesInventory, 
  SetIdBodegaFormulaLotesInventory, 
  SetIdLoteFormulaLotesInventory,
  SetIsEditLotesFormulaInventory,
  SetLotesByArticleFormulaInventory,
  SetLotesFormulaInventory,
  SetShowDivConvertirLotesFormulaInventory,
  startCalculateCantidadDisponiblesConvertidorLotesInventory,
  startConvertirCantidadDisponiblesConvertidorLotesInventory,
  startGetLotesByArticleFormula
} from "../../../../actions/inventory";
import { useEffect } from "react";

export const InventoryBodyFormulaLotes = () => {

  const dispatch = useDispatch();

  const {
    inventory,
    formulaLotes,
    formulaArticlesInventory,
    disableInputs,
    disableInputsLotesFormula,
    lotesByArticleFormula,
    lotesFormula,
    showDivConvertir,
    cantidadDisponibleConvertidorLotes,
    cantidadConvertirConvertidorLotes,
    isLoteFormulaEdit,
    loteFormulaEdit
  } = useSelector((state) => state.inventory);

  useEffect(() => {
    
    if( lotesFormula.length == 0 && formulaArticlesInventory.length == 0 ) {
      dispatch( SetShowDivConvertirLotesFormulaInventory( false ) );
      return;
    }

    if( validarListaArticulosFormula() ){
      dispatch( SetShowDivConvertirLotesFormulaInventory( true ) );
    }
  
  }, [lotesFormula]);

  const { bodegasInventory } = useSelector(state => state.bodegas);

  const { idArticuloFormula, idLote, idBodega, cantidad } = formulaLotes;

  const columns = [
    {
      Header: "Artículo",
      accessor: "articulo",
    },
    {
      Header: "Vencimiento",
      accessor: "vencimiento",
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    }
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(parseInt(target.value)));
  };

  const handleChangeInputArticle = ({ target }) => {

    const codigoArticulo = target.value;

    if( codigoArticulo != 0 ) {
      dispatch( SetIdArticuloFormulaLotesInventory(codigoArticulo) );
      dispatch( startGetLotesByArticleFormula(codigoArticulo) );
    }

  }

  const handleAddLotesFormula = () => {
    
    if( idArticuloFormula == 0 || idLote == 0 || idBodega == 0 || cantidad == 0 ) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Debe completar la informacion para agregar lote formula.",
      });

      return;

    }

    const articuloSeleted = formulaArticlesInventory.find( articulo => articulo.codigo == idArticuloFormula );
    const loteSeleted = lotesByArticleFormula.find( lot => lot.id == idLote );
    const { existencia } = loteSeleted;
    
    if( cantidad > existencia ) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Debe digitar una cantidad igual o menor del stock del lote.",
      });

      return;

    }


    const existArticle = lotesFormula.find( lotForm => lotForm.idArticuloFormula === idArticuloFormula && lotForm.idLote === idLote );
    if( existArticle != undefined || existArticle != null ){
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: `El artículo ${articuloSeleted.codigo} - ${articuloSeleted.descripcion} con el lote ${loteSeleted.lote} ya se encuentra registrado.`,
      });

      dispatch( CleanInputsFormulaLotesInventory() );

      return;
    }

    const newloteFormula = {
      id: lotesFormula.length + 1,
      idArticuloFormula,
      idLote,
      idBodega,
      cantidad,
      articulo: `${articuloSeleted.codigo} - ${articuloSeleted.descripcion}`,
      stockLote: loteSeleted.existencia,
      vencimiento: loteSeleted.vencimiento
    }

    // Se agrega en la tabla
    dispatch( SetLotesFormulaInventory(newloteFormula) );
    dispatch( SetLotesByArticleFormulaInventory([]) );
    dispatch( CleanInputsFormulaLotesInventory() );

  }

  const handleEditLotesFormula = () => {
    
    if( idArticuloFormula == 0 || idLote == 0 || idBodega == 0 || cantidad == 0 ) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Debe completar la informacion para agregar lote formula.",
      });

      return;

    }

    const articuloSeleted = formulaArticlesInventory.find( articulo => articulo.codigo == idArticuloFormula );
    const loteSeleted = lotesByArticleFormula.find( lot => lot.id == idLote );

    const { existencia } = loteSeleted;
    
    if( cantidad > existencia ) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Debe digitar una cantidad igual o menor del stock del lote.",
      });

      return;

    }
    
    dispatch( SetEditArrayLotesFormulaInventory( {
      id: loteFormulaEdit.id,
      idArticuloFormula: idArticuloFormula,
      idLote: idLote,
        idBodega: idBodega,
        cantidad: cantidad,
        articulo: `${articuloSeleted.codigo} - ${articuloSeleted.descripcion}`,
        stockLote: loteSeleted.existencia,
        vencimiento: loteSeleted.vencimiento
      // }
      
    } ) );

    dispatch( SetLotesByArticleFormulaInventory([]) );
    dispatch( CleanInputsFormulaLotesInventory() );

    dispatch( SetIsEditLotesFormulaInventory( false ) );
    dispatch( SetEditLotesFormulaInventory( {} ) );

  }

  const handleRemoveLoteFormula = () => {

    //Mostrar un mensaje de confirmacion
    Swal.fire({
        title: `¿Desea eliminar el Lote Formula?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if (result.isConfirmed) {

        dispatch( SetDeleteLotesFormulaInventory( loteFormulaEdit.id ) );

        dispatch( SetLotesByArticleFormulaInventory([]) );
        dispatch( CleanInputsFormulaLotesInventory() );

        dispatch( SetIsEditLotesFormulaInventory( false ) );
        dispatch( SetEditLotesFormulaInventory( {} ) );

      }

    });   

  }

  const handleGetCantidadCalcular = () => {

    const requestCalcular = {
      idArticuloPrincipal: inventory.codigo,
      convertirCantidad: false,
      cantidadConvertir: 0,
      listaDeLotes: lotesFormula.map( lotFor => {
        return {
          idLote: lotFor.idLote,
          idArticulo: lotFor.idArticuloFormula,
          idBodega: lotFor.idBodega,
          cantidad: lotFor.cantidad
        }
      })
    }
    
    dispatch( startCalculateCantidadDisponiblesConvertidorLotesInventory(requestCalcular) );

  }

  const handleConvetirCantidad = () => {

    if( cantidadDisponibleConvertidorLotes == 0) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "La cantidad disponible a convertir es cero no se puede convertir.",
      });

      return;

    }

    if( cantidadConvertirConvertidorLotes == 0) {

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "La cantidad a convertir debe ser mayor a cero.",
      });

      return;

    }

    const requestConvertir = {
      idArticuloPrincipal: inventory.codigo,
      convertirCantidad: true,
      cantidadConvertir: cantidadConvertirConvertidorLotes,
      listaDeLotes: lotesFormula.map( lotFor => {
        return {
          idLote: lotFor.idLote,
          idArticulo: lotFor.idArticuloFormula,
          idBodega: lotFor.idBodega,
          cantidad: lotFor.cantidad
        }
      })
    }

    dispatch( startConvertirCantidadDisponiblesConvertidorLotesInventory(requestConvertir) );

  }

  const validarListaArticulosFormula = () => {

    const codArticulosFormula = formulaArticlesInventory.map( formulaArt => {
      return formulaArt.codigo
    });

    const codLoteFormula = lotesFormula.map( lotFor => {
      return parseInt(lotFor.idArticuloFormula)
    });

    const requeridos = new Set(codArticulosFormula); 
    const listaSet = new Set(codLoteFormula);
  
    for (let num of requeridos) {
      if (!listaSet.has(num)) {
        return false; 
      }
    }

    return true;
  }

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card text-center">

          <div className="card-header bg-secondary text-white">
            <h5>Formula Lotes</h5>
          </div>

          <div className="card-body">

            <div className="row mb-2">

              <div className="col-md-12 mb-2">
                <h5>Artículos Formula</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaCartShopping className="iconSize" />
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    disabled={disableInputs}
                    value={idArticuloFormula}
                    onChange={(e) =>
                      handleChangeInputArticle(e)
                    }
                  >
                    <option value={0} selected disabled hidden>
                      {" "}
                      Seleccione...{" "}
                    </option>
                    {formulaArticlesInventory != [] ? (
                      formulaArticlesInventory.map((articulo) => {
                        return (
                          <option value={articulo.codigo}> {articulo.codigo} {"-"} {articulo.descripcion} </option>
                        );
                      })
                    ) : (
                      <option value="">No tiene artículos formula</option>
                    )}

                  </select>
                </div>
              </div>

            </div>

            <div className="row mb-2">

              <div className="col-md-12 mb-2">
                <h5>Lotes</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <CiShoppingTag className="iconSize" />
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    disabled={disableInputs}
                    value={idLote}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(
                        e,
                        SetIdLoteFormulaLotesInventory
                      )
                    }
                  >
                    <option value={0} selected disabled hidden>
                      {" "}
                      Seleccione...{" "}
                    </option>
                    {lotesByArticleFormula != [] ? (
                      lotesByArticleFormula.map((lot) => {
                        return (
                          <option value={lot.id}> {lot.lote} {"-"} {lot.vencimiento} {"-"} {lot.existencia} </option>
                        );
                      })
                    ) : (
                      <option value="">No tiene lotes</option>
                    )}
                  </select>
                </div>
              </div>

            </div>

            <div className="row mb-2">

              <div className="col-md-4 mb-2">
                <h5>Bodegas</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiFillShop className="iconSize" />
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    disabled={disableInputs}
                    value={idBodega}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(
                        e,
                        SetIdBodegaFormulaLotesInventory
                      )
                    }
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

              <div className="col-md-4 mb-2">
                <h5>Cantidad</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbNumbers className="iconSize" />
                  </span>
                  <input
                    type="number"
                    name="cantidad"
                    className="form-control"
                    placeholder="Cantidad"
                    disabled={disableInputs}
                    value={cantidad}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(
                        e,
                        SetCantidadFormulaLotesInventory
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-4 mb-2">

                <div className="row mt-4">
                  
                  <div className="col-md-6">
                    <button
                      className={
                        isLoteFormulaEdit
                          ? "btn btn-warning"
                          : "btn btn-success"
                      }
                      disabled={disableInputs}
                      onClick={
                        isLoteFormulaEdit ? handleEditLotesFormula : handleAddLotesFormula
                      }
                    >
                      {isLoteFormulaEdit ? (
                        <>
                          Editar <TbEditCircle className="iconSize" />
                        </>
                      ) : (
                        <>
                          Agregar <IoAddCircle className="iconSize" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="col-md-6">
                    <button
                      className={
                        isLoteFormulaEdit
                          ? "btn btn-danger"
                          : "btn btn-danger disabled"
                      }
                      type="button"
                      onClick={handleRemoveLoteFormula}
                    >
                      <RiDeleteBin2Fill className="iconSize" />
                    </button>
                  </div>
                  
                </div>
                <hr />

              </div>

            </div>

            <div className={ (showDivConvertir) ? 'row mb-2' : 'row mb-2 d-none' }>

              <div className="col-md-3 mb-2">
                <h5>Disponiles</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbNumber className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="cantidad"
                    className="form-control"
                    placeholder="Cantidad"
                    disabled={true}
                    value={cantidadDisponibleConvertidorLotes}
                  />
                </div>
              </div>

              <div className="col-md-3 mb-2">
                <div className="w-100 pt-4"></div>
                <button
                    className={
                      disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                    disabled={disableInputs}
                    onClick={ handleGetCantidadCalcular }
                  >
                    Calcular <FaCalculator className="iconSize" />
                </button>
              </div>

              <div className="col-md-3 mb-2">
                <h5>Convertir</h5>
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
                    value={ cantidadConvertirConvertidorLotes }
                    onChange={(e) => 
                      handleInputChangeWithDispatch(
                        e,
                        SetCantidadConvertirConvertidorLotesIntentory
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-3 mb-2">
                <div className="w-100 pt-4"></div>
                <button
                    className={
                      disableInputs ? "btn btn-success disabled" : "btn btn-success"
                    }
                    disabled={disableInputs}
                    onClick={ handleConvetirCantidad }
                  >
                    Convertir <VscGitPullRequestCreate className="iconSize" />
                </button>
              </div>

            </div>

            <div className="row mb-2">
              <InventoryBodyFormulaLotesTable
                columns={columns}
                data={lotesFormula}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
