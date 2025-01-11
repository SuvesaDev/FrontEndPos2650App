import { useSelector } from "react-redux";
import iconImage from "../../assets/imgInicio.png";
import { DateNavbar } from "./DateNavbar";
import { FaBuildingUser, FaCalendarDays } from "react-icons/fa6";
export const NothingPage = () => {
  const { auth } = useSelector((state) => state.login);
  const { centro } = auth;


  const handleTest = () => {
    let userId = 15;
    let fechaI = "2023";
    let fechaF = "2024";

    let encodedUserId = btoa(userId.toString());
    let fechaInicioEncode = btoa(fechaI.toString());
    let fechaFinEncode = btoa(fechaF.toString());

    const nuevaPestana = window.open(
      "https://spestechnical.com/pdfs/pin.php?uVb$Lj=" +
        encodedUserId +
        "&FFcchh=" +
        fechaInicioEncode +
        "&FFcchhf=" +
        fechaFinEncode +
      "_blank"
    );

    nuevaPestana.onload = () => {
      // Esperar un breve período y luego llamar a print()
      setTimeout(() => {
        nuevaPestana.print();
      }, 3000);
    };
    
  }

  return (
    <>
      {/* <button onClick={handleTest} className="btn btn-primary iconSizeXL">PRUEBA</button> */}

      <div className="container mt-3 text-center">
        <div className="mt-4 p-8 bg-secondary text-white rounded">
          <img src={iconImage} width="50%" alt="ImgInicio" />
          <hr />
          <div className="row">
            <div className="col-md-3 mb-2"></div>
            <div className="col-md-2 mb-2">
              <div className="card cardNav">
                <div className="card-header">
                  <strong>
                    <FaBuildingUser className="iconSizeXL" /> Sucursal
                  </strong>
                </div>
                <div className="card-body">
                  <p>{centro}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card cardNav">
                <div className="card-header">
                  <strong>
                    <FaCalendarDays className="iconSizeXL" /> Fecha
                  </strong>
                </div>
                <div className="card-body">
                  <p>{<DateNavbar />}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <hr />
      <footer id="footer">
        <div className="container py-4">
          <center>
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Guanavet</span>
              </strong>
              . All Rights Reserved
            </div>
          </center>
        </div>
      </footer>
    </>
  );
};
