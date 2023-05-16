export class employee {
    #firstName;
    #lastName;
    #mail;
    #nationalId;
    #address;
    #age;
    #isAdmin;
    constructor(_firstName, _lastName, _id, _mail, _address, _age) {
        this.#firstName = _firstName;
        this.#lastName = _lastName;
        this.#nationalId = _id;
        this.#mail = _mail;
        this.#address = _address;
        this.#age = _age;
        this.#isAdmin = false;
    }
}
