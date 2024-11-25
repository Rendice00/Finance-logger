export class Payment {
    constructor(reciepient, details, amount) {
        this.reciepient = reciepient;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.reciepient} is owed ${this.amount} for ${this.details}`;
    }
}
