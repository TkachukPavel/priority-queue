const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() == this.maxSize)
			throw new Error('Queue is overflowed');
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.isEmpty()){
			// console.log(this.heap)
			throw new Error('Empty heap');
		}
		// console.log(this.heap.parentNodes)
		var c = this.heap.pop();
		return c;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;