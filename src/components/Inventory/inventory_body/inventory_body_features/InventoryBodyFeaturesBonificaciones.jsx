import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaSearch, FaGift } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber } from "react-icons/tb";

import { InventoryBodyFeaturesBonificacionesTable } from "./InventoryBodyFeaturesBonificacionesTable";

import {
  CleanInputsFormulaArticleInventory,
  IsOpenSearchModalFormulaInventory,
  IsOpenSearchModalRelacionados,
  OpenSearchModalInventory,
  SetCodigoBonificacionArticleInventory,
  SetDescripcionArtBonificacionArticleInventory,
  SetFormulaArticleInventory,
  SetTipoBonificacionArticleInventory,
  startDeleteFormulaArticle,
  startDeleteRelatedArticle,
  startSaveArticleFormulaInventory,
  startUpdateArticleFormulaInventory,
} from "../../../../actions/inventory";

import { RelatedArticles } from "../../../../models/relatedArticles";

export const InventoryBodyFeaturesBonificaciones = () => {

  const dispatch = useDispatch();

  const {
    disableInputs,
    bonificacionArticles
  } = useSelector((state) => state.inventory);

  const { auth } = useSelector(state => state.login);

  const { codigo, cod_Articulo, descripcion, tipoBonificacion } = bonificacionArticles;

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
      Header: "Tipo de Bonificacion",
      accessor: "tipoBonificacion",
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

    // e.preventDefault();

    // if (codigo === "" || descripcion === "" || cantidad === 0) return;

    // const existFormulaArticle = formulaArticlesInventory.find(
    //   (value) =>
    //     value.codigo === codigo &&
    //     value.descripcion === descripcion &&
    //     value.cantidad === cantidad
    // );

    // if (existFormulaArticle === undefined) {

    //   if (cod_Articulo !== null) {

    //     let formulaArticlesArray = [];
    //     formulaArticlesArray.push( new RelatedArticles(
    //           0,
    //           parseInt(inventory.codigo),
    //           parseInt(codigo),
    //           `${cod_Articulo}`,
    //           descripcion,
    //           parseFloat(cantidad),
    //           true,
    //           auth.username,
    //           false,
    //           true // Es formula
    //       ) );

    //     dispatch( startSaveArticleFormulaInventory( formulaArticlesArray ) );

    //   } else {

    //     Swal.fire({
    //       icon: "warning",
    //       title: "Error",
    //       text: "Primero debe ingresar un Código de Articulo",
    //     });

    //   }
    // }
  };

  const handleEditRelatedArticle = (e) => {
  
      // e.preventDefault();
  
      // if (cantidad === 0) return;
  
      //   if (cod_Articulo !== null) {
  
      //     dispatch( startUpdateArticleFormulaInventory(inventory.codigo, codigo, cantidad, true) );
          
      //   }
    };

  const handleDeleteRelatedArticle = (e) => {
    // e.preventDefault();

    // if (cantidad === 0) return;

    //   if (cod_Articulo !== null) {

    //     dispatch( startDeleteFormulaArticle(inventory.codigo, codigo, cantidad, false) );
        
    //   }
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
                  handleInputChangeWithDispatch(e, SetTipoBonificacionArticleInventory)
                }
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {/* {proveedoresInventory != null ? (
                  proveedoresInventory.map((tipo) => {
                    return (
                      <option value={tipo.codigo}> {tipo.descripcion} </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron los proveedores</option>
                )} */}
              </select>
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
            <InventoryBodyFeaturesBonificacionesTable
              columns={columns}
              data={[]}
            />
          </div>
        </div>

      </div>
    </>
  );
};
