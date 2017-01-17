"use strict";

function primeFactorization(n) {
    var primes = [];
    const upperLimit = Math.ceil(Math.sqrt(n))

    for (let i = 2; i <= upperLimit; i++) {
        while (n % i == 0) {
            primes.push(i);
            n /= i;
        }
    }
    if (n > 1) {
        primes.push(n);
    }
    return primes;
}

module.exports = (pluginContext) => {
    const toast = pluginContext.toast;
    const clipboard = pluginContext.clipboard;

    function search(query, res) {
        var number = parseInt(query, 10);
        var payload;
        var title;

        if (number <= 1 || isNaN(number)) {
            title = "Usage: /primefactorization number(> 1)";
            payload = null;
        } else {
            var expr = `${number} = ${primeFactorization(number).join(" * ")}`;
            title = expr;
            payload = expr;
        }

        res.add({
            id: number,
            payload: payload,
            title: title,
            desc: "Factorize a number into prime factors"
        })
    }

    function execute(id, payload) {
        if (payload != null) {
            clipboard.writeText(payload);
            toast.enqueue(`${payload} has copied into clipboard`);
        }
    }

    return { search, execute };
};
