
const CATEGORIES = {
  'дохід':   ['Зарплата', 'Фріланс', 'Подарунок', 'Інвестиції', 'Інше'],
  'витрата': ['Продукти', 'Транспорт', 'Житло', 'Комунальні', 'Розваги', 'Здоров’я', 'Освіта', 'Інше']
};

const UA_MONTHS = ['січень','лютий','березень','квітень','травень','червень','липень','серпень','вересень','жовтень','листопад','грудень'];

class Transaction {
    constructor(amount, category, date, type) {
        if (amount <= 0) {
            throw new Error('Сума має бути більшою за нуль');
        }

        if (!category) {
            throw new Error('Категорія не може бути порожньою');
        }

        if (!date) {
            throw new Error('Дата є обов’язковою.');
        }

        if (!type) {
            throw new Error('Тип транзакції не може бути порожнім');
        }

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
    
        if (!category) {
            throw new Error('Категорія не може бути порожньою.');
        }
        
        this.category = category;
        return this;
    }

    updateDate(newDate) {
        let date = new Date(newDate);

        if (!date.getTime()) {
            throw new Error('Невірний формат дати.');
        }

        this.date = date;
        return this;
    }

    updateType(newType) {
        let type = String(newType || '').trim().toLowerCase();

        if (!type) {
            throw new Error('Тип транзакції не може бути порожнім.');
        }

        this.type = type;
        return this;
    }
}

const FinanceManager {
    transactions: [],

    
}