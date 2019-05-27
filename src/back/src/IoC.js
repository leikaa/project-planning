const awilix = require('awilix');
const path = require('path');

class IoC {
  constructor() {
    this.container = awilix.createContainer();
  }

  loadModules(glob, opts) {
    let options = opts;
    options = Object.assign({
      formatName: 'camelCase',
      injectionMode: awilix.InjectionMode.PROXY,
      cwd: path.resolve(__dirname, ''),
    }, options);

    this.container.loadModules(glob, options);
    return this.container;
  }

  register(obj) {
    this.container.register(obj);
  }
}

module.exports = IoC;
