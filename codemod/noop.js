export default function(babel) {
  return {
    name: 'noop',
    visitor: {
      Program(){
        console.log('Hello from noop')
      }
    }
  }
}