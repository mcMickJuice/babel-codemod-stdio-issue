module.exports = function (babel) {
  return {
    name: 'noop',
    visitor: {
      Program: function () {
        console.log('Hello from noop')
      }
    }
  }
}