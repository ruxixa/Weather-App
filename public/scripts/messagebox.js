export const messagebox = document.getElementById('messagebox');
export const messageboxClose = document.getElementById('messagebox-close');

messageboxClose.addEventListener('click', closeMessagebox);
messagebox.draggable = true;

export function closeMessagebox() {
  messagebox.style.display = 'none';
}

export function showMessagebox(header, message) {
  const oldElements = messagebox.querySelectorAll('.message-content');
  oldElements.forEach(element => element.remove());

  const messageElement = document.createElement('p');
  const headerElement = document.createElement('h2');
  headerElement.innerHTML = header;
  messageElement.innerHTML = message;

  headerElement.classList.add('message-content');
  messageElement.classList.add('message-content');

  messagebox.appendChild(headerElement);
  messagebox.appendChild(messageElement);

  messagebox.style.display = 'block';
}
