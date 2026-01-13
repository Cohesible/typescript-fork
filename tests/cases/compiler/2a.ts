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
    type X1 = C extends string ? true : false
    type X2 = C extends 'black' ? true : false
    type X3 = C extends 'banana' ? true : false
    const x: C = ''
    const y1: string = x
    const y2: C = x

    type X4 = C extends infer U extends string ? U : never

    type A<T> = T extends infer U extends 'black' ? U : never
    type X5 = A<C>

    let c: C
    c = 'black'
    if (c === 'red') {} // should error here
    c = 'red' // OK, because we use the original binding type
}

// {
//     interface Emitter {
//         emit(event: 'event_1'): void;
//         emit(event: 'event_2'): void;
//         emit(event: 'event_3'): void;
//         emit(event: 'event_4'): void;
//     }

//     type EventName = Parameters<Emitter["emit"]>[0]
//     // is -> type EventName = "event_4"
//     // wanted -> type EventName = "event_1" | "event_2" | "event_3" | "event_4"
//     const a: EventName = "event_4";
//     const b: EventName = "event_1";
// }

// {
//     declare function x(v: number | string): true & asserts v is string
// }

{
    // Explicit annotation
    function isString(val: any): asserts val is string {
        if (typeof val !== "string") throw "Nope"
    }

    // Inferred assertion signature!
    function isString2(val: any) {
        if (typeof val !== "string") throw "Nope"
    }

    const x: string | number = "3";
    isString(x);
    x.toLowerCase() // should work - x is now string

    const y: string | number = "test";
    isString2(y);
    y.toLowerCase() // should also work - inferred asserts!

    // Using 'is' expression instead of typeof
    const isString3 = (val: any) => {
        if (!(val is string)) throw "Nope"
    }

    const z: string | number = "hello";
    isString3(z);
    z.toLowerCase() // should also work with 'is' expression!
}

{
    // Fall back on default type parameter when inference does not yield a more suitable type #16229
    class O<T=any> {
        constructor(public array: T[]) { }
    }

    declare class B<T> {
        put(v: T): void
        get(): T
    }
    type C<T> = T extends (infer U | string) ? B<U> : never
    type E = (string | number)
    type D = C<E>

    type F<T extends number> = T
    type F2 = F<string | number>
    type F3<T> = T extends number ? true : false
    type F4 = F3<string | number>
    type F5<T> = { x: T }
    type F6 = F5<string | number>

    declare let val: B<number> | B<string>;
    declare let val2: number | string;
    declare function f<T>(x: B<T>, v: T): T;
    f(val, val2);
}

{
    // satisfies postfix on function declarations
    type Bar = (a: number) => number
    function bar(a) {
        return a // should be a number
    } satisfies Bar
}

{
    // Support ReadonlyArray.includes as a type guard #31018
}

{
    // optional chaining does not work for unknown #35799
    // const prop: unknown = { key : { value: "Hello World" } };

    // const helloworld = prop?.key?.value;
}

// {
//     function test<T extends {accepted: boolean}>(cb: (value: T) => void) {
//     return (data: Omit<T, 'accepted'>) => cb({...data, accepted: true});
//     }
// }

// Allow tsconfig to be a module, not only json #25271
// "paths": { "foo/*": ["*"] }


// Treat JSON types more literally #26552

// When importing a JSON file, strings and numbers are typed as string and number rather than the string or number literals in the file.
// Also, array literals are imported as T[] instead of [T1, T2, T3] tuples.

// Since the JSON is almost an object literal, I believe it makes more sense to type it more specifically.

// if ((reify { x: number}).x === reify number) {

// }

// /opt/homebrew/bin/node ./node_modules/.bin/hereby runtests --tests=2a