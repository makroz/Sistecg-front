import useAxios from "../hooks/useAxios";
import style from "../css/listreport.module.css";
import ReportRow from "./ReportRow";
const ListReport = ({ onOpen }) => {
  const { data, error, loaded } = useAxios("/persona", "GET", {}, false);
  if (error)
    return (
      <div className={style.list}>An Error Network occured... try again...</div>
    );

  if (!loaded) return <div className={style.list}> Loading ... </div>;

  return (
    <div className={style.list}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: "50px" }}>Edad</th>
            <th style={{ width: "110px" }}>Fecha de Nacimiento</th>
            <th style={{ width: "110px" }}>Fecha de Inscripción</th>
            <th style={{ width: "50px" }}>Costo</th>
            <th style={{ width: "50px" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 && (
            <tr>
              <td colSpan="3">
                <br />
                <br />
                <br />
                <div className={style.center}>Empty data</div>
              </td>
            </tr>
          )}
          {loaded &&
            data.map((report) => {
              return (
                <ReportRow report={report} key={report.id} onOpen={onOpen} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListReport;
