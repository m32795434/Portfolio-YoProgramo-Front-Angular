function wait(ms: number) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}
function getRandomBetween(min = 20, max = 200) {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * (max - min) + min);
}

export { wait, getRandomBetween }