import { ThreeScene } from "../scripts/three"
import * as THREE from "three";

let cube;

const beginFunction = (threeScene) => {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    cube = new THREE.Mesh(geometry, material);
    threeScene.scene.add(cube);
}

const tickFunction = (threeScene) => {
    if(cube)
    {
        const deltaTime = threeScene.clock.getDelta();
        cube.rotateX(3 * deltaTime);
    }
}

new ThreeScene("exampleScene", beginFunction, tickFunction);
