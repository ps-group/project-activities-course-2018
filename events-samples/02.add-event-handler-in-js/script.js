window.onload = () => {
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
        alert('Клик');
    });

    const rect1 = document.getElementsByClassName('rect1')[0];
    rect1.addEventListener('mouseover', () => {
        console.log('mouse over');
    });
    rect1.addEventListener('mouseout', () => {
        console.log('mouse out 1');
    });
    rect1.addEventListener('mouseout', () => {
        console.log('mouse out 2');
    });

    const rect2 = document.getElementsByClassName('rect2')[0];
    const listener = () => {
        console.log('mouse move');
    };
    rect2.addEventListener('mousemove', listener);
    setTimeout(() => {
        rect2.removeEventListener('mousemove', listener);
    }, 5000);
};