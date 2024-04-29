const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  #state = STATE.PENDING;
  #value = null;

  constructor(executorFunc) {
    try {
      executorFunc(
        val => this.#resolve(val);
      val => this.#reject(val);
      );
    } catch (error) {
      this.#reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {

      const fulfilledCallback = () => {
        if (onFulfilled) return resolve(this.#value);

        queueMicrotask(() => {
          try {
            const value = onFulfilled(this.#value);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      }

      // const 

      switch (this.#state) {
        case STATE.PENDING:
          break;
        case STATE.FULFILLED:
          break;
        case STATE.REJECTED:
          break;
          defailt:
          throw new Error("Unexpected promise state");
      }
    });
  }

  catch(onRejected) {
    // Write your code here.
  }

  get state() {
    return this.#state;
  }

  get value() {
    return this.#value;
  }


  #resolve(val) {
    this.#value = val;
    this.#state = STATE.FULLFILLED;
  }

  #reject(val) {
    this.#value = val;
    this.#state = STATE.REJECTED;
  }
}

// Do not edit the line below.
exports.MyPromise = MyPromise;
