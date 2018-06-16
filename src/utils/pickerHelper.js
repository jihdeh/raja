export const transformData = (categories, id, name) => {
  categories.map(category => {
    category.value = { id: category[id], name: category[name] };
    category.label = category[name];
    category.key = category.province;
    return category;
  });
  return categories;
};
