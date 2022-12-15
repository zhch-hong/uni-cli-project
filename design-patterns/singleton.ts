const mySingleton = (function () {
  let instance;

  function init() {
    function privateMethod() {
      console.log('i am private');
    }

    const privateVariable = 'i am also private';

    const privateRandomNumber = Math.random();

    return {
      publicMethod() {
        console.log('the public can see me');
      },

      publicProperty: 'i am also public',

      getRandomNUmber() {
        return privateRandomNumber;
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

const SingletonTester = (function () {
  function Singleton(options = {}) {
    this.name = 'SingletonTester';
    this.pointX = options.pointX;
    this.pointY = options.pointY;
  }

  let instance;

  const _static = {
    name: 'SingletonTester',
    getInstance(options) {
      if (instance === undefined) {
        instance = new Singleton(options);
      }
      return instance;
    },
  };

  return _static;
})();
