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
