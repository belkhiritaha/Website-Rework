import React from 'react';
import * as THREE from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const projects = {
    projects: [
        {
            name: "Fact Checker",
            description: "A python program that checks if a given statement is true or false. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, vitae lacinia nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, vitae lacinia nunc nisl eget nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, vitae lacinia nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, vitae lacinia nunc nisl eget nunc.",
            path: "http://localhost:8000/models/checkmark.obj",
            scale: 0.25,
            rotation: [0, 0, 0]
        },
        {
            name: "LoL Imposters",
            description: "A Discord bot that adds a fun twist to the popular game League of Legends.",
            path: "http://localhost:8000/models/among us.obj",
            scale: 0.015,
            rotation: [0, 0, 0]
        },
        {
            name: "SDL2 Raycasting",
            description: "A raycasting engine written in C using SDL2.",
            path: "http://localhost:8000/models/Arrow.obj",
            scale: 0.05,
            rotation: [1, 0, 0]
        },
        {
            name: "ZZ1 Project",
            description: "The final project for the ZZ1 year at ISIMA.",
            path: "http://localhost:8000/models/RacquetMario.obj",
            scale: 0.4,
            rotation: [0, 0, 1]
        },
        {
            name: "ZZ2 Project",
            description: "The final project for the ZZ2 year at ISIMA.",
            path: "http://localhost:8000/models/cloud.obj",
            scale: 0.007,
            rotation: [0, 0, 0]
        },
        {
            name: "Instagram Bot",
            description: "A bot that promotes Instagram e-commerce accounts.",
            path: "http://localhost:8000/models/like.obj",
            scale: 0.15,
            rotation: [3, 0, 0]
        },
        {
            name: "TikTok/Reddit Bot",
            description: "A bot that turns popular Reddit threads into TTS TikTok videos.",
            path: "http://localhost:8000/models/reddit.obj",
            scale: 0.1,
            rotation: [0, 0, 0]
        },
        {
            name: "Kamagoshark",
            description: "A 3D game made in JavaSript.",
            path: "http://localhost:8000/models/shark.obj",
            scale: 1,
            rotation: [0, 0, 0]
        }
    ]
}

function Menu(){

    let viewMore = false;
    
    let currentState = 0;
    let scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    renderer.setClearColor( 0x000000, 0 );
    
    // add wireframe plane
    const geometry = new THREE.PlaneGeometry( 400, 100, 100, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    const plane = new THREE.Mesh( geometry, material );
    // rotate
    plane.rotation.x = Math.PI / 2 - 0.1;
    plane.position.y = -5;
    scene.add( plane );


    const objects = [];

    const objLoader = new OBJLoader()

    
    for (let i = 0; i < projects.projects.length; i++) {
        let path = projects.projects[i].path;
        objLoader.load(
            path,
            (object) => {
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
                    }
                });
                let scale = projects.projects[i].scale;
                let rotation = projects.projects[i].rotation;
                object.scale.set(scale, scale, scale);
                object.position.set(i * 20 , 0, 0);
                object.rotation.set(rotation[0], rotation[1], rotation[2]);
                scene.add(object);
                objects.push(object);
                // add light
                const light = new THREE.PointLight( 0xffffff, 1, 100 );
                light.position.set(i * 20, 0, 0 );
                scene.add( light );
            }
        );
    }


    let initialPosition = [0, -1, 5];

    camera.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);
    // set camera to look at 0 0 0
    camera.lookAt(0, 0, 0);
    
    const renderScene = new RenderPass( scene, camera );
    
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.55;
    bloomPass.radius = 0;
    
    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    
    // select id canvas
    const canvas = document.getElementById('canvas');
    
    // add style to canvas
    
    document.body.style = 'background: #111;';
    document.body.style = "width: 100vw;";
    document.body.style = "height: 100vh;";
    

    // add left and right buttons
    const left = document.createElement('button');
    const right = document.createElement('button');
    left.id = 'left';
    right.id = 'right';
    left.innerHTML = '<';
    right.innerHTML = '>';
    left.style = 'position: absolute; top: 50%; left: 10%; transform: translate(-50%, -50%); background-color: transparent; color: white; font-size: 2rem; border: none; outline: none;';
    right.style = 'position: absolute; top: 50%; right: 10%; transform: translate(50%, -50%); background-color: transparent; color: white; font-size: 2rem; border: none; outline: none;';
    document.body.appendChild(left);
    document.body.appendChild(right);

    function slideRight(){
        // select by id
        let text = document.getElementById('text');
        text.style = 'color: 0x00ff00 !important; font-size: 2rem; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%); background-color: transparent; animation: fadeOut 2s ease-in-out;';
        
        let description = document.getElementById('description');
        description.style = 'color: 0x00ff00 !important; font-size: 1rem; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); background-color: transparent; animation: fadeOut 2s ease-in-out;';

        setTimeout(() => {
            text.innerHTML = projects.projects[currentState].name;
            description.innerHTML = projects.projects[currentState].description + "<span className='blink'>_</span>";
            text.style = 'color: 0x00ff00 !important; font-size: 2rem; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;';
            description.style = 'color: 0x00ff00 !important; font-size: 1rem; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;';
        }
        , 2000);

        // move camera
        let old = camera.position.x;
        let goal = 20 * currentState;
        // move camera slowly
        let interval = setInterval(() => {
            camera.position.x += 0.1;
            if (Math.abs(camera.position.x - goal) < 0.2) {
                clearInterval(interval);
            }
            if (camera.position.x > 20 * (projects.projects.length )) {
                camera.position.x = 0;
            }
        }, 10);
        console.log(camera.position.x);
    }

    function slideLeft(){
        // select by id
        let text = document.getElementById('text');
        text.style = 'color: 0x00ff00 !important; font-size: 2rem; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%); background-color: transparent; animation: fadeOut 2s ease-in-out;';

        let description = document.getElementById('description');
        description.style = 'color: 0x00ff00 !important; font-size: 1rem; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); background-color: transparent; animation: fadeOut 2s ease-in-out;';

        setTimeout(() => {
            text.innerHTML = projects.projects[currentState].name;
            description.innerHTML = projects.projects[currentState].description + "<span className='blink'>_</span>";
            text.style = 'color: 0x00ff00 !important; font-size: 2rem; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;';
            description.style = 'color: 0x00ff00 !important; font-size: 1rem; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;';
        }
        , 2000);

        let goal = 20 * currentState;
        console.log(goal);
        let interval = setInterval(() => {
            camera.position.x -= 0.1;
            if (Math.abs(camera.position.x - goal) < 0.2) {
                clearInterval(interval);
            }
            if (camera.position.x < 0) {
                camera.position.x = 20 * (projects.projects.length);
            }
        }, 10);
        console.log(camera.position.x);
    }

    // add onclick funtion to buttons
    left.onclick = (event) => {
        // event.preventDefault();
        currentState -= 1;
        if (currentState < 0){
            currentState = projects.projects.length - 1;
        }
        slideLeft();
        // console.log(state);
    }

    right.onclick = (event) => {
        // event.preventDefault();
        currentState += 1;
        if (currentState > projects.projects.length - 1){
            currentState = 0;
        }
        console.log(currentState);
        slideRight();
        // console.log(state);
    }


    function hideElements(){
        let text = document.getElementById('text');
        let title = document.getElementById('title');
        let description = document.getElementById('description');
        let terminal = document.getElementById('terminal');
        let left = document.getElementById('left');
        let right = document.getElementById('right');
        let tip = document.getElementById('tip');
        text.style = 'opacity: 0; transition: 1s;';
        description.style = 'opacity: 0; transition: 1s;';
        left.style = 'opacity: 0; transition: 1s;';
        right.style = 'opacity: 0; transition: 1s;';
        tip.style = 'opacity: 0; transition: 1s;';
        title.style = 'opacity: 0; transition: 1s;';

        terminal.style = 'width: 80vw; height: 80vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: 1s;';
    }


    function exploreContent(){
        let dist_goal = initialPosition[2] - 20;
        let angle_goal = Math.PI / 2;
        let interval = setInterval(() => {
            camera.position.z -= 0.1;
            // console.log(camera.rotation.y);
            // console.log(angle_goal);
            if (Math.abs(camera.rotation.x - angle_goal) < 0.2){
                // do nothing
            }
            else{
                camera.rotation.x += 0.01;
                if (camera.rotation.x > 2 * Math.PI) {
                    camera.rotation.x = 0;
                }
            }
            if (Math.abs(camera.position.z - dist_goal) < 0.2) {
                clearInterval(interval);
            }
        }
        , 10);
        hideElements();
    }

    function goBack(){
        let dist_goal = initialPosition[2];
        let angle_goal = 0;
        let interval = setInterval(() => {
            camera.position.z += 0.1;
            // console.log(camera.rotation.y);
            // console.log(angle_goal);
            if (Math.abs(camera.rotation.x - angle_goal) < 0.2){
                // do nothing
            }
            else{
                camera.rotation.x -= 0.01;
                if (camera.rotation.x < 0) {
                    camera.rotation.x = 2 * Math.PI;
                }
            }
            if (Math.abs(camera.position.z - dist_goal) < 0.2) {
                clearInterval(interval);
            }
        }
        , 10);
    }

    // Key listener
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName === 'ArrowRight') {
            currentState += 1;
            if (currentState > projects.projects.length - 1){
                currentState = 0;
            }
            console.log(currentState);
            slideRight();
        }
        if (keyName === 'ArrowLeft') {
            currentState -= 1;
            if (currentState < 0){
                currentState = projects.projects.length - 1;
            }
            slideLeft();
        }

        if (keyName === 'Enter') {
            console.log('enter');
            if (viewMore === false) {
                viewMore = true;
                exploreContent();
            }
            else {
                goBack();
                viewMore = false;
            }
        }
    });


    const animate = function () {
        requestAnimationFrame( animate );
        
        // rotate all objects
        for (let i = 0; i < objects.length; i++) {
            objects[i].rotation.y += 0.01;
        }

        composer.render();
        // renderer.render( scene, camera );
    };

    animate();


    return(
        <>
        <style>
            {`
                html {
                    background-color: black;
                }

                #root{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    margin-top: 0 !important;
                }

                body {
                    background-color: black;
                }
                

                html, body {
                    margin: 0;
                    height: 100%;
                    overflow: hidden;
                }

                body::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 99vw;
                    height: 100vh;
                    background: repeating-linear-gradient(#0000004b, #0000004b 1px, transparent 2px, transparent 5px);
                    z-index: 10;
                    pointer-events: none;
                }

                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                .terminal {
                    position: absolute;
                    top: 70%;
                    left: 30%;
                    width: 40vw;
                    height: 30vh;
                    background-color: rgba(50, 50, 50, 0.5);
                    color: white;
                    font-family: monospace;
                    font-size: 1rem;
                    z-index: 100;
                }

                .terminal-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    overflow-y: scroll;
                }

                .terminal-content::-webkit-scrollbar {
                    width: 0.5rem;
                    background-color: rgba(50, 50, 50, 0.5);
                }

                .terminal-content::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.5);
                }

                .terminal-content::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.8);
                }

                .terminal-content::-webkit-scrollbar-track {
                    background-color: rgba(50, 50, 50, 0.5);
                }

                .terminal-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 10%;
                    background-color: rgba(30, 30, 30, 1);
                    color: white;
                    font-family: monospace;
                    font-size: 1rem;
                    overflow: hidden;
                    z-index: 100;
                }

                .tip {
                    position: absolute;
                    top: 0;
                    left: 70%;
                    width: 20%;
                    height: 10%;
                    background-color: rgba(30, 30, 30, 0.5);
                    color: white;
                    font-family: monospace;
                    font-size: 1rem;
                    overflow: hidden;
                    z-index: 100;
                }
                
            `}
        </style>

        <h1 style={{ position: "absolute", top: "10%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "3rem" }} id="title">Projects<span className='blink'>_</span></h1>

        <div id='terminal' className='terminal'>
            <div className='terminal-top'>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>Terminal</div>
                <button style={{ position: "absolute", top: "50%", left: "90%", transform: "translate(-50%,-50%)", backgroundColor: "transparent", border: "none", outline: "none" }}>X</button> 
            </div>
            <div className='terminal-content'>
                <p style={{ color: "0x00ff00 !important", fontSize: "2rem", backgroundColor: "transparent", marginLeft: "35%", marginTop: "10%" }} id="text">{projects.projects[currentState].name}</p>
                <p style={{ color: "0x00ff00 !important", fontSize: "1rem", backgroundColor: "transparent", marginLeft: "3%" }} id="description">{projects.projects[currentState].description}<span className='blink'>_</span></p>            
            </div>
        </div>
        <div id="tip" className='tip'>
            <p style={{ color: "0x00ff00 !important", fontSize: "1rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "transparent" }}>Press Enter to learn more</p>
        </div>
        </>
    );
}


export default Menu;