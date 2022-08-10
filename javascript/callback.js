/*
 * callback 함수 - 나중에 호출할 함수
 * 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 제공해야함
 * => 콜백 기반 비동기 프로그래밍
 *
 * 비동기 처리
 * => 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것
 * single thread 기반인 javascript에서 동기 처리의 비효율적인 부분을 해결하기 위해, multi thread 방식 대신 비동기 방식을 지원
 *
 * 대표적인 비동기 함수 - setTimeout
 */

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
