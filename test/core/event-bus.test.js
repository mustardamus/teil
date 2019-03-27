const eventBus = require('../../src/core/event-bus')

describe('Core - Event Bus', () => {
  it('should provide on and emit methods', () => {
    expect(typeof eventBus.on).toBe('function')
    expect(typeof eventBus.emit).toBe('function')
  })

  it('should listen to and emit events', () => {
    eventBus.on('fire', val => {
      expect(val).toBe(true)
    })

    eventBus.emit('fire', true)
  })
})
