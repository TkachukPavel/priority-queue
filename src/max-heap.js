const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.s = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.s++;
	}

	pop() {
		if (this.root == null)
			return;

		var detached = this.detachRoot();
		if (this.parentNodes.length != 0){
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
		}	
		this.s--;
		return detached.data;
	}

	detachRoot() {
		if (!this.root.right)
			this.parentNodes.shift();
		var detachedRoot = this.root;
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		var lastInsertedNode = this.parentNodes.pop();
		if (!lastInsertedNode)	return;
		if (lastInsertedNode.parent != null && lastInsertedNode.parent != detached && !this.parentNodes.includes(lastInsertedNode.parent)) 
			this.parentNodes.unshift(lastInsertedNode.parent);
		lastInsertedNode.remove();
		if (detached.left) lastInsertedNode.appendChild(detached.left);
		if (detached.right) lastInsertedNode.appendChild(detached.right)
		this.root = lastInsertedNode;
		if (!this.root.right) this.parentNodes.unshift(this.root);
	}

	size() {
		return this.s;
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.s = 0;
	}

	insertNode(node) {
		if (this.root == null)
			this.root = node;
		else{
			while ( this.parentNodes[0].right){
				this.parentNodes.shift();
			}
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right)
				this.parentNodes.shift();
		}
		this.parentNodes.push(node)
	}

	shiftNodeUp(node) {
		if (node.parent == null){
			this.root = node;
			return;
		}
		if (node.parent.priority >= node.priority)
			return;

		var iNode = this.parentNodes.indexOf(node);
		var iParent = this.parentNodes.indexOf(node.parent); 
		if (iNode != -1)
			this.parentNodes[iNode] = node.parent;
		if (iParent != -1)
			this.parentNodes[iParent] = node;

		node.swapWithParent();
		this.shiftNodeUp(node);		
	}

	shiftNodeDown(node) {
		var canShiftLeft = node.left && node.left.priority > node.priority;
		var canShiftRight = node.right && node.right.priority > node.priority;
		var isRoot = node == this.root;
		if (!canShiftRight && !canShiftLeft)	
			return;

		if (canShiftLeft && canShiftRight)
			if (node.left.priority > node.right.priority) 
				node.left.swapWithParent();
			else node.right.swapWithParent();
		else if (canShiftLeft)	node.left.swapWithParent();
		else if (canShiftRight) node.right.swapWithParent();
		
		if (isRoot) this.root = node.parent;

		var iNode = this.parentNodes.indexOf(node);
		var iParent = this.parentNodes.indexOf(node.parent); 
		if (iNode != -1){
			this.parentNodes[iNode] = node.parent;
		}
		if (iParent != -1)
			this.parentNodes[iParent] = node;

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;