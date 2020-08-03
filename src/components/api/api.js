import { ActionCreator } from "../../reducer";
import axios from "axios";
//import {actions} from '~/actions/actions';
//import Swal from 'sweetalert2';

const BASE_URL = `https://htmlacademy-react-2.appspot.com/wtw`;
const TIMEOUT = 5000;
const Status = {
  NOT_FOUND: 404,
};

const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(ActionCreator.reqAuth(true));
    }
    return err;
  };
  //   const onError = (err) => {
  //     if (err.response.status === Status.NOT_FOUND) {
  //       const {error = `Not found`} = err.response.data;
  //       Swal.fire(`Oops...`, error, `error`);
  //       dispatch(actions.films.setError({
  //         status: true,
  //         message: error
  //       }));
  //       dispatch(actions.films.setLoading(false));
  //     }

  //     return false;
  //   };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
