const baseUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/YOUR-COHORT-NAME/events';
const state = [];

const app = document.getElementById('app');

const render = () => {
  app.innerHTML = '';

  const heading = document.createElement('h1');
  heading.textContent = 'Party Planner';

  const form = document.createElement('form');
  form.id = 'party-form';
  form.innerHTML = `
    <input type="text" name="name" placeholder="Party Name" required />
    <input type="date" name="date" required />
    <input type="time" name="time" required />
    <input type="text" name="location" placeholder="Location" required />
    <input type="text" name="description" placeholder="Description" required />
    <button type="submit">Add Party</button>
  `;

  const partyListTitle = document.createElement('h2');
  partyListTitle.textContent = 'Upcoming Parties';

  const partyContainer = document.createElement('div');
  partyContainer.id = 'parties';

  state.forEach(party => {
    const div = document.createElement('div');
    div.className = 'party';
    div.innerHTML = `
      <h3>${party.name}</h3>
      <p><strong>Date:</strong> ${party.date}</p>
      <p><strong>Time:</strong> ${party.time}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p><strong>Description:</strong> ${party.description}</p>
    `;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', async () => {
      await fetch(`${baseUrl}/${party.id}`, { method: 'DELETE' });
      fetchParties();
    });
    div.appendChild(delBtn);
    partyContainer.appendChild(div);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newParty = {
      name: form.name.value,
      date: form.date.value,
      time: form.time.value,
      location: form.location.value,
      description: form.description.value
    };
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newParty)
    });
    fetchParties();
    form.reset();
  });

  app.appendChild(heading);
  app.appendChild(form);
  app.appendChild(partyListTitle);
  app.appendChild(partyContainer);
};

const fetchParties = async () => {
  const res = await fetch(baseUrl);
  const data = await res.json();
  state.length = 0;
  state.push(...data.data);
  render();
};

fetchParties();