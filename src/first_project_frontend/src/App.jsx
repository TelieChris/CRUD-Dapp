import { useState, useEffect } from 'react';
import { first_project_backend } from 'declarations/first_project_backend';
import './App.css'; // Import CSS file for styling

function App() {
  const [greeting, setGreeting] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');
  const [personId, setPersonId] = useState('');
  const [people, setPeople] = useState([]);

  useEffect(() => {
    loadPeople();
  }, []);

  function loadPeople() {
    first_project_backend.list().then((people) => {
      setPeople(people);
    }).catch(error => {
      console.error('Error fetching people:', error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const age = parseInt(event.target.elements.age.value, 10);

    first_project_backend.greet(name, age).then((greeting) => {
      setGreeting(greeting);
      loadPeople();
    }).catch(error => {
      console.error('Error adding person:', error);
      setGreeting('Error adding person');
    });
  }

  function handleUpdate(event) {
    event.preventDefault();
    const id = parseInt(personId, 10);
    const name = updatedName;
    const age = parseInt(updatedAge, 10);

    first_project_backend.update(id, name, age).then((response) => {
      if (response !== null) {
        setGreeting(response);
        loadPeople();
      } else {
        setGreeting('Person not found');
      }
    }).catch(error => {
      console.error('Error updating person:', error);
      setGreeting('Error updating person');
    });
  }

  function handleDelete(id) {
    first_project_backend.delete(id).then((response) => {
      if (response !== null) {
        setGreeting(response);
        loadPeople();
      } else {
        setGreeting('Person not found');
      }
    }).catch(error => {
      console.error('Error deleting person:', error);
      setGreeting('Error deleting person');
    });
  }

  return (
    <main className="container">
      <center><h3>CRUD Application</h3></center>
      <h4>Registration Form</h4>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Enter your name:</label>
        <input id="name" type="text" required />
        <label htmlFor="age">Enter your age:</label>
        <input id="age" type="number" required />
        <button type="submit">Add</button>
      </form>
      <section className="greeting">{greeting}</section>
      <div className="list">
        <h4>People List:</h4>
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              {String(person.id)}: {person.name}, {String(person.age)} years old
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <h4>Update Form</h4>
      <form onSubmit={handleUpdate} className="form">
        <label htmlFor="personId">Enter ID to update:</label>
        <input id="personId" type="number" value={personId} onChange={(e) => setPersonId(e.target.value)} required />
        <label htmlFor="updatedName">Update your name:</label>
        <input id="updatedName" type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} required />
        <label htmlFor="updatedAge">Update your age:</label>
        <input id="updatedAge" type="number" value={updatedAge} onChange={(e) => setUpdatedAge(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </main>
  );
}

export default App;
