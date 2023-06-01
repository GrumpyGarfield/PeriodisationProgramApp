import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { getFiltersWithPrefix } from "../utils/Utils";
import { PagedResult } from "../types/PagedResult";
import { EntityFilter } from "../types/EntityFilter";
import { EntitySorting } from "../types/EntitySorting";
import { auth } from "../firebase/Firebase";

const apiClient = axios.create({
  baseURL: "https://localhost:44326/api",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (request) => {
    if (auth.currentUser === null) {
      return request;
    }

    const accessToken = await auth.currentUser.getIdToken();
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  const response = await apiClient.put<T>(url, item);
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
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  const params = {
    offset,
    limit,
    ...getFiltersWithPrefix(filters),
    ...sortParams,
    ...optionalParams,
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
