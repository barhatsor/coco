/*
 * coco
 * CSS Orientation Controls
 * By Bar Hatsor (MIT License)
 *
 * Manual user drag (rotate) override handling
 */

Element.prototype.coco = function () {

	/* "this" is an Element */
	var object = this;
  
  
	var active = false;
	var click = false;

	var currentX;
	var initialX;
	var xOffset = 0;


	/*
	 * Disabling pointer events on object to:
 	 * 1. Disable default dragging behavior.
	 * 2. Disable clicking when dragging.
	 */
  
	object.style.pointerEvents = 'none';
  
  
  /*
   * Add grab cursor to document, indicate draggable
   */
  
  document.documentElement.style.cursor = 'grab';

  
	/*
	 * Adding event listeners on document
	 */
  
	document.addEventListener( "mousedown", dragStart, false );
	document.addEventListener( "mouseup", dragEnd, false );
	document.addEventListener( "mousemove", drag, false );

	/*
	 * Touch events for mobile
	 */
  
	document.addEventListener( "touchstart", dragStart, false );
	document.addEventListener( "touchend", dragEnd, false );
	document.addEventListener( "touchmove", drag, false );



	function dragStart( e ) {

		if ( e.type === "touchstart" ) {

			initialX = e.touches[ 0 ].clientX - xOffset;

		} else {

			initialX = e.clientX - xOffset;

		}

		active = true;
		click = true;

	}

	function dragEnd() {

		initialX = currentX;

		xOffset = currentX;
		active = false;


		/*
		 * Click detection.
		 * Simulates click if not dragging to compensate
		 * disabling pointer events on object.
		 */
    
		if ( click == true ) {

			object.click();

		}


	}

	function drag( e ) {

		if ( active ) {

			e.preventDefault();

			if ( e.type === "touchmove" ) {

				currentX = e.touches[ 0 ].clientX - initialX;

			} else {

				currentX = e.clientX - initialX;

			}

			xOffset = currentX;

			object.style.transform = 'rotateY(' + currentX + 'deg)';

			click = false;

		}

	}

};
