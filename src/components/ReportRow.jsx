const ReportRow = ({ report, onOpen }) => {
  const onEdit = () => onOpen("EDIT", report);
  const onDel = () => onOpen("DEL", report);
  return (
    <tr>
      <td>{report.name}</td>
      <td>{report.age}</td>
      <td>
        <div>{report.birth_date}</div>
      </td>
      <td>
        <div>{report.register_date}</div>
      </td>
      <td>{report.cost}</td>
      <td>
        <button onClick={onEdit}>Editar</button>{" "}
        <button onClick={onDel}>Delete</button>
      </td>
    </tr>
  );
};

export default ReportRow;
