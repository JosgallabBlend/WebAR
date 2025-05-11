document.addEventListener('DOMContentLoaded', function () {

    const nftMarker = document.querySelector('a-nft');

    nftMarker.addEventListener('loaded', () => {
        document.querySelector('#status').setAttribute('value','a-nft cargado');
    });


    nftMarker.addEventListener('markerFound', () => {
        document.querySelector('#status').setAttribute('value', '¡Detectado!');
    });


    let controlsMostrados = false;

    document.addEventListener('touchstart', function (evt) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const sceneEl = document.querySelector('a-scene');

        const touch = evt.touches[0];
        const rect = sceneEl.canvas.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

        const camera = sceneEl.camera;
        raycaster.setFromCamera(mouse, camera);

        const objects = [];
        let markerNotVisible = false;
        sceneEl.object3D.traverse(function (obj) {
        if (obj.el && obj.el.tagName === 'A-MARKER' && obj.visible == false) {
            markerNotVisible = true;
        }
        if (obj.el && obj.visible) {
            objects.push(obj);
        }
    });

    if (markerNotVisible) return;

    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
        let intersected = intersects[0].object;
        while (intersected && !intersected.el) {
            intersected = intersected.parent;
        }

        if (intersected && intersected.el) {
            intersected.el.setAttribute('color', '#' + Math.floor(Math.random() * 16777215).toString(16));

            if (!controlsMostrados) {
            const audioDiv = document.getElementById('audioDiv');
            audioDiv.style.display = 'flex';
            audioDiv.style.alignItems = 'center';

            const audio = document.getElementById('audioClick');
            var srcRoute = "audio/"+audio.id.toString();
            console.log(srcRoute);
            audio.setAttribute("src", srcRoute );
            audio.currentTime = 0;
            audio.play();

            controlsMostrados = true;
            }
        }
    }
});

document.getElementById('cerrarBtn').addEventListener('click', function () {
    const audio = document.getElementById('audioClick');
    audio.pause();

    const audioDiv = document.getElementById('audioDiv');
    audioDiv.style.display = 'none';

    controlsMostrados = false;
});
});
  