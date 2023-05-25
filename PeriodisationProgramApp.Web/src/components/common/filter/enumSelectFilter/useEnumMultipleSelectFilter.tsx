import useMultipleSelectFilter, {
  IMultipleSelectFilter,
} from "../selectFilter/useMultipleSelectFilter";

const useEnumMultipleSelectFilter = (
  name: string,
  enumObject: any
): IMultipleSelectFilter => {
  const { value, setValue, handleChange, hasSelected, isActive, clear } =
    useMultipleSelectFilter(name);

  const getFilter = () => {
    return {
      name: name,
      value: value
        .map((item) => enumObject[item as keyof typeof enumObject])
        .join(","),
    };
  };

  return {
    value,
    setValue,
    handleChange,
    hasSelected,
    isActive,
    clear,
    getFilter,
  };
};

export default useEnumMultipleSelectFilter;
