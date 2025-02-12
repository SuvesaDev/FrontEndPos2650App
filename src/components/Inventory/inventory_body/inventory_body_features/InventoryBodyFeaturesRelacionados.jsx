import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber } from "react-icons/tb";
import {
  CleanInputsRelatedArticleInventory,
  IsOpenSearchModalRelacionados,
  OpenSearchModalInventory,
  SetCantidadRelatedArticleInventory,
  SetCodigoRelatedArticleInventory,
  SetDescripcionRelatedArticleInventory,
  SetRelatedArticleInventory,
  startDeleteRelatedArticle,
  startUpdateArticleRelatedInventory,
} from "../../../../actions/inventory";

import { InventoryBodyFeaturesRelacionadosTable } from "./InventoryBodyFeaturesRelacionadosTable";

export const InventoryBodyFeaturesRelacionados = () => {
  const dispatch = useDispatch();

  const {
    disableInputs,
    relatedArticles,
    relatedArticlesInventory,
    inventory,
    isSeletedRelatedArticles,
    seletedrelatedArticles,
    isEditInventory,
    isInventoryDisable,
  } = useSelector((state) => state.inventory);

  const { codigo, descripcion, cantidad } = relatedArticles;
  const { cod_Articulo } = inventory;

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

    dispatch(IsOpenSearchModalRelacionados(true));
    dispatch(OpenSearchModalInventory());
  };

  const handleSaveRelatedArticle = (e) => {
    e.preventDefault();

    if (codigo === "" || descripcion === "" || cantidad === 0) return;

    const existRelatedArticle = relatedArticlesInventory.find(
      (value) =>
        value.codigo === codigo &&
        value.descripcion === descripcion &&
        value.cantidad === cantidad
    );

    if (existRelatedArticle === undefined) {
      if (cod_Articulo !== null) {
        dispatch(
          SetRelatedArticleInventory({
            id: 0,
            codigo,
            cod_Articulo,
            descripcion,
            cantidad,
            isNewEdit: isEditInventory,
          })
        );
        dispatch(CleanInputsRelatedArticleInventory());
      } else {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Primero debe ingresar un Código de Articulo",
        });
      }
    }
  };

  const handleEditRelatedArticle = (e) => {

    e.preventDefault();

    if (cantidad === 0) return;

      if (cod_Articulo !== null) {

        dispatch( startUpdateArticleRelatedInventory(inventory.codigo, codigo, cantidad, true) );
        
      }
  };

  const handleRemoveRelatedArticle = (e) => {
    debugger;
    e.preventDefault();

    if (cantidad === 0) return;

      if (cod_Articulo !== null) {

        dispatch( startDeleteRelatedArticle(inventory.codigo, codigo, cantidad, false) );
        
      }
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
                disabled={ (isSeletedRelatedArticles) ? true : disableInputs}
                value={codigo}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCodigoRelatedArticleInventory
                  )
                }
              />
              <button
                className={
                  disableInputs || isSeletedRelatedArticles ? "btn btn-primary disabled" : "btn btn-primary"
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
                type="number"
                name="cantidad"
                className="form-control"
                placeholder="Cantidad de Producto"
                disabled={disableInputs}
                value={cantidad}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCantidadRelatedArticleInventory
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
                    SetDescripcionRelatedArticleInventory
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
                onClick={ isSeletedRelatedArticles ? handleEditRelatedArticle : handleSaveRelatedArticle}
              >
                { isSeletedRelatedArticles ? 'Editar' : 'Agregar' } <IoAddCircle className="iconSize" />
              </button>

              <button
                className={
                  isSeletedRelatedArticles && !isInventoryDisable
                    ? "btn btn-danger"
                    : "btn btn-danger disabled"
                }
                onClick={handleRemoveRelatedArticle}
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
            <InventoryBodyFeaturesRelacionadosTable
              columns={columns}
              data={relatedArticlesInventory}
            />
          </div>
        </div>
      </div>
    </>
  );
};
