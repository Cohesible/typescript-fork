declare namespace type {
    interface Array<T extends type = type> extends globalThis.Array<T> {
        readonly type: T
        readonly maxLength: number
        readonly readonly?: boolean
    }

    class Array {}

    interface TupleElement {
        readonly name?: string
        readonly type: type
        readonly rest?: boolean
        readonly optional?: boolean
    }

    // TODO: this can be narrowed e.g. type.Tuple & [reify 1, reify 2]
    // the finite case would need to re-use whatever the checker is doing for `[1,2,3] as const`
    interface Tuple extends globalThis.Array<type> {
        readonly maxLength: number
        readonly elements: TupleElement[]
        readonly readonly?: boolean
    }

    class Tuple {}

    interface ObjectProperty<T extends type = type> {
        readonly type: T
        readonly docs?: string
        readonly readonly?: boolean
        readonly optional?: boolean
        readonly source?: type.Object // only present if this property was inherited
        readonly tags?: any[]
    }

    interface ObjectIndexSignature {
        readonly name: string
        readonly index: type
        readonly element: type
        readonly readonly?: boolean
        readonly optional?: boolean
        readonly docs?: string
        readonly source?: type.Object
        readonly tags?: any[]
    }

    interface ObjectCallSignature {
        readonly type: type.Function | type.TypeFunction
        readonly newable?: boolean
        readonly docs?: string
        readonly source?: type.Object
        readonly tags?: any[]
    }

    type ObjectSignature = ObjectIndexSignature | ObjectCallSignature

    interface Object {
        readonly [name: PropertyKey]: type
    }

    class Object {}

    // Only relevant when a type has no object representation 
    //  -> type.getBase(reify string & {}) === reify string
    function getBase(t: type.Object): type | undefined
    function getProperties<T extends type.Object>(t: T): Record<keyof T, ObjectProperty>
    function getCallSignatures(t: type.Object): ObjectCallSignature[] | undefined
    function getIndexSignatures(t: type.Object): ObjectIndexSignature[] | undefined

    function getTags(t: type): any[] | undefined
    function getPropertyTags<T extends type.Object>(t: T): Record<keyof T, any[]>

    // Returns the type with all tags removed recursively, without mutation. 
    function normalize<T extends type>(t: T): T

    function findClass(t: type.Object): { name: string, type: type, value?: any } | undefined

    interface Function {
        readonly params: Tuple & { elements: (TupleElement & { name: string; tags?: any[] })[] }
        readonly returns?: type // only present for non-void return types
        readonly returnsTags?: any[]
        readonly newable?: boolean
        readonly this?: type
        // if true, `returns` contains the awaited type
        // reify (() => Promise<number>)
        //  -> { params: [], returns: reify number, async: true }
        readonly async?: boolean
    }

    class Function {}

    // Unions are readonly but we do not want to annotate it as such
    interface Union<T extends type = type> extends Set<T>, Omit<T[], 'keys' | 'entries' | 'forEach'> {}
    class Union<T extends type = type> extends Set<T> {}

    // `foo${string}bar` 
    //  -> { strings: ['foo', 'bar'], types: [type.string] }
    interface Template {
        readonly strings: string[]
        readonly types: type[]
    }

    class Template {}

    interface TypeFunction<T extends type[] = type[], U extends type = type> {
        (...args: T): U
    }

    class TypeFunction {}

    // so you can do `if (reify string === type.string) ...`
    const string: unique symbol
    const number: unique symbol
    const boolean: unique symbol
    const bigint: unique symbol
    const symbol: unique symbol
    const object: unique symbol
    const any: unique symbol
    const never: unique symbol
    const unknown: unique symbol

    type Intrinsic = 
        | typeof string
        | typeof number
        | typeof boolean
        | typeof bigint
        | typeof symbol
        | typeof object
        | typeof any
        | typeof never
        | typeof unknown

    function isArrayType(t: type): t is Array
    function isTuple(t: type): t is Tuple
    function isObject(t: type): t is Object
    function isFunction(t: type): t is Function
    function isUnion(t: type): t is Union
    function isTemplate(t: type): t is Template
    function isIntrinsic(t: type): t is Intrinsic
    function isLiteral(t: type): t is Literal
    function isTypeFunction(t: type): t is TypeFunction

    type Literal = 
        | undefined
        | null
        | boolean
        | string
        | number
        | symbol
        | bigint

    // the checker uses this to narrow a type
    interface Kinds {
        array: Array
        tuple: Tuple
        object: Object
        function: Function
        union: Union
        template: Template
        intrinsic: Intrinsic
        literal: Literal
        typeFunction: TypeFunction
        // enum ?
    }

    function kind(t: type): keyof Kinds

    function annotateProps<T>(t: (reify T) & type.Object, tags: { [P in keyof T]+?: any }): void
}

type type =
    | type.Array
    | type.Tuple
    | type.Object
    | type.Function
    | type.Union
    | type.Template
    | type.Intrinsic
    | type.Literal
    | type.TypeFunction

