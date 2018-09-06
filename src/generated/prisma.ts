import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    stations: <T = Station[]>(args: { where?: StationWhereInput, orderBy?: StationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stationStatuses: <T = StationStatus[]>(args: { where?: StationStatusWhereInput, orderBy?: StationStatusOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    station: <T = Station | null>(args: { where: StationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stationStatus: <T = StationStatus | null>(args: { where: StationStatusWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stationsConnection: <T = StationConnection>(args: { where?: StationWhereInput, orderBy?: StationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stationStatusesConnection: <T = StationStatusConnection>(args: { where?: StationStatusWhereInput, orderBy?: StationStatusOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createStation: <T = Station>(args: { data: StationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createStationStatus: <T = StationStatus>(args: { data: StationStatusCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateStation: <T = Station | null>(args: { data: StationUpdateInput, where: StationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateStationStatus: <T = StationStatus | null>(args: { data: StationStatusUpdateInput, where: StationStatusWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteStation: <T = Station | null>(args: { where: StationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteStationStatus: <T = StationStatus | null>(args: { where: StationStatusWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertStation: <T = Station>(args: { where: StationWhereUniqueInput, create: StationCreateInput, update: StationUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertStationStatus: <T = StationStatus>(args: { where: StationStatusWhereUniqueInput, create: StationStatusCreateInput, update: StationStatusUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyStations: <T = BatchPayload>(args: { data: StationUpdateInput, where?: StationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyStationStatuses: <T = BatchPayload>(args: { data: StationStatusUpdateInput, where?: StationStatusWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyStations: <T = BatchPayload>(args: { where?: StationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyStationStatuses: <T = BatchPayload>(args: { where?: StationStatusWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    station: <T = StationSubscriptionPayload | null>(args: { where?: StationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    stationStatus: <T = StationStatusSubscriptionPayload | null>(args: { where?: StationStatusSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Station: (where?: StationWhereInput) => Promise<boolean>
  StationStatus: (where?: StationStatusWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateStation {
  count: Int!
}

type AggregateStationStatus {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

scalar DateTime

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createStation(data: StationCreateInput!): Station!
  createStationStatus(data: StationStatusCreateInput!): StationStatus!
  updateStation(data: StationUpdateInput!, where: StationWhereUniqueInput!): Station
  updateStationStatus(data: StationStatusUpdateInput!, where: StationStatusWhereUniqueInput!): StationStatus
  deleteStation(where: StationWhereUniqueInput!): Station
  deleteStationStatus(where: StationStatusWhereUniqueInput!): StationStatus
  upsertStation(where: StationWhereUniqueInput!, create: StationCreateInput!, update: StationUpdateInput!): Station!
  upsertStationStatus(where: StationStatusWhereUniqueInput!, create: StationStatusCreateInput!, update: StationStatusUpdateInput!): StationStatus!
  updateManyStations(data: StationUpdateInput!, where: StationWhereInput): BatchPayload!
  updateManyStationStatuses(data: StationStatusUpdateInput!, where: StationStatusWhereInput): BatchPayload!
  deleteManyStations(where: StationWhereInput): BatchPayload!
  deleteManyStationStatuses(where: StationStatusWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  stations(where: StationWhereInput, orderBy: StationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Station]!
  stationStatuses(where: StationStatusWhereInput, orderBy: StationStatusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StationStatus]!
  station(where: StationWhereUniqueInput!): Station
  stationStatus(where: StationStatusWhereUniqueInput!): StationStatus
  stationsConnection(where: StationWhereInput, orderBy: StationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StationConnection!
  stationStatusesConnection(where: StationStatusWhereInput, orderBy: StationStatusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StationStatusConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Station implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  lat: Float!
  lng: Float!
  status(where: StationStatusWhereInput, orderBy: StationStatusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StationStatus!]
}

"""A connection to a list of items."""
type StationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StationEdge]!
  aggregate: AggregateStation!
}

input StationCreateInput {
  name: String!
  lat: Float!
  lng: Float!
  status: StationStatusCreateManyWithoutStationInput
}

input StationCreateOneWithoutStatusInput {
  create: StationCreateWithoutStatusInput
  connect: StationWhereUniqueInput
}

input StationCreateWithoutStatusInput {
  name: String!
  lat: Float!
  lng: Float!
}

"""An edge in a connection."""
type StationEdge {
  """The item at the end of the edge."""
  node: Station!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  lat_ASC
  lat_DESC
  lng_ASC
  lng_DESC
}

type StationPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  lat: Float!
  lng: Float!
}

type StationStatus implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  station(where: StationWhereInput): Station!
  operative: Boolean!
  total: Int!
  free: Int!
  bikes: Int!
}

"""A connection to a list of items."""
type StationStatusConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StationStatusEdge]!
  aggregate: AggregateStationStatus!
}

input StationStatusCreateInput {
  operative: Boolean!
  total: Int!
  free: Int!
  bikes: Int!
  station: StationCreateOneWithoutStatusInput!
}

input StationStatusCreateManyWithoutStationInput {
  create: [StationStatusCreateWithoutStationInput!]
  connect: [StationStatusWhereUniqueInput!]
}

input StationStatusCreateWithoutStationInput {
  operative: Boolean!
  total: Int!
  free: Int!
  bikes: Int!
}

"""An edge in a connection."""
type StationStatusEdge {
  """The item at the end of the edge."""
  node: StationStatus!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StationStatusOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  operative_ASC
  operative_DESC
  total_ASC
  total_DESC
  free_ASC
  free_DESC
  bikes_ASC
  bikes_DESC
}

type StationStatusPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  operative: Boolean!
  total: Int!
  free: Int!
  bikes: Int!
}

type StationStatusSubscriptionPayload {
  mutation: MutationType!
  node: StationStatus
  updatedFields: [String!]
  previousValues: StationStatusPreviousValues
}

input StationStatusSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StationStatusSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StationStatusSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StationStatusSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: StationStatusWhereInput
}

input StationStatusUpdateInput {
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
  station: StationUpdateOneWithoutStatusInput
}

input StationStatusUpdateManyWithoutStationInput {
  create: [StationStatusCreateWithoutStationInput!]
  connect: [StationStatusWhereUniqueInput!]
  disconnect: [StationStatusWhereUniqueInput!]
  delete: [StationStatusWhereUniqueInput!]
  update: [StationStatusUpdateWithWhereUniqueWithoutStationInput!]
  upsert: [StationStatusUpsertWithWhereUniqueWithoutStationInput!]
}

input StationStatusUpdateWithoutStationDataInput {
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
}

input StationStatusUpdateWithWhereUniqueWithoutStationInput {
  where: StationStatusWhereUniqueInput!
  data: StationStatusUpdateWithoutStationDataInput!
}

input StationStatusUpsertWithWhereUniqueWithoutStationInput {
  where: StationStatusWhereUniqueInput!
  update: StationStatusUpdateWithoutStationDataInput!
  create: StationStatusCreateWithoutStationInput!
}

input StationStatusWhereInput {
  """Logical AND on all given filters."""
  AND: [StationStatusWhereInput!]

  """Logical OR on all given filters."""
  OR: [StationStatusWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StationStatusWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  operative: Boolean

  """All values that are not equal to given value."""
  operative_not: Boolean
  total: Int

  """All values that are not equal to given value."""
  total_not: Int

  """All values that are contained in given list."""
  total_in: [Int!]

  """All values that are not contained in given list."""
  total_not_in: [Int!]

  """All values less than the given value."""
  total_lt: Int

  """All values less than or equal the given value."""
  total_lte: Int

  """All values greater than the given value."""
  total_gt: Int

  """All values greater than or equal the given value."""
  total_gte: Int
  free: Int

  """All values that are not equal to given value."""
  free_not: Int

  """All values that are contained in given list."""
  free_in: [Int!]

  """All values that are not contained in given list."""
  free_not_in: [Int!]

  """All values less than the given value."""
  free_lt: Int

  """All values less than or equal the given value."""
  free_lte: Int

  """All values greater than the given value."""
  free_gt: Int

  """All values greater than or equal the given value."""
  free_gte: Int
  bikes: Int

  """All values that are not equal to given value."""
  bikes_not: Int

  """All values that are contained in given list."""
  bikes_in: [Int!]

  """All values that are not contained in given list."""
  bikes_not_in: [Int!]

  """All values less than the given value."""
  bikes_lt: Int

  """All values less than or equal the given value."""
  bikes_lte: Int

  """All values greater than the given value."""
  bikes_gt: Int

  """All values greater than or equal the given value."""
  bikes_gte: Int
  station: StationWhereInput
}

input StationStatusWhereUniqueInput {
  id: ID
}

type StationSubscriptionPayload {
  mutation: MutationType!
  node: Station
  updatedFields: [String!]
  previousValues: StationPreviousValues
}

input StationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: StationWhereInput
}

input StationUpdateInput {
  name: String
  lat: Float
  lng: Float
  status: StationStatusUpdateManyWithoutStationInput
}

input StationUpdateOneWithoutStatusInput {
  create: StationCreateWithoutStatusInput
  connect: StationWhereUniqueInput
  delete: Boolean
  update: StationUpdateWithoutStatusDataInput
  upsert: StationUpsertWithoutStatusInput
}

input StationUpdateWithoutStatusDataInput {
  name: String
  lat: Float
  lng: Float
}

input StationUpsertWithoutStatusInput {
  update: StationUpdateWithoutStatusDataInput!
  create: StationCreateWithoutStatusInput!
}

input StationWhereInput {
  """Logical AND on all given filters."""
  AND: [StationWhereInput!]

  """Logical OR on all given filters."""
  OR: [StationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  lat: Float

  """All values that are not equal to given value."""
  lat_not: Float

  """All values that are contained in given list."""
  lat_in: [Float!]

  """All values that are not contained in given list."""
  lat_not_in: [Float!]

  """All values less than the given value."""
  lat_lt: Float

  """All values less than or equal the given value."""
  lat_lte: Float

  """All values greater than the given value."""
  lat_gt: Float

  """All values greater than or equal the given value."""
  lat_gte: Float
  lng: Float

  """All values that are not equal to given value."""
  lng_not: Float

  """All values that are contained in given list."""
  lng_in: [Float!]

  """All values that are not contained in given list."""
  lng_not_in: [Float!]

  """All values less than the given value."""
  lng_lt: Float

  """All values less than or equal the given value."""
  lng_lte: Float

  """All values greater than the given value."""
  lng_gt: Float

  """All values greater than or equal the given value."""
  lng_gte: Float
  status_every: StationStatusWhereInput
  status_some: StationStatusWhereInput
  status_none: StationStatusWhereInput
}

input StationWhereUniqueInput {
  id: ID
}

type Subscription {
  station(where: StationSubscriptionWhereInput): StationSubscriptionPayload
  stationStatus(where: StationStatusSubscriptionWhereInput): StationStatusSubscriptionPayload
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type StationOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'lat_ASC' |
  'lat_DESC' |
  'lng_ASC' |
  'lng_DESC'

export type StationStatusOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'operative_ASC' |
  'operative_DESC' |
  'total_ASC' |
  'total_DESC' |
  'free_ASC' |
  'free_DESC' |
  'bikes_ASC' |
  'bikes_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface StationStatusCreateManyWithoutStationInput {
  create?: StationStatusCreateWithoutStationInput[] | StationStatusCreateWithoutStationInput
  connect?: StationStatusWhereUniqueInput[] | StationStatusWhereUniqueInput
}

export interface StationWhereInput {
  AND?: StationWhereInput[] | StationWhereInput
  OR?: StationWhereInput[] | StationWhereInput
  NOT?: StationWhereInput[] | StationWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  lat?: Float
  lat_not?: Float
  lat_in?: Float[] | Float
  lat_not_in?: Float[] | Float
  lat_lt?: Float
  lat_lte?: Float
  lat_gt?: Float
  lat_gte?: Float
  lng?: Float
  lng_not?: Float
  lng_in?: Float[] | Float
  lng_not_in?: Float[] | Float
  lng_lt?: Float
  lng_lte?: Float
  lng_gt?: Float
  lng_gte?: Float
  status_every?: StationStatusWhereInput
  status_some?: StationStatusWhereInput
  status_none?: StationStatusWhereInput
}

export interface StationStatusCreateInput {
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
  station: StationCreateOneWithoutStatusInput
}

export interface StationStatusWhereInput {
  AND?: StationStatusWhereInput[] | StationStatusWhereInput
  OR?: StationStatusWhereInput[] | StationStatusWhereInput
  NOT?: StationStatusWhereInput[] | StationStatusWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  operative?: Boolean
  operative_not?: Boolean
  total?: Int
  total_not?: Int
  total_in?: Int[] | Int
  total_not_in?: Int[] | Int
  total_lt?: Int
  total_lte?: Int
  total_gt?: Int
  total_gte?: Int
  free?: Int
  free_not?: Int
  free_in?: Int[] | Int
  free_not_in?: Int[] | Int
  free_lt?: Int
  free_lte?: Int
  free_gt?: Int
  free_gte?: Int
  bikes?: Int
  bikes_not?: Int
  bikes_in?: Int[] | Int
  bikes_not_in?: Int[] | Int
  bikes_lt?: Int
  bikes_lte?: Int
  bikes_gt?: Int
  bikes_gte?: Int
  station?: StationWhereInput
}

export interface StationStatusUpdateInput {
  operative?: Boolean
  total?: Int
  free?: Int
  bikes?: Int
  station?: StationUpdateOneWithoutStatusInput
}

export interface StationCreateWithoutStatusInput {
  name: String
  lat: Float
  lng: Float
}

export interface StationStatusUpsertWithWhereUniqueWithoutStationInput {
  where: StationStatusWhereUniqueInput
  update: StationStatusUpdateWithoutStationDataInput
  create: StationStatusCreateWithoutStationInput
}

export interface StationCreateOneWithoutStatusInput {
  create?: StationCreateWithoutStatusInput
  connect?: StationWhereUniqueInput
}

export interface StationStatusUpdateWithoutStationDataInput {
  operative?: Boolean
  total?: Int
  free?: Int
  bikes?: Int
}

export interface StationUpsertWithoutStatusInput {
  update: StationUpdateWithoutStatusDataInput
  create: StationCreateWithoutStatusInput
}

export interface StationStatusUpdateWithWhereUniqueWithoutStationInput {
  where: StationStatusWhereUniqueInput
  data: StationStatusUpdateWithoutStationDataInput
}

export interface StationStatusWhereUniqueInput {
  id?: ID_Input
}

export interface StationStatusCreateWithoutStationInput {
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
}

export interface StationUpdateInput {
  name?: String
  lat?: Float
  lng?: Float
  status?: StationStatusUpdateManyWithoutStationInput
}

export interface StationCreateInput {
  name: String
  lat: Float
  lng: Float
  status?: StationStatusCreateManyWithoutStationInput
}

export interface StationStatusUpdateManyWithoutStationInput {
  create?: StationStatusCreateWithoutStationInput[] | StationStatusCreateWithoutStationInput
  connect?: StationStatusWhereUniqueInput[] | StationStatusWhereUniqueInput
  disconnect?: StationStatusWhereUniqueInput[] | StationStatusWhereUniqueInput
  delete?: StationStatusWhereUniqueInput[] | StationStatusWhereUniqueInput
  update?: StationStatusUpdateWithWhereUniqueWithoutStationInput[] | StationStatusUpdateWithWhereUniqueWithoutStationInput
  upsert?: StationStatusUpsertWithWhereUniqueWithoutStationInput[] | StationStatusUpsertWithWhereUniqueWithoutStationInput
}

export interface StationUpdateWithoutStatusDataInput {
  name?: String
  lat?: Float
  lng?: Float
}

export interface StationWhereUniqueInput {
  id?: ID_Input
}

export interface StationSubscriptionWhereInput {
  AND?: StationSubscriptionWhereInput[] | StationSubscriptionWhereInput
  OR?: StationSubscriptionWhereInput[] | StationSubscriptionWhereInput
  NOT?: StationSubscriptionWhereInput[] | StationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: StationWhereInput
}

export interface StationStatusSubscriptionWhereInput {
  AND?: StationStatusSubscriptionWhereInput[] | StationStatusSubscriptionWhereInput
  OR?: StationStatusSubscriptionWhereInput[] | StationStatusSubscriptionWhereInput
  NOT?: StationStatusSubscriptionWhereInput[] | StationStatusSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: StationStatusWhereInput
}

export interface StationUpdateOneWithoutStatusInput {
  create?: StationCreateWithoutStatusInput
  connect?: StationWhereUniqueInput
  delete?: Boolean
  update?: StationUpdateWithoutStatusDataInput
  upsert?: StationUpsertWithoutStatusInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface StationStatusPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
}

/*
 * An edge in a connection.

 */
export interface StationEdge {
  node: Station
  cursor: String
}

export interface StationSubscriptionPayload {
  mutation: MutationType
  node?: Station
  updatedFields?: String[]
  previousValues?: StationPreviousValues
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface StationStatus extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  station: Station
  operative: Boolean
  total: Int
  free: Int
  bikes: Int
}

export interface AggregateStationStatus {
  count: Int
}

export interface StationPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  lat: Float
  lng: Float
}

export interface BatchPayload {
  count: Long
}

export interface Station extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  lat: Float
  lng: Float
  status?: StationStatus[]
}

/*
 * A connection to a list of items.

 */
export interface StationConnection {
  pageInfo: PageInfo
  edges: StationEdge[]
  aggregate: AggregateStation
}

/*
 * An edge in a connection.

 */
export interface StationStatusEdge {
  node: StationStatus
  cursor: String
}

export interface StationStatusSubscriptionPayload {
  mutation: MutationType
  node?: StationStatus
  updatedFields?: String[]
  previousValues?: StationStatusPreviousValues
}

export interface AggregateStation {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface StationStatusConnection {
  pageInfo: PageInfo
  edges: StationStatusEdge[]
  aggregate: AggregateStationStatus
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export type DateTime = Date | string