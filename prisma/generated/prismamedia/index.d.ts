
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ImageKit
 * 
 */
export type ImageKit = $Result.DefaultSelection<Prisma.$ImageKitPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ImageKits
 * const imageKits = await prisma.imageKit.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ImageKits
   * const imageKits = await prisma.imageKit.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.imageKit`: Exposes CRUD operations for the **ImageKit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImageKits
    * const imageKits = await prisma.imageKit.findMany()
    * ```
    */
  get imageKit(): Prisma.ImageKitDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.8.1
   * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ImageKit: 'ImageKit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'imageKit'
      txIsolationLevel: never
    },
    model: {
      ImageKit: {
        payload: Prisma.$ImageKitPayload<ExtArgs>
        fields: Prisma.ImageKitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageKitFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageKitFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          findFirst: {
            args: Prisma.ImageKitFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageKitFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          findMany: {
            args: Prisma.ImageKitFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>[]
          }
          create: {
            args: Prisma.ImageKitCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          createMany: {
            args: Prisma.ImageKitCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ImageKitDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          update: {
            args: Prisma.ImageKitUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          deleteMany: {
            args: Prisma.ImageKitDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ImageKitUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ImageKitUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImageKitPayload>
          }
          aggregate: {
            args: Prisma.ImageKitAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateImageKit>
          }
          groupBy: {
            args: Prisma.ImageKitGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ImageKitGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ImageKitFindRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          aggregateRaw: {
            args: Prisma.ImageKitAggregateRawArgs<ExtArgs>,
            result: Prisma.JsonObject
          }
          count: {
            args: Prisma.ImageKitCountArgs<ExtArgs>,
            result: $Utils.Optional<ImageKitCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ImageKit
   */

  export type AggregateImageKit = {
    _count: ImageKitCountAggregateOutputType | null
    _min: ImageKitMinAggregateOutputType | null
    _max: ImageKitMaxAggregateOutputType | null
  }

  export type ImageKitMinAggregateOutputType = {
    id: string | null
    uploadDate: string | null
    permalink: string | null
    fileId: string | null
    purgeRequestId: string | null
  }

  export type ImageKitMaxAggregateOutputType = {
    id: string | null
    uploadDate: string | null
    permalink: string | null
    fileId: string | null
    purgeRequestId: string | null
  }

  export type ImageKitCountAggregateOutputType = {
    id: number
    uploadDate: number
    permalink: number
    tags: number
    fileId: number
    purgeRequestId: number
    _all: number
  }


  export type ImageKitMinAggregateInputType = {
    id?: true
    uploadDate?: true
    permalink?: true
    fileId?: true
    purgeRequestId?: true
  }

  export type ImageKitMaxAggregateInputType = {
    id?: true
    uploadDate?: true
    permalink?: true
    fileId?: true
    purgeRequestId?: true
  }

  export type ImageKitCountAggregateInputType = {
    id?: true
    uploadDate?: true
    permalink?: true
    tags?: true
    fileId?: true
    purgeRequestId?: true
    _all?: true
  }

  export type ImageKitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageKit to aggregate.
     */
    where?: ImageKitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageKits to fetch.
     */
    orderBy?: ImageKitOrderByWithRelationInput | ImageKitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageKitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageKits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageKits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImageKits
    **/
    _count?: true | ImageKitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageKitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageKitMaxAggregateInputType
  }

  export type GetImageKitAggregateType<T extends ImageKitAggregateArgs> = {
        [P in keyof T & keyof AggregateImageKit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImageKit[P]>
      : GetScalarType<T[P], AggregateImageKit[P]>
  }




  export type ImageKitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageKitWhereInput
    orderBy?: ImageKitOrderByWithAggregationInput | ImageKitOrderByWithAggregationInput[]
    by: ImageKitScalarFieldEnum[] | ImageKitScalarFieldEnum
    having?: ImageKitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageKitCountAggregateInputType | true
    _min?: ImageKitMinAggregateInputType
    _max?: ImageKitMaxAggregateInputType
  }

  export type ImageKitGroupByOutputType = {
    id: string
    uploadDate: string | null
    permalink: string | null
    tags: string[]
    fileId: string
    purgeRequestId: string
    _count: ImageKitCountAggregateOutputType | null
    _min: ImageKitMinAggregateOutputType | null
    _max: ImageKitMaxAggregateOutputType | null
  }

  type GetImageKitGroupByPayload<T extends ImageKitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageKitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageKitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageKitGroupByOutputType[P]>
            : GetScalarType<T[P], ImageKitGroupByOutputType[P]>
        }
      >
    >


  export type ImageKitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uploadDate?: boolean
    permalink?: boolean
    tags?: boolean
    fileId?: boolean
    purgeRequestId?: boolean
  }, ExtArgs["result"]["imageKit"]>

  export type ImageKitSelectScalar = {
    id?: boolean
    uploadDate?: boolean
    permalink?: boolean
    tags?: boolean
    fileId?: boolean
    purgeRequestId?: boolean
  }


  export type $ImageKitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImageKit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      uploadDate: string | null
      permalink: string | null
      tags: string[]
      fileId: string
      purgeRequestId: string
    }, ExtArgs["result"]["imageKit"]>
    composites: {}
  }


  type ImageKitGetPayload<S extends boolean | null | undefined | ImageKitDefaultArgs> = $Result.GetResult<Prisma.$ImageKitPayload, S>

  type ImageKitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ImageKitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ImageKitCountAggregateInputType | true
    }

  export interface ImageKitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImageKit'], meta: { name: 'ImageKit' } }
    /**
     * Find zero or one ImageKit that matches the filter.
     * @param {ImageKitFindUniqueArgs} args - Arguments to find a ImageKit
     * @example
     * // Get one ImageKit
     * const imageKit = await prisma.imageKit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ImageKitFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitFindUniqueArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ImageKit that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ImageKitFindUniqueOrThrowArgs} args - Arguments to find a ImageKit
     * @example
     * // Get one ImageKit
     * const imageKit = await prisma.imageKit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ImageKitFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ImageKit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitFindFirstArgs} args - Arguments to find a ImageKit
     * @example
     * // Get one ImageKit
     * const imageKit = await prisma.imageKit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ImageKitFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitFindFirstArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ImageKit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitFindFirstOrThrowArgs} args - Arguments to find a ImageKit
     * @example
     * // Get one ImageKit
     * const imageKit = await prisma.imageKit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ImageKitFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ImageKits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImageKits
     * const imageKits = await prisma.imageKit.findMany()
     * 
     * // Get first 10 ImageKits
     * const imageKits = await prisma.imageKit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageKitWithIdOnly = await prisma.imageKit.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ImageKitFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ImageKit.
     * @param {ImageKitCreateArgs} args - Arguments to create a ImageKit.
     * @example
     * // Create one ImageKit
     * const ImageKit = await prisma.imageKit.create({
     *   data: {
     *     // ... data to create a ImageKit
     *   }
     * })
     * 
    **/
    create<T extends ImageKitCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitCreateArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ImageKits.
     *     @param {ImageKitCreateManyArgs} args - Arguments to create many ImageKits.
     *     @example
     *     // Create many ImageKits
     *     const imageKit = await prisma.imageKit.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ImageKitCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ImageKit.
     * @param {ImageKitDeleteArgs} args - Arguments to delete one ImageKit.
     * @example
     * // Delete one ImageKit
     * const ImageKit = await prisma.imageKit.delete({
     *   where: {
     *     // ... filter to delete one ImageKit
     *   }
     * })
     * 
    **/
    delete<T extends ImageKitDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitDeleteArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ImageKit.
     * @param {ImageKitUpdateArgs} args - Arguments to update one ImageKit.
     * @example
     * // Update one ImageKit
     * const imageKit = await prisma.imageKit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ImageKitUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitUpdateArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ImageKits.
     * @param {ImageKitDeleteManyArgs} args - Arguments to filter ImageKits to delete.
     * @example
     * // Delete a few ImageKits
     * const { count } = await prisma.imageKit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ImageKitDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageKitDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageKits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImageKits
     * const imageKit = await prisma.imageKit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ImageKitUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ImageKit.
     * @param {ImageKitUpsertArgs} args - Arguments to update or create a ImageKit.
     * @example
     * // Update or create a ImageKit
     * const imageKit = await prisma.imageKit.upsert({
     *   create: {
     *     // ... data to create a ImageKit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImageKit we want to update
     *   }
     * })
    **/
    upsert<T extends ImageKitUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ImageKitUpsertArgs<ExtArgs>>
    ): Prisma__ImageKitClient<$Result.GetResult<Prisma.$ImageKitPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Find zero or more ImageKits that matches the filter.
     * @param {ImageKitFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const imageKit = await prisma.imageKit.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ImageKitFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ImageKit.
     * @param {ImageKitAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const imageKit = await prisma.imageKit.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ImageKitAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of ImageKits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitCountArgs} args - Arguments to filter ImageKits to count.
     * @example
     * // Count the number of ImageKits
     * const count = await prisma.imageKit.count({
     *   where: {
     *     // ... the filter for the ImageKits we want to count
     *   }
     * })
    **/
    count<T extends ImageKitCountArgs>(
      args?: Subset<T, ImageKitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageKitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImageKit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageKitAggregateArgs>(args: Subset<T, ImageKitAggregateArgs>): Prisma.PrismaPromise<GetImageKitAggregateType<T>>

    /**
     * Group by ImageKit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageKitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageKitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageKitGroupByArgs['orderBy'] }
        : { orderBy?: ImageKitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageKitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageKitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImageKit model
   */
  readonly fields: ImageKitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImageKit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageKitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ImageKit model
   */ 
  interface ImageKitFieldRefs {
    readonly id: FieldRef<"ImageKit", 'String'>
    readonly uploadDate: FieldRef<"ImageKit", 'String'>
    readonly permalink: FieldRef<"ImageKit", 'String'>
    readonly tags: FieldRef<"ImageKit", 'String[]'>
    readonly fileId: FieldRef<"ImageKit", 'String'>
    readonly purgeRequestId: FieldRef<"ImageKit", 'String'>
  }
    

  // Custom InputTypes

  /**
   * ImageKit findUnique
   */
  export type ImageKitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter, which ImageKit to fetch.
     */
    where: ImageKitWhereUniqueInput
  }


  /**
   * ImageKit findUniqueOrThrow
   */
  export type ImageKitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter, which ImageKit to fetch.
     */
    where: ImageKitWhereUniqueInput
  }


  /**
   * ImageKit findFirst
   */
  export type ImageKitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter, which ImageKit to fetch.
     */
    where?: ImageKitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageKits to fetch.
     */
    orderBy?: ImageKitOrderByWithRelationInput | ImageKitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageKits.
     */
    cursor?: ImageKitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageKits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageKits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageKits.
     */
    distinct?: ImageKitScalarFieldEnum | ImageKitScalarFieldEnum[]
  }


  /**
   * ImageKit findFirstOrThrow
   */
  export type ImageKitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter, which ImageKit to fetch.
     */
    where?: ImageKitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageKits to fetch.
     */
    orderBy?: ImageKitOrderByWithRelationInput | ImageKitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageKits.
     */
    cursor?: ImageKitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageKits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageKits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageKits.
     */
    distinct?: ImageKitScalarFieldEnum | ImageKitScalarFieldEnum[]
  }


  /**
   * ImageKit findMany
   */
  export type ImageKitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter, which ImageKits to fetch.
     */
    where?: ImageKitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageKits to fetch.
     */
    orderBy?: ImageKitOrderByWithRelationInput | ImageKitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImageKits.
     */
    cursor?: ImageKitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageKits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageKits.
     */
    skip?: number
    distinct?: ImageKitScalarFieldEnum | ImageKitScalarFieldEnum[]
  }


  /**
   * ImageKit create
   */
  export type ImageKitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * The data needed to create a ImageKit.
     */
    data: XOR<ImageKitCreateInput, ImageKitUncheckedCreateInput>
  }


  /**
   * ImageKit createMany
   */
  export type ImageKitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImageKits.
     */
    data: ImageKitCreateManyInput | ImageKitCreateManyInput[]
  }


  /**
   * ImageKit update
   */
  export type ImageKitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * The data needed to update a ImageKit.
     */
    data: XOR<ImageKitUpdateInput, ImageKitUncheckedUpdateInput>
    /**
     * Choose, which ImageKit to update.
     */
    where: ImageKitWhereUniqueInput
  }


  /**
   * ImageKit updateMany
   */
  export type ImageKitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImageKits.
     */
    data: XOR<ImageKitUpdateManyMutationInput, ImageKitUncheckedUpdateManyInput>
    /**
     * Filter which ImageKits to update
     */
    where?: ImageKitWhereInput
  }


  /**
   * ImageKit upsert
   */
  export type ImageKitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * The filter to search for the ImageKit to update in case it exists.
     */
    where: ImageKitWhereUniqueInput
    /**
     * In case the ImageKit found by the `where` argument doesn't exist, create a new ImageKit with this data.
     */
    create: XOR<ImageKitCreateInput, ImageKitUncheckedCreateInput>
    /**
     * In case the ImageKit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageKitUpdateInput, ImageKitUncheckedUpdateInput>
  }


  /**
   * ImageKit delete
   */
  export type ImageKitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
    /**
     * Filter which ImageKit to delete.
     */
    where: ImageKitWhereUniqueInput
  }


  /**
   * ImageKit deleteMany
   */
  export type ImageKitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageKits to delete
     */
    where?: ImageKitWhereInput
  }


  /**
   * ImageKit findRaw
   */
  export type ImageKitFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * ImageKit aggregateRaw
   */
  export type ImageKitAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * ImageKit without action
   */
  export type ImageKitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageKit
     */
    select?: ImageKitSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const ImageKitScalarFieldEnum: {
    id: 'id',
    uploadDate: 'uploadDate',
    permalink: 'permalink',
    tags: 'tags',
    fileId: 'fileId',
    purgeRequestId: 'purgeRequestId'
  };

  export type ImageKitScalarFieldEnum = (typeof ImageKitScalarFieldEnum)[keyof typeof ImageKitScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ImageKitWhereInput = {
    AND?: ImageKitWhereInput | ImageKitWhereInput[]
    OR?: ImageKitWhereInput[]
    NOT?: ImageKitWhereInput | ImageKitWhereInput[]
    id?: StringFilter<"ImageKit"> | string
    uploadDate?: StringNullableFilter<"ImageKit"> | string | null
    permalink?: StringNullableFilter<"ImageKit"> | string | null
    tags?: StringNullableListFilter<"ImageKit">
    fileId?: StringFilter<"ImageKit"> | string
    purgeRequestId?: StringFilter<"ImageKit"> | string
  }

  export type ImageKitOrderByWithRelationInput = {
    id?: SortOrder
    uploadDate?: SortOrder
    permalink?: SortOrder
    tags?: SortOrder
    fileId?: SortOrder
    purgeRequestId?: SortOrder
  }

  export type ImageKitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fileId?: string
    AND?: ImageKitWhereInput | ImageKitWhereInput[]
    OR?: ImageKitWhereInput[]
    NOT?: ImageKitWhereInput | ImageKitWhereInput[]
    uploadDate?: StringNullableFilter<"ImageKit"> | string | null
    permalink?: StringNullableFilter<"ImageKit"> | string | null
    tags?: StringNullableListFilter<"ImageKit">
    purgeRequestId?: StringFilter<"ImageKit"> | string
  }, "id" | "fileId">

  export type ImageKitOrderByWithAggregationInput = {
    id?: SortOrder
    uploadDate?: SortOrder
    permalink?: SortOrder
    tags?: SortOrder
    fileId?: SortOrder
    purgeRequestId?: SortOrder
    _count?: ImageKitCountOrderByAggregateInput
    _max?: ImageKitMaxOrderByAggregateInput
    _min?: ImageKitMinOrderByAggregateInput
  }

  export type ImageKitScalarWhereWithAggregatesInput = {
    AND?: ImageKitScalarWhereWithAggregatesInput | ImageKitScalarWhereWithAggregatesInput[]
    OR?: ImageKitScalarWhereWithAggregatesInput[]
    NOT?: ImageKitScalarWhereWithAggregatesInput | ImageKitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImageKit"> | string
    uploadDate?: StringNullableWithAggregatesFilter<"ImageKit"> | string | null
    permalink?: StringNullableWithAggregatesFilter<"ImageKit"> | string | null
    tags?: StringNullableListFilter<"ImageKit">
    fileId?: StringWithAggregatesFilter<"ImageKit"> | string
    purgeRequestId?: StringWithAggregatesFilter<"ImageKit"> | string
  }

  export type ImageKitCreateInput = {
    id?: string
    uploadDate?: string | null
    permalink?: string | null
    tags?: ImageKitCreatetagsInput | string[]
    fileId: string
    purgeRequestId: string
  }

  export type ImageKitUncheckedCreateInput = {
    id?: string
    uploadDate?: string | null
    permalink?: string | null
    tags?: ImageKitCreatetagsInput | string[]
    fileId: string
    purgeRequestId: string
  }

  export type ImageKitUpdateInput = {
    uploadDate?: NullableStringFieldUpdateOperationsInput | string | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ImageKitUpdatetagsInput | string[]
    fileId?: StringFieldUpdateOperationsInput | string
    purgeRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageKitUncheckedUpdateInput = {
    uploadDate?: NullableStringFieldUpdateOperationsInput | string | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ImageKitUpdatetagsInput | string[]
    fileId?: StringFieldUpdateOperationsInput | string
    purgeRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageKitCreateManyInput = {
    id?: string
    uploadDate?: string | null
    permalink?: string | null
    tags?: ImageKitCreatetagsInput | string[]
    fileId: string
    purgeRequestId: string
  }

  export type ImageKitUpdateManyMutationInput = {
    uploadDate?: NullableStringFieldUpdateOperationsInput | string | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ImageKitUpdatetagsInput | string[]
    fileId?: StringFieldUpdateOperationsInput | string
    purgeRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type ImageKitUncheckedUpdateManyInput = {
    uploadDate?: NullableStringFieldUpdateOperationsInput | string | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ImageKitUpdatetagsInput | string[]
    fileId?: StringFieldUpdateOperationsInput | string
    purgeRequestId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ImageKitCountOrderByAggregateInput = {
    id?: SortOrder
    uploadDate?: SortOrder
    permalink?: SortOrder
    tags?: SortOrder
    fileId?: SortOrder
    purgeRequestId?: SortOrder
  }

  export type ImageKitMaxOrderByAggregateInput = {
    id?: SortOrder
    uploadDate?: SortOrder
    permalink?: SortOrder
    fileId?: SortOrder
    purgeRequestId?: SortOrder
  }

  export type ImageKitMinOrderByAggregateInput = {
    id?: SortOrder
    uploadDate?: SortOrder
    permalink?: SortOrder
    fileId?: SortOrder
    purgeRequestId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type ImageKitCreatetagsInput = {
    set: string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type ImageKitUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ImageKitDefaultArgs instead
     */
    export type ImageKitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ImageKitDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}