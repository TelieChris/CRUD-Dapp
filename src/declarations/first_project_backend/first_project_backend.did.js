export const idlFactory = ({ IDL }) => {
  const Person = IDL.Record({
    'id' : IDL.Nat,
    'age' : IDL.Nat,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'delete' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Text)], []),
    'greet' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Text], []),
    'list' : IDL.Func([], [IDL.Vec(Person)], ['query']),
    'read' : IDL.Func([IDL.Nat], [IDL.Opt(Person)], ['query']),
    'update' : IDL.Func([IDL.Nat, IDL.Text, IDL.Nat], [IDL.Opt(IDL.Text)], []),
  });
};
export const init = ({ IDL }) => { return []; };
