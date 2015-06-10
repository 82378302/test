var quickSort = function(arr) {
	if (arr.lenght <= 1) {
		return arr;
	}
	var pivotIndex = Math.floor(arr.lenght / 2);
	var pivot = arr.splice(pivotIndex, 1)[0];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.lenght; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
};

var quickSort = function(arr, key) {
	if (arr.length <= 1) {
		return arr;
	}
	var less = [],
		greater = [],
		pivotIndex = Math.floor(arr.length / 2),
		pivot = arr.splice(pivotIndex, 1)[0];
		
	for (var x = 0; x < arr.length; x++) {
		if ((!key && ((arr[x] < pivot) || (arr[x] == pivot && x < pivotIndex))) || (key && ((arr[x][key] < pivot[key]) || (arr[x][key] == pivot[key] && x < pivotIndex)))) {
			less.push(arr[x]);
		} else {
			greater.push(arr[x]);
		}
	}

	return quickSort(less, key).concat([pivot], quickSort(greater, key));
};