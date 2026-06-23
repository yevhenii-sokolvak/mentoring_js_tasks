
const CATEGORIES = {
  'дохід':   ['Зарплата', 'Фріланс', 'Подарунок', 'Інвестиції', 'Інше'],
  'витрата': ['Продукти', 'Транспорт', 'Житло', 'Комунальні', 'Розваги', 'Здоров’я', 'Освіта', 'Інше']
};

const UA_MONTHS = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];

class Entry {
    constructor(amount, category, date, type) {
        this.id = crypto.randomUUID();
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.type = type;
    }

    updateAmount(newAmount) {
        let num = Number(newAmount);
        
        if (!num || num <= 0) {
            throw new Error('Нова сума повинна бути додатним числом.');
        }
        
        this.amount = num;
        return this;
    }

    updateCategory(newCategory) {
        let category = String(newCategory || '').trim();
    
        this.category = category;
        return this;
    }

    updateDate(newDate) {
        let date = new Date(newDate);

        this.date = date;
        return this;
    }

    updateType(newType) {
        let type = String(newType || '').trim().toLowerCase();

        this.type = type;
        return this;
    }
}

const FinanceManager = {
    transactions: [],

    addTransactions(amount, category, date, type) {
        this.transactions.push(new Entry(amount, category, date, type));
    },

    createTransactionElement(transaction) {
        const li = document.createElement('li');
        li.classList.add('finance-records__item');

        Object.entries(transaction).forEach(([key, value]) => {
            if (key !== 'id') {
                if (key === 'date') {
                    const date = new Date(value);
                    const formattedDate = `${date.getDate()} ${UA_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
                    value = formattedDate;
                }

                const span = document.createElement('span');

                span.classList.add(`finance-records__${key}`);
                span.textContent = value;

                li.append(span);
            }
        });

        return li;
    },

    renderTransactions(transactions = this.transactions) {
        let listElement = document.querySelector('#records');
        listElement.textContent = "";

        transactions.forEach(transaction => {
            listElement.append(
                this.createTransactionElement(transaction)
            );
        });
    },
}

FinanceManager.addTransactions(1000, 'Зарплата', new Date('2024-01-15'), 'дохід');
FinanceManager.addTransactions(200, 'Продукти', new Date('2024-01-16'), 'витрата');
FinanceManager.renderTransactions();

const financeForm = document.querySelector('.finance-form');

financeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const amount = parseFloat(document.querySelector('#amount').value),
          category = document.querySelector('#category').value,
          date = new Date(document.querySelector('#date').value),
          type = document.querySelector('#type').value;

    try {
        FinanceManager.addTransactions(amount, category, date, type);
        FinanceManager.renderTransactions();
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
});