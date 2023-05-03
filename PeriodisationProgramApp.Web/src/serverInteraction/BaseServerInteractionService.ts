import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { getFiltersWithPrefix } from "../utils/Utils";
import { PagedResult } from "../types/PagedResult";

const apiClient = axios.create({
  baseURL: "https://localhost:44326/api",
  headers: {
    "Content-type": "application/json",
  },
});

const Get = async <T>(url: string, axiosConfig?: AxiosRequestConfig) => {
  const response = await apiClient.get<T>(url, axiosConfig);
  return response.data;
};

const List = async <T>(url: string, parameters?: any) => {
  const bakedUrl = parameters
    ? url + "?" + queryString.stringify(parameters)
    : url;
  const response = await apiClient.get<T>(bakedUrl);
  return response.data;
};

const Post = async <T>(url: string, item: any, config?: any) => {
  const response = await apiClient.post<T>(url, item, config);
  return response.data;
};

const Put = async <T>(url: string, item: T) => {
  const response = await apiClient.put<boolean>(url, item);
  return response.data;
};

const Delete = async (url: string, axiosConfig?: AxiosRequestConfig) => {
  const response = await apiClient.delete<boolean>(url, axiosConfig);
  return response.data;
};

const GetPage = async <T>(
  url: string,
  offset: number,
  limit = 9,
  filters?: any,
  sortParams?: any
) => {
  const params = {
    offset,
    limit,
    ...getFiltersWithPrefix(filters),
    ...sortParams,
  };
  return List<PagedResult<T>>(url, params);
};

const BaseServerInteractionService = {
  Get,
  List,
  Post,
  Put,
  GetPage,
  Delete,
};

export default BaseServerInteractionService;
