// @declaration: true
// @emitDeclarationOnly: true
// @target: es2016

function f<T>(t: reify T): T {
    switch (type.kind(t)) {
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

async function foo() {
    return 2
}

async function bar() {
    const p = foo() as Promise<number>
    const y = 1 + await p
    return y
}

function bar2() {
    const p = foo()
}

async function z() {
    const q = bar()
    const q2 = bar() as async
}

let arr: number[] | number
if (arr is number[]) {
    const x = arr[0]
}

// if ((reify { x: number}).x === reify number) {

// }
