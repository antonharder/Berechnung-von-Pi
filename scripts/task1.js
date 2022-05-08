self.onmessage = function (event) {
    let result = computePi();
    
    self.postMessage(result);
};

function computePi() {
    let sum = 0.0;
    const step = 1e-9;

    let counter = 0;

    for (let i = 0; i < 1_000_000_000; i++) {
        let x = (i + 0.5) * step;
        sum = sum + 4.0 / (1.0 + x * x);
        counter++;
        if (counter % 10_000_000 == 0) {
            self.postMessage(counter);
        }
    }
    return sum * step;
}