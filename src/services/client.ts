/* ============================================================
   Mock API client.

   Every service returns a `Resource<T>`, which exposes:
     - get():  async accessor — the real API contract. Swap the
               producer for a `fetch(...)` call to go live.
     - peek(): synchronous snapshot from the current mock, used to
               seed React state so there is no loading flash today.

   When wiring a real backend, replace `resource(producer)` with a
   fetching resource and drop `peek()` in favour of Suspense/loading
   states — the component-facing `useResource` hook stays the same.
   ============================================================ */

export interface Resource<T> {
  get(): Promise<T>
  peek(): T
}

/** Simulated network latency (ms). Set > 0 to exercise loading states. */
export const MOCK_LATENCY = 0

function delay<T>(value: T): Promise<T> {
  if (MOCK_LATENCY <= 0) return Promise.resolve(value)
  return new Promise((res) => setTimeout(() => res(value), MOCK_LATENCY))
}

/** Wrap a pure data producer as an async-ready resource. */
export function resource<T>(producer: () => T): Resource<T> {
  return {
    get: () => delay(producer()),
    peek: () => producer(),
  }
}
