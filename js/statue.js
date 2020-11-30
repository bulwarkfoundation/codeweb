
			var scene = new THREE.Scene();
			var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
			renderer.physicallyCorrectLights = true;
			var bgColor = new THREE.Color("rgb(240,240,240)");
				renderer.autoClear = false;
				renderer.setClearColor(0x000000, 0.0);
			var threejsContainer = document.getElementById('statue');
				renderer.setSize(window.innerWidth,window.innerHeight);
				threejsContainer.appendChild(renderer.domElement);

			window.addEventListener('resize',function()
			{
				renderer.setSize(window.innerWidth,window.innerHeight);
				camera.aspect = window.innerWidth/window.innerHeight;
				camera.updateProjectionMatrix();
			});

			// Camera
			var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 0;
				camera.position.y = -22;
				camera.rotation.z = -45;
				

			// Orbit Controller
			var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
				orbitControls.screenSpacePanning = true;
				orbitControls.enablePan = false;
				orbitControls.minPolarAngle = Math.PI * 0.5;
				orbitControls.maxPolarAngle = Math.PI * 0.5;
				orbitControls.update();

			// lighta
			var light = new THREE.AmbientLight( 0xffffff,1.5 ); // soft white light
				scene.add( light );
			var light1 = new THREE.PointLight( 0xffffff,85 );
				light1.position.set( 0, 50, 50 );
				scene.add( light1 );

			var light2 = new THREE.PointLight( 0xffffff,85 );
				light2.position.set( 50, 10, 00 );
				scene.add( light2 );

			var light3 = new THREE.PointLight( 0xffffff,85 );
				light3.position.set( 0, 10, -50 );
				scene.add( light3);

			var light4 = new THREE.PointLight( 0xffffff,85);
				light4.position.set( -50, 50, 0 );
				scene.add( light4 );

			var light5 = new THREE.PointLight( 0xffffff,85);
				light5.position.set( 0, -50, 0 );
				scene.add( light5 );

			var model, url;
			Upload();
			function Upload()
			{
				var loader = new THREE.GLTFLoader();
					loader.load('http://bulwarkfoundation.com/model/'+'MonumentRT.glb',
							function ( gltf ) {
								console.log(gltf.scene);
								model = gltf.scene;
								scene.add( gltf.scene );
								gltf.animations; // Array<THREE.AnimationClip>
								gltf.asset; // Object
								var box = new THREE.Box3().setFromObject(model);;
								let boundingBoxSize = box.getSize( new THREE.Vector3() );
								let maxAxis = Math.max( boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z );
								model.scale.multiplyScalar( 15 / maxAxis );
								// model.position.set(-5, 0, 0);
								// model.scale.set(1,1,1);
								var aabb = new THREE.Box3().setFromObject( gltf.scene );
								aabb.getCenter( orbitControls.target );
								orbitControls.update();
								scene.add(model);
							},
							function ( xhr ) {
								console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
							},
							function ( error ) {
								console.log( 'An error happened'+ error );
							}
					);
				}

			var particle = new THREE.Object3D();
				scene.add(particle);
			var geometry = new THREE.TetrahedronGeometry(1, 0);
			var geom = new THREE.IcosahedronGeometry(1, 1);
			var geom2 = new THREE.IcosahedronGeometry(1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				shading: THREE.FlatShading
			});

			for (var i = 0; i < 3000; i++) {
				var mesh = new THREE.Mesh(geometry, material);
					mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
					mesh.position.multiplyScalar(90 + (Math.random() * 700));
					mesh.rotation.set(Math.random() * 0.8, Math.random() * 0.5, Math.random() * 1);
					mesh.scale.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
					particle.add(mesh);
			  }

			 // Play Audio
			var audioListener = new THREE.AudioListener();
			camera.add( audioListener );
			// instantiate audio object
			var oceanAmbientSound = new THREE.Audio( audioListener );
				scene.add( oceanAmbientSound );
			// instantiate a loader
			BgMusic();

			var isPlaying = false;

			function togglePlay() 
			{
				isPlaying =!isPlaying;
				if(isPlaying){
					oceanAmbientSound.pause();					
				}else{
				oceanAmbientSound.play();
				}
			};

			requestAnimationFrame( Animate );
			function Animate()
			{
				requestAnimationFrame( Animate );
				orbitControls.update();
				particle.rotation.x += 0.0000;
				particle.rotation.y -= 0.0020;
				renderer.render( scene, camera );
			}
			Animate();


			function BgMusic()
			{
				var loader = new THREE.AudioLoader();
				loader.load(
							'http://bulwarkfoundation.com/Audio/bg.mp3',
							function ( audioBuffer ) 
							{
								oceanAmbientSound.setBuffer( audioBuffer );
								oceanAmbientSound.play();
							},
							function ( xhr ) 
							{
								console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
							},
							function ( err ) 
							{
								console.log( 'An error happened' );
							}
					);
			}

			var i=0;
			function PlayBgMusic()
			{
				
			}

