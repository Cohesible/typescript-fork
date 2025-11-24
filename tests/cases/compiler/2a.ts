// @declaration: true
// @emitDeclarationOnly: true
// @target: es2016

function f<T>(t: reify T): T {
    switch (type.tag(t)) {
        case "array":
            t
            break
        case "object":
            const z = t['a']
            break
    }

    return {} as any
}

const y = f(reify { x: number })

// if ((reify { x: number}).x === reify number) {

// }
