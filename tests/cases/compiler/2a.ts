// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @target: es2017

// @filename: main.syn

function f<T>(t: reify T): T {
    switch (Type.kind(t)) {
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

// auto TLA -> number
const tla = foo()
// as const should not crash
const cc = foo() as const

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
    // should stay as a Promise
    const p = new Promise<void>(r => r())
}

let arr!: number[] | number
if (arr is number[]) {
    const x = arr[0]
}

const o = {} as Record<string, string | number>
for (const [k, v] of o) {}

const o2 = { *[Symbol.iterator]() { } }
for (const x of o2) {}

{
    const m = new Map()
    if (const x = m.get('a')) {} // should not error
}

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
    type X = 'a' | 'b'
    let q: X = 'a'
    if (q === 'b') {} // error
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

{
    // TODO
    // declare function fail(): never;
    // declare const a: string | null;
    // a || fail();
    // a.charAt(0); // Object is possibly 'null'. ts(2531)
    // 2) Narrowing in Unreachable Code Fails
}

{
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
    // #16229
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

    type Bar2 = (a: number, ...rest: number[]) => number
    function bar2(a, ...arr) {
        return arr[1] + a // should be a number
    } satisfies Bar2

    function bar3({ a }) {
        return a // should be a number
    } satisfies (arg: { a: number }) => number
}

{
    // JSX should parse
    // TODO: auto include `jsx` lib if project includes JSX 
    const y = <div></div>
}

{
    // This expression is not callable. Not all constituents of type '(() => T) | (T & Function)' are callable. Type 'T & Function' has no call signatures.(2349)
    type Initializer<T> = T | (() => T)
    function correct<T>(arg: Initializer<T>) {
        return typeof arg === 'function' ? arg() : arg // FIXME: should not error
    }
}

{
    // treat objects as having null prototype by default
    // likewise, using an object as a string should be flagged if the
    // object does not have an explicit `toString` method
    const o = {} as object
    o.toString // checker error, `toString` isn't known to the checker

    ;`${o}` // error

    const o2 = {} as { toString(): string }
    ;`${o2}` // OK
}

{
    const o: { n: number } | undefined = { n: 1 }
    // should all be OK, we will support optional chaining for assignments
    o?.n = 1 
    o?.n++
    const exp1 = o?.n === 10        // boolean | undefined

    const o2: { n: number } | undefined = { n: 1 }
    const exp2 = o?.n === o2?.n     // boolean | undefined
    // --> short circuit whole thing if o or o2 is nullish

    // should not error
    const exp3 = o2?.n > 10         // boolean | undefined

    if (o2?.n !== 0) {
        o2 // should narrow to be non-nullish
    }

    // const o3: { n: number | undefined } | undefined = { n: 1 }

    // note: we are _not_ implementing chaining for prefix unary
    // --> it did not feel quite right

    // 1 in obj?.foo;  // TypeError
    // for (bar of obj?.foo);  // TypeError
    // bar instanceof obj?.foo;  // TypeError
}

{
    const f = (): 1 | 2 => 1
    switch (const v = f()) {
        case 1: console.log('got 1', v)
        case 2: console.log('got 2', v)
    }

    const x: string | number = 1
    switch (x) {
        case is string:
            console.log('got string', x)
        case is number:
            console.log('got number', x)
    }

    const x2: unknown = {}
    switch (x2) {
        case is { y: number }:
            console.log('y', x2.y)
        case is 1:
        case is 2:
            fallthrough
        case is 3:
            x2 // 1 | 2 | 3
    }

    const x3: string | 10 = 10
    switch (x3) {
        case 10: console.log(x3)
        case is string: console.log(x3)
    }
}

{
    type F = { x: number } | { y: string }
        function x(f: F) {
        if (f is { x: number }) {
            return f.x
        }
        return f.y
    }
}

{
    try {} catch (e) {}
    try {} catch (e: Error) {}
}

{
    const x = <A>(x: A) => x
}

{
    // Request: Class Decorator Mutation #4881
    
}

{
    // conditional type should use union of signatures for overloads 
    // if the supertype is a bare fn literal
}


// TODO: unnamed fn params `type F = ({ a: number }) => number`
// let a?: number

// TODO:
// This code should compile due to narrowing on x:
// const o = {foo: 1, bar: 2} as const;
// const x: string = 'foo';
// if (x in o) {
//     const y: "foo" | "bar" = x; // OK
// }

{
    // Support ReadonlyArray.includes as a type guard #31018
}

{
    // Deprioritise properties of the form { prop?: never } in completions #62024
}

{
    // Allow narrowing of unions discriminated by numeric literals using > < etc #61770
    // FIXME: rt should be `number`
    function example1(...args: [number] | []) {
        if (args.length > 0) {
            return args[0];
        }
    }
}

{
    // #16665: "Include Default Parameter Values in Signature Help".
}

// Add a Mutable type (opposite of Readonly) to lib.d.ts #24509
// https://github.com/microsoft/TypeScript/issues/24509

// The possibility of using the readonly keyword for an entire interface has been suggested in A cheaper, easier to implement middle ground could be #21152.
// --> // mutable

// class GenericClass<T> {
//   type SpecializedArray = Array<{ val: T }>;

//   func1(arr: SpecializedArray): SpecializedArray {
//     ..  
//   }

//   func2(arr: SpecializedArray): SpecializedArray {
//     ...
//   }
// }

{
    // Type guard should infer the type of parent object when applied on a property #42384
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

{
    const elements: Element[] = []
    function Foo(props: { children: Element[] }) {
        return <div>{...props.children}</div>
    }
    const f = <Foo>{...elements}</Foo>
    const y = <Foo>{elements}</Foo> // error
    const x0 = <Foo></Foo> // no error
    const x1 = <Foo><div/></Foo> // no error
    const x2 = <Foo><div/><div/></Foo> // no error
    const x3 = <Foo>a</Foo> // error
    const x4 = <Foo/> // error (this is explictly no elements)

    function Foo2(props: { children: [string, number] }) {
        return <div></div>
    }
    const f2 = <Foo2>{'hi'}{...([1,2] as number[])}</Foo2> // error
    const f3 = <Foo2>{'hi'}{...([1] as [number])}</Foo2> // no error

    function FooOpt(props: { children?: Element[] }) {
        return <div>{...(props.children ?? [])}</div>
    }
    {
        const f = <FooOpt>{...elements}</FooOpt> // no error
        const y = <FooOpt>{elements}</FooOpt> // error
        const x0 = <FooOpt></FooOpt> // no error
        const x1 = <FooOpt><div/></FooOpt> // no error
        const x2 = <FooOpt><div/><div/></FooOpt> // no error
        const x3 = <FooOpt>a</FooOpt> // error
        const x4 = <FooOpt/> // no error
    }

    {
        function F1(props: { v: string }) {
            return <span>{props.v}</span>
        }
        function Main() {
            const v = 'aaa'
            return <F1 v={v}></F1> // no error
        }
    }

    {
        const x = <>aaa{1}</>
    }
}

// update expression
declare const el: Element;
const d = <div onClick={function () {
    this
}}></div>

// shorthand_jsx_attribute
const value = ''
const d2 = <input {value}/>

// /opt/homebrew/bin/node ./node_modules/.bin/hereby runtests --tests=2a

// ^(\s*)on(.*)\?:
// $1on\L$2?: