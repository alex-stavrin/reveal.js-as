import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class ThreeScene
{    
    constructor(canvasId, beginFunction, tickFunction)
    {
        this.canvasId = canvasId;
        this.canvas = null;
        this.scene = null;
        this.renderer = null;
        this.controls = null;
        this.clock = null;
        this.camera = null;
        this.animationFrameId = 0;
        this.beginFunction = beginFunction;
        this.tickFunction = tickFunction;

        Reveal.on("fragmentshown", (event) => {
            const currentFragment = event.fragment;
            if(currentFragment.id === this.canvasId || currentFragment.querySelector(`#${this.canvasId}`) !== null )
            {        
                this.init(canvasId);
            }
        });
        
        Reveal.on("fragmenthidden", (event) => {
            const currentFragment = event.fragment;
            if(currentFragment.id === this.canvasId || currentFragment.querySelector(`#${this.canvasId}`) !== null )
            {
                this.destroy();
            }
        });
            
            
        Reveal.on('slidechanged', (event) => {
            if(event.previousSlide.querySelector(`#${canvasId}`) !== null)
            {
                this.destroy();
            }

            // find the visible fragment
            event.currentSlide.querySelectorAll(`.visible`).forEach((element) => {
                if (element.id === canvasId || element.querySelector(`#${canvasId}`) !== null) {
                    this.init(canvasId);
                }
            });
        });
            
        window.addEventListener("load", () => {
            
            // find the visible fragment
            document.querySelectorAll(`.visible`).forEach((element) => {
                if (element.id === canvasId || element.querySelector(`#${canvasId}`) !== null) {
                    this.init(canvasId);
                }
            });
        });
    }

    init(canvasId)
    {
        console.log("Initing three js scene with tag: " + canvasId)
        this.canvas = document.getElementById(canvasId);
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(100, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000)
        this.camera.position.z = 5;
        this.camera.position.y = 2.5;
        this.camera.position.x = 3;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false; 
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20; 
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        const axesHelper = new THREE.AxesHelper(3);
        // show unreal engine axis colors
        axesHelper.setColors(new THREE.Color(255,0,0),new THREE.Color(0,0,255), new THREE.Color(0,255,0));
        this.scene.add(axesHelper);

        this.clock = new THREE.Clock();

        this.beginFunction(this);

        // start animating
        this.animate();
    }

    animate = () =>
    {

        this.animationFrameId = requestAnimationFrame(this.animate);
        this.controls.update();
        this.tickFunction(this);
        this.renderer.render(this.scene, this.camera);
    }

    destroy = () =>
    {
        //console.log("Destroying three js with id: " + this.canvasId);

        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.scene = null;
        this.camera = null;
        this.renderer = null;
    }
}