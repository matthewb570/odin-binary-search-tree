class Node {
    value;
    left;
    right;

    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export default Node;