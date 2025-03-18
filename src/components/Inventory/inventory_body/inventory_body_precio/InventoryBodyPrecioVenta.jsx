import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbEditCircle } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { MdPriceCheck } from "react-icons/md";
import { FaListOl, FaMoneyBillTrendUp, FaMoneyBillWave } from "react-icons/fa6";
import {
  CleanStatePricesSellInventory,
  EditPricesSellInventory,
  IsEditPricesSellInventory,
  RemovePricesSellInventory,
  SetHasChangePrecioIVPricesSellInventory,
  SetHasChangePrecioPricesSellInventory,
  SetHasChangeUtilidadPricesSellInventory,
  SetMonedaVentaInventory,
  SetPrecioIVPricesSellInventory,
  SetPrecioPricesSellInventory,
  SetPreciosVentaInventory,
  SetPrecio_AInventory,
  SetPrecio_BInventory,
  SetPrecio_CInventory,
  SetPrecio_DInventory,
  SetPrecio_PromoInventory,
  SetTipoPricesSellInventory,
  SetUtilidadPricesSellInventory,
  SetWasFullPricesSellInventory,
} from "../../../../actions/inventory";
import { InventoryBodyPrecioVentaTable } from "./InventoryBodyPrecioVentaTable";

export const InventoryBodyPrecioVenta = () => {
  const dispatch = useDispatch();

  const {
    inventory,
    disableInputs,
    pricesSellInventory,
    priceSell,
    isEditPriceSell,
    selectedpriceSell,
    hasChangeUtilidadPriceSell,
    hasChangePrecioPriceSell,
    hasChangePrecioIVPriceSell,
    isInventoryDisable,
  } = useSelector((state) => state.inventory);
  const { monedasInventory } = useSelector((state) => state.monedas);

  const { monedaVenta, precioBase, fletes, otrosCargos, iVenta } = inventory;

  const { tipo, utilidad, precio, precioIV } = priceSell;

  const [disableInputsP, setDisableInputsP] = useState(disableInputs);

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  // UseEffect disableInputs
  useEffect(() => {
    setDisableInputsP(disableInputs);
  }, [disableInputs]);

  // UseEffect Utilidad, Precio y PrecioIV
  useEffect(() => {

    if( costaPets ) {

      //Utilidad
      let base = parseFloat(precioBase);
      let flete = parseFloat(fletes);
      let otroC = parseFloat(otrosCargos);
      let impuesto = parseFloat(iVenta);
      let util = parseFloat(utilidad);

      if (!isNaN(base) && !isNaN(impuesto) && !isNaN(util)) {
        if (isNaN(flete)) flete = 0;

        if (isNaN(otroC)) otroC = 0;

        const precio = base / ( 1 - (util / 100) );
        const precioIV = precio * (impuesto / 100) + precio;

        dispatch(SetPrecioPricesSellInventory(precio));
        dispatch(SetPrecioIVPricesSellInventory(precioIV));
      }

    } else  {

      if (
        hasChangeUtilidadPriceSell &&
        !hasChangePrecioPriceSell &&
        !hasChangePrecioIVPriceSell
      ) {
        //Utilidad
        let base = parseFloat(precioBase);
        let flete = parseFloat(fletes);
        let otroC = parseFloat(otrosCargos);
        let impuesto = parseFloat(iVenta);
        let util = parseFloat(utilidad);
  
        if (!isNaN(base) && !isNaN(impuesto) && !isNaN(util)) {
          if (isNaN(flete)) flete = 0;
  
          if (isNaN(otroC)) otroC = 0;
  
          const precio = base * (util / 100) + flete + otroC + base;
          const precioIV = precio * (impuesto / 100) + precio;
  
          dispatch(SetPrecioPricesSellInventory(precio));
          dispatch(SetPrecioIVPricesSellInventory(precioIV));
        }
      } else if (
        hasChangePrecioPriceSell &&
        !hasChangeUtilidadPriceSell &&
        !hasChangePrecioIVPriceSell
      ) {
        //Precio
        let base = parseFloat(precioBase);
        let flete = parseFloat(fletes);
        let otroC = parseFloat(otrosCargos);
        let impuesto = parseFloat(iVenta);
        let pre = parseFloat(precio);
  
        if (!isNaN(base) && !isNaN(impuesto) && !isNaN(pre)) {
          if (isNaN(flete)) flete = 0;
  
          if (isNaN(otroC)) otroC = 0;
  
          const utilidad = ((pre - flete - otroC) / base - 1) * 100;
          const precioIV = pre * (impuesto / 100) + pre;
  
          dispatch(SetUtilidadPricesSellInventory(parseInt(utilidad)));
          dispatch(SetPrecioIVPricesSellInventory(precioIV));
        }
      } else if (
        hasChangePrecioIVPriceSell &&
        !hasChangeUtilidadPriceSell &&
        !hasChangePrecioPriceSell
      ) {
        //Precio IV
        let base = parseFloat(precioBase);
        let flete = parseFloat(fletes);
        let otroC = parseFloat(otrosCargos);
        let impuesto = parseFloat(iVenta);
        let preIV = parseFloat(precioIV);
  
        if (!isNaN(base) && !isNaN(impuesto) && !isNaN(preIV)) {
          if (isNaN(flete)) flete = 0;
  
          if (isNaN(otroC)) otroC = 0;
  
          const precio = preIV / (1 + impuesto / 100);
          const utilidad = ((precio - flete - otroC) / base - 1) * 100;
  
          dispatch(SetUtilidadPricesSellInventory(parseInt(utilidad)));
          dispatch(SetPrecioPricesSellInventory(precio));
        }
      }

    }

  }, [utilidad, precio, precioIV]);

  const columns = [
    {
      Header: "Tipo",
      accessor: "tipo",
    },
    {
      Header: "Utilidad",
      accessor: "utilidad",
    },
    {
      Header: "Precio",
      accessor: "precio",
    },
    {
      Header: "PrecioIV",
      accessor: "precioIV",
    },
  ];

  const handleSavePrecio = (e) => {
    e.preventDefault();

    if (utilidad === "" || precio === "" || precioIV === "") return;

    const existPrice = pricesSellInventory.find((value) => value.tipo === tipo);

    if (existPrice === undefined) {
      dispatch(SetPreciosVentaInventory({ tipo, utilidad, precio, precioIV }));

      switch (tipo) {
        case "A":
          dispatch(SetPrecio_AInventory(precio));
          break;

        case "B":
          dispatch(SetPrecio_BInventory(precio));
          break;

        case "C":
          dispatch(SetPrecio_CInventory(precio));
          break;

        case "D":
          dispatch(SetPrecio_DInventory(precio));
          break;

        case "P":
          dispatch(SetPrecio_PromoInventory(precio));
          break;

        default:
          break;
      }

      dispatch(CleanStatePricesSellInventory());
    }
  };

  const handleEditPrecio = (e) => {
    e.preventDefault();

    if (utilidad === "" || precio === "" || precioIV === "") return;

    const existPrice = pricesSellInventory.find(
      (value) => value.tipo === selectedpriceSell.tipo
    );

    if (existPrice != undefined) {
      const index = pricesSellInventory.findIndex(
        (value) => value.tipo === selectedpriceSell.tipo
      );

      dispatch(
        EditPricesSellInventory({ index, tipo, utilidad, precio, precioIV })
      );

      switch (tipo) {
        case "A":
          dispatch(SetPrecio_AInventory(precio));
          break;

        case "B":
          dispatch(SetPrecio_BInventory(precio));
          break;

        case "C":
          dispatch(SetPrecio_CInventory(precio));
          break;

        case "D":
          dispatch(SetPrecio_DInventory(precio));
          break;

        case "P":
          dispatch(SetPrecio_PromoInventory(precio));
          break;

        default:
          break;
      }

      dispatch(IsEditPricesSellInventory(false));
      dispatch(CleanStatePricesSellInventory());
    }
  };

  const handleRemovePrecio = (e) => {
    e.preventDefault();

    if (isEditPriceSell && isInventoryDisable) {
      dispatch(RemovePricesSellInventory(selectedpriceSell.tipo));
      dispatch(IsEditPricesSellInventory(false));
      dispatch(CleanStatePricesSellInventory());
    }
  };

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeUtilidadWithDispatch = ({ target }) => {
    dispatch(SetHasChangeUtilidadPricesSellInventory(true));
    dispatch(SetHasChangePrecioPricesSellInventory(false));
    dispatch(SetHasChangePrecioIVPricesSellInventory(false));

    dispatch(SetUtilidadPricesSellInventory(target.value));
  };

  const handleInputChangePrecioWithDispatch = ({ target }) => {
    dispatch(SetHasChangeUtilidadPricesSellInventory(false));
    dispatch(SetHasChangePrecioPricesSellInventory(true));
    dispatch(SetHasChangePrecioIVPricesSellInventory(false));

    dispatch(SetPrecioPricesSellInventory(target.value));
  };

  const handleInputChangePrecioIVWithDispatch = ({ target }) => {
    dispatch(SetHasChangeUtilidadPricesSellInventory(false));
    dispatch(SetHasChangePrecioPricesSellInventory(false));
    dispatch(SetHasChangePrecioIVPricesSellInventory(true));

    dispatch(SetPrecioIVPricesSellInventory(target.value));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card text-center">

          <div className="card-header bg-secondary text-white">
            <div className="inline-container">
              <div className="col-md-6 mb-1">
                <h5>Precio de Venta</h5>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <GiTwoCoins className="iconSize" />
                  </span>
                  <select
                    name="tipoMoneda"
                    className="form-select"
                    disabled={true}
                    value={monedaVenta}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(e, SetMonedaVentaInventory)
                    }
                  >
                    {monedasInventory != null ? (
                      monedasInventory.map((tipo) => {
                        return (
                          <option value={tipo.codMoneda}>
                            {" "}
                            {tipo.monedaNombre}{" "}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">No se cargaron las monedas</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">

            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <h5>Tipo</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaListOl className="iconSize" />
                  </span>
                  <select
                    name="tipo"
                    className="form-select"
                    disabled={disableInputsP}
                    value={tipo}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(
                        e,
                        SetTipoPricesSellInventory
                      )
                    }
                  >
                    <option value="A">Tipo A</option>
                    <option value="B">Tipo B</option>
                    <option value="C">Tipo C</option>
                    <option value="D">Tipo D</option>
                    <option value="P">Tipo P</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <h5>Utilidad</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMoneyBillTrendUp className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="utilidad"
                    className="form-control"
                    placeholder="Utilidad del Producto"
                    disabled={disableInputsP}
                    value={utilidad}
                    onChange={(e) =>
                      handleInputChangeUtilidadWithDispatch(
                        e,
                        SetUtilidadPricesSellInventory
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <h5>Precio</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMoneyBillWave className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="precio"
                    className="form-control"
                    placeholder="Precio del Producto"
                    disabled={disableInputsP}
                    value={precio}
                    onChange={(e) =>
                      handleInputChangePrecioWithDispatch(
                        e,
                        SetPrecioPricesSellInventory
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <h5>Precio + IV</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <MdPriceCheck className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="precioIV"
                    className="form-control"
                    placeholder="Precio más Impuesto de Venta"
                    disabled={disableInputsP}
                    value={precioIV}
                    onChange={(e) =>
                      handleInputChangePrecioIVWithDispatch(
                        e,
                        SetPrecioIVPricesSellInventory
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-5 mb-2">
                <div className="inline-container">
                  <h5>Opciones</h5>
                  <button
                    className={
                      disableInputsP
                        ? "btn btn-secondary disabled"
                        : isEditPriceSell
                        ? "btn btn-warning"
                        : "btn btn-success"
                    }
                    disabled={disableInputsP}
                    onClick={
                      isEditPriceSell ? handleEditPrecio : handleSavePrecio
                    }
                  >
                    {isEditPriceSell ? (
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
                      isEditPriceSell && isInventoryDisable
                        ? "btn btn-danger"
                        : "btn btn-danger disabled"
                    }
                    type="button"
                    onClick={handleRemovePrecio}
                  >
                    <RiDeleteBin2Fill className="iconSize" />
                  </button>
                </div>
                <hr />
              </div>
            </div>

            <div className="row mb-2">
              <InventoryBodyPrecioVentaTable
                columns={columns}
                data={pricesSellInventory}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
