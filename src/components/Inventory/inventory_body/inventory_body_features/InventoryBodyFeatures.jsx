import { useSelector } from "react-redux";

import { InventoryBodyFeaturesTabs } from "./InventoryBodyFeaturesTabs";

import { InventoryBodyFeaturesBodega } from "./InventoryBodyFeaturesBodega";
import { InventoryBodyFeaturesRelacionados } from "./InventoryBodyFeaturesRelacionados";
import { InventoryBodyFeaturesUltimoCosto } from "./InventoryBodyFeaturesUltimoCosto";
import { InventoryBodyFeaturesVarios } from "./InventoryBodyFeaturesVarios";
import { InventoryBodyFeaturesSerie } from "./InventoryBodyFeaturesSerie";
import { InventoryBodyFeaturesDetalle } from "./InventoryBodyFeaturesDetalle";
import { InventoryBodyFeaturesCategoria } from "./InventoryBodyFeaturesCategoria";
import { InventoryBodyFeaturesLotes } from "./InventoryBodyFeaturesLotes";
import { InventoryBodyFeaturesCodigoBarras } from "./InventoryBodyFeaturesCodigoBarras";
import { InventoryBodyFeaturesRebajaOtroArticulo } from "./InventoryBodyFeaturesRebajaOtroArticulo";
import { InventoryBodyFeaturesInformacionPost } from "./InventoryBodyFeaturesInformacionPost";
import { InventoryBodyFeaturesFormula } from "./InventoryBodyFeaturesFormula";
import { InventoryBodyFeaturesConvertidor } from "./InventoryBodyFeaturesConvertidor";

export const InventoryBodyFeatures = () => {
  const state = useSelector((state) => state.inventory);
  const { currentTabInventory } = state;

  const redirectComponent = () => {
    switch (currentTabInventory) {
      case "UltimoCosto":
        return <InventoryBodyFeaturesUltimoCosto />;

      case "RebajaOtroArticulo":
        return <InventoryBodyFeaturesRebajaOtroArticulo />;

      case "InformacionPost":
        return <InventoryBodyFeaturesInformacionPost />;

      case "Bodega":
        return <InventoryBodyFeaturesBodega />;

      case "Varios":
        return <InventoryBodyFeaturesVarios />;

      case "Categoria":
        return <InventoryBodyFeaturesCategoria />;

      case "Relacionados":
        return <InventoryBodyFeaturesRelacionados />;

      case "Serie":
        return <InventoryBodyFeaturesSerie />;

      case "Detalle":
        return <InventoryBodyFeaturesDetalle />;

      case "Lotes":
        return <InventoryBodyFeaturesLotes />;

      case "CodigoBarras":
        return <InventoryBodyFeaturesCodigoBarras />;

      case "Formula":
        return <InventoryBodyFeaturesFormula />;

      case "Convertidor":
        return <InventoryBodyFeaturesConvertidor />;

      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card text-center">
          <div className="card-header bg-secondary text-white">
            <InventoryBodyFeaturesTabs />
          </div>
          <div className="card-body">{redirectComponent()}</div>
        </div>
      </div>
    </>
  );
};
