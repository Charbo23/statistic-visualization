import http from "../utils/http";

export const getUserVisualizedData = (params) => {
  return http.post(
    "/phalapi/public/?service=App.Common.getUserVisualizedData",
    params
  );
};

export const getCityUser = (params) => {
  return http.getLocalMock(
    "/mock/city_user.json",
    params
  );
};

export const getShipOrder = (params) => {
  return http.getLocalMock(
    "/mock/ship_order.json",
    params
  );
};

