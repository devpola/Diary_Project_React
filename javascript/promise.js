/*
 * Promise 객체 - 비동기 처리에 사용되는 객체
 */

function taskA(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a + b;
      resolve(res);
    }, 1000);
  });
}

function taskB(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * 2;
      resolve(res);
    }, 1000);
  });
}

function taskC(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * -1;
      resolve(res);
    }, 1000);
  });
}

// Promise 객체를 활용했지만, callback hell 그대로
taskA(5, 1).then((a_res) => {
  // a_res : taskA 내부의 resolve 호출의 결과 값
  console.log("A result : ", a_res);
  taskB(a_res).then((b_res) => {
    console.log("B result : ", b_res);
    taskC(b_res).then((c_res) => {
      console.log("C result : ", c_res);
    });
  });
});

// callback hell을 피하기 위한 호출 방법 (then chaining)
// 가독성 향상
taskA(5, 1)
  .then((a_res) => {
    console.log("A result : ", a_res);
    return taskB(a_res);
  })
  .then((b_res) => {
    console.log("B result : ", b_res);
    return taskC(b_res);
  })
  .then((c_res) => {
    console.log("C result : ", c_res);
  });

// 비동기 함수 호출 부와 해당 결과 값을 사용하는 부분을 분리할 수 있기 때문에
// 엮여있는(비동기 작업의 결과 값이 비동기 작업의 입력이 되는) 작업들 사이에 다른 작업도 수행 가능
const bPromiseResult = taskA(5, 1).then((a_res) => {
  console.log("A result : ", a_res);
  return taskB(a_res);
});

console.log("다른 작업들 !!!!");

bPromiseResult
  .then((b_res) => {
    console.log("B result : ", b_res);
    return taskC(b_res);
  })
  .then((c_res) => {
    console.log("C result : ", c_res);
  });
