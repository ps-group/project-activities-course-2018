window.onload = () => {
    const rect1 = document.getElementsByClassName('rect1')[0];
    rect1.addEventListener('mousemove', () => {
        console.log('mouse move in listener');
    });

    rect1.onmousemove = () => {
        console.log('mouse move in onmousemove');
    };

    setTimeout(() => {
        rect1.onmousemove = ''
    }, 3000);
};