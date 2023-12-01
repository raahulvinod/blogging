import axios from 'axios';

export const filterPagination = async ({
  create_new_arr = false,
  state,
  data,
  page,
  countRoute,
  data_to_send = {},
}) => {
  let obj;

  if (state !== null && !create_new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    try {
      const {
        data: { totalDocs },
      } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + countRoute,
        data_to_send
      );

      obj = { results: data, page: 1, totalDocs };
    } catch (error) {
      console.log(error);
    }
  }

  return obj;
};
