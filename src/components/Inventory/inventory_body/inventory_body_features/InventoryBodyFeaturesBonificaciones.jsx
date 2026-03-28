import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaSearch, FaGift } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber } from "react-icons/tb";

import { InventoryBodyFeaturesTipoBonificacionesTable } from "./InventoryBodyFeaturesTipoBonificacionesTable";
import { InventoryBodyFeaturesProductosBonificacionesTable } from "./InventoryBodyFeaturesProductosBonificacionesTable";

import {
  IsOpenSearchModalFormulaInventory,
  OpenSearchModalInventory,
  SetAddTipoBonificacionInventory,
  SetCodigoBonificacionArticleInventory,
  SetDeleteTipoBonificacionInventory,
  SetDescripcionArtBonificacionArticleInventory,
  SetEditTipoBonificacionInventory,
  SetIdSelectedTipoBonificacionInventory,
  SetIsSelectedTipoBonificacionInventory,
  SetTipoBonificacionInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesBonificaciones = () => {

  const dispatch = useDispatch();

  const {
    disableInputs,
    currentBonificacionArticles,
    tiposBonificacion,
    tipoBonificacion,
    bonificacionTypes,
    isSeletedTipoBonificacion
  } = useSelector((state) => state.inventory);

  const { auth } = useSelector(state => state.login);

  const { codigo, cod_Articulo, descripcion } = currentBonificacionArticles;

  const columnsTipoBonificables = [
    {
      Header: "Codigo",
      accessor: "codigo",
    },
    {
      Header: "Tipo de Bonificacion",
      accessor: "descripcion",
    },
  ];

  const columnsProductos = [
    {
      Header: "Codigo",
      accessor: "codigo",
    },
    {
      Header: "Descripcion",
      accessor: "descripcion",
    }
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleSearchArticle = (e) => {
    e.preventDefault();

    dispatch(IsOpenSearchModalFormulaInventory(true));
    dispatch(OpenSearchModalInventory());
  };

  const handleAddTipoBonificacion = (e) => {
    
    e.preventDefault();

    if (tipoBonificacion == 0) return;

    const existTipoBonificacion = bonificacionTypes.find(
      (value) => value.codigo === tipoBonificacion
    );

    if (existTipoBonificacion === undefined) {

      const newTipoBonificacion = tiposBonificacion.find(
        (value) => value.codigo == tipoBonificacion
      );

      const newTipo = {
        codigo: tipoBonificacion,
        descripcion: newTipoBonificacion.descripcion
      }

      dispatch(SetAddTipoBonificacionInventory(newTipo));
      dispatch(SetTipoBonificacionInventory(0));

    } else {
      Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El tipo de bonificacion ya esta incluido.",
        });
    }
  };

  const handleEditTipoBonificacion = (e) => {
  
    e.preventDefault();

    if (tipoBonificacion == 0) return;

    const editTipoBonificacion = tiposBonificacion.find(
      (value) => value.codigo == tipoBonificacion
    );

    const editTipo = {
      codigo: tipoBonificacion,
      descripcion: editTipoBonificacion.descripcion
    }

    dispatch( SetEditTipoBonificacionInventory(editTipo));
    dispatch( SetTipoBonificacionInventory(0));
    dispatch( SetIsSelectedTipoBonificacionInventory(false) );
    dispatch( SetIdSelectedTipoBonificacionInventory(0) );
  };

  const handleDeleteTipoBonificacion = (e) => {

    e.preventDefault();

    if (tipoBonificacion == 0) return;

    dispatch( SetDeleteTipoBonificacionInventory(tipoBonificacion) );
    dispatch( SetTipoBonificacionInventory(0));
    dispatch( SetIsSelectedTipoBonificacionInventory(false) );
    dispatch( SetIdSelectedTipoBonificacionInventory(0) );
      
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">

          <div className="col-md-6 mb-3">
            <h5>Tipo de Bonificacion</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaGift className="iconSize" />
              </span>
              <select
                name="proveedor"
                disabled={disableInputs}
                value={tipoBonificacion}
                className="form-select"
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetTipoBonificacionInventory)
                }
              >
                <option value={0} selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {tiposBonificacion != null ? (
                  tiposBonificacion.map((tipo) => {
                    return (
                      <option value={tipo.codigo}> {tipo.descripcion} </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron los proveedores</option>
                )}
              </select>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <h5>Opciones</h5>
            <div className="inline-container">
              <button
                className={
                  disableInputs ? "btn btn-success disabled" : "btn btn-success"
                }
                disabled={disableInputs}
                onClick={  isSeletedTipoBonificacion ? handleEditTipoBonificacion : handleAddTipoBonificacion }
              >
                { isSeletedTipoBonificacion ? 'Editar' : 'Agregar' } <IoAddCircle className="iconSize" />
              </button>

              <button
                className={
                  (isSeletedTipoBonificacion)
                    ? "btn btn-danger "
                    : "btn btn-danger disabled"
                }
                onClick={handleDeleteTipoBonificacion}
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
            <InventoryBodyFeaturesTipoBonificacionesTable
              columns={columnsTipoBonificables}
              data={bonificacionTypes}
            />
          </div>
          <hr />
        </div>

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
                    SetCodigoBonificacionArticleInventory
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

          <div className="col-md-6 mb-2">
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
                    SetDescripcionArtBonificacionArticleInventory
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
                // onClick={  isSeletedFormulaArticles ? handleEditRelatedArticle : handleSaveFormulaArticle }
              >
                {/* { isSeletedFormulaArticles ? 'Editar' : 'Agregar' }  */}
                'Agregar'
                <IoAddCircle className="iconSize" />
              </button>

              <button
                className="btn btn-danger"
                // className={
                //   (isSeletedFormulaArticles)
                //     ? "btn btn-danger "
                //     : "btn btn-danger disabled"
                // }
                // onClick={handleDeleteRelatedArticle}
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
            <InventoryBodyFeaturesProductosBonificacionesTable
              columns={columnsProductos}
              data={[]}
            />
          </div>
          <hr />
        </div>

      </div>
    </>
  );
};
