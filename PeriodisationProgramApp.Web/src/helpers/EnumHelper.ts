import { useTranslation } from "react-i18next";

export class EnumHelper {
  public static translate = (enumName: string, enumKey: string) => {
    const [t] = useTranslation(["enums"]);
    return t(`${enumName}.${enumKey}`);
  };

  public static getKeysOfEnum = (enumObject: any, enumName?: string) => {
    const keys = Object.keys(enumObject).filter((item) => isNaN(Number(item)));
    return enumName
      ? keys.map((item) => EnumHelper.translate(enumName, item))
      : keys;
  };

  public static getEnumValuesString = (keys: string[], enumObject: any) => {
    return keys
      .map((item) => enumObject[item as keyof typeof enumObject])
      .join(",");
  };
}
