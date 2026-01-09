// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @target: es2017

// @filename: main.syn
function f<T>(t: reify T): T {
    switch (type.kind(t)) {
        case "array":
            t
        case "object":
            const z = t['a']
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
        // After pop, arr should be T[] again, not NonEmptyArray
        const w = arr.pop()  // Should be number | undefined
    }
}

// Map narrowing
{
    const map = new Map<string, number>();
    map.set('a', 1);

    if (map.has('a')) {
        const val = map.get('a');   // Should be `number`, not `number | undefined`
        const val2 = val + 1;       // Should not error
    }

    // Without has() -> `number | undefined`
    const val3 = map.get('a');

    if (map.has('a')) {
        const val4 = map.get('b');  // Different key -> `number | undefined`
    }
}

// declare function fail(): never;
// declare const a: string | null;
// a || fail();
// a.charAt(0); // Object is possibly 'null'. ts(2531)

// 2) Narrowing in Unreachable Code Fails

{
    // TODO: should not be reduced to `string`
    // need a new intrinsic `string` that is created if it appears with a union of string literals
    type C = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string
}

// if ((reify { x: number}).x === reify number) {

// }

// /opt/homebrew/bin/node ./node_modules/.bin/hereby runtests --tests=2a