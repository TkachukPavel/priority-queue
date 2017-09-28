class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left == null){
			node.parent = this;
			this.left = node;
		}
		else if (this.right == null){
			node.parent = this;
			this.right = node;
		}
	}

	removeChild(node) {
		if(node == this.left){
			this.left.parent = null;
			this.left = null;
		} else if (node == this.right){
			this.right.parent = null;
			this.right = null;
		} else
			throw new Error('No such child');
	}

	remove() {
		if(this.parent != null)
			this.parent.removeChild(this);
		return this;
	}

	swapWithParent() {
		if (this.parent == null)
			return;

		var isDadRight = this.parent.parent && this.parent == this.parent.parent.right;
		var isNodeRight = this == this.parent.right;
		var brother = isNodeRight ? this.parent.left : this.parent.right;
		var granny = this.parent.parent;

		if (this.left)
			this.left.parent = this.parent;
		this.parent.left = this.left;

		if(this.right)
			this.right.parent = this.parent;
		this.parent.right = this.right;

		if (isNodeRight){
			this.left = brother;
			brother.parent = this;
			this.right = this.parent;
		} else{
			if (brother){
			 	this.right = brother 
			 	brother.parent = this;
			} else
			 	this.right = null;
			this.left = this.parent;
		}

		this.parent.parent = this;
		if (granny) {
			this.parent = granny;
			if (isDadRight)
				this.parent.right = this
			else
				this.parent.left = this;
		} else
			this.parent = null;	
	}

}

module.exports = Node;
