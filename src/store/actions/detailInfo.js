import axios from "axios";
import {
  DETAILED_INFO_FAILURE,
  DETAILED_INFO_START,
  DETAILED_INFO_SUCCESS,
} from "../types";
import { BASE_URL, API_KEY } from "../../constants";

export const getDetailData = (location) => {
  return async (dispatch) => {
    dispatch(detailedResulsStart());
    const id = location.search.slice(4);
    const url = `${BASE_URL}/${id}?${API_KEY}&language=en-US&page=1`;
    const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
    const urlCredits = `${BASE_URL}/${id}/credits?${API_KEY}`;
    await axios
      .all([axios.get(url), axios.get(urlCredits), axios.get(urlVideo)])
      .then(
        axios.spread((result, responseCast, resVideo) => {
          dispatch(
            detailedResuls({
              response: result.data,
              trailer: resVideo.data,
              credits: responseCast.data,
            })
          );
        })
      )
      .catch((e) => {
        dispatch(detailedResulsFailure(e.config));
      });
  };
};

const detailedResulsStart = () => {
  return {
    type: DETAILED_INFO_START,
  };
};

const detailedResuls = ({ response, trailer, credits }) => {
  return {
    type: DETAILED_INFO_SUCCESS,
    response,
    trailer,
    credits,
  };
};

const detailedResulsFailure = (error) => {
  return {
    type: DETAILED_INFO_FAILURE,
    payload: error,
  };
};
