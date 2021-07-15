class _LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [this.sayName]; //任务队列 默认添加sayName在队列中
    setTimeout(() => this.next(), 0); // 任务添加完毕后，下一个宏任务中执行队列
  }

  /**
   * 添加任务
   * @param {function} task  任务
   * @param {boolean} addToTail 添加在队尾
   */
  addTask(task, addToTail = true) {
    if (addToTail) {
      this.tasks.push(task);
    } else {
      this.tasks.unshift(task);
    }
  }

  //每次去任务队列的第一个任务执行
  next = () => {
    const task = this.tasks.shift();
    task && task();
  };

  sayName = () => {
    console.log(`this is ${this.name}`);
    this.next();
  };
  eat = (name) => {
    this.addTask(() => {
      console.log(`eat ${name}`);
      this.next();
    });
    return this; // 必须return this 方便链式调用，继续向队列添加任务
  };

  sleep = (time) => {
    this.addTask(this.sleepTask(time));
    return this;
  };

  sleepFirst = (time) => {
    this.addTask(this.sleepTask(time), false);
    return this;
  };

  sleepTask = (time) => {
    return () => {
      console.log(`等待${time}秒 ...`);
      setTimeout(() => {
        this.next();
      }, time * 1000);
    };
  };
}

function LazyMan(name) {
  return new _LazyMan(name);
}
