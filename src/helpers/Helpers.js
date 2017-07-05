export default {
	convertObjectsToArray(items) {
		return _.map(items, (item, key) => 
			{
				item.id = key
				return item
			})
	}
}