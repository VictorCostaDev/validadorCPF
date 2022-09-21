// cpfs -> 705.484.450-52

function CPF(numberOfCpf) {

    if (typeof numberOfCpf !== 'string' || numberOfCpf.length !== 14 ) throw TypeError('Envie um CPF válido');
    
    this.numberOfCpf = numberOfCpf;

    Object.defineProperty(this, 'numberOfCpf', {
        enumerable: false,
        writable: false,
        configurable: false,
    });

    this.isValid =  function() {
        // Tratando String
        let cpf = this.numberOfCpf
            .replace('.', '')
            .replace('.', '')
            .split('-');
        
        
        const originalCpfFormatted = cpf.join('');
        let cpfString = cpf[0];
        
        // fazer o primeiro
        const digitOne = this.getDigit(cpfString);
        cpfString = this.addDigit(cpfString, digitOne);

        // segundo digito
        const digitTwo = this.getDigit(cpfString);
        cpfString = this.addDigit(cpfString, digitTwo);

        return cpfString === originalCpfFormatted;
    };

    this.addDigit = function(cpfString, digit) {
        return cpfString += digit;
    }

    this.getDigit = function(cpfString) {
        const totalCpf = this.totalCpf(cpfString);
        const digit = this.digit(totalCpf);
        return digit;
    }
    
    this.totalCpf = function(cpfString) {
        let counter = cpfString.length === 9 ? 10 : 11;
        let total = 0;
        for (let numberCpf of cpfString) {
            numberCpf = Number(numberCpf);
            total += numberCpf * counter;
            --counter;
        }
        return total;
    }

    this.digit = function(totalOfCpf) {
        let digit = 11 - (totalOfCpf % 11);
        return digit > 9 ? 0 : digit;
    }

}

const cpf = new CPF('070.987.720-03');
console.log(cpf.isValid());
