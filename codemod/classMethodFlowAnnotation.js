const reactLifeCycleMethods = [
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
]


function isReactLifecycleMethod(path) {
  return reactLifeCycleMethods.includes(path.node.key.name)
}

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "react-class-method-function-annotation", visitor: {
      ClassMethod(path) {
        if (path.node.kind === "constructor" || isReactLifecycleMethod(path)) {
          return;
        }

        var methodName = path.node.key.name

        var methodAnnotation = t.classProperty(t.identifier(methodName),
          null,
          t.typeAnnotation(t.genericTypeAnnotation("Function")))

        var classBody = path.findParent(t.isClassBody)

        classBody.node.body.unshift(methodAnnotation)
      }
    }
  };
}
