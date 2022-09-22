// cpf criado por um gerador de cpfs -> 705.484.450-52

class CPF {
    #cpf;

    constructor(cpfSent) {
        this.#cpf = cpfSent.replace(/\D+/g, '');
    }

    #isSequence() {
        const sequence = this.#cpf[0].repeat(this.#cpf.length);
        return sequence === this.#cpf;
    }
    
    isValid() {
        if(typeof this.#cpf === 'undefined') return false;
        if(this.#cpf.length !== 11) return false;
        if(this.#isSequence()) return false;
    
        let cpfPartial = this.#cpf.slice(0, -2);
    
        // fazer o primeiro
        const digitOne = this.#getDigit(cpfPartial);
        cpfPartial = this.#addDigit(cpfPartial, digitOne);
    
        // segundo digito
        const digitTwo = this.#getDigit(cpfPartial);
        cpfPartial = this.#addDigit(cpfPartial, digitTwo);
    
        return cpfPartial === this.#cpf;
    }
    
    #addDigit(cpfString, digit) {
        return cpfString += digit;
    }
    
    #getDigit(cpfString) {
        const totalCpf = this.#totalCpf(cpfString);
        const digit = this.#digit(totalCpf);
        return digit;
    }
    
    #totalCpf(cpfString) {
        let counter = cpfString.length + 1;
        let cpfArray = Array.from(cpfString);
        
        const total = cpfArray.reduce((acum, value) => {
            acum += (Number(value) * counter);
            counter--;
            return acum;
        },0);
       return total;
    }
    
    #digit(totalOfCpf) {
        let digit = 11 - (totalOfCpf % 11);
        return digit > 9 ? 0 : digit;
    }
}

const cpf = new CPF('705.484.450-52'); 
console.log(cpf.isValid());
