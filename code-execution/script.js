const exec = require('child_process').exec;

// function executeCommand(command) {
//     return exec(command, function (error, stdout, stderr) {
//
//         if (error) {
//             console.log('Error: ' + error);
//             return error;
//         }
//         if (stderr) {
//             console.log('Stderr: ' + stderr);
//             return stderr;
//         }
//         if (stdout) {
//             console.log('Stdout: ' + stdout);
//             return stdout;
//         }
//     });
// }

function onSubmit() {
    const command = document.getElementById('command').value
    // make request to express server on port 3000
    const url = `http://localhost:3000/${command}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
                document.getElementById('result').innerHTML = data
            }
        )
}
