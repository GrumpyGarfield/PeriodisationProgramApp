import { EntityFilter } from "../../../types/EntityFilter";
import { EntitySorting } from "../../../types/EntitySorting";
import { CloneProps } from "../../../types/services/entity/CloneProps";
import { CreateProps } from "../../../types/services/entity/CreateProps";
import { UpdateProps } from "../../../types/services/entity/UpdateProps";
import { RemoveProps } from "../../../types/services/entity/RemoveProps";
import BaseServerInteractionService from "../../BaseServerInteractionService";

const getAll = async <T>(
  entityName: string,
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<T>(
    `/${entityName}/items`,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

const get = async <T>(entityName: string, id: string) => {
  return BaseServerInteractionService.Get<T>(`/${entityName}/${id}`);
};

const create = async <T1, T2>({ entityName, createProps }: CreateProps<T1>) => {
  return BaseServerInteractionService.Post<T2>(`/${entityName}`, createProps);
};

const update = async <T1, T2>({
  entityName,
  id,
  updateProps,
}: UpdateProps<T1>) => {
  return BaseServerInteractionService.Put<T2>(
    `/${entityName}/${id}`,
    updateProps
  );
};

const clone = async <T>({ entityName, id, entity }: CloneProps<T>) => {
  return BaseServerInteractionService.Post<T>(
    `/${entityName}/${id}/clone`,
    entity
  );
};

const remove = async ({ entityName, id }: RemoveProps) => {
  return BaseServerInteractionService.Delete(`/${entityName}/${id}`);
};

const EntityService = {
  getAll,
  get,
  create,
  update,
  clone,
  remove,
};

export default EntityService;
