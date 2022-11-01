const exec = require('child_process').exec;

let lastCommandResult = '';

async function executeCommand(command) {
    const child = require('child_process').exec(command)

    await exec(command, function (error, stdout, stderr) {

        if (error) {
            console.error('Error: ' + error);
            lastCommandResult = error;
        }
        if (stderr) {
            console.error('Stderr: ' + stderr);
            lastCommandResult = stderr;
        }
        if (stdout) {
            console.log('Stdout: ' + stdout);
            lastCommandResult = stdout;
        }

    });
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/command/:command', (req, res) => {
    const command = req.params.command
    executeCommand(command).then(() => {
        console.log("Command Result", lastCommandResult)
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(lastCommandResult.replaceAll('\n', '<br>'));
        return res.end();
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})