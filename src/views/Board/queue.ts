let queueId = 0;
export class Queue<T> {
  private pullQueue: Array<(value: T) => void> = [];
  private pushQueue: Array<Promise<T>> = [];
  private isClosed = false;

  public onClose = () => {};

  private queueId: number;
  constructor() {
    this.queueId = queueId++;
    console.log(`[Queue](${this.queueId}) created queue`);
  }

  push(value: T): void {
    // console.log(`[Queue](${this.queueId}) pushing value`, "serialize" in value ? (value as any).serialize() : value);
    const resolve = this.pullQueue.shift();
    if (resolve) {
      console.log(
        `[Queue](${this.queueId}) pushing value: found someone already listening... resolving his promise with`,
        "serialize" in value ? (value as any).serialize() : value
      );
      return void resolve(value);
    }
    console.log(
      `[Queue](${this.queueId}) pushing value: nobody was awaiting value, storing it for later consumption`,
      "serialize" in value ? (value as any).serialize() : value
    );
    this.pushQueue.push(Promise.resolve(value));
  }

  close(): void {
    console.log(`[Queue](${this.queueId}) closing queue, the for await loops attached will end`);

    this.isClosed = true;
    this.push(undefined as any);
    this.onClose();
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      let next = this.pushQueue.shift();

      if (!next) {
        next = new Promise<T>((resolve) => this.pullQueue.push(resolve));
        console.log(`[Queue](${this.queueId}) next: no value found in queue, awaiting value`);
      } else {
        console.log(`[Queue](${this.queueId}) next: a value was already ready ! resolving now`);
      }

      if (this.isClosed) {
        return;
      }
      yield next;
    }
  }
}
