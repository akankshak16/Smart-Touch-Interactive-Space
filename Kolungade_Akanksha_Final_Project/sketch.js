  /*
    ABOUT THIS SKETCH:
    ----------------
    This sketch sets up an interactive environment that simulates three rooms: a Kitchen, a Bedroom, 
    and a Living Room. The user can switch between these rooms using radio buttons and 
    interact with various elements in each room, such as lights, appliances, and music, via toggle 
    and button controls. Additionally, the user can draw on a small canvas in the kitchen, 
    listen to radio music in the bedroom, and move a pet dog in the living room. Special effects 
    occur when certain toggles are turned on or when the pet reaches a certain position.

    Features:
    - Landing page with a one-time sound
    - Room selection (Kitchen, Bedroom, Living Room)
    - Interactive UI elements (toggles, buttons, sliders)
    - Visual feedback with changing images and animated fairy lights
    - Audio feedback using oscillators and sound files
    - Drawing board to sketch in the Kitchen

    Citations:
    - p5.gui library:
      Used for creating graphical user interface elements like 
      toggles, buttons, sliders, and radio buttons. 
      Reference: https://github.com/L05/p5.touchgui

    - p5.js Sound 
      https://github.com/L05/p5.touchgui/blob/master/examples/intermediate/notes-player/sketch.js
      Utilized to handle audio functionality, including playing 
      loaded sounds and using oscillators.

    - The drawing board functionality in the kitchen scene is adapted from the "Drawing App"
      example provided by p5.touchgui:
      https://github.com/L05/p5.touchgui/blob/master/examples/intermediate/drawing-app/sketch.js
      Modifications Made:
      - Adjusted the positioning and dimensions of the drawing canvas to fit within the kitchen setup.
      - Incorporated stroke weight adjustments and a clear button into the interface.
      - Integrated the drawing board with the rest of the room controls, ensuring it responds to the 
        room's state and does not interfere with other UI elements and othe rooms within the If else
        statements for each rooms. 

    Asset Information:
    - All images were created by me using Adobe Illustrator.
    - The primary sound used is copyright-free.
    - Additional audio assets are sourced from the p5.js Sound Library(Osc).

    The code is divided into sections:
    - Setup: Initializes the canvas, loads images and sounds, and creates GUI elements.
    - Draw: Renders the current room state, updates UI visibility and interactivity.
    - Functions: Manages drawing board, click sounds, displaying instructions, and 
      cycling through images.

    Additional Js Functions:
    map(), setTimeout(), tint() & constrain()
  */

  //Initailise variables
  let ventLightButton, ovenButton, roomLightButton, lampButton, ferryLightButton, lightButton; 
  let bedroomImg1, bedroomImg2, bedroomImg3, bedroomImg4;
  let livingRoomImg1, livingRoomImg2, livingRoomImg3, livingRoomImg4;
  let kitchenImg1, kitchenImg2, kitchenImg3, kitchenImg4;
  let currentImg;
  let gui;
  let pet;
  let petMove;
  let ovenOscillator;  
  let ovenFrequency = 170; 
  let roomRadio; 
  let crossFader; 
  let myCanvasPos = {
    x: 910,
    y: 310,
    width: 80,
    height: 110
  };
  let myStrokeWeight = 16;
  let myClearButton, myWeightSlider;
  let showLandingPage = true;
  let landingPageImg;
  let drawingBoard;
  let endImg;
  let endOscillator;
  let endThreshold = 870; 
  let clickOscillator;
  let radioSound;
  let playRadioButton, stopRadioButton;
  let radioImage;
  let showRadioImage = false;
  let fairyLightImages = [];
  let combinedLightImages = [];
  let fairyImageIndex = 0;
  let combinedImageIndex = 0;
  let frameCounter = 0; 
  let frameDelay = 40;
  let landingPageSound;

  /*
    setup():
    --------
    Description:
      Called once before the sketch begins to run, this function prepares the 
      environment for the interactive experience. It creates the canvas, loads 
      and configures all necessary images, sounds, and fonts, and initializes 
      graphical user interface elements (like toggles, buttons, sliders, and 
      radio buttons). Oscillators used for sound effects are also started here. 
      Additionally, a separate drawing board area for the kitchen scene is 
      prepared.

    Key Steps:
      - Create the main canvas.
      - Load images and sound files.
      - Initialize GUI elements (toggles, sliders, buttons, radio).
      - Set initial room and UI states.
      - Initialize oscillators for the oven, end scenario, and click sounds.
      - Prepare a dedicated drawing board for sketching in the kitchen.

    Parameters:
      None

    Returns:
      None
  */

  function setup() {
    createCanvas(1080, 700);
    radioImage = loadImage('images/imageBedroom5.png');
    radioSound = loadSound('sound/softmusic.mp3');
    landingPageImg = loadImage('images/imageLandingPage.png');
    landingPageSound = loadSound('sound/ElevenLabs.mp3'); 
    landingPageSound.setLoop(false);
    landingPageImg = loadImage('images/imageLandingPage.png');
    kitchenImg1 = loadImage('images/imageKitchen1.png');
    kitchenImg2 = loadImage('images/imageKitchen2.png');
    kitchenImg3 = loadImage('images/imageKitchen3.png');
    kitchenImg4 = loadImage('images/imageKitchen4.png');
    bedroomImg1 = loadImage('images/imageBedroom1.png');
    bedroomImg2 = loadImage('images/imageBedroom2.png');
    bedroomImg3 = loadImage('images/imageBedroom3.png');
    bedroomImg4 = loadImage('images/imageBedroom4.png');
    livingRoomImg1 = loadImage('images/imageLivingroom1.png');
    livingRoomImg2 = loadImage('images/imageLivingroom2.png');
    livingRoomImg3 = loadImage('images/imageLivingroom3.png');
    livingRoomImg4 = loadImage('images/imageLivingroom4.png');
    pet = loadImage('images/imageDog.png');
    fairyLightImages.push(loadImage('images/imageFairyLights1.png'));
    fairyLightImages.push(loadImage('images/imageFairyLights2.png'));
    fairyLightImages.push(loadImage('images/imageFairyLights3.png'));
    fairyLightImages.push(loadImage('images/imageFairyLights4.png'));
    fairyLightImages.push(loadImage('images/imageFairyLights5.png'));
    combinedLightImages.push(loadImage('images/imageFairyLights6.png'));
    combinedLightImages.push(loadImage('images/imageFairyLights7.png'));
    combinedLightImages.push(loadImage('images/imageFairyLights8.png'));
    combinedLightImages.push(loadImage('images/imageFairyLights9.png'));
    combinedLightImages.push(loadImage('images/imageFairyLights10.png'));
    endImg = loadImage('images/imageLivingroom5.png'); 

    // Initialize the GUI
    gui = createGui();
    
    currentImg = kitchenImg1; 

    // Create toggles
    ventLightButton = createToggle("Vent Light", 50, 140, 130, 35);
    ovenButton = createToggle("Oven", 210, 140, 130, 35);
    roomLightButton = createToggle("Room Light", 50, 340, 130, 35); 
    lampButton = createToggle("Lamp", 210, 340, 130, 35); 
    playRadioButton = createButton('Play Music', 50, 470, 130, 35);
    stopRadioButton = createButton('Stop Music', 210, 470, 130, 35);
    ferryLightButton = createToggle("Fairy Light", 50, 530, 130, 35);
    lightButton = createToggle("Lamp Light", 210, 530, 130, 35);

    // Pet movement slider
    petMove = createSlider2d("Slider2d", 50, 590, 290, 50, 0, width - 200, 800, 20);

    // Brightness crossfader
    crossFader = createSlider("Crossfade", 50, 400, 290, 40, 0, 200);

    // Oven oscillator
    ovenOscillator = new p5.Oscillator('sine');
    ovenOscillator.freq(ovenFrequency); 
    ovenOscillator.amp(0);
    ovenOscillator.start();

    // Oscillator for the end event (dog end scenario)
    endOscillator = new p5.Oscillator('sine');
    endOscillator.freq(300); 
    endOscillator.amp(0);
    endOscillator.start();

    // Oscillator for click sound on toggles
    clickOscillator = new p5.Oscillator('sine');
    clickOscillator.freq(600); // frequency for a "tick" sound
    clickOscillator.amp(0);
    clickOscillator.start();

    // Radio buttons for room selection
    roomRadio = createRadio();
    roomRadio.option('Kitchen');
    roomRadio.option('Bedroom');
    roomRadio.option('Living Room');
    roomRadio.selected('Kitchen'); 
    roomRadio.position(370, 40);
    roomRadio.style('display', 'flex');
    roomRadio.style('flex-direction', 'column'); // Align buttons vertically
    roomRadio.style('gap', '20px'); // Space between options
    roomRadio.style('padding', '10px'); // Add padding around the container
    roomRadio.style('font-family', 'Poppins, sans-serif');
    roomRadio.style('font-size', '16px');
    roomRadio.hide();

    // Clear button and stroke weight slider
    myClearButton = createButton('Clear',50, 200, 130, 35);
    myWeightSlider = createSlider("WeightSlider", 210, 200, 130, 35, 1, 30);
    myWeightSlider.val = 1; // Set the slider to start at the minimum value
    myStrokeWeight = myWeightSlider.val; // Initialize the stroke weight to match the slider's value
    
    // Style the radio options
    let options = roomRadio.elt.getElementsByTagName('label');
    for (let i = 0; i < options.length; i++) {
    options[i].style.margin = '20px 0'; // Space between labels and buttons
    options[i].style.padding = '5px'; // Padding around each option
    options[i].style.color = ['#CC69AB', '#69ABCC', '#FFD700'][i]; // Use your defined colors
  }

    // Create the drawing board buffer
    drawingBoard = createGraphics(myCanvasPos.width, myCanvasPos.height);
    drawingBoard.background(255);
    drawingBoard.stroke(0);
    drawingBoard.strokeWeight(2);
    drawingBoard.noFill();
    drawingBoard.rect(0, 0, myCanvasPos.width, myCanvasPos.height);
  }

  /*
    draw():
    -------
    Description:
      This function executes continuously after setup(), updating the display 
      and responding to user interactions. It checks which room is selected, 
      then shows or hides the appropriate controls and visuals. Each room has 
      its own logic:
        - Kitchen: Manages vent light, oven toggles, drawing board interaction, 
          and a tone for the oven.
        - Bedroom: Adjusts room and lamp lighting with a crossfader, handles 
          radio playback, and shows effects on screen.
        - Living Room: Controls fairy lights, lamp lights, pet movement, and 
          triggers a special event when the pet reaches a certain point.

      Throughout the loop, it also manages animations (like cycling fairy lights), 
      plays short audible feedback when toggles change state, and ensures the 
      correct images are displayed based on user choices.

    Parameters:
      None

    Returns:
      None
  */

  function draw() {
    background(30);

    // If landing page is shown
    if (showLandingPage) {
      image(landingPageImg, 0, 0, width, height);
      return;
    }

    //control pannel 
    fill("black");
    stroke(100);
    strokeWeight(2);
    rect(30, 100, 330, 570, 20);

    // If not landing page, show GUI and room selection
    drawGui();

    // Hide everything by default
    crossFader.visible = false;
    ventLightButton.visible = false;
    ovenButton.visible = false;
    roomLightButton.visible = false;
    lampButton.visible = false;
    ferryLightButton.visible = false;
    lightButton.visible = false;
    petMove.visible = false;
    myClearButton.visible = false;
    myWeightSlider.visible = false;
    playRadioButton.visible = false;
    stopRadioButton.visible = false;

    // Get the currently selected room
    let selectedRoom = roomRadio.value();

    // Kitchen logic
    if (selectedRoom === 'Kitchen') {
      displayKitchenInstructions();
      ventLightButton.visible = true;
      ovenButton.visible = true;
      myClearButton.visible = true;
      myWeightSlider.visible = true;

      if (ventLightButton.val && ovenButton.val) {
        currentImg = kitchenImg4;
        ovenOscillator.amp(0.1, 0.1);
      } else if (ventLightButton.val) {
        currentImg = kitchenImg2;
        ovenOscillator.amp(0, 0.1);
      } else if (ovenButton.val) {
        currentImg = kitchenImg3;
        ovenOscillator.amp(0.1, 0.1);
      } else {
        currentImg = kitchenImg1;
        ovenOscillator.amp(0, 0.1);
      }
      image(currentImg, 500, 100, 540, 570);

      displayTodoList()

      // Drawing in the kitchen
      if (myClearButton && myClearButton.isPressed) {
        clearDrawingBoard();
      }
      if (myWeightSlider && myWeightSlider.isChanged) {
        myStrokeWeight = myWeightSlider.val; // Update stroke weight to match slider value
      }

      if (mouseIsPressed && isInsideDrawingBoard(mouseX, mouseY)) {
        drawingBoard.stroke(0);
        drawingBoard.strokeWeight(myStrokeWeight); // Use the updated stroke weight
        drawingBoard.line(
          pmouseX - myCanvasPos.x, 
          pmouseY - myCanvasPos.y, 
          mouseX - myCanvasPos.x, 
          mouseY - myCanvasPos.y
        );
      }
      
      image(drawingBoard, myCanvasPos.x, myCanvasPos.y);

      // No end oscillator sound in Kitchen
      endOscillator.amp(0, 0.1);

    } else if (selectedRoom === 'Bedroom') {
      displayBedroomInstructions();
      roomLightButton.visible = true;
      lampButton.visible = true;
      playRadioButton.visible = true;
      stopRadioButton.visible = true;

      let brightness = map(crossFader.val, 0, 200, 50, 255);
      if (roomLightButton.val && lampButton.val) {
        crossFader.visible = true;
        tint(255, brightness);
        currentImg = bedroomImg4;
      } else if (roomLightButton.val) {
        crossFader.visible = true;
        tint(255, brightness);
        currentImg = bedroomImg2;
      } else if (lampButton.val) {
        noTint();
        currentImg = bedroomImg3;
      } else {
        noTint();
        currentImg = bedroomImg1;
      }

      image(currentImg, 500, 100, 540, 570);
      noTint();

      endOscillator.amp(0, 0.1);

      if (playRadioButton.isPressed) {
        if (!radioSound.isPlaying()) {
          radioSound.loop(); // Play the radio sound in a loop
          showRadioImage = true; // Show the radio image
        }
      }

      if (stopRadioButton.isPressed) {
        if (radioSound.isPlaying()) {
          radioSound.stop(); // Stop the radio sound
          showRadioImage = false; // Hide the radio image
        }
      }

      // Display the radio image if the radio is playing
      if (showRadioImage) {
        let offsetX = random(-1, 0);
        let offsetY = random(-1, 0);
        image(radioImage, 500 + offsetX, 100 + offsetY, 540, 570); // Adjust position and size as needed
      }

    } else if (selectedRoom === 'Living Room') {
      displayLivingRoomInstructions();
      ferryLightButton.visible = true;
      lightButton.visible = true;
      petMove.visible = true;
    
      if (ferryLightButton.val && lightButton.val) {
        currentImg = livingRoomImg4; 
        image(currentImg, 500, 100, 540, 570);
    
        // Display 4 images for "Fairy Light + Lamp Light"
        combinedImageIndex = displayImages(combinedLightImages, combinedImageIndex, 500, 100, 540, 570);
      } else if (ferryLightButton.val) {
        currentImg = livingRoomImg3;  
        image(currentImg, 500, 100, 540, 570);
    
        // Display 4 images for "Fairy Light" only
        fairyImageIndex = displayImages(fairyLightImages, fairyImageIndex, 500, 100, 540, 570);
      } else if (lightButton.val) {
        currentImg = livingRoomImg2;  
        image(currentImg, 500, 100, 540, 570);
      } else {
        currentImg = livingRoomImg1; 
        image(currentImg, 500, 100, 540, 570);
      }
    
      // Pet and end event logic remains unchanged
      let petX = petMove.valX;  
      let petY = 520; 
      if (petX > endThreshold) {
        let offsetX = random(-2, 1);
        let offsetY = random(-2, 1);
        image(endImg, 500 + offsetX, 100 + offsetY, 540, 570); 
        endOscillator.amp(0.2, 0.1); 
      } else {
        endOscillator.amp(0, 0.1);
      }
      petX = constrain(petX, 500, 1240); 
      image(pet, petX, petY, 140, 160);
    }

    // Play click sound if toggles turned on
    playClickIfOn(ventLightButton);
    playClickIfOn(lampButton);
    playClickIfOn(roomLightButton);
    playClickIfOn(ferryLightButton);
    playClickIfOn(lightButton);

  /*
    Setting Styles for UI Elements:
    -------------------------------
    Throughout the code, various UI elements (toggles, buttons, sliders) are styled 
    using setStyle() methods. Each element's style configuration includes properties 
    like stroke weight, rounding, fonts, colors for different states (hover, active, 
    off, on), and so forth. These styles provide a consistent look and feel across the 
    application and help distinguish different types of UI elements and their states.

    Styles are applied to:
      - Toggles (e.g., ventLightButton, ovenButton, ferryLightButton, lampButton, 
        roomLightButton, lightButton)
      - Buttons (e.g., myClearButton, playRadioButton, stopRadioButton)
      - Sliders (e.g., myWeightSlider, petMove, crossFader)

    Each style setting block:
      - Defines color schemes for background, labels, strokes.
      - Adjusts rounding (corner radius), stroke weights, and text sizes.

    By using these style configurations, the code ensures a cohesive visual 
    presentation and intuitive user interaction.
  */

    ventLightButton.setStyle({
      strokeWeight: 2,
      rounding: 10,
      font: 'Arial',
      textSize: 20,
      fillBgOff: color('#CC69AB'),
      fillBgOffHover: color('#E288C4'),
      fillBgOffActive: color('#FFF3FA'),
      fillBgOn: color('#FFE6F4'),
      fillBgOnHover: color('#FFF3FA'),
      fillBgOnActive: color('#FAFAFA'),
      fillLabelOff: color('#3F102F'),
      fillLabelOn: color('#3F102F'),
      strokeBgOff: color('#3F102F'),
      strokeBgOn: color('#3F102F')
    });

    ovenButton.setStyle({
      strokeWeight: 2,
      rounding: 10,
      font: 'Arial',
      textSize: 20,
      fillBgOff: color('#CC69AB'),
      fillBgOffHover: color('#E288C4'),
      fillBgOffActive: color('#FFF3FA'),
      fillBgOn: color('#FFE6F4'),
      fillBgOnHover: color('#FFF3FA'),
      fillBgOnActive: color('#FAFAFA'),
      fillLabelOff: color('#3F102F'),
      fillLabelOn: color('#3F102F'),
      strokeBgOff: color('#3F102F'),
      strokeBgOn: color('#3F102F')
    });

    ferryLightButton.setStyle({
      strokeWeight: 2,
      rounding: 10,
      font: 'Arial',
      textSize: 20,
      fillBgOff: color('#FFD700'),
      fillBgOffHover: color('#FFE680'),
      fillBgOffActive: color('#FFF9E6'),
      fillBgOn: color('#FFFAAA'),
      fillBgOnHover: color('#FFF7C0'),
      fillBgOnActive: color('#FFFCE0'),
      fillLabelOff: color('#3F2F00'),
      fillLabelOn: color('#3F2F00'),
      strokeBgOff: color('#3F2F00'),
      strokeBgOn: color('#3F2F00')
    });

    lightButton.setStyle({
      strokeWeight: 2,
      rounding: 10,
      font: 'Arial',
      textSize: 20,
      fillBgOff: color('#FFD700'),
      fillBgOffHover: color('#FFE680'),
      fillBgOffActive: color('#FFF9E6'),
      fillBgOn: color('#FFFAAA'),
      fillBgOnHover: color('#FFF7C0'),
      fillBgOnActive: color('#FFFCE0'),
      fillLabelOff: color('#3F2F00'),
      fillLabelOn: color('#3F2F00'),
      strokeBgOff: color('#3F2F00'),
      strokeBgOn: color('#3F2F00')
    });

    roomLightButton.setStyle({
      strokeWeight: 2, 
      rounding: 10,
      font: 'Arial',
      textSize: 20, 
      fillBgOff: color('#69ABCC'),
      fillBgOffHover: color('#88C4E2'),
      fillBgOffActive: color('#F3FAFF'),
      fillBgOn: color('#E6F4FF'),
      fillBgOnHover: color('#F3FAFF'), 
      fillBgOnActive: color('#FAFAFA'),
      fillLabelOff: color('#102F3F'), 
      fillLabelOn: color('#102F3F'),
      strokeBgOff: color('#102F3F'),
      strokeBgOn: color('#102F3F')
    });

    lampButton.setStyle({
      strokeWeight: 2, 
      rounding: 10,
      font: 'Arial',
      textSize: 20, 
      fillBgOff: color('#69ABCC'),
      fillBgOffHover: color('#88C4E2'),
      fillBgOffActive: color('#F3FAFF'),
      fillBgOn: color('#E6F4FF'),
      fillBgOnHover: color('#F3FAFF'), 
      fillBgOnActive: color('#FAFAFA'),
      fillLabelOff: color('#102F3F'), 
      fillLabelOn: color('#102F3F'), 
      strokeBgOff: color('#102F3F'),
      strokeBgOn: color('#102F3F')
    });

    playRadioButton.setStyle({
      strokeWeight:       2,
      rounding:           10,
      font:               'Arial',
      textSize:           20, 
      fillBg:             color('#69ABCC'),
      fillBgHover:        color('#88C4E2'), 
      fillBgActive:       color('#F3FAFF'), 
      fillLabel:          color('#102F3F'), 
      fillLabelHover:     color('#102F3F'), 
      fillLabelActive:    color('#102F3F'), 
      strokeBg:           color('#102F3F'), 
      strokeBgHover:      color('#102F3F'), 
      strokeBgActive:     color('#102F3F')  
    });

  stopRadioButton.setStyle({
    strokeWeight:       2,
    rounding:           10,
    font:               'Arial',
    textSize:           20, 
    fillBg:             color('#69ABCC'),
    fillBgHover:        color('#88C4E2'), 
    fillBgActive:       color('#F3FAFF'), 
    fillLabel:          color('#102F3F'), 
    fillLabelHover:     color('#102F3F'), 
    fillLabelActive:    color('#102F3F'), 
    strokeBg:           color('#102F3F'), 
    strokeBgHover:      color('#102F3F'), 
    strokeBgActive:     color('#102F3F')  
  });

    myClearButton.setStyle({
      strokeWeight:       2,
      rounding:           10,
      font:               'Arial',
      textSize:           20, 
      fillBg:             color('#E57FBE'),
      fillBgHover:        color('#EFABD5'),
      fillBgActive:       color('#FFE6F4'),
      fillLabel:          color('#3F102F'),
      fillLabelHover:     color('#3F102F'),
      fillLabelActive:    color('#3F102F'),
      strokeBg:           color('#3F102F'), 
      strokeBgHover:      color('#3F102F'), 
      strokeBgActive:     color('#3F102F')
    });

    myWeightSlider.setStyle({
      strokeWeight:       2, 
      rounding:           10,
      trackWidth:         1,
      fillBg:             color('#FFE6F4'),
      fillBgHover:        color('#FFE6F4'),
      fillBgActive:       color('#FFF3FA'),
      fillTrack:          color('#C45093'), 
      fillTrackHover:     color('#CC66A6'), 
      fillTrackActive:    color('#D877B4'), 
      fillHandle:         color('#7F3663'), 
      fillHandleHover:    color('#E57FBE'), 
      fillHandleActive:   color('#FAFAFA'), 
      strokeBg:           color('#3F102F'), 
      strokeBgHover:      color('#3F102F'), 
      strokeBgActive:     color('#3F102F'), 
      strokeTrack:        color('#C45093'), 
      strokeTrackHover:   color('#CC66A6'), 
      strokeTrackActive:  color('#D877B4'),
      strokeHandle:       color('#3F102F'), 
      strokeHandleHover:  color('#3F102F'), 
      strokeHandleActive: color('#3F102F') 
    });

    petMove.setStyle({
      strokeWeight:       2, 
      rounding:           10,
      trackWidth:         1,
      fillBg:             color('#FFF9E6'),
      fillBgHover:        color('#FFF7CC'), 
      fillBgActive:       color('#FFF4B0'), 
      fillTrack:          color('#FFD700'), 
      fillTrackHover:     color('#FFE94D'), 
      fillTrackActive:    color('#FFF2AA'), 
      fillHandle:         color('#E0C800'), 
      fillHandleHover:    color('#F0D54D'), 
      fillHandleActive:   color('#F7E580'), 
      strokeBg:           color('#3F2F00'),
      strokeBgHover:      color('#3F2F00'),
      strokeBgActive:     color('#3F2F00'),
      strokeTrack:        color('#3F2F00'),
      strokeTrackHover:   color('#3F2F00'),
      strokeTrackActive:  color('#3F2F00'),
      strokeHandle:       color('#3F2F00'),
      strokeHandleHover:  color('#3F2F00'),
      strokeHandleActive: color('#3F2F00')
    });
    
    crossFader.setStyle({
      strokeWeight:       2,
      rounding:           10,
      trackWidth:         1,
      fillBg:             color('#E6F4FF'),
      fillBgHover:        color('#E6F4FF'),
      fillBgActive:       color('#F3FAFF'),
      fillTrack:          color('#69ABCC'),  
      fillTrackHover:     color('#88C4E2'),  
      fillTrackActive:    color('#F3FAFF'),  
      fillHandle:         color('#102F3F'),  
      fillHandleHover:    color('#88C4E2'),  
      fillHandleActive:   color('#102F3F'),
      strokeBg:           color('#102F3F'), 
      strokeBgHover:      color('#102F3F'), 
      strokeBgActive:     color('#102F3F'), 
      strokeTrack:        color('#102F3F'), 
      strokeTrackHover:   color('#102F3F'), 
      strokeTrackActive:  color('#102F3F'),
      strokeHandle:       color('#102F3F'), 
      strokeHandleHover:  color('#102F3F'), 
      strokeHandleActive: color('#102F3F')
    });
  }

  /* 
    playClickIfOn(button):
    ----------------------
    Description:
      This function checks if a given toggle button was changed to "on" state. 
      If so, it plays a short "click" sound using an oscillator.

    Parameters:
      button - A toggle button created using p5Gui library.

    Returns:
      None
  */

  function playClickIfOn(button) {
    if (button.isChanged && button.val === true) {
      // Set the oscillator for a button-click sound
      clickOscillator.freq(400); // Higher frequency for a sharp "click"
      clickOscillator.amp(0.2); // Set the amplitude for a short burst
      
      // Stop the sound quickly to simulate a short click
      setTimeout(function() {
        clickOscillator.amp(0, 0.05); // Fade out quickly
      }, 50); // Keep the sound short, like a real button click
    }
  }

  /*
    clearDrawingBoard():
    --------------------
    Description:
      Clears the drawing board by resetting it with a white background and 
      a rectangular border.

    Parameters:
      None

    Returns:
      None
  */

  function clearDrawingBoard() {
    drawingBoard.background(255);
    drawingBoard.stroke(0);
    drawingBoard.strokeWeight(2);
    drawingBoard.noFill();
    drawingBoard.rect(0, 0, myCanvasPos.width, myCanvasPos.height);
  }

  /*
    isInsideDrawingBoard(x, y):
    ---------------------------
    Description:
      Checks if the given x, y coordinates (e.g., mouse position) are inside the 
      boundaries of the drawing board.

    Parameters:
      x - The x-coordinate to check.
      y - The y-coordinate to check.

    Returns:
      Boolean - true if the point is inside the drawing board, false otherwise.
  */

  function isInsideDrawingBoard(x, y) {
    return (
      x > myCanvasPos.x &&
      x < myCanvasPos.x + myCanvasPos.width &&
      y > myCanvasPos.y &&
      y < myCanvasPos.y + myCanvasPos.height
    );
  }

  /*
    mousePressed():
    ---------------
    Description:
      Event handler for mouse press events. If the landing page is visible, 
      hides it and shows the room selection radio buttons. Also plays a landing 
      page sound once after exiting the landing page.

    Parameters:
      None

    Returns:
      None
  */

  function mousePressed() {
    if (showLandingPage) {
      showLandingPage = false; // Exit the landing page
      roomRadio.show(); // Show the room selection radio buttons

      if (!landingPageSound.isPlaying()) {
        landingPageSound.play(); // Play the landing page sound once after exiting
      }
    }
  }

  /*
    displayKitchenInstructions():
    -----------------------------
    Description:
      Draws the instructional text for the Kitchen room, guiding the user on 
      how to use the Vent Light, Oven toggles, and the drawing board.

    Parameters:
      None

    Returns:
      None
  */

  function displayKitchenInstructions() {
    fill(255); // White text
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textLeading(30); // Consistent line spacing
    let x = 40; // X position for Kitchen
    let y = 240; // Y position for Kitchen
    text(`
    Kitchen Instructions:
    - Use the "Vent Light" and "Oven" toggles
      to control the kitchen appliances.
    - Draw on the drawing board to create
      patterns or sketches.
    - Use the "Clear" button to reset the
      drawing board.
    - Adjust stroke weight using the slider.
    `, x, y, 400);
  }

  /*
    displayBedroomInstructions():
    -----------------------------
    Description:
      Displays instructions for the Bedroom room. Informs the user on how to 
      control the Room Light, Lamp, and brightness, as well as how to play or 
      stop music.

    Parameters:
      None

    Returns:
      None
  */

  function displayBedroomInstructions() {
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textLeading(30);
    let x = 40; // X position for Bedroom
    let y = 100; // Y position for Bedroom
    text(`
    Bedroom Instructions:
    - Use "Room Light" and "Lamp" toggles
      to control the lighting.
    - Adjust the brightness using the
      "Crossfade" slider.
    `, x, y, 400);
  }

  /*
    displayLivingRoomInstructions():
    --------------------------------
    Description:
      Displays instructions for the Living Room. Guides the user on using the 
      Fairy Light, Lamp Light toggles, and how to move the pet. Warns about a 
      special event when the pet reaches a certain area.

    Parameters:
      None

    Returns:
      None
  */

  function displayLivingRoomInstructions() {
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textLeading(30);
    let x = 40; // X position for Living Room
    let y = 100; // Y position for Living Room
    text(`
    Living Room Instructions:
    - Use "Fairy Light" and "Lamp Light"
    toggles to change the ambiance.
    - Move the pet using the slider at the
      bottom of the screen.
    - Watch for special events when the
      pet reaches the right side of the room!
    `, x, y, 400);
  }

  /*
    displayTodoList():
    ------------------
    Description:
      Displays a simple "TO-DO List:" label inside the kitchen's drawing board. 
      This can be used by the user to write notes or tasks.

    Parameters:
      None

    Returns:
      None
  */

  function displayTodoList() {
    // Add TODO List on the drawing board
    drawingBoard.textSize(10);
    drawingBoard.textAlign(LEFT, TOP);
    drawingBoard.fill(0); // Black text
    drawingBoard.noStroke();
    drawingBoard.text(`
    TO-DO List:
    `, 5, 1); // Position within the drawing board
  }

  /*
    displayImages(imagesArray, index, x, y, width, height):
    -------------------------------------------------------
    Description:
      Displays a cycling series of images (like a slideshow) at a given location 
      and size. The function increments the index after a specified delay 
      to animate the images. If the index reaches the end of the array, it loops 
      back to the start.

    Parameters:
      imagesArray - An array of p5.Image objects to display in sequence.
      index       - The current index of the image to display.
      x, y        - The top-left corner coordinates where the image will be drawn.
      width, height - The size to draw the image.

    Returns:
      index - The updated index after cycling through the images.
  */

  function displayImages(imagesArray, index, x, y, width, height) {
    frameCounter++;

    // Update index after a delay
    if (frameCounter >= frameDelay) {
      frameCounter = 0;
      index++; // Move to the next image
      if (index >= imagesArray.length) index = 0; // Loop back to the start
    }

    // Display the current image
    image(imagesArray[index], x, y, width, height);

    return index; // Return the updated index
  }
