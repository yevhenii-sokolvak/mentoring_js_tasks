const UA_MONTHS          = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const UA_MONTHS_GENITIVE = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];

class Entry {
    constructor(amount, category, date, type) {
        this.id = crypto.randomUUID();
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.type = type;
    }

    updateAmount(newAmount) {
        const num = Number(newAmount);
        if (!num || num <= 0) throw new Error('Сума повинна бути додатним числом.');
        this.amount = num;
        return this;
    }

    updateCategory(newCategory) {
        const category = String(newCategory || '').trim();
        if (!category) throw new Error('Категорія не може бути порожньою.');
        this.category = category;
        return this;
    }

    updateDate(newDate) {
        const date = new Date(newDate);
        if (isNaN(date)) throw new Error('Некоректна дата.');
        this.date = date;
        return this;
    }

    updateType(newType) {
        const type = String(newType || '').trim().toLowerCase();
        if (!['дохід', 'витрата'].includes(type)) throw new Error('Тип: "дохід" або "витрата".');
        this.type = type;
        return this;
    }
}

const FinanceManager = {
    transactions: [],

    get balance() {
        return this.transactions.reduce(
            (sum, t) => t.type === 'дохід' ? sum + t.amount : sum - t.amount, 0
        );
    },

    addTransaction(amount, category, date, type) {
        const entry = new Entry(amount, category, date, type);
        this.transactions.push(entry);
    },

    updateTransaction(id, { amount, category, date, type }) {
        const entry = this.transactions.find(t => t.id === id);
        if (!entry) throw new Error(`Транзакцію з id=${id} не знайдено.`);

        entry
            .updateAmount(amount)
            .updateCategory(category)
            .updateDate(date)
            .updateType(type);

        return entry;
    },

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
    },

    render() {
        this.renderTransactions();
        this.renderBalance();
    },

    renderBalance() {
        const el = document.querySelector('#balance');
        el.textContent  = this.balance.toFixed(2) + ' ₴';
        el.classList.remove('balance--positive', 'balance--negative');
        el.classList.add(this.balance >= 0 ? 'balance--positive' : 'balance--negative');
    },

    renderTransactions() {
        const list = document.querySelector('#records');
        list.textContent = '';

        if (this.transactions.length === 0) {
            const empty = document.createElement('li');
            empty.classList.add('finance-records__empty');
            empty.textContent = 'Немає записів';
            list.append(empty);
            return;
        }

        this.transactions.forEach(t => list.append(this.createTransactionElement(t)));
    },

    createTransactionElement(transaction) {
        const li = document.createElement('li');
        li.classList.add('finance-records__item', `finance-records__item--${transaction.type}`);
        li.dataset.id = transaction.id;

        const date          = new Date(transaction.date);
        const formattedDate = `${date.getDate()} ${UA_MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;

        const spanDate = document.createElement('span');
        spanDate.classList.add('finance-records__date');
        spanDate.textContent = formattedDate;

        const spanCat = document.createElement('span');
        spanCat.classList.add('finance-records__category');
        spanCat.textContent = transaction.category;

        const spanType = document.createElement('span');
        spanType.classList.add('finance-records__type', `finance-records__type--${transaction.type}`);
        spanType.textContent = transaction.type;

        const spanAmt = document.createElement('span');
        spanAmt.classList.add('finance-records__amount', `finance-records__amount--${transaction.type}`);
        spanAmt.textContent = `${transaction.type === 'дохід' ? '+' : '−'}${transaction.amount.toFixed(2)} ₴`;

        const actions = document.createElement('div');
        actions.classList.add('finance-records__actions');

        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btn-icon', 'btn-icon--edit');
        btnEdit.title     = 'Редагувати';
        btnEdit.textContent = '✏️';
        btnEdit.addEventListener('click', () => {
            const current = this.transactions.find(t => t.id === transaction.id);
            this.openEditMode(li, current);
        });

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn-icon', 'btn-icon--delete');
        btnDelete.title     = 'Видалити';
        btnDelete.textContent = '🗑️';
        btnDelete.addEventListener('click', () => {
            if (!confirm('Видалити транзакцію?')) return;
            this.deleteTransaction(transaction.id);
            this.render();
            this.populateReportSelects();
        });

        actions.append(btnEdit, btnDelete);
        li.append(spanDate, spanCat, spanType, spanAmt, actions);

        return li;
    },

    openEditMode(li, transaction) {
        document.querySelector('.finance-records__item--editing')
            ?.classList.remove('finance-records__item--editing');
        document.querySelector('.edit-form')?.remove();

        li.classList.add('finance-records__item--editing');

        const date    = new Date(transaction.date);
        const isoDate = date.toISOString().split('T')[0];

        const form = document.createElement('div');
        form.classList.add('edit-form');

        const inputAmount = document.createElement('input');
        inputAmount.type  = 'number';
        inputAmount.value = transaction.amount;
        inputAmount.min   = '0.01';
        inputAmount.step  = '0.01';
        inputAmount.classList.add('edit-form__input');
        inputAmount.placeholder = 'Сума';

        const inputCategory = document.createElement('input');
        inputCategory.type        = 'text';
        inputCategory.value       = transaction.category;
        inputCategory.classList.add('edit-form__input');
        inputCategory.placeholder = 'Категорія';

        const inputDate = document.createElement('input');
        inputDate.type  = 'date';
        inputDate.value = isoDate;
        inputDate.classList.add('edit-form__input');

        const selectType = document.createElement('select');
        selectType.classList.add('edit-form__input');
        ['дохід', 'витрата'].forEach(val => {
            const opt   = document.createElement('option');
            opt.value   = val;
            opt.textContent = val.charAt(0).toUpperCase() + val.slice(1);
            if (val === transaction.type) opt.selected = true;
            selectType.append(opt);
        });

        const btnSave = document.createElement('button');
        btnSave.classList.add('btn', 'btn--primary', 'btn--sm');
        btnSave.textContent = 'Зберегти';

        const btnCancel = document.createElement('button');
        btnCancel.classList.add('btn', 'btn--ghost', 'btn--sm');
        btnCancel.textContent = 'Скасувати';

        const errorMsg = document.createElement('p');
        errorMsg.classList.add('edit-form__error');

        btnSave.addEventListener('click', () => {
            try {
                this.updateTransaction(transaction.id, {
                    amount:   inputAmount.value,
                    category: inputCategory.value,
                    date:     inputDate.value,
                    type:     selectType.value,
                });

                this.render();
                this.populateReportSelects();
            } catch (err) {
                errorMsg.textContent = err.message;
            }
        });

        btnCancel.addEventListener('click', () => {
            li.classList.remove('finance-records__item--editing');
            form.remove();
        });

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('edit-form__buttons');
        btnGroup.append(btnSave, btnCancel);

        form.append(inputAmount, inputCategory, inputDate, selectType, btnGroup, errorMsg);

        li.after(form);
    },

    getAvailableMonths() {
        const months = new Set();
        this.transactions.forEach(t => {
            const d = new Date(t.date);
            months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
        });
        return [...months].sort().reverse();
    },

    getAvailableCategories() {
        return [...new Set(this.transactions.map(t => t.category))].sort();
    },

    generateMonthReport(yearMonth) {
        const [year, month] = yearMonth.split('-').map(Number);
        const filtered = this.transactions.filter(t => {
            const d = new Date(t.date);
            return d.getFullYear() === year && d.getMonth() + 1 === month;
        });
        return this._buildReport(filtered, `${UA_MONTHS[month - 1]} ${year}`);
    },

    generateCategoryReport(category) {
        const filtered = this.transactions.filter(t => t.category === category);
        return this._buildReport(filtered, `Категорія: ${category}`);
    },

    _buildReport(transactions, title) {
        const totalIncome  = transactions.filter(t => t.type === 'дохід').reduce((s, t) => s + t.amount, 0),
              totalExpense = transactions.filter(t => t.type === 'витрата').reduce((s, t) => s + t.amount, 0),
              balance      = totalIncome - totalExpense,
              byCategory = {};

        transactions.forEach(t => {
            if (!byCategory[t.category]) byCategory[t.category] = { дохід: 0, витрата: 0 };
            byCategory[t.category][t.type] += t.amount;
        });

        return { title, transactions, totalIncome, totalExpense, balance, byCategory };
    },

    renderReport(report) {
        const container = document.querySelector('#report-container');
        container.textContent = '';

        if (!report || report.transactions.length === 0) {
            const empty = document.createElement('p');
            empty.classList.add('report-empty');
            empty.textContent = 'Немає даних для звіту.';
            container.append(empty);
            return;
        }

        const reportDiv = document.createElement('div');
        reportDiv.classList.add('report');

        const title = document.createElement('h3');
        title.classList.add('report__title');
        title.textContent = report.title;
        reportDiv.append(title);

        const summary = document.createElement('div');
        summary.classList.add('report__summary');

        const cardsData = [
            { mod: 'income',  label: 'Доходи',   value: `+${report.totalIncome.toFixed(2)} ₴` },
            { mod: 'expense', label: 'Витрати',   value: `−${report.totalExpense.toFixed(2)} ₴` },
            { mod: 'balance', label: 'Результат', value: `${report.balance >= 0 ? '+' : '−'}${Math.abs(report.balance).toFixed(2)} ₴`, extra: report.balance >= 0 ? 'positive' : 'negative' },
        ];

        cardsData.forEach(({ mod, label, value, extra }) => {
            const card = document.createElement('div');
            card.classList.add('report__card', `report__card--${mod}`);
            if (extra) card.classList.add(extra);

            const cardLabel = document.createElement('span');
            cardLabel.classList.add('report__card-label');
            cardLabel.textContent = label;

            const cardValue = document.createElement('span');
            cardValue.classList.add('report__card-value');
            cardValue.textContent = value;

            card.append(cardLabel, cardValue);
            summary.append(card);
        });

        reportDiv.append(summary);

        const table = document.createElement('table');
        table.classList.add('report__table');

        const thead     = document.createElement('thead'),
              headerRow = document.createElement('tr');
        ['Категорія', 'Доходи', 'Витрати'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.append(th);
        });
        thead.append(headerRow);

        const tbody = document.createElement('tbody');
        Object.entries(report.byCategory).forEach(([cat, vals]) => {
            const tr = document.createElement('tr'),
                  tdCat = document.createElement('td');

            tdCat.textContent = cat;

            const tdIncome = document.createElement('td');
            tdIncome.classList.add('amount-positive');
            tdIncome.textContent = vals['дохід'] ? `+${vals['дохід'].toFixed(2)} ₴` : '—';

            const tdExpense = document.createElement('td');
            tdExpense.classList.add('amount-negative');
            tdExpense.textContent = vals['витрата'] ? `−${vals['витрата'].toFixed(2)} ₴` : '—';

            tr.append(tdCat, tdIncome, tdExpense);
            tbody.append(tr);
        });

        table.append(thead, tbody);
        reportDiv.append(table);

        const count = document.createElement('p');
        count.classList.add('report__count');
        count.textContent = 'Всього записів: ';
        const strong = document.createElement('strong');
        strong.textContent = report.transactions.length;
        count.append(strong);

        reportDiv.append(count);
        container.append(reportDiv);
    },

    populateReportSelects() {
        const monthSelect    = document.querySelector('#report-month'),
            categorySelect = document.querySelector('#report-category');

        monthSelect.textContent = '';

        const defaultMonth = document.createElement('option');
        defaultMonth.value       = '';
        defaultMonth.textContent = '— оберіть місяць —';
        monthSelect.append(defaultMonth);

        this.getAvailableMonths().forEach(m => {
            const [year, month] = m.split('-').map(Number);
            const option = document.createElement('option');
            option.value       = m;
            option.textContent = `${UA_MONTHS[month - 1]} ${year}`;
            monthSelect.append(option);
        });

        categorySelect.textContent = '';

        const defaultCat = document.createElement('option');
        defaultCat.value       = '';
        defaultCat.textContent = '— оберіть категорію —';
        categorySelect.append(defaultCat);

        this.getAvailableCategories().forEach(cat => {
            const option = document.createElement('option');
            option.value       = cat;
            option.textContent = cat;
            categorySelect.append(option);
        });
    },
};

FinanceManager.addTransaction(15000, 'Зарплата',   new Date('2025-05-01'), 'дохід');
FinanceManager.addTransaction(3000,  'Фріланс',    new Date('2025-05-10'), 'дохід');
FinanceManager.addTransaction(800,   'Продукти',   new Date('2025-05-03'), 'витрата');
FinanceManager.addTransaction(1200,  'Комунальні', new Date('2025-05-05'), 'витрата');
FinanceManager.addTransaction(450,   'Транспорт',  new Date('2025-05-12'), 'витрата');
FinanceManager.addTransaction(1000,  'Розваги',    new Date('2025-05-20'), 'витрата');
FinanceManager.addTransaction(12000, 'Зарплата',   new Date('2025-06-01'), 'дохід');
FinanceManager.addTransaction(500,   'Продукти',   new Date('2025-06-04'), 'витрата');
FinanceManager.addTransaction(300,   'Здоров\'я',  new Date('2025-06-09'), 'витрата');
FinanceManager.render();

document.querySelector('.finance-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const amount   = parseFloat(document.querySelector('#amount').value),
          category = document.querySelector('#category').value,
          date     = new Date(document.querySelector('#date').value),
          type     = document.querySelector('#type').value;

    try {
        FinanceManager.addTransaction(amount, category, date, type);
        FinanceManager.render();
        event.target.reset();
        document.querySelector('#report-container').textContent = '';
        FinanceManager.populateReportSelects();
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
});

document.querySelector('#btn-month-report').addEventListener('click', () => {
    const val = document.querySelector('#report-month').value;
    if (!val) return;
    FinanceManager.renderReport(FinanceManager.generateMonthReport(val));
});

document.querySelector('#btn-category-report').addEventListener('click', () => {
    const val = document.querySelector('#report-category').value;
    if (!val) return;
    FinanceManager.renderReport(FinanceManager.generateCategoryReport(val));
});

FinanceManager.populateReportSelects();