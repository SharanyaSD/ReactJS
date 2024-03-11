import { url } from "../utils/TodoApi";
import { TodoInterface } from "../utils/TodoInterface";

const usePost = () => {
  const fetchPost = async (newTodo: TodoInterface) => {
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!data.ok) {
        throw new Error("Data not sent");
      }
      const res = await data.json();
      console.log("Data from fetch : ", res);
      return true;
    } catch (error) {
      console.log("Exception while posting data ");
      return false;
    }
  };

  return { fetchPost };
};

export default usePost;
