function taskA(a, b, callback) {
  setTimeout(() => {
    const res = a + b;
    callback(res);
  }, 1000);
}

function taskB(a, callback) {
  setTimeout(() => {
    const res = a * 2;
    callback(res);
  }, 1000);
}

function taskC(a, callback) {
  setTimeout(() => {
    const res = a * -1;
    callback(res);
  }, 1000);
}

// callback hell
taskA(3, 4, (a_res) => {
  console.log("task A : ", a_res);
  taskB(a_res, (b_res) => {
    console.log("task B : ", b_res);
    taskC(b_res, (c_res) => {
      console.log("task C : ", c_res);
    });
  });
});
