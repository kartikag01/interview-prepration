Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p, i) => {
          p
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    });
  };
  
  Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p, i) => {
          p.then(res => resolve(res))
            .catch(err => {
              if(i === promises.length - 1) {
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
              if(promises.length === Object.keys(result).length) {
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
          if(Object.keys(output).length === promises.length) {
            resolve(output);
          }
        });
      })
    }, []);
  };