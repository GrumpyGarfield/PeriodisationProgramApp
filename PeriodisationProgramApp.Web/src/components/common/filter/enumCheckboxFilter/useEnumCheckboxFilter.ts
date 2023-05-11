import useCheckboxFilter, {
  ICheckboxFilter,
} from "../checkboxFilter/useCheckboxFilter";

const useEnumCheckboxFilter = (
  name: string,
  enumObject: any
): ICheckboxFilter => {
  const { value, setValue, handleChange, hasSelected, isActive, clear } =
    useCheckboxFilter(name);

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

export default useEnumCheckboxFilter;
