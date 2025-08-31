(() => {
  // App state: array of objects
  let items = [
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Build a List App", done: false }
  ];

  // DOM references
  const list = document.querySelector("#item-list");
  const form = document.querySelector("#item-form");
  const input = document.querySelector("#item-input");
  const header = document.querySelector("#list-header");

  // Render the list from data
  function renderList() {
    list.innerHTML = "";
    const frag = document.createDocumentFragment();

    for (const item of items) {
      const li = document.createElement("li");
      li.dataset.id = item.id;
      if (item.done) li.classList.add("done");

      const text = document.createElement("span");
      text.className = "item-text";
      text.textContent = item.text;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "delete-btn";
      del.textContent = "Delete";

      li.append(text, del);
      frag.appendChild(li);
    }

    list.appendChild(frag);
    updateHeader();
  }

  // Update header counts (UI state stays in sync with data)
  function updateHeader() {
    const total = items.length;
    const completed = items.reduce((acc, it) => acc + (it.done ? 1 : 0), 0);
    header.textContent = `Total: ${total} | Completed: ${completed}`;
  }

  // Add new item
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    items.push({
      id: Date.now(),
      text,
      done: false
    });

    input.value = "";
    input.focus();
    renderList();
  });

  // Event delegation for delete & toggle
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || !list.contains(li)) return;

    const id = Number(li.dataset.id);

    // If delete button clicked -> delete
    if (e.target.closest(".delete-btn")) {
      items = items.filter((it) => it.id !== id);
      renderList();
      return;
    }

    // Otherwise, toggle done by clicking the item
    items = items.map((it) =>
      it.id === id ? { ...it, done: !it.done } : it
    );
    renderList();
  });

  // Initial render
  renderList();
})();