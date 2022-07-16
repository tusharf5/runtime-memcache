import { GlobalConfig } from '../types';

class LinkedListNode<V> {
  next: LinkedListNode<V> | null;
  data: V;
  id: string;
  prev: LinkedListNode<V> | null;

  constructor(id: string, data: any) {
    this.next = null;
    this.data = data;
    this.id = id;
    this.prev = null;
  }
}

// get O(1)
// remove O(1)
// add O(1)
// we add a new node to the head
// on every access we move that node to tail as it is the mru node
export class MRULinkedList<V> {
  __size: number = 0;

  HEAD: LinkedListNode<V> | null;
  TAIL: LinkedListNode<V> | null;
  limit: number = 0;
  positions: Map<string, LinkedListNode<V>> = new Map<string, any>();

  get size() {
    return this.__size;
  }

  set size(size: number) {
    this.__size = size;
    if (this.__size > this.limit) {
      this.shrinkList();
    }
  }

  keys(): string[] {
    return Array.from(this.positions.keys());
  }

  moveToTail(node: LinkedListNode<V>): LinkedListNode<V> | null {
    const nodeToMove = this.remove(node.id);
    if (nodeToMove) {
      const newNode = this.addNodeToTail(nodeToMove.id, nodeToMove.data);
      return newNode;
    }
    return null;
  }

  moveToHead(node: LinkedListNode<V>): LinkedListNode<V> | null {
    const nodeToMove = this.remove(node.id);
    if (nodeToMove) {
      const newNode = this.addNodeToHead(nodeToMove.id, nodeToMove.data);
      return newNode;
    }
    return null;
  }

  addNodeToHead(id: string, data: V): LinkedListNode<V> {
    if (this.positions.has(id)) {
      const node = this.moveToHead(this.positions.get(id));
      // overrite the data
      this.positions.get(id).data = data;
      return node;
    }
    if (this.HEAD) {
      let oldHead = this.HEAD;
      const newHead = new LinkedListNode<V>(id, data);
      newHead.next = oldHead;
      newHead.prev = null;
      oldHead.prev = newHead;
      this.HEAD = newHead;
      this.positions.set(id, newHead);
      this.size++;
      return newHead;
    } else {
      const newNode = new LinkedListNode<V>(id, data);
      this.HEAD = newNode;
      if (!this.TAIL) {
        this.TAIL = newNode;
      }
      this.positions.set(id, newNode);
      this.size++;
      return newNode;
    }
  }

  // mru
  addNodeToTail(id: string, data: V): LinkedListNode<V> {
    // if node already exists move it to HEAD (MRU)
    if (this.positions.has(id)) {
      const node = this.moveToTail(this.positions.get(id));
      // overrite the data
      this.positions.get(id).data = data;
      return node;
    }
    if (this.TAIL) {
      let oldTail = this.TAIL;
      const newTail = new LinkedListNode<V>(id, data);
      newTail.prev = oldTail;
      newTail.next = null;
      oldTail.next = newTail;
      this.TAIL = newTail;
      this.positions.set(id, newTail);
      this.size++;
      return newTail;
    } else {
      const newNode = new LinkedListNode<V>(id, data);
      this.TAIL = newNode;
      if (!this.HEAD) {
        this.HEAD = newNode;
      }
      this.positions.set(id, newNode);
      this.size++;
      return newNode;
    }
  }

  remove(id: string): LinkedListNode<V> | null {
    if (!this.HEAD) {
      return null;
    }

    const node = this.positions.get(id);
    if (!node) {
      return null;
    }

    const prevNode = node.prev;
    const nextNode = node.next;

    // both prev and next node exists
    // in this case this node can never be either HEAD or the TAIL node
    if (prevNode && nextNode) {
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      this.positions.delete(id);
      this.size--;
      return node;
    }

    // if this is the tail node
    if (prevNode && !nextNode) {
      prevNode.next = null;
      this.TAIL = prevNode;
      this.positions.delete(id);
      this.size--;
      return node;
    }

    // if this is the head node
    if (!prevNode && nextNode) {
      nextNode.prev = null;
      this.HEAD = nextNode;
      this.positions.delete(id);
      this.size--;
      return node;
    }

    // if this is both the head and the tail
    if (!prevNode && !nextNode) {
      this.HEAD = null;
      this.TAIL = null;
      this.positions.delete(id);
      this.size--;
      return node;
    }

    return null;
  }

  shrinkList() {
    const nodesToRemove = this.size - this.limit;
    let currentNode = this.TAIL;
    for (let i = 1; i <= nodesToRemove; i++) {
      this.positions.delete(currentNode.id);
      this.size--;
      currentNode = currentNode.prev;
    }
    currentNode.next = null;
    this.TAIL = currentNode;
  }

  has(id: string): boolean {
    if (this.positions.has(id)) {
      return true;
    }
    return false;
  }

  traverse() {
    if (this.HEAD) {
      let currentNode = this.HEAD;
      while (currentNode) {
        currentNode = currentNode.next;
      }
    }
  }

  get(id: string): V | null {
    const node = this.positions.get(id);
    if (node) {
      // mru
      const newHeadNode = this.moveToTail(node);
      if (newHeadNode) {
        return newHeadNode.data;
      }
      return null;
    }
    return null;
  }

  constructor(config: Required<GlobalConfig>) {
    this.HEAD = null;
    this.TAIL = null;
    this.limit = config.mruSize;
  }
}
