import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			function GetUrls()
			{
				//Create environment map
				const path = 'https://threejs.org/examples/textures/cube/SwedishRoyalCastle/'
				//const path = 'C:/Users/rygy3/OneDrive/Desktop/Plinko/textures/cube/SwedishRoyalCastle/'
				const format = '.jpg';
				
				const urls = [
					path + 'px' + format, path + 'nx' + format,
					path + 'py' + format, path + 'ny' + format,
					path + 'pz' + format, path + 'nx' + format
				];
				return urls;
			}

			function CreateSphere(scene)
			{
				// Create a sphere geometry
				const geometry = new THREE.SphereGeometry( 1, 32, 16 );

				// Create a material with metalness and roughness properties
				const material = new THREE.MeshStandardMaterial( {
					color: 0x888888, // set the base color
					metalness: 1, // set the metalness value to 1 for a metal appearance
					roughness: 0.2 // set the roughness value to a low value for a smooth surface
				} );

				// Create a mesh using the geometry and material
				const sphere = new THREE.Mesh( geometry, material );

				// Add the mesh to the scene
				return sphere;
			}

			function CreateSphereGreen(scene)
			{
				const geometry = new THREE.SphereGeometry( 1, 32, 16 );
				const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
				const sphere = new THREE.Mesh( geometry, material );
				return sphere;
			}


			function CreateSphereStandard(scene)
			{
				var urls = GetUrls();
			
				const reflectionCube = new THREE.CubeTextureLoader().load ( urls );
				reflectionCube.encoding = THREE.sRGBEncoding;				
			
				// Create a sphere geometry
				const geometry = new THREE.SphereGeometry( 1, 32, 16 );

				// Create a material with metalness and roughness properties
				const material = new THREE.MeshStandardMaterial( {

					color: 0x888888,

					roughness: 0,
					metalness: 1,

					envMap: reflectionCube, // important -- especially for metals!
					envMapIntensity: 1

				} );

				// Create a mesh using the geometry and material
				const sphere = new THREE.Mesh( geometry, material );

				// Add the mesh to the scene
				return sphere;
			}			

			function CreateSpherePBR(scene)
			{
				//Create environment map
				var urls = GetUrls();
			
				const reflectionCube = new THREE.CubeTextureLoader().load ( urls );
				reflectionCube.encoding = THREE.sRGBEncodeing;	
			
				// Create a sphere geometry
				const geometry = new THREE.SphereGeometry( 1, 32, 16 );

				// Create a material with metalness and roughness properties
				// Create the metal material
				const material = new THREE.MeshPhysicalMaterial({
					color: 0x00ff00,
					metalness: 1,
					roughness: 0,
					clearcoat: 1,
					clearcoatRoughness: 0.1
				});

				// Create a mesh using the geometry and material
				const sphere = new THREE.Mesh( geometry, material );

				// Add the mesh to the scene
				return sphere;	
			}
	
			//var sphere = CreateSphere(scene);
			var sphere = CreateSphereStandard(scene);
			scene.add( sphere );

			const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
			scene.add( ambientLight );

			var pointLight = new THREE.PointLight( 0xffffff, 1 );
			pointLight.position.y = 1.5;
			scene.add( pointLight);

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				sphere.rotation.x += 0.01;
				sphere.rotation.y += 0.01;

				renderer.render( scene, camera );
			}

			animate();