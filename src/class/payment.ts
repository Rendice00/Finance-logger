import { formatter } from "../interfaces/Format"
export class Payment implements formatter{
    constructor(
        readonly reciepient: string,
        private details: string,
        public amount: number,
    ){}
    format(){
        return `${this.reciepient} is owed ${this.amount} for ${this.details}`
    }
}