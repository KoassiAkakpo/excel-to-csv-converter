import dayjs from "dayjs";
export const transformColumn = (param) => {
  if (param instanceof Date) {
    return dayjs(param).format("YYYY-MM-DD");
  }
  if (typeof param === "string") {
    return param.split("\n").join(" ").replace(/,|;/g, "-");
  }
  return param;
};
