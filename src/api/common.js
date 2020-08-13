import http from "../utils/http";

export const getUserVisualizedData = (params) => {
  return http.post(
    "/phalapi/public/?service=App.Common.getUserVisualizedData",
    params
  );
};