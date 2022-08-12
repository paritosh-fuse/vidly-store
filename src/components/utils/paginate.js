import _ from "lodash";
export const paginate = (items, pageSize, activePage) => {
  return _(items)
    .slice(pageSize * (activePage - 1))
    .take(pageSize)
    .value();
};
