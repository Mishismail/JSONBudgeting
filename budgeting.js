document.addEventListener('DOMContentLoaded', function() {
  // Create an array to store income and expenses objects
  const incomeItems = JSON.parse(sessionStorage.getItem('incomeItems')) || [];
  const expenseItems = JSON.parse(sessionStorage.getItem('expenseItems')) || [];

  // Display existing income and expenses
  displayIncome();
  displayExpenses();
  displayTotalDisposableIncome();

  // Handle adding income
  document.getElementById('addIncomeButton').addEventListener('click', function() {
    let name = prompt('Enter the income name:');
    let amount = parseFloat(prompt('Enter the income amount:'));
    let recurring = prompt('Is it recurring income?');

    const income = {
      name: name,
      amount: amount,
      recurring: recurring
    };

    incomeItems.push(income);
    sessionStorage.setItem('incomeItems', JSON.stringify(incomeItems));
    displayIncome();
    displayTotalDisposableIncome();
  });

  // Handle adding expenses
  document.getElementById('addExpenseButton').addEventListener('click', function() {
    let name = prompt('Enter the expense name:');
    let amount = parseFloat(prompt('Enter the expense amount:'));
    let recurring = prompt('Is it recurring expense?');

    const expense = {
      name: name,
      amount: amount,
      recurring: recurring
    };

    expenseItems.push(expense);
    sessionStorage.setItem('expenseItems', JSON.stringify(expenseItems));
    displayExpenses();
    displayTotalDisposableIncome();
  });

  // Display all income in the list
  function displayIncome() {
    const incomeList = document.getElementById('incomeList');
    incomeList.innerHTML = '';

    incomeItems.forEach(function(income, index) {
      const incomeItem = document.createElement('li');
      incomeItem.classList.add('book-item');

      const incomeInfo = `
        <h3>${income.name}</h3>
        <p><strong>Amount:</strong> $${income.amount}</p>
        <p><strong>Recurring:</strong> ${income.recurring ? 'Yes' : 'No'}</p>
        <button class="edit-button" data-type="income" data-index="${index}">Edit</button>
        <button class="remove-button" data-type="income" data-index="${index}">Remove</button>
      `;

      incomeItem.innerHTML = incomeInfo;
      incomeList.appendChild(incomeItem);
    });

    attachEventListeners();
  }

  // Display all expenses in the list
  function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenseItems.forEach(function(expense, index) {
      const expenseItem = document.createElement('li');
      expenseItem.classList.add('book-item');

      const expenseInfo = `
        <h3>${expense.name}</h3>
        <p><strong>Amount:</strong> $${expense.amount}</p>
        <p><strong>Recurring:</strong> ${expense.recurring ? 'Yes' : 'No'}</p>
        <button class="edit-button" data-type="expense" data-index="${index}">Edit</button>
        <button class="remove-button" data-type="expense" data-index="${index}">Remove</button>
      `;

      expenseItem.innerHTML = expenseInfo;
      expenseList.appendChild(expenseItem);
    });

    attachEventListeners();
  }

  // Attach event listeners to edit and remove buttons
  function attachEventListeners() {
    const editButtons = document.getElementsByClassName('edit-button');
    const removeButtons = document.getElementsByClassName('remove-button');

    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', editItem);
      removeButtons[i].addEventListener('click', removeItem);
    }
  }

  // Handle item edit
  function editItem() {
    const itemType = this.getAttribute('data-type');
    const index = this.getAttribute('data-index');
    const items = itemType === 'income' ? incomeItems : expenseItems;
    const item = items[index];

    const name = prompt('Enter the name:');
    const amount = parseFloat(prompt('Enter the amount:'));
    const recurring = confirm('Is it recurring?');

    item.name = name;
    item.amount = amount;
    item.recurring = recurring;

    sessionStorage.setItem(itemType === 'income' ? 'incomeItems' : 'expenseItems', JSON.stringify(items));
    displayIncome();
    displayExpenses();
    displayTotalDisposableIncome();
  }

  // Handle item removal
  function removeItem() {
    const itemType = this.getAttribute('data-type');
    const index = this.getAttribute('data-index');
    const items = itemType === 'income' ? incomeItems : expenseItems;

    items.splice(index, 1);
    sessionStorage.setItem(itemType === 'income' ? 'incomeItems' : 'expenseItems', JSON.stringify(items));
    displayIncome();
    displayExpenses();
    displayTotalDisposableIncome();
  }

  // Display the total amount of disposable income
  function displayTotalDisposableIncome() {
    let totalIncome = incomeItems.reduce((sum, income) => sum + income.amount, 0);
    let totalExpenses = expenseItems.reduce((sum, expense) => sum + expense.amount, 0);
    let totalDisposableIncome = totalIncome - totalExpenses;

    // Ask user for savings
    let savings = parseFloat(prompt('Enter the amount you want to put into savings:'));
    totalDisposableIncome -= savings;

    // Update the display
    document.getElementById('totalAmount').textContent = totalDisposableIncome.toFixed(2);
  }
});
  