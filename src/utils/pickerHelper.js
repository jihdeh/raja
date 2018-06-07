export const transformData = (categories, id, name) => {
  categories.map(category => {
    category.value = category[id]
    category.label = category[name]
    category.key = category.province
    return category
  })
  return categories
}
