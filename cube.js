window.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('canvas');
  var engine = new BABYLON.Engine(canvas, true);
  var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();
    
    var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);

    //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -10), scene);
    //camera.setTarget(BABYLON.Vector3.Zero());

    var camera = new BABYLON.ArcRotateCamera("arcCam",
                    BABYLON.Tools.ToRadians(45),
                    BABYLON.Tools.ToRadians(45),
                    10.0, box.position, scene);

    camera.attachControl(canvas, true);

    var light = new BABYLON.PointLight("pointLight",
                                       new BABYLON.Vector3(5, 10, 0), scene);
    light.diffuse = new BABYLON.Color3(0, 1, 0);

    // click fades to black
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(
      new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          light,
          'diffuse',
           BABYLON.Color3.Black(),
           1000
      )
    );

    return scene;
  }

  var scene = createScene();
  engine.runRenderLoop(function() {
    scene.render();
  });
});
