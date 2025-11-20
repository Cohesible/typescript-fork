// @declaration: true
// @emitDeclarationOnly: true
// @isolatedDeclarations: false
type Foo = 1
const x = reify Foo
const x2 = reify<T, U = T> T

const x3 = reify { foo: string }

class Bar {
    y = 1
}

const x4 = reify Bar

const x5 = reify 1 | 2

switch (type.tag(x5)) {
    case "array":
        x5
        break

    case "union":
        break

    default:
        x5
        break
}