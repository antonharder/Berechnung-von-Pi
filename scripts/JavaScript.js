let worker;
worker = new Worker("scripts/task1.js");

window.onload = function () {

    document.getElementById("cancel").setAttribute("disabled", true);


    // Berechnung starten
    document.getElementById("compute_pi").onclick = function (event) {

        worker = new Worker("scripts/task1.js");
        document.getElementById("result").value = "Pi wird berechnet ...";
        worker.postMessage("start");

        document.getElementById("cancel").removeAttribute("disabled");
        document.getElementById("compute_pi").setAttribute("disabled", true);

        worker.onmessage = function (event) {
            console.log(event.data);
            if (Number.isInteger(event.data)) {
                document.getElementById("progress_bar").value = event.data;
                document.getElementById("progress-label").innerHTML = (event.data * 100 / 1000000000) + ' %';                
            }
            else {
                document.getElementById("result").value = event.data;
                document.getElementById("cancel").setAttribute("disabled", true);
                document.getElementById("compute_pi").removeAttribute("disabled");
            }
        };
    }

    // Berechnung stoppen
    document.getElementById("cancel").onclick = function ()
    {
        document.getElementById("progress_bar").value = 0;
        document.getElementById("progress-label").innerHTML = 0 + ' %';
        document.getElementById("result").value = "Berechnung abgebrochen ...";
        worker.terminate();
        document.getElementById("compute_pi").removeAttribute("disabled");
        document.getElementById("cancel").setAttribute("disabled", true);
    }
}
