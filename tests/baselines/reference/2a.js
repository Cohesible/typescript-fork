//// [tests/cases/compiler/2a.ts] ////

//// [main.syn]
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
const d = <div onClick={() => {
    try update el
}}></div>

// shorthand_jsx_attribute
const value = ''
const d2 = <input {value}/>
const d3 = <div>
  <#if {true}>
     <div></div>
  </>
</div>

const cond = true
const d4 = <div><#if {cond}></></div>

{
    // cfa should work inside <#if>
    let v = undefined as { x: () => number } | undefined
    const d = <div>
        <#if {v}>
          <div>{v.x()}</div>
        </>
    </div>
}

{
    // error, possibly null
    update document.querySelector('.a')

    if (const x = document.querySelector('.a')) {
        // error, needs try or void
        update x
        // ok
        try update x
        // ok
        void update x
    }

    {
        let y = 0
        const x = <div>{y}</div>
        update x // ok
    }

    {
        const x = <div>hi</div>
        update x // error, `x` has no updatable expressions
        try update x // error, `x` has no updatable expressions
        void update x // error, `x` has no updatable expressions
    }

    { 
        let y = 0
        const x = <div><div>{y}</div></div>
        update x // ok
    }

    { 
        let y = 0
        const x = <div><div id={y}></div></div>
        update x // ok
    }

    { 
        let y = 0
        const x = <div id={y}></div>
        update x // ok
    }

    {
        // components can always be updated
        function Comp() { return <div></div> }
        const el = <Comp/>
        update el // ok
    }
}


// !T (FallibleType) and try expr
{
    class Err1 extends Error { override name = "Err1" as const }
    class Err2 extends Error { override name = "Err2" as const }

    function mayFail(): !string {
        if (Math.random() > 0.5) return new Err1()
        if (Math.random() > 0.3) return new Err2()
        return 'hello'
    }

    // callers see the full error union
    const x: string | Err1 | Err2 = mayFail()
    // ReturnType should also capture errors
    const y: ReturnType<typeof mayFail> = '' as typeof x
    // try unwraps: throws error, returns string
    const z: string = try mayFail()

    // each of the following cases should report 'Did you forget `try`?' in addition to the normal issue
    function test(_x: string): void {}
    test(mayFail())
    const z2: string = mayFail()

    // no hint: target already accepts the full union
    const z3: string | Err1 | Err2 = mayFail()

    // hint: string is assignable to string | number after stripping errors
    function test2(_x: string | number): void {}
    test2(mayFail())

    // no hint: string is not assignable to boolean — unrelated mismatch
    const z4: boolean = mayFail()

    // should have hint
    function f(): string { return mayFail() }

    // never error
    const foo = () => ''
    const z5 = try foo()

    // always error
    const foo2 = () => new Error()
    const z6 = try foo2()  

    function effect(cond = true): !void {
        if (cond) return new Error()
    }

    // hint: unhandled fallible return type: void | Error
    effect()

    try effect() // ok

    void effect() // ok

    const z7 = effect() // ok

    function wrapsEffect() {
        return effect() // ok
    }
}

// FIXME: `typeNodeMentionsPromise` in checker.ts is brittle
{
    async function getValue() { return 42 }
    async function testAutoAwait() {
        const v = getValue()  // number
    }

    declare function fetchNum(): Promise<number>
    async function testDeclared() {
        const n = fetchNum()  // number
    }

    declare function passThrough<T>(x: T): T
    async function testPassThrough() {
        const p: Promise<number> = Promise.resolve(1)
        const r = passThrough(p)  // Promise<number>, not number
    }

    declare function memoize<T extends () => any>(fn: T): T
    async function testMemoize() {
        async function inner() { return 1 }
        const m = memoize(inner)
        const v = m()  // number
    }
}

// .syn async return type elision
{
    async function elided(): number { return 1 }
    async function testElided() {
        const v = elided()  // number
    }

    async function explicit(): Promise<number> { return 1 }
    async function testExplicit() {
        const v = explicit()  // number
    }

    async function inferred() { return 1 }
    async function testInferred() {
        const v = inferred()  // number
    }
}

{
    const x = <div @ a>
        <div @ b></div>
        <#block>
            console.log(a, b)
        </>
    </div>
    console.log(a, b)
}

// spread JSX elements
{
    declare function Comp(): Element[];
    const spread1 = <div><...Comp /></div> // ok
    const noSpread1 = <div><Comp /></div> // error

    // errors on intrinsics
    const spread2 = <div><...div /></div>
    const spread3 = <div><...div></div></div>

    declare function Comp2(): (() => void)[];
    const spread4 = <div><...Comp2 /></div>  // error, intrinsics want something Element-like

    declare function Comp3(): Element;
    const noSpread2 = <div><Comp3 /></div> // ok
    const spread5 = <div><...Comp3 /></div> // error

    declare function Comp4(props: { children: Element[] }): Element;
    // ok
    const spread6 = <Comp4>
      <Comp3 />
      <...Comp />
    </Comp4>

    // error
    const spread7 = <Comp4>
      <Comp3 />
      <Comp />
    </Comp4>

    declare function Comp5(): [Element] | [];
    // ok
    const spread8 = <Comp4>
        <...Comp5 />
    </Comp4>
}

{
    const cond = true as boolean
    // [] | [HtmlDivElement]
    const if1 = <#if {cond}>
      <div></div>
    </>
    // [HtmlDivElement]
    const if2 = <#if {true}>
      <div></div>
    </>
    // []
    const if3 = <#if {false}>
      <div></div>
    </>
}

// /opt/homebrew/bin/node ./node_modules/.bin/hereby runtests --tests=2a

// ^(\s*)on(.*)\?:
// $1on\L$2?:



//// [main.d.ts]
export {};
