Component({
  properties: {},
  data: {},
  lifetimes: {
    created(options) { console.log('Component created', options) },
    attached(options) { console.log('Component attached', options) },
    ready(options) { console.log('Component ready', options) },
    moved(options) { console.log('Component moved', options) },
    detached(options) { console.log('Component detached', options) },
    error(options) { console.log('Component error', options) },
  }
});