let score = 0;

document.getElementById('draggable').addEventListener('dragstart', dragStart);
document.getElementById('target1').addEventListener('dragover', allowDrop);
document.getElementById('target2').addEventListener('dragover', allowDrop);
document.getElementById('target3').addEventListener('dragover', allowDrop);
document.getElementById('target1').addEventListener('drop', drop);
document.getElementById('target2').addEventListener('drop', drop);
document.getElementById('target3').addEventListener('drop', drop);

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const targetId = ev.target.id;
    const draggable = document.getElementById(ev.dataTransfer.getData("text"));

    if (targetId === 'target1') {
        score += 10;
    } else if (targetId === 'target2') {
        score += 20;
    } else if (targetId === 'target3') {
        score += 30;
    }

    draggable.style.left = `${ev.clientX - draggable.offsetWidth / 2}px`;
    draggable.style.top = `${ev.clientY - draggable.offsetHeight / 2}px`;

    document.getElementById('score').innerText = score;
}
