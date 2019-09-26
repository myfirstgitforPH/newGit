/**
 *数组去重,根据数组中某个元素来去掉重复
 * @param {Object} arr
 */
function unique1(arr) {
	var hash = []; 
	for (var i = 0; i < arr.length; i++) {
		if (hash.indexOf(arr[i].address) == -1) {
			hash.push(arr[i].address);
		}
	}
	return hash;
}
