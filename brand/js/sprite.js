var Example = Example || {};

var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        World = Matter.World,
        Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        background: 'transparent',
        height: window.innerHeight,
        showAngleIndicator: false,
        wireframes: false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var offset = 10,
    options = { 
        isStatic: true,
        render: {
            opacity: 0
        }
    };

world.bodies = [];

// these static walls will not be rendered in this sprites example, see options
World.add(world, [
    Bodies.rectangle(400, window.innerHeight-70, window.innerWidth, 50.5, options),
    Bodies.rectangle(90, 350, 10, 700, options),
    Bodies.rectangle(260, 350, 10, 700, options),
    Bodies.rectangle(340, 450, 10, 700, options),
    Bodies.rectangle(510, 450, 10, 700, options),
    Bodies.rectangle(590, 500, 10, 700, options),
    Bodies.rectangle(760, 500, 10, 700, options)
]);

var count = 0; 

var renderPills = setInterval(function() {
    count += 1;
    var getPill = function(x, y) {
        if (Common.random() > 0.35) {
            return Bodies.rectangle(x, y, 45, 20, {
                slop: 0.05,
                restitution: 0.05,
                density: 0.0001,
                frictionAir: 0.15,
                friction: 0.4,
                angle: Common.random() * 180,
                chamfer: { radius: 10 },
                render: {
                    sprite: {
                        texture: './img/pill.png'
                    }
                }
            });
        } else {
            return Bodies.rectangle(x, y, 45, 20,  {
                angularVelocity: 90,
                slop: 0.05,
                restitution: 0.05,
                angle: Common.random() * 180,
                density: 0.0001 ,
                frictionAir: 0.15,
                friction: 0.4,
                chamfer: { radius: 10 },
                render: { 
                    sprite: {
                        texture: './img/bluepill.png'
                    }
                }
            });
        }
    };
    var randSelect = Common.random();
    if (randSelect <= 0.5) {
        var pill = getPill(110 + 130 * Common.random(), -20);
    } else if (randSelect > 0.7) {
        var pill = getPill(360 + 130 * Common.random(), -20);
    } else {
        var pill = getPill(610 + 130 * Common.random(), -20);
    }
    World.add(world, pill);
    // prevent pills from overlapping
    setTimeout(function() {
        Matter.Body.setStatic(pill, true);
    }, 6000);
    if (count > 150) {
        clearInterval(renderPills);
    }
}, 200);

Engine.run(engine);
