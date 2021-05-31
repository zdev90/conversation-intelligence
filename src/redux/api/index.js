import transcript from './transcript.json';

// A mock function to mimic async request
export function fetchData() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({ data: { url: '/59e106639d79684277df770d.wav', transcript } }),
      1000
    )
  );
}
