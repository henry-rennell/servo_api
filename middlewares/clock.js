const dayjs = require('dayjs');

function clock (){
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    res.locals.currentTime = currentTime;
    next();
}

const time =setInterval(clock(), 1000)

module.exports = time

/*
// clock
app.use((req, res, next) => {
    // set interval in here
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    res.locals.currentTime = currentTime;
    next();
});
*/
