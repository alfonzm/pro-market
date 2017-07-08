export default {
	convertSetToArray(items) {
		return _.map(items, (item, key) => 
			{
				return key
			})
	},
	convertObjectsToArray(items) {
		return _.map(items, (item, key) => 
			{
				if(typeof(item) === 'object') {
					item.id = key
				}
				
				return item
			})
	}
}