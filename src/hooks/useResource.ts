import { useEffect, useState } from 'react'
import type { Resource } from '@/services/client'

/**
 * Read a service Resource into component state.
 *
 * Initial state is seeded synchronously from the resource's mock
 * snapshot (no loading flash), then refreshed from the async
 * accessor on mount. Pass a stable, module-level Resource so the
 * effect dependency stays stable.
 */
export function useResource<T>(res: Resource<T>): T {
  const [data, setData] = useState<T>(() => res.peek())

  useEffect(() => {
    let alive = true
    res.get().then((d) => {
      if (alive) setData(d)
    })
    return () => {
      alive = false
    }
  }, [res])

  return data
}
