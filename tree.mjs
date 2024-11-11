import ArrayUtils from "./arrayUtils.mjs";
import Node from "./node.mjs";

class Tree {
    root;

    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
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
}

export default Tree;