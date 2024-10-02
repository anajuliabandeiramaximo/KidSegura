document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', allowDrop);
    zone.addEventListener('drop', drop);
});

document.getElementById('reset-button').addEventListener('click', resetGame);

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const draggableId = event.dataTransfer.getData("text");
    const dropZoneId = event.target.id;

    if (validateDrop(draggableId, dropZoneId)) {
        const draggableElement = document.getElementById(draggableId);
        const clone = draggableElement.cloneNode(true);
        clone.addEventListener('dragstart', dragStart);
        clone.id = `${draggableId}-${Math.random().toString(36).substring(2, 9)}`;
        event.target.appendChild(clone);
    } else {
        alert("Lugar incorreto para essa cor de semáforo. Tente novamente amiguinho!");
    }
}

function validateDrop(draggableId, dropZoneId) {
    const validDrops = {
        "green": ["head-zone", "left-shoulder-zone", "right-shoulder-zone", "left-arm-zone", "right-arm-zone"],
        "yellow": ["torso-zone", "left-thigh-zone", "right-thigh-zone"],
        "red": ["left-breast-zone", "right-breast-zone", "private-zone"]
    };

    const originalId = draggableId.split('-')[0];

    return validDrops[originalId].includes(dropZoneId);
}

function resetGame() {
    // Remove all semáforos das áreas de queda
    document.querySelectorAll('.drop-zone').forEach(zone => {
        while (zone.firstChild) {
            zone.removeChild(zone.firstChild);
        }
    });
}