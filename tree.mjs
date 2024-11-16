import ArrayUtils from "./arrayUtils.mjs";
import Node from "./node.mjs";

class Tree {
    root;

    constructor(array) {
        this.root = this.#buildTree(array);
    }

    #buildTree(array) {
        // Set + spread operator creates a new array without duplicates; ArrayUtils.mergeSort() sorts the array
        const arraySortedNoDuplicates = ArrayUtils.mergeSort([...new Set(array)]);

        return this.#recursiveBuildTree(arraySortedNoDuplicates);
    }

    #recursiveBuildTree(array) {
        if (array === undefined || array === null || array.length === 0) {
            return null;
        } else {
            const arrayMidPoint = Math.floor(array.length / 2);

            const rootNode = new Node(array[arrayMidPoint]);
            rootNode.left = this.#recursiveBuildTree(array.slice(0, arrayMidPoint));
            rootNode.right = this.#recursiveBuildTree(array.slice(arrayMidPoint + 1, array.length));

            return rootNode;
        }
    }

    insert(value) {
        this.root = this.#recursiveInsert(value, this.root);
    }

    #recursiveInsert(value, node) {
        if (node === undefined || node === null) {
            return new Node(value);
        }

        if (node.value === value) {
            return node;
        }

        if (value > node.value) {
            node.right = this.#recursiveInsert(value, node.right);
        } else {
            node.left = this.#recursiveInsert(value, node.left);
        }

        return node;
    }

    delete(value) {
        this.root = this.#recursiveDelete(value, this.root);
    }

    #recursiveDelete(value, node) {
        if (node === null) {
            return node;
        }

        if (node.value === value) {
            if (node.left !== null && node.right !== null) {
                const inOrderSuccessor = this.#getInOrderSuccessor(node).value;
                this.#recursiveDelete(inOrderSuccessor, node);
                node.value = inOrderSuccessor;
                return node;
            }

            if (node.left === null) {
                return node.right;
            }

            return node.left;
        }

        if (value > node.value) {
            node.right = this.#recursiveDelete(value, node.right);
        } else {
            node.left = this.#recursiveDelete(value, node.left);
        }

        return node;
    }

    #getInOrderSuccessor(startNode) {
        return this.#getMinChildValueOfNode(startNode.right);
    }

    #getMinChildValueOfNode(node) {
        if (node.left === null) {
            return node;
        }

        return this.#getMinChildValueOfNode(node.left);
    }

    find(value) {
        return this.#recursiveFind(value, this.root);
    }

    #recursiveFind(value, root) {
        if (root === null) {
            return null;
        }
        
        if (root.value === value) {
            return root;
        }

        if (value > root.value) {
            return this.#recursiveFind(value, root.right);
        }

        return this.#recursiveFind(value, root.left);
    }

    levelOrder(callback) {
        if (callback === undefined || callback === null) {
            throw new Error("This function's callback parameter is required");
        }
        
        const queue = new Array(this.root);
        while(queue.length > 0) {
            const currentNode = queue.splice(0, 1)[0];
            callback(currentNode);
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    inOrder(callback) {
        if (callback === undefined || callback === null) {
            throw new Error("This function's callback parameter is required");
        }

        this.#recursiveInOrder(callback, this.root);
    }

    #recursiveInOrder(callback, currentNode) {
        if (currentNode === undefined || currentNode === null) {
            return;
        }
        
        this.#recursiveInOrder(callback, currentNode.left);
        callback(currentNode);
        this.#recursiveInOrder(callback, currentNode.right);
    }

    preOrder(callback) {
        if (callback === undefined || callback === null) {
            throw new Error("This function's callback parameter is required");
        }

        this.#recursivePreOrder(callback, this.root);
    }

    #recursivePreOrder(callback, currentNode) {
        if (currentNode === undefined || currentNode === null) {
            return;
        }
        
        callback(currentNode);
        this.#recursivePreOrder(callback, currentNode.left);
        this.#recursivePreOrder(callback, currentNode.right);
    }

    postOrder(callback) {
        if (callback === undefined || callback === null) {
            throw new Error("This function's callback parameter is required");
        }

        this.#recursivePostOrder(callback, this.root);
    }

    #recursivePostOrder(callback, currentNode) {
        if (currentNode === undefined || currentNode === null) {
            return;
        }

        this.#recursivePostOrder(callback, currentNode.left);
        this.#recursivePostOrder(callback, currentNode.right);
        callback(currentNode);
    }

    height(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        }

        return rightHeight + 1;
    }

    depth(node) {
        return this.#recursiveDepth(node, this.root);
    }

    #recursiveDepth(node, currentNode) {
        if (node === null || currentNode === null) {
            return null;
        }
        
        if (currentNode.value === node.value) {
            return 0;
        }

        let currentDepth;
        if (node.value < currentNode.value) {
            currentDepth = this.#recursiveDepth(node, currentNode.left);
        } else {
            currentDepth = this.#recursiveDepth(node, currentNode.right);
        }

        return currentDepth === null ? null : currentDepth + 1;
    }

    isBalanced() {
        let isBalanced = true;
        const callback = (node) => {
            let leftHeight = this.height(node.left);
            let rightHeight = this.height(node.right);
            if (leftHeight > rightHeight + 1 || rightHeight > leftHeight + 1) {
                isBalanced = false;
            }
        }

        this.levelOrder(callback);

        return isBalanced;
    }

    rebalance() {
        const treeArray = new Array();
        const callback = (node) => {
            treeArray.push(node.value);
        }

        this.inOrder(callback);
        console.log(treeArray);
        this.root = this.#buildTree(treeArray);
    }
}

export default Tree;