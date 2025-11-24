declare namespace type {
    // this is named redundantly to reduce cognitive load
    interface ArrayType<T extends type = type> {
        readonly element: T
        readonly readonly?: boolean
    }

    class ArrayType {}

    interface TupleElement {
        readonly name?: string
        readonly type: type
        readonly rest?: boolean
        readonly optional?: boolean
    }

    interface Tuple {
        readonly elements: TupleElement[]
        readonly readonly?: boolean
    }

    class Tuple {}

    // checks if `t` is a Tuple, and if so, will try to convert it into an array of element types
    // any rest type will stop the conversion
    function getSimpleTuple(t: type): type[] | undefined

    interface ObjectProperty<T extends type = type> {
        readonly type: T
        readonly docs?: string
        readonly readonly?: boolean
        readonly optional?: boolean
        readonly source?: Object // only present if this property was inherited
    }

    interface ObjectIndexSignature {
        readonly name: string
        readonly index: type
        readonly element: type
        readonly readonly?: boolean
        readonly optional?: boolean
        readonly docs?: string
        readonly source?: Object
    }

    interface ObjectCallSignature {
        readonly type: type.Function | type.TypeFunction
        readonly newable?: boolean
        readonly docs?: string
        readonly source?: Object
    }

    type ObjectSignature = ObjectIndexSignature | ObjectCallSignature

    interface Object {
        readonly [name: string | number | symbol]: type
    }

    class Object {}

    function getDocs(t: type): string | undefined
    function getProperty(t: Object, p: string | number | symbol): ObjectProperty | undefined
    function getProperties(t: Object): Record<string | number | symbol, ObjectProperty>
    function getCallSignatures(t: Object): ObjectCallSignature[] | undefined
    function getIndexSignatures(t: Object): ObjectIndexSignature[] | undefined

    // getBase

    interface Function {
        readonly params: (TupleElement & { name: string })[]
        readonly returns: type
        readonly newable?: boolean
        readonly this?: type
    }

    class Function {}

    // Unions are readonly but we do not want to annotate it as such
    interface Union<T extends type = type> extends Set<T> {}
    class Union<T extends type = type> extends Set<T> {}

    // `foo${string}bar` -> { strings: ['foo', 'bar'], types: [type.string] }
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
    const Void: unique symbol

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
        | typeof Void

    function isArrayType(t: type): t is ArrayType
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

    // the checker uses this to narrow a tagged type
    interface Tags {
        array: ArrayType
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

    function tag(t: type): keyof Tags
}

type type =
    | type.ArrayType
    | type.Tuple
    | type.Object
    | type.Function
    | type.Union
    | type.Template
    | type.Intrinsic
    | type.Literal
    | type.TypeFunction

