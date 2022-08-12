import _ from "lodash";

const filter_data = (items, filterOn, filterOnSubProp, filterFor) => {
  if (filterFor === "all") return items;
  else if (filterOnSubProp === null)
    return _.filter(items, (item) => item[filterOn] === filterFor);
  return _.filter(
    items,
    (item) => item[filterOn][filterOnSubProp] === filterFor
  );
};

export default filter_data;
