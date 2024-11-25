// Imports
import {Invoice} from './class/invoice.js'
import {Payment} from './class/payment.js'
import { Template } from './class/template.js';
import { formatter } from './interfaces/Format.js'

const form = document.querySelector('.new-item-form') as HTMLFormElement
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;
const ul = document.querySelector('ul')!;
const list = new Template(ul)
const toggleButton = document.getElementById('dark-mode-toggle')!;

let doc: formatter
let values: [string,string,number]
values = [toFrom.value,details.value,amount.valueAsNumber]

const containsNumber = (str: string): boolean => {
    return /\d/.test(str);
}

const toggleError = (element: HTMLInputElement, condition: boolean) => {
    if (condition) {
        element.classList.add('error');
    } else {
        element.classList.remove('error');
    }
};

const displayError = (input: HTMLInputElement, message: string) => {
    const errorContainer = input.nextElementSibling as HTMLElement;
    if (errorContainer && errorContainer.classList.contains('error-message')) {
        errorContainer.textContent = message;
    }
};

const clearError = (input: HTMLInputElement) => {
    const errorContainer = input.nextElementSibling as HTMLElement;
    if (errorContainer && errorContainer.classList.contains('error-message')) {
        errorContainer.textContent = '';
    }
};


form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const hasToFromError = !toFrom.value || containsNumber(toFrom.value);
    const hasDetailsError = !details.value || containsNumber(details.value);
    const hasAmountError = !amount.valueAsNumber;

    toggleError(toFrom, hasToFromError);
    toggleError(details, hasDetailsError);
    toggleError(amount, hasAmountError);

    if (hasToFromError) {
        displayError(toFrom, 'To/From must not be empty or contain numbers.');
    } else {
        clearError(toFrom);
    }

    if (hasDetailsError) {
        displayError(details, 'Details must not be empty or contain numbers.');
    } else {
        clearError(details);
    }

    if (hasAmountError) {
        displayError(amount, 'Amount must be a valid number.');
    } else {
        clearError(amount);
    }

    if (hasToFromError || hasDetailsError || hasAmountError) {
        return;
    }

    if (type.value === 'invoice') {
        doc = new Invoice(toFrom.value, details.value, amount.valueAsNumber);
    } else {
        doc = new Payment(toFrom.value, details.value, amount.valueAsNumber);
    }

    list.render(doc, type.value, 'start');
    clearError(toFrom);
    clearError(details);
    clearError(amount);
});
const toggleIcon = document.getElementById('toggle-icon')!;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        toggleIcon.textContent = '🌙';
        document.body.classList.add('dark-mode');
    }
});

toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    toggleIcon.textContent = isDarkMode ? '🌙' : '☀️';
});