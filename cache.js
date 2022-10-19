class Cache {
  constructor () {
    this.sync = true
    this.state = {}
    this.callbacks = []
  }

  register (...callbacks) {
    for (let i = 0; i < callbacks.length; i++) {
      this.callbacks.push(callbacks[i])
      // Call callback immediately so that Cache()
      // outputs are defined.
      const response = callbacks[i]()
      this.state = { ...this.state, ...response }
    }
  }

  run () {
    for (const callback of this.callbacks) {
      // Wrap callback in async function so state can be updated
      // parallely.
      const runAsync = async () => {
        const response = await callback()
        this.state = { ...this.state, ...response }
      }

      runAsync()
    }
  }

  start (interval) {
    if (typeof (interval) !== 'number') { return new Error('Expected interval to be of type number') }

    // Run AT MOST once every 'interval' milliseconds
    setInterval(() => {
      if (this.sync) {
        this.run()
        this.sync = false
      }
    }, interval)
  }

  Cache () {
    // Start syncing again
    this.sync = true
    return this.state
  }
}

module.exports = Cache
