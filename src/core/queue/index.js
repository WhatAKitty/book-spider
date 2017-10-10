
const _queue = Symbol('queue');
const _options = Symbol('options');
const _task = Symbol('task');

//sleep in Promise
const sleep = (ms) => {
  return (
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, ms);
    })
  );
}

class Queue {
  constructor(task = () => { }, options) {
    this[_options] = {
      interval: 10000,
      ...options,
    };
    this[_task] = task;
    this[_queue] = [];

    this.addData = this.addData.bind(this);
    this.run = this.run.bind(this);
    this.wait = this.wait.bind(this);
    this.waitAll = this.waitAll.bind(this);

    this.run();
  }

  addData(data) {
    this[_queue].unshift(JSON.parse(JSON.stringify(data)));
  }

  async run() {
    while (true) {
      if (!this[_queue].length) {
        console.log(`[QUEUE] ${new Date().toLocaleString('zh')} decet queue data, there has ${this[_queue].length} data; ${this[_queue].length > 0 ? `start run task with data` : ''}`)
        await this.wait();
        continue;
      }

      const data = this[_queue].shift();

      try {
        // do task
        await this[_task](data);
      } catch (err) {
        console.log(`[QUEUE] ${new Date().toLocaleString('zh')} task execute failed, will skip this data and start next one`, err);
      }

      await this.wait();
    }
  }

  async wait() {
    await sleep(('function' === typeof this[_options].interval) ? this[_options].interval() : this[_options].interval);
  }

  async waitAll() {
    while (this[_queue].length) {
      await sleep(this[_options].interval);
    }
  }

}

export default Queue;
