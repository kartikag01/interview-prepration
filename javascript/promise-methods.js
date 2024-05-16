Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      p()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    promises.forEach((p, i) => {
      p.then(res => resolve(res))
        .catch(err => {
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject('all promises rejected');
          }
        });
    });
  });
};

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    promises.forEach((p, i) => {
      // Promise.resolve(p) // sometimes p is Promise.resolve(true);
      p
        .then(res => {
          result[i] = res;
          if (promises.length === Object.keys(result).length) {
            resolve(result);
          }
        })
        .catch(err => reject(err));
    });
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let output = []
    promises.forEach((p, i) => {
      p.then(res => {
        output[i] = {
          status: "fulfilled",
          value: res,
        }
      })
        .catch(err => {
          output[i] = {
            status: "rejected",
            error: err,
          }
        })
        .finally(() => {
          if (Object.keys(output).length === promises.length) {
            resolve(output);
          }
        });
    })
  }, []);
};

// How can you execute an array of promise in sequence
Promise.sequenceExecution = async function (promises) {
  let result = []
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let response = await promises[i]();
      result[i] = response;
    }
    resolve(result);
  });

  // With reduce.
  // const result = await promises.reduce(async (accumulator, currentPromise) => {
  //   const results = await accumulator; // NOTE
  //   return [...results, await currentPromise];
  // }, Promise.resolve([]));
  // console.log(result);
}



// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);
// new Promise((resolve, reject) => {
//   console.log("4 running")
//   resolve(4);
// });

// p4.then(console.log)

// Promise.myAll([p4])
//   .then(console.log).catch(console.log);