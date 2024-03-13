import { url } from "../utils/TodoApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// interface FetchResult {
//   loading: boolean;
//   error: string | null;
//   data: TodoInterface[];
// }

// const useFetch = (): FetchResult => {
//   const [fetchData, setFetchData] = useState<FetchResult>({
//     data: [],
//     loading: true,
//     error: null,
//   });

//   //to get desired data - list of todos we prse the response and get response body
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch todos");
//         }
//         const todos = await response.json();
//         setFetchData({
//           data: todos,
//           loading: false,
//           error: null,
//         });
//       } catch (error) {
//         setFetchData({
//           data: [],
//           loading: false,
//           error: `Error : ${error}`,
//         });
//       }
//     };

//     fetchData();
//   }, []);

//   return fetchData;
// };

const useFetch = () => {
  // const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    placeholderData: keepPreviousData,

    queryFn: async () => {
      // const apiUrl = `${url}?_limit=5&_page=1`;
      return fetch(url).then((res) => res.json());
    },
  });

  return { data, isLoading, error };
};
export default useFetch;
