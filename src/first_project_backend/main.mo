import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor {
    type Person = {
        id: Nat;
        name: Text;
        age: Nat;
    };

    var people: [Person] = [];
    var nextId: Nat = 1;

    public func greet(name: Text, age: Nat): async Text {
        Debug.print("Creating new person with name: " # name # " and age: " # Nat.toText(age));
        let newPerson: Person = { id = nextId; name = name; age = age };
        people := Array.append(people, [newPerson]);
        nextId := nextId + 1;
        return "Hello, " # name # "! You are " # Nat.toText(age) # " years old.";
    };

    public query func read(id: Nat): async ?Person {
        Array.find<Person>(people, func (person) { person.id == id });
    };

    public func update(id: Nat, name: Text, age: Nat): async ?Text {
        let updatedPerson: ?Person = Array.find<Person>(people, func (person) { person.id == id });
        switch (updatedPerson) {
            case (?person) {
                let newPerson: Person = { id = id; name = name; age = age };
                people := Array.filter<Person>(people, func (p) { p.id != id });
                people := Array.append(people, [newPerson]);
                return ?("Updated person with id " # Nat.toText(id) # " to name: " # name # " and age: " # Nat.toText(age));
            };
            case null {
                return null;
            };
        }
    };
    public func delete(id: Nat): async ?Text {
        let newPeople = Array.filter<Person>(people, func (person: Person) { person.id != id });
        if (newPeople != people) {
            people := newPeople;
            return ?("Deleted person with id " # Nat.toText(id));
        } else {
            return null;
        }
    };


    public query func list(): async [Person] {
        return people;
    };
}
