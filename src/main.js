import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import amplifyConfig from '../amplify/gen/outputs.json' assert { type: 'json' };

// Configure Amplify with generated config
Amplify.configure(amplifyConfig);

// Create a data client
const client = generateClient();

const messagesDiv = document.getElementById('messages');
const form = document.getElementById('chat-input');
const usernameInput = document.getElementById('username');
const contentInput = document.getElementById('content');

function renderMessages(messages) {
  messagesDiv.innerHTML = '';
  messages
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach(msg => {
      const el = document.createElement('div');
      el.innerHTML = `<strong>${msg.username}</strong>: ${msg.content} <span style="color:gray;font-size:0.8em">[${new Date(msg.createdAt).toLocaleTimeString()}]</span>`;
      messagesDiv.appendChild(el);
    });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function fetchMessages() {
  const { data } = await client.models.Message.list({
    limit: 50,
    sortBy: { field: 'createdAt', direction: 'desc' }
  });
  renderMessages(data.items.reverse());
}
fetchMessages();

const sub = client.models.Message.observeQuery().subscribe({
  next: ({ items }) => renderMessages(items),
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const content = contentInput.value.trim();
  if (!username || !content) return;
  await client.models.Message.create({ username, content, createdAt: new Date().toISOString() });
  contentInput.value = '';
});

window.addEventListener('beforeunload', () => {
  sub.unsubscribe();
});