function hello() {
  return "hello";
}

// async 사용하면, Promise 객체 반환하는 '비동기 처리 함수'가 된다.
async function helloAsync() {
  // async 사용한 함수의 return 값은 Promise 객체(비동기 작업 객체)의 resolve 결과 값이 된다
  return "hello Async";
}

console.log(hello()); // hello
console.log(helloAsync()); // Promise { 'hello Async }

helloAsync().then((res) => {
  console.log(res); // hello Async
});

// delay example
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function worldAsync() {
  return delay(3000).then(() => {
    return "world Async";
  });
}

/*** 
    비동기 처리 함수 앞에 await을 사용하면, 마치 동기 함수와 같이 작동
    => 비동기 처리 함수의 작업이 끝날 때 까지 아래의 코드 실행 x
***/
// async 사용한 함수 내에서만 await 키워드 사용 가능
// await의 대상은 Promise 객체를 반환하는 "비동기 처리 함수"
async function worldAsyncAwait() {
  await delay(3000);
  return "world Async";
}

async function main() {
  const res = await worldAsyncAwait();
  console.log(res);
}

main();
