import { useRef, useCallback } from 'react'

/**
 * Custom hook that prevents multiple concurrent executions of an async callback.
 * If a call is already in progress, subsequent calls will be ignored until
 * the current one completes.
 *
 * @param callback - The async function to protect from concurrent executions
 * @returns A protected version of the callback that prevents concurrent calls
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => Promise<void>>(
  callback: T
): T {
  const isExecutingRef = useRef<boolean>(false)

  const protectedCallback = useCallback(
    async (...args: Parameters<T>): Promise<void> => {
      // If already executing, ignore this call
      if (isExecutingRef.current) {
        return
      }

      // Set executing flag
      isExecutingRef.current = true

      try {
        // Execute the callback
        await callback(...args)
      } finally {
        // Always reset the flag, even if there's an error
        isExecutingRef.current = false
      }
    },
    [callback]
  ) as T

  return protectedCallback
}

