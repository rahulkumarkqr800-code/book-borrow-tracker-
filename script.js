const form = document.getElementById('bookForm');
    const tableBody = document.querySelector('#bookTable tbody');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    function saveBooks() {
      localStorage.setItem('books', JSON.stringify(books));
    }

    function renderBooks() {
      tableBody.innerHTML = '';
      const today = new Date().toISOString().split('T')[0];

      books.forEach((book, index) => {
        const row = document.createElement('tr');

        if (!book.returned && book.dueDate < today) {
          row.classList.add('overdue');
        }
        if (book.returned) {
          row.classList.add('returned');
        }

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.borrower}</td>
          <td>${book.borrowDate}</td>
          <td>${book.dueDate}</td>
          <td>${book.returned ? 'Returned' : 'Borrowed'}</td>
          <td class="actions">
            ${!book.returned ? `<button onclick="markReturned(${index})">Mark as Returned</button>` : ''}
            <button onclick="deleteBook(${index})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newBook = {
        title: form.title.value,
        author: form.author.value,
        borrower: form.borrower.value,
        borrowDate: form.borrowDate.value,
        dueDate: form.dueDate.value,
        returned: false
      };
      books.push(newBook);
      saveBooks();
      renderBooks();
      form.reset();
    });

    function markReturned(index) {
      books[index].returned = true;
      saveBooks();
      renderBooks();
    }

    function deleteBook(index) {
      books.splice(index, 1);
      saveBooks();
      renderBooks();
    }

    // Initial render
    renderBooks();