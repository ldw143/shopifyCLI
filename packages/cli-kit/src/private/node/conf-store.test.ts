import {
  ConfSchema,
  cacheRetrieve,
  cacheRetrieveOrRepopulate,
  getSession,
  removeSession,
  setSession,
  runAtMinimumInterval,
} from './conf-store.js'
import {LocalStorage} from '../../public/node/local-storage.js'
import {afterEach, describe, expect, test, vi} from 'vitest'
import {inTemporaryDirectory} from '@shopify/cli-kit/node/fs'

describe('getSession', () => {
  test('returns the content of the SessionStore key', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})
      config.set('sessionStore', 'my-session')

      // When
      const got = getSession(config)

      // Then
      expect(got).toEqual('my-session')
    })
  })
})

describe('setSession', () => {
  test('saves the desired content in the SessionStore key', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})
      config.set('sessionStore', 'my-session')

      // When
      setSession('my-session', config)

      // Then
      expect(config.get('sessionStore')).toEqual('my-session')
    })
  })
})

describe('removeSession', () => {
  test('removes the SessionStore key', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})
      config.set('sessionStore', 'my-session')

      // When
      removeSession(config)

      // Then
      expect(config.get('sessionStore')).toEqual(undefined)
    })
  })
})

describe('cacheRetrieveOrRepopulate', () => {
  test('returns the cached contents when they exist', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})
      const cacheValue = {
        'identity-introspection-url-IDENTITYURL': {value: 'URL1', timestamp: Date.now()},
      }
      config.set('cache', cacheValue)

      // When
      const got = await cacheRetrieveOrRepopulate(
        'identity-introspection-url-IDENTITYURL',
        async () => 'URL2',
        60 * 1000,
        config,
      )

      // Then
      // Uses the prior run to return the cached value
      expect(got).toEqual('URL1')
    })
  })

  test('derives the cached contents when the cache is not populated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})

      // When
      const got = await cacheRetrieveOrRepopulate(
        'identity-introspection-url-IDENTITYURL',
        async () => 'URL1',
        60 * 1000,
        config,
      )

      // Then
      expect(got).toEqual('URL1')
    })
  })

  test('re-derives the cached contents when the cache is outdated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<ConfSchema>({cwd})
      const cacheValue = {
        'identity-introspection-url-IDENTITYURL': {value: 'URL1', timestamp: Date.now() - 60 * 1000},
      }
      config.set('cache', cacheValue)

      // When
      const got = await cacheRetrieveOrRepopulate(
        'identity-introspection-url-IDENTITYURL',
        async () => 'URL2',
        0,
        config,
      )

      // Then
      // Fetches a new value because the old one is outdated per the current request
      expect(got).toEqual('URL2')
    })
  })

  test('re-derives the cached contents when the cache is invalid', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})
      const cacheValue = {'identity-introspection-url-IDENTITYURL': {value: undefined, timestamp: Date.now()}}
      config.set('cache', cacheValue)

      // When
      const got = await cacheRetrieveOrRepopulate(
        'identity-introspection-url-IDENTITYURL',
        async () => 'URL2',
        60 * 1000,
        config,
      )

      // Then
      // Fetches a new value because the old one is wrong
      expect(got).toEqual('URL2')
    })
  })
})

describe('cacheRetrieve', () => {
  test('returns the value if the cache is populated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})
      const cacheValue = {value: 'URL1', timestamp: Date.now()}
      const cacheEntry = {'identity-introspection-url-IDENTITYURL': cacheValue}
      config.set('cache', cacheEntry)

      // When
      const got = cacheRetrieve('identity-introspection-url-IDENTITYURL', config)

      // Then
      expect(got).toEqual(cacheValue)
    })
  })

  test('returns undefined if the cache is not populated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})
      config.set('cache', {})

      // When
      const got = cacheRetrieve('identity-introspection-url-IDENTITYURL', config)

      // Then
      expect(got).toBeUndefined()
    })
  })
})

describe('runAtMinimumInterval', () => {
  const key = 'TASK'
  const timeout = {seconds: 1}

  afterEach(() => {
    vi.useRealTimers()
  })

  test('runs the task as usual when the cache is not populated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})

      // When
      let taskRan = false
      await runAtMinimumInterval(
        key,
        timeout,
        async () => {
          taskRan = true
        },
        config,
      )

      // Then
      expect(taskRan).toBe(true)
    })
  })

  test('throttles the task when the cache is populated recently', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})
      await runAtMinimumInterval(key, timeout, async () => {}, config)

      // When
      let taskRan = false
      await runAtMinimumInterval(
        key,
        timeout,
        async () => {
          taskRan = true
        },
        config,
      )

      // Then
      expect(taskRan).toBe(false)
    })
  })

  test('runs the task as usual when the cache is populated but outdated', async () => {
    await inTemporaryDirectory(async (cwd) => {
      // Given
      const config = new LocalStorage<any>({cwd})
      await runAtMinimumInterval(key, timeout, async () => {}, config)

      // When
      let taskRan = false
      vi.setSystemTime(vi.getRealSystemTime() + 1000)
      await runAtMinimumInterval(
        key,
        timeout,
        async () => {
          taskRan = true
        },
        config,
      )

      // Then
      expect(taskRan).toBe(true)
    })
  })
})
