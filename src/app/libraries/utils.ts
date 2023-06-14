function wait(ms: number) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}
function getRandomBetween(min = 20, max = 200) {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * (max - min) + min);
}
function hover3dApplier() {
    const els: HTMLElement[] | null = Array.from(document.querySelectorAll('.hover-3d'));
    els.forEach((el) => {
        if (el) {
            const height = el?.clientHeight;
            const width = el?.clientWidth;
            el.addEventListener('mousemove', (evt: any) => {
                el.style.transition = 'box-shadow .1s, transform .1s';
                if (evt.target.closest('.swiper') || evt.target.matches('.save-button')) {
                    el.style.transform = `
        perspective(none)
        scale(1)
        rotateX(0)
        rotateY(0)`
                } else {
                    const { layerX, layerY } = evt;
                    const yRotation = ((layerX - width / 2) / width) * 20
                    const xRotation = ((layerY - height / 2) / height) * 20;
                    const inlineStyle = `
          perspective(500px)
          scale(1.1)
          rotateX(${xRotation}deg)
          rotateY(${yRotation}deg)`;
                    el.style.transform = inlineStyle;
                }
            })
            el.addEventListener('mouseout', (evt) => {
                el.style.transition = 'transform 0.5s linear';
                el.style.transform = `
        perspective(none)
        scale(1)
        rotateX(0)
        rotateY(0)`
            })
        }
    })
}

export { wait, getRandomBetween, hover3dApplier }