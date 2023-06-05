import { useTranslation } from "react-i18next";

export const useEnumHelper = () => {
  const [t] = useTranslation(["enums"]);

  const translate = (enumName: string, enumKey: string) => {
    return t(`${enumName}.${enumKey}`);
  };

  const getKeysOfEnum = (enumObject: any, enumName?: string) => {
    const keys = Object.keys(enumObject).filter((item) => isNaN(Number(item)));
    return enumName ? keys.map((item) => translate(enumName, item)) : keys;
  };

  const getValuesOfEnum = (enumObject: any, enumName?: string) => {
    return Object.keys(enumObject)
      .map((item) => Number(item))
      .filter((item) => !isNaN(item));
  };

  const getEnumValuesString = (keys: string[], enumObject: any) => {
    return keys
      .map((item) => enumObject[item as keyof typeof enumObject])
      .join(",");
  };

  return {
    translate,
    getKeysOfEnum,
    getValuesOfEnum,
    getEnumValuesString,
  };
};

export default useEnumHelper;
