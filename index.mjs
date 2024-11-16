import Tree from "./tree.mjs";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// --- Incremental testing ---

// 1, 3, 4, 5, 7, 8, 9, 23, 324, 6345

// 10, 20, 30, 100, 500

// const balancedBinarySearchTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 6345, 324]);

// prettyPrint(balancedBinarySearchTree.root);

// console.log(balancedBinarySearchTree.find(7));
// console.log(balancedBinarySearchTree.find(100));

// balancedBinarySearchTree.insert(100);
// prettyPrint(balancedBinarySearchTree.root);

// // balancedBinarySearchTree.delete(8);
// // prettyPrint(balancedBinarySearchTree.root);

// balancedBinarySearchTree.levelOrder((node) => console.log(node.value));
// prettyPrint(balancedBinarySearchTree.root);
// balancedBinarySearchTree.inOrder((node) => console.log(node.value));
// prettyPrint(balancedBinarySearchTree.root);
// balancedBinarySearchTree.preOrder((node) => console.log(node.value));
// prettyPrint(balancedBinarySearchTree.root);
// balancedBinarySearchTree.postOrder((node) => console.log(node.value));

// prettyPrint(balancedBinarySearchTree.root);
// console.log(balancedBinarySearchTree.height(balancedBinarySearchTree.find(1)));
// console.log(balancedBinarySearchTree.height(balancedBinarySearchTree.find(23)));
// console.log(balancedBinarySearchTree.height(balancedBinarySearchTree.find(324)));
// console.log(balancedBinarySearchTree.height(balancedBinarySearchTree.find(8)));

// prettyPrint(balancedBinarySearchTree.root);
// console.log(balancedBinarySearchTree.depth(balancedBinarySearchTree.find(1)));
// console.log(balancedBinarySearchTree.depth(balancedBinarySearchTree.find(23)));
// console.log(balancedBinarySearchTree.depth(balancedBinarySearchTree.find(324)));
// console.log(balancedBinarySearchTree.depth(balancedBinarySearchTree.find(8)));
// console.log(balancedBinarySearchTree.depth(balancedBinarySearchTree.find(25)));

// prettyPrint(balancedBinarySearchTree.root);
// console.log(balancedBinarySearchTree.isBalanced());
// balancedBinarySearchTree.insert(2);
// prettyPrint(balancedBinarySearchTree.root);
// console.log(balancedBinarySearchTree.isBalanced());

// balancedBinarySearchTree.rebalance();
// prettyPrint(balancedBinarySearchTree.root);


// --- Final testing ---

function generateRandomNumberArray(min, max, num) {
    const array = new Array();
    for (let i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    array.push();
    return array;
}

const bst = new Tree(generateRandomNumberArray(0, 99, 20));
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.levelOrder((node) => console.log(node.value));
bst.preOrder((node) => console.log(node.value));
bst.postOrder((node) => console.log(node.value));
bst.inOrder((node) => console.log(node.value));

const newNumbers = generateRandomNumberArray(101, 200, 20);
newNumbers.forEach((num) => bst.insert(num));
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.rebalance();
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.levelOrder((node) => console.log(node.value));
bst.preOrder((node) => console.log(node.value));
bst.postOrder((node) => console.log(node.value));
bst.inOrder((node) => console.log(node.value));