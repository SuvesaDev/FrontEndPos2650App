import { useDispatch, useSelector } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";
import { AiFillShop } from "react-icons/ai";
import { VscGitPullRequestCreate } from "react-icons/vsc";

import { InventoryBodyFormulaLotesTable } from "./InventoryBodyFormulaLotesTable";

import { 
  SetIdArticuloFormulaLotesInventory, 
  SetIdBodegaFormulaLotesInventory, 
  SetIdLoteFormulaLotesInventory
} from "../../../../actions/inventory";

export const InventoryBodyFormulaLotes = () => {

  const dispatch = useDispatch();

  const {
    inventory,
    formulaLotes,
    formulaArticlesInventory,
    disableInputs
  } = useSelector((state) => state.inventory);

  const { bodegasInventory } = useSelector(state => state.bodegas);

  const { idArticuloFormula, idLote, idBodega } = formulaLotes;

  const columns = [
    {
      Header: "Artículo",
      accessor: "articulo",
    },
    {
      Header: "Stock Lote",
      accessor: "stockLote",
    },
    {
      Header: "Vencimiento",
      accessor: "vencimiento",
    }
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(parseInt(target.value)));
  };

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
                      handleInputChangeWithDispatch(
                        e,
                        SetIdArticuloFormulaLotesInventory
                      )
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
                    <option value={1}>Tipo A</option>
                    <option value={2}>Tipo B</option>
                    <option value={3}>Tipo C</option>
                    <option value={4}>Tipo D</option>
                    <option value={5}>Tipo P</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="row mb-2">

              <div className="col-md-6 mb-2">
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

              <div className="col-md-6 mb-2">

                <div className="row mt-4">
                  
                  <div className="col-md-4">
                    <button
                      className="btn btn-success"
                      // className={
                      //   disableInputsP
                      //     ? "btn btn-secondary disabled"
                      //     : isEditPriceSell
                      //     ? "btn btn-warning"
                      //     : "btn btn-success"
                      // }
                      disabled={disableInputs}
                      // onClick={
                      //   isEditPriceSell ? handleEditPrecio : handleSavePrecio
                      // }
                    >
                      Agregar <IoAddCircle className="iconSize" />
                      {/* {isEditPriceSell ? (
                        <>
                          Editar <TbEditCircle className="iconSize" />
                        </>
                      ) : (
                        <>
                          Agregar <IoAddCircle className="iconSize" />
                        </>
                      )} */}
                    </button>
                  </div>
                  
                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      // className={
                      //   isEditPriceSell && isInventoryDisable
                      //     ? "btn btn-danger"
                      //     : "btn btn-danger disabled"
                      // }
                      type="button"
                      // onClick={handleRemovePrecio}
                    >
                      <RiDeleteBin2Fill className="iconSize" />
                    </button>
                  </div>

                  <div className="col-md-6">
                    <button
                        className={
                          disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
                        }
                        disabled={disableInputs}
                        // onClick={ handleConvertirCantidadDisponibles }
                      >
                        Convertir <VscGitPullRequestCreate className="iconSize" />
                    </button>
                  </div>
                  
                </div>
                <hr />

              </div>
            </div>

            <div className="row mb-2">
              <InventoryBodyFormulaLotesTable
                columns={columns}
                data={[]}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
