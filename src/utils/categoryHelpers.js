export const slugify = (text) => {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w-]+/g, '')       // Remove all non-word chars
		.replace(/--+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}


export default slugify;

export const transformData = (categories) => {
	categories.forEach(category => {
		category.slug = slugify(category.name);
		
		// useful for react picker
		category.value = category.name;
		category.label = category.name;
		category.key = category.slug;
		
		if (category.subs) {
			category.subs.forEach(child => {
				child.slug = slugify(child.name);

				// useful for react picker
				child.value = child.name;
				child.label = child.name;
				child.key = child.slug;

				if (child.subs) {
					// level 3 categories have no 'name' property. They are just strings
					child.subs = child.subs.reduce((a, b) => {
						const _slug = slugify(b)
						a.push({
							name: b, slug: _slug,
							label: b, value: b, key: _slug
						})
						return a;
					}, [])
				}
			})
		}
	});
	return categories;
}

const findCategoryByProp = (prop = 'slug', categories, propValue, returnParent = false) => {
	const propLower = propValue.toLowerCase();
	let _category, _parent; // useful to track the particular category since Array.find return topMost item found
	const categoryFound = categories.find(category => {
		_category = category; 
		_parent = null; // level 1 has no parent

		let isFound = category[prop].toLowerCase() === propLower;
		if (isFound) return true; // break out of loop

		if (category.subs) {
			isFound = category.subs.find(child => {
				_category = child;
				_parent =  category;
				isFound = child[prop].toLowerCase() === propLower;
				
				if (isFound) return true; // break out of loop

				if (child.subs) {
					_category = child.subs.find(grandChild => grandChild[prop].toLowerCase() === propLower);
					_parent = _category ? child : _parent;
					return _category; // we found in grandChild loop;
				}
				return isFound;
			})
			return isFound; // we found in child loop;
		}
		return isFound
	});

	return categoryFound ? (returnParent ? _parent : _category) : false
}

export const findCategoryBySlug = (categories, slug, returnParent = false) => {
	return findCategoryByProp('slug', categories, slug, returnParent)
}

export const findCategoryByName = (categories, name, returnParent = false) => {
	return findCategoryByProp('name', categories, name, returnParent)
}

export const getCrumb = (categories, slug, product = null) => {
	const crumb = [{slug: '', name: 'Home'}];
	let parent = true;
	let currentSlug = slug;

	// find parent of this category, until no more parent
	while (parent) {
		parent = findCategoryBySlug(categories, currentSlug, true);
		if (parent) {
			currentSlug = parent.slug;
			crumb.splice(1, 0, parent);
		}
	}

	// add this particular category to the end
	const category = findCategoryBySlug(categories, slug)
	if (category) {
		crumb.push(category);
	}

	if (product) {
		const name = product.name.length > 50 ? product.name.slice(0, 50) + ' ...' : product.name;
		crumb.push({name, slug: product.slug});
	}
	
	return crumb;
}