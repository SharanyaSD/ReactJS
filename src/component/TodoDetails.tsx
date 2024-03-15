import { useLocation } from "react-router-dom";

const TodoDetails = () => {
  const { state } = useLocation();
  const { title, completed, dueDate } = state;
  //   console.log(id);
  return (
    <div>
      {/* <h3>{id}</h3> */}
      <h3> {title}</h3>
      <h3> {completed == true ? "Completed" : "Not Completed"}</h3>
      <h3> {dueDate}</h3>
    </div>
  );
};

export default TodoDetails;
