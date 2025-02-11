import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Fill, RiHandCoinFill } from "react-icons/ri";
import { TbNotes, TbEditCircle } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";
import { FaBarcode } from "react-icons/fa";
import { InventoryBodyFeaturesCodigoBarrasTable } from "./InventoryBodyFeaturesCodigoBarrasTable";

import {
  CleanCodigoBarrasActualInventory,
  IsCodigoBarrasEditInventory,
  SetAddCodigoBarrasInventory,
  SetCodigoCodigoBarrasActualInventory,
  SetDeleteCodigoBarrasInventory,
  SetDescripcionCodigoBarrasActualInventory,
  SetEditCodigoBarrasInventory,
  SetIndexCodigoBarrasInventory,
  SetTarifaCodigoBarrasActualInventory,
  startDisableCodigoBarrasInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesCodigoBarras = () => {
  const dispatch = useDispatch();

  const {
    disableInputs,
    codigoBarrasActual,
    isCodigoBarrasEdit,
    indexCodigoBarras,
    inventory,
  } = useSelector((state) => state.inventory);
  const { auth } = useSelector((state) => state.login);

  const { codigoBarras, tarifa } = codigoBarrasActual;

  const { descripcion, codigo } = inventory;

  const columns = [
    {
      Header: "Descripcion",
      accessor: "descripcion",
    },
    {
      Header: "Codigo Barras",
      accessor: "codigoBarras",
    },
    {
      Header: "Tarifa",
      accessor: "tarifa",
    },
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleSaveCodigoBarras = (e) => {
    e.preventDefault();

    if (descripcion === "" || codigoBarras === "" || tarifa === "") return;

    const existCodigoBarras = inventory.codigoBarras.find(
      (value) =>
        value.descripcion === descripcion &&
        value.codigoBarras === codigoBarras &&
        value.tarifa === tarifa
    );

    if (existCodigoBarras === undefined) {
      dispatch(
        SetAddCodigoBarrasInventory({
          descripcion,
          codigoBarras,
          tarifa,
        })
      );
      dispatch(CleanCodigoBarrasActualInventory());
    }
  };

  const handleEditCodigoBarras = (e) => {
    e.preventDefault();

    if (descripcion === "" || codigoBarras === "" || tarifa === "") return;

    dispatch(
      SetEditCodigoBarrasInventory({
        index: indexCodigoBarras,
        descripcion,
        codigoBarras,
        tarifa,
      })
    );
    dispatch(CleanCodigoBarrasActualInventory());
    dispatch(IsCodigoBarrasEditInventory(false));
  };

  const handleDeleteCodigoBarras = (e) => {
    if (isCodigoBarrasEdit) {
      const selectCodigoBarras = inventory.codigoBarras.find(
        (cb) =>
          cb.descripcion == descripcion &&
          cb.codigoBarras == codigoBarras &&
          cb.tarifa == tarifa
      );

      if (selectCodigoBarras.idCodigoBarrasInventario != undefined) {
        dispatch(
          startDisableCodigoBarrasInventory(
            selectCodigoBarras.codigoBarras,
            codigo,
            {
              descripcion,
              codigoBarras,
              tarifa,
            },
            auth.username
          )
        );
      } else {
        dispatch(
          SetDeleteCodigoBarrasInventory({
            descripcion,
            codigoBarras,
            tarifa,
          })
        );
        dispatch(CleanCodigoBarrasActualInventory());
        dispatch(SetIndexCodigoBarrasInventory(null));
        dispatch(IsCodigoBarrasEditInventory(false));
      }
    }
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">

          <div className="col-md-5 mb-3">
            <h5>Descipción</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNotes className="iconSize" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Descripción del Producto"
                name="descripcion"
                disabled={true}
                value={descripcion}
                // onChange={ e => handleInputChangeWithDispatch(e, SetDescripcionCodigoBarrasActualInventory ) }
              />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Código Barras</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaBarcode className="iconSize" />
              </span>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                placeholder="Código de Barras del Producto"
                disabled={disableInputs}
                value={codigoBarras}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCodigoCodigoBarrasActualInventory
                  )
                }
              />
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Tarifa</h5>
            <div className="input-group">
              <span className="input-group-text">
                <RiHandCoinFill className="iconSize" />
              </span>
              <select
                name="tarifa"
                className="form-select"
                disabled={disableInputs}
                value={tarifa}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetTarifaCodigoBarrasActualInventory
                  )
                }
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                <option value="A">Tipo A</option>
                <option value="B">Tipo B</option>
                <option value="C">Tipo C</option>
                <option value="D">Tipo D</option>
                <option value="P">Tipo P</option>
              </select>
            </div>
          </div>

        </div>

        <div className="row mb-2">
          <div className="col-md-5 mb-2">
            <div className="inline-container">
              <h5>Opciones</h5>
              <button
                className={
                  disableInputs
                    ? "btn btn-secondary disabled"
                    : isCodigoBarrasEdit
                    ? "btn btn-warning"
                    : "btn btn-success"
                }
                disabled={disableInputs}
                onClick={
                  isCodigoBarrasEdit
                    ? handleEditCodigoBarras
                    : handleSaveCodigoBarras
                }
              >
                {isCodigoBarrasEdit ? (
                  <>
                    Editar <TbEditCircle className="iconSize" />
                  </>
                ) : (
                  <>
                    Agregar <IoAddCircle className="iconSize" />
                  </>
                )}
              </button>

              <button
                className={
                  !disableInputs && isCodigoBarrasEdit
                    ? "btn btn-danger"
                    : "btn btn-danger disabled"
                }
                type="button"
                onClick={handleDeleteCodigoBarras}
              >
                <RiDeleteBin2Fill className="iconSize" />
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12 mb-2">
            <InventoryBodyFeaturesCodigoBarrasTable
              columns={columns}
              data={inventory.codigoBarras}
            />
          </div>
        </div>

      </div>
    </>
  );
};
