import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaBarcode, FaSearch } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbNotes, TbNumber, TbListSearch } from "react-icons/tb";
import { CgScreen } from "react-icons/cg";
import { MdNumbers, MdFamilyRestroom } from "react-icons/md";
import { FaTruckFast, FaMapLocationDot, FaBoxesPacking } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

// Import action
import {
  IsOpenSearchModalRebaja,
  OpenSearchModalInventory,
  SetActualizadoInventory,
  SetBarras2Inventory,
  SetBarras3Inventory,
  SetBarrasInventory,
  SetCantidadDescargaInventory,
  SetCantidadPresentOtroInventory,
  SetCodcabysInventory,
  SetCodigoDescargaInventory,
  SetCodMarcaInventory,
  SetCodPresentacionInventory,
  SetCod_ArticuloInventory,
  SetCod_PresentOtroInventory,
  SetDescargaOtroInventory,
  SetDescripcionInventory,
  SetMuestraInventory,
  SetOpenModalSearchFamiliasInventory,
  SetOpenModalSearchPresentacionInventory,
  SetOpenModalSearchProveedorInventory,
  SetOpenModalSearchUbicacionInventory,
  SetPantallaInventory,
  SetPresentaCantInventory,
  SetProveedorInventory,
  SetSinDecimalInventory,
  SetSoloContadoInventory,
  SetSubFamiliaInventory,
  SetSubUbicacionInventory,
  IsShowTabCodigoBarrasInventory,
  SetServicioInventory,
  SetOpenModalSearchCodigoCabysInventory,
} from "../../actions/inventory";
import { startGetAllSubFamilias } from "../../actions/SubFamiliasAction";
import { startGetAllSubUbicaciones } from "../../actions/SubUbicacionesAction";
import { startGetAllProveedores } from "../../actions/ProveedoresAction";
import { startGetAllMarcas } from "../../actions/MarcasAction";
import { startGetAllPresentaciones } from "../../actions/PresentacionesAction";
import { startGetAllMonedas } from "../../actions/MonedasAction";
import { startGetAllImpuestos } from "../../actions/ImpuestosAction";
import { startGetAllBodegas } from "../../actions/bodegasAction";
import { startGetAllCategoriasInventory } from "../../actions/CategoriasAction";

export const InventoryHeaderArticle = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs, isShowTabCodigoBarras } = useSelector(
    (state) => state.inventory
  );
  const { subFamiliasInventory } = useSelector((state) => state.subFamilias);
  const { subUbicacionesInventory } = useSelector(
    (state) => state.subUbicaciones
  );
  const { proveedoresInventory } = useSelector((state) => state.proveedores);
  const { marcasInventory } = useSelector((state) => state.marcas);
  const { presentacionesInventory } = useSelector(
    (state) => state.presentaciones
  );
  const { monedasInventory } = useSelector((state) => state.monedas);
  const { impuestosInventory } = useSelector((state) => state.impuestos);
  const { bodegasInventory } = useSelector((state) => state.bodegas);
  const { categoriasInventory } = useSelector((state) => state.categorias);

  const {
    cod_Articulo,
    descripcion,
    actualizado,
    soloContado,
    barras,
    barras2,
    barras3,
    subFamilia,
    subUbicacion,
    proveedor,
    pantalla,
    codcabys,
    muestra,
    sinDecimal,
    presentaCant,
    codPresentacion,
    codMarca,
    servicio,
  } = inventory;

  // useEffect(async () => {

  //     if(presentacionesInventory === null && disableInputs === false){
  //         await dispatch( startGetAllPresentaciones() );
  //     }

  //     if(subFamiliasInventory === null && disableInputs === false) {
  //         await dispatch( startGetAllSubFamilias() );
  //     }

  //     if(subUbicacionesInventory === null && disableInputs === false) {
  //         await dispatch( startGetAllSubUbicaciones() );
  //     }

  //     if(proveedoresInventory === null && disableInputs === false) {
  //         await dispatch( startGetAllProveedores() );
  //     }

  //     if(marcasInventory === null && disableInputs === false) {
  //         await dispatch( startGetAllMarcas() );
  //     }

  //     if(monedasInventory === null && disableInputs === false){
  //         await dispatch( startGetAllMonedas() );
  //     }

  //     if(impuestosInventory === null && disableInputs === false){
  //         await dispatch( startGetAllImpuestos() );
  //     }

  //     if(bodegasInventory === null && disableInputs === false){
  //         await dispatch( startGetAllBodegas() );
  //     }

  //     if(categoriasInventory === null && disableInputs === false){
  //         await dispatch( startGetAllCategoriasInventory() );
  //     }

  // }, [
  //     dispatch,
  //     startGetAllPresentaciones,
  //     startGetAllSubFamilias,
  //     startGetAllSubUbicaciones,
  //     startGetAllProveedores,
  //     startGetAllMarcas,
  //     startGetAllMonedas,
  //     startGetAllImpuestos,
  //     startGetAllBodegas,
  //     disableInputs
  // ]);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  const handleOpenSearchPresentaciones = (e) => {
    if (!disableInputs) {
      e.preventDefault();
      dispatch(SetOpenModalSearchPresentacionInventory(true));
    }
  };

  const handleOpenSearchFamilias = (e) => {
    if (!disableInputs) {
      e.preventDefault();
      dispatch(SetOpenModalSearchFamiliasInventory(true));
    }
  };

  const handleOpenSearchUbicacion = (e) => {
    if (!disableInputs) {
      e.preventDefault();
      dispatch(SetOpenModalSearchUbicacionInventory(true));
    }
  };

  const handleOpenSearchProveedor = (e) => {
    if (!disableInputs) {
      e.preventDefault();
      dispatch(SetOpenModalSearchProveedorInventory(true));
    }
  };

  const handleOpenSearchCodigoCabys = (e) => {
    if (!disableInputs) {
      e.preventDefault();
      dispatch(SetOpenModalSearchCodigoCabysInventory(true));
    }
  };

  return (
    <>
      <div className="row mb-3 text-md-center">
        <div className="col-md-3 mb-3">
          <h5>Código</h5>
          <div className="input-group">
            <span className="input-group-text">
              <GoNumber className="iconSize" />
            </span>
            <input
              type="text"
              name="cod_Articulo"
              disabled={disableInputs}
              value={cod_Articulo}
              className="form-control"
              placeholder="Código Inventario"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetCod_ArticuloInventory)
              }
            />
            {/* <button class="btn btn-primary" type="button">
              <FaSearch className="iconSize" />
            </button> */}
          </div>
        </div>

        <div className="col-md-3 mb-3">
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
              disabled={disableInputs}
              value={descripcion}
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetDescripcionInventory)
              }
            />
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Tipo Presentación</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaBoxesPacking className="iconSize" />
            </span>
            <select
              type="text"
              name="codPresentacion"
              className="form-select"
              disabled={disableInputs}
              value={codPresentacion}
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetCodPresentacionInventory)
              }
            >
              <option value="" selected disabled hidden>
                {" "}
                Seleccione...{" "}
              </option>
              {presentacionesInventory != null ? (
                presentacionesInventory.map((tipo) => {
                  return (
                    <option value={tipo.codPres}>
                      {" "}
                      {tipo.presentaciones}{" "}
                    </option>
                  );
                })
              ) : (
                <option value="">No se cargaron las presentaciones</option>
              )}
            </select>
            <button
              className={
                disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
              }
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalPresentacion"
            >
              <FaSearch className="iconSize" />
            </button>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Cantidad</h5>
          <div className="input-group">
            <span className="input-group-text">
              <TbNumber className="iconSize" />
            </span>
            <input
              type="text"
              name="presentaCant"
              className="form-control"
              placeholder="Cantidad de Producto"
              disabled={disableInputs}
              value={presentaCant}
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetPresentaCantInventory)
              }
            />
          </div>
        </div>
      </div>

      <div className="row mb-3 text-md-center">
        <div className="col-md-3 mb-3">
          <h5>Familia</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdFamilyRestroom className="iconSize" />
            </span>
            <select
              name="subFamilia"
              disabled={disableInputs}
              value={subFamilia}
              className="form-select"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetSubFamiliaInventory)
              }
            >
              <option value="" selected disabled hidden>
                {" "}
                Seleccione...{" "}
              </option>
              {subFamiliasInventory != null ? (
                subFamiliasInventory.map((tipo) => {
                  return (
                    <option value={tipo.codigo}> {tipo.descripcion} </option>
                  );
                })
              ) : (
                <option value="">No se cargaron las familias</option>
              )}
            </select>
            <button
              className={
                disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
              }
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalFamilia"
            >
              <FaSearch className="iconSize" />
            </button>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Ubicación</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaMapLocationDot className="iconSize" />
            </span>
            <select
              name="subUbicacion"
              disabled={disableInputs}
              value={subUbicacion}
              className="form-select"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetSubUbicacionInventory)
              }
            >
              <option value="" selected disabled hidden>
                {" "}
                Seleccione...{" "}
              </option>
              {subUbicacionesInventory != null ? (
                subUbicacionesInventory.map((tipo) => {
                  return (
                    <option value={tipo.codigo}> {tipo.descripcion} </option>
                  );
                })
              ) : (
                <option value="">No se cargaron las ubicaciones</option>
              )}
            </select>
            <button
              className={
                disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
              }
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalUbicacion"
            >
              <FaSearch className="iconSize" />
            </button>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Proveedor</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaTruckFast className="iconSize" />
            </span>
            <select
              name="proveedor"
              disabled={disableInputs}
              value={proveedor}
              className="form-select"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetProveedorInventory)
              }
            >
              <option value="" selected disabled hidden>
                {" "}
                Seleccione...{" "}
              </option>
              {proveedoresInventory != null ? (
                proveedoresInventory.map((tipo) => {
                  return (
                    <option value={tipo.codigo}> {tipo.descripcion} </option>
                  );
                })
              ) : (
                <option value="">No se cargaron los proveedores</option>
              )}
            </select>
            <button
              className={
                disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
              }
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalProveedor"
            >
              <FaSearch className="iconSize" />
            </button>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Código Cabys</h5>
          <div className="input-group">
            <span className="input-group-text">
              <MdNumbers className="iconSize" />
            </span>
            <input
              type="text"
              name="codcabys"
              className="form-control"
              disabled={disableInputs}
              value={codcabys}
              placeholder="Código Cabys del Producto"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetCodcabysInventory)
              }
            />
            <button
              className={
                disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
              }
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalCabys"
            >
              <FaSearch className="iconSize" />
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3 text-md-center">
        <div className="col-md-1 mb-0"></div>
        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="checkActualizado"
              name="actualizado"
              disabled={disableInputs}
              checked={actualizado}
              class="form-check-input checkP"
              onChange={(e) =>
                handleInputChangeCheckBoxWithDispatch(
                  e,
                  SetActualizadoInventory
                )
              }
            />
            <h5 className="form-check-label" for="checkActualizado">
              Actualizado
            </h5>
          </div>
          <hr />
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="checkCompletos"
              name="sinDecimal"
              class="form-check-input checkP"
              disabled={disableInputs}
              checked={sinDecimal}
              onChange={(e) =>
                handleInputChangeCheckBoxWithDispatch(e, SetSinDecimalInventory)
              }
            />
            <h5 className="form-check-label" for="checkCompletos">
              Artículos Completos
            </h5>
          </div>
          <hr />
        </div>

        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="checkContado"
              name="soloContado"
              class="form-check-input checkP"
              disabled={disableInputs}
              checked={soloContado}
              onChange={(e) =>
                handleInputChangeCheckBoxWithDispatch(
                  e,
                  SetSoloContadoInventory
                )
              }
            />
            <h5 className="form-check-label" for="checkContado">
              Solo de Contado
            </h5>
          </div>
          <hr />
        </div>
        <div className="col-md-1 mb-0"></div>
      </div>

      <div className="row mb-3 text-md-center">
        <div className="col-md-1 mb-0"></div>
        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="checkMostrar"
              name="muestra"
              class="form-check-input checkP"
              disabled={disableInputs}
              checked={muestra}
              onChange={(e) =>
                handleInputChangeCheckBoxWithDispatch(e, SetMuestraInventory)
              }
            />
            <h5 className="form-check-label" for="checkMostrar">
              Mostrar
            </h5>
          </div>
          <hr />
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-check">
            <input
              id="checkProductoAgropecuario"
              type="checkbox"
              class="form-check-input checkP"
              // name='barras2'
              disabled={disableInputs}
              // value={ barras2 }
              // onChange={ e => handleInputChangeWithDispatch(e, SetBarras2Inventory ) }
            />
            <h5 className="form-check-label" for="checkProductoAgropecuario">
              Canasta Basica Agropecuaria
            </h5>
          </div>
          <hr />
        </div>

        <div className="col-md-3 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="checkServicio"
              name="servicio"
              class="form-check-input checkP"
              disabled={disableInputs}
              checked={servicio}
              onChange={(e) =>
                handleInputChangeCheckBoxWithDispatch(e, SetServicioInventory)
              }
            />
            <h5 className="form-check-label" for="checkServicio">
              Servicio
            </h5>
          </div>
          <hr />
        </div>
        <div className="col-md-1 mb-0"></div>
      </div>

      <div className="row mb-3 text-md-center">
        <div className="col-md-2 mb-0"></div>
        <div className="col-md-4 mb-3">
          <div className="inline-container">
            <h5>Código Barras</h5>
            <div className="form-check">
              <input
                id="checkVariosCodigoBarras"
                type="checkbox"
                name="isShowTabCodigoBarras"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={isShowTabCodigoBarras}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(
                    e,
                    IsShowTabCodigoBarrasInventory
                  )
                }
              />
              <h5 className="form-check-label" for="checkVariosCodigoBarras">
                Varios codigos de barras
              </h5>
            </div>
          </div>
          {!isShowTabCodigoBarras ? (
            <div className="input-group">
              <span className="input-group-text">
                <FaBarcode className="iconSize" />
              </span>
              <input
                type="text"
                name="barras"
                disabled={disableInputs}
                value={barras}
                className="form-control"
                placeholder="Código de Barras del Producto"
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetBarrasInventory)
                }
              />
            </div>
          ) : null}
        </div>
        <div className="col-md-4 mb-3">
          <div className="inline-container">
            <h5>Tipo Pantalla</h5>
            <div className="form-check">
              <input
                id="checkPantalla"
                type="checkbox"
                name="pantalla"
                disabled={disableInputs}
                checked={pantalla}
                class="form-check-input checkP"
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetPantallaInventory)
                }
              />
              <h5 className="form-check-label" for="checkPantalla">
                Pantalla
              </h5>
            </div>
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <CgScreen className="iconSize" />
            </span>
            <select
              name="codMarca"
              disabled={disableInputs}
              value={codMarca}
              className="form-select"
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetCodMarcaInventory)
              }
            >
              <option value="" selected disabled hidden>
                {" "}
                Seleccione...{" "}
              </option>
              {marcasInventory != null ? (
                marcasInventory.map((tipo) => {
                  return <option value={tipo.codMarca}> {tipo.marca1} </option>;
                })
              ) : (
                <option value="">No se cargaron las marcas</option>
              )}
            </select>
          </div>
        </div>
        <div className="col-md-2 mb-0"></div>
      </div>
      <hr />

      <div className="row mb-3 text-md-center"></div>
    </>
  );
};
