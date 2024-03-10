class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    // Set up all of the constants from the base provider.
    super();

    // Override a few properties.
    /**
     * The width of the notch used for previous and next connections.
     * @type {number}
     * @override
     */
    this.NOTCH_WIDTH = 20;

    /**
     * The height of the notch used for previous and next connections.
     * @type {number}
     * @override
     */
    this.NOTCH_HEIGHT = 10;

    /**
     * Rounded corner radius.
     * @type {number}
     * @override
     */
    this.CORNER_RADIUS = 2;

    /**
     * The height of the puzzle tab used for input and output connections.
     * @type {number}
     * @override
     */
    this.TAB_HEIGHT = 18;
    
    this.TAB_WIDTH = 18;
  }
}

class CustomRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super();
  }
  makeConstants_() {
    return new CustomConstantProvider();
  }
}

Blockly.blockRendering.register('custom_renderer', CustomRenderer);