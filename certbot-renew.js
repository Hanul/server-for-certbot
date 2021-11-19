let exec = require('child_process').exec;
let run = () => {
    exec('certbot renew');
};
run();
setInterval(run, 86400000);
