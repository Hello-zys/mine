function light(color, second) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log(color);
        resolve();
      }, second * 1000);
    });
  }

  // list:[{color:xx,second:xx}]
  function orderLights(list) {
    let promise = Promise.resolve();
    list.forEach((item) => {
      promise = promise.then(function(){
        return light(item.color, item.second);
      })
    })
    promise.then(function(){
      return orderLights(list)
    })
  }
  orderLights([
    { color: "red", second: 3 },
    { color: "green", second: 2 },
    { color: "yellow", second: 1 }
  ]);
