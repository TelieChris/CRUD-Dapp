import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Person { 'id' : bigint, 'age' : bigint, 'name' : string }
export interface _SERVICE {
  'delete' : ActorMethod<[bigint], [] | [string]>,
  'greet' : ActorMethod<[string, bigint], string>,
  'list' : ActorMethod<[], Array<Person>>,
  'read' : ActorMethod<[bigint], [] | [Person]>,
  'update' : ActorMethod<[bigint, string, bigint], [] | [string]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
