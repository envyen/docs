$(document).ready(function( $ ) {

	var cwidth = $("#main-content").innerWidth();
	var renderer = new THREE.WebGLRenderer( { canvas: subtractive, antialias: true } );
	renderer.setSize(cwidth, cwidth/3);

	var scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	var camera = new THREE.PerspectiveCamera(50, 3, 1, 1000);
	camera.position.set( -2.7, -2.9, 7.0 );
	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	const geometry = new THREE.PlaneGeometry( 3, 3 );
	var Rmat = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		side: THREE.DoubleSide,
		transparent: true,
		blending: THREE.SubtractiveBlending
	});
	var Gmat = new THREE.MeshBasicMaterial({
		color: 0x00ff00, 
		side: THREE.DoubleSide, 
		transparent: true,
		blending: THREE.SubtractiveBlending
	});
	var Bmat = new THREE.MeshBasicMaterial({
		color: 0x0000ff, 
		side: THREE.DoubleSide, 
		transparent: true,
		blending: THREE.SubtractiveBlending
	});

	const R = new THREE.Mesh( geometry, Rmat );
	const G = new THREE.Mesh( geometry, Gmat );
	const B = new THREE.Mesh( geometry, Bmat );

	scene.add( R );
	scene.add( G );
	scene.add( B );

	R.translateZ(-2.0);
	B.translateZ(2.0);

	function onWindowResize() {
		camera.updateProjectionMatrix();
		var cwidth = $("#main-content").innerWidth();
		renderer.setSize(cwidth, cwidth/2);
	}
	window.addEventListener('resize', onWindowResize);

	var orgx = camera.position.x;
	var dir = 0.01; 
	var render = function() {
		requestAnimationFrame(render);
		controls.update();
		camera.position.x += dir;
		if(camera.position.x >= orgx +2) dir = -0.01;
		if(camera.position.x <= orgx -2) dir = 0.01;
		renderer.render(scene, camera);
	};

	render();

});


