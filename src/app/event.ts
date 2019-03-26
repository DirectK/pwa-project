export class Event {

    constructor(
        public name: string,
        public id : number,
    ) {}
    //date, keywords, and location
    constructor() {
        this.name = "";
    }
}