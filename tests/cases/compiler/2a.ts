// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @target: es2017

// @filename: main.syn
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

let arr!: number[] | number
if (arr is number[]) {
    const x = arr[0]
}

const o = {} as Record<string, string | number>
for (const [k, v] of o) {}

const o2 = { *[Symbol.iterator]() { } }
for (const x of o2) {}


// non-nullish CFA
function nullishCheck(x: number, y: number | undefined | null) {
    if (const z = x) {
        // this is always true
    } else {
        // unreachable
    }

    if (const z = y) {
    } else {
        // reachable, y should be `undefined | null`
    }
}

function l() {
    return 1
}

while (const n = l()) {}

for (const x of [1,2,3]) {}

const x = 1 as number
switch (x) {
    case 0:
    case 1:
        const x2 = 1 // should not error
        if (x === 0) {
            console.log('got 0')
            fallthrough
        }
        console.log('got 1')
    case 2:
        const x2 = 2
        const y = x // 0 | 2
}

const arr2 = [1, undefined, 2].filter(x => !!x)

{
    type X = 'a' | 'b'
    const q: X = 'a'
    if (q === 'b') {}
    const { a }: { a: X } = { a: 'a' }
    if (a === 'b') {}
}

{
    const arr = [1]
    if (arr.length > 0) {
        const v = arr.pop() + 1
    }
}


// if ((reify { x: number}).x === reify number) {

// }

// /opt/homebrew/bin/node ./node_modules/.bin/hereby runtests --tests=2a