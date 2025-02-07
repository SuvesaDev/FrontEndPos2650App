import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber } from "react-icons/tb";

import {
  CleanInputsFormulaArticleInventory,
  IsOpenSearchModalFormulaInventory,
  IsOpenSearchModalRelacionados,
  OpenSearchModalInventory,
  SetCantidadFormulaArticleInventory,
  SetCodigoFormulaArticleInventory,
  SetDescripcionFormulaArticleInventory,
  SetFormulaArticleInventory,
  startDeleteRelatedArticle,
  startSaveArticleFormulaInventory,
} from "../../../../actions/inventory";

import { InventoryBodyFeaturesFormulaTable } from "./InventoryBodyFeaturesFormulaTable";
import { RelatedArticles } from "../../../../models/relatedArticles";

export const InventoryBodyFeaturesFormula = () => {

  const dispatch = useDispatch();

  const {
    disableInputs,
    formulaArticles,
    formulaArticlesInventory,
    inventory,
    isSeletedRelatedArticles,
    seletedrelatedArticles,
    isEditInventory,
    isInventoryDisable,
  } = useSelector((state) => state.inventory);

  const { auth } = useSelector(state => state.login);

  const { codigo, cod_Articulo, descripcion, cantidad } = formulaArticles;

  const columns = [
    {
      Header: "Codigo",
      accessor: "codigo",
    },
    {
      Header: "Descripcion",
      accessor: "descripcion",
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    },
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleSearchArticle = (e) => {
    e.preventDefault();

    dispatch(IsOpenSearchModalFormulaInventory(true));
    dispatch(OpenSearchModalInventory());
  };

  const handleSaveFormulaArticle = (e) => {

    e.preventDefault();

    if (codigo === "" || descripcion === "" || cantidad === 0) return;

    const existFormulaArticle = formulaArticlesInventory.find(
      (value) =>
        value.codigo === codigo &&
        value.descripcion === descripcion &&
        value.cantidad === cantidad
    );

    if (existFormulaArticle === undefined) {

      if (cod_Articulo !== null) {

        let formulaArticlesArray = [];
        formulaArticlesArray.push( new RelatedArticles(
              0,
              parseInt(inventory.codigo),
              parseInt(codigo),
              `${cod_Articulo}`,
              descripcion,
              parseFloat(cantidad),
              true,
              auth.username,
              false,
              true // Es formula
          ) );

        dispatch( startSaveArticleFormulaInventory( formulaArticlesArray ) );

      } else {

        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Primero debe ingresar un Código de Articulo",
        });

      }
    }
  };

  const handleDeleteRelatedArticle = (e) => {
    e.preventDefault();

    // if (isSeletedRelatedArticles && isInventoryDisable) {
    //   dispatch(
    //     startDeleteRelatedArticle(
    //       seletedrelatedArticles,
    //       seletedrelatedArticles.id != 0 ? true : false
    //     )
    //   );
    // }
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">

          <div className="col-md-6 mb-3">
            <h5>Código</h5>
            <div className="input-group">
              <span className="input-group-text">
                <GoNumber className="iconSize" />
              </span>
              <input
                type="text"
                name="codigo"
                className="form-control"
                placeholder="Código Producto"
                disabled={disableInputs}
                value={codigo}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCodigoFormulaArticleInventory
                  )
                }
              />
              <button
                className={
                  disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
                }
                type="button"
                onClick={handleSearchArticle}
                data-bs-toggle="modal"
                data-bs-target="#modalBuscarArticulo"
              >
                <FaSearch className="iconSize" />
              </button>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <h5>Cantidad</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber className="iconSize" />
              </span>
              <input
                type="text"
                name="cantidad"
                className="form-control"
                placeholder="Cantidad de Producto"
                disabled={disableInputs}
                value={cantidad}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCantidadFormulaArticleInventory
                  )
                }
              />
            </div>
          </div>

        </div>

        <div className="row mb-2">

          <div className="col-md-12 mb-2">
            <h5>Descipción</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNotes className="iconSize" />
              </span>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                placeholder="Descripción del Producto"
                disabled={true}
                value={descripcion}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetDescripcionFormulaArticleInventory
                  )
                }
              />
            </div>
          </div>

        </div>

        <div className="row mb-2">
          <div className="col-md-4 mb-2">
            <h5>Opciones</h5>
            <div className="inline-container">
              <button
                className={
                  disableInputs ? "btn btn-success disabled" : "btn btn-success"
                }
                disabled={disableInputs}
                onClick={ handleSaveFormulaArticle }
              >
                Agregar <IoAddCircle className="iconSize" />
              </button>

              <button
                className={
                  isSeletedRelatedArticles
                    ? "btn btn-danger"
                    : "btn btn-danger disabled"
                }
                disabled
                onClick={handleDeleteRelatedArticle}
                type="button"
              >
                <RiDeleteBin2Fill className="iconSize" />
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12 mb-2">
            <InventoryBodyFeaturesFormulaTable
              columns={columns}
              data={formulaArticlesInventory}
            />
          </div>
        </div>

      </div>
    </>
  );
};
