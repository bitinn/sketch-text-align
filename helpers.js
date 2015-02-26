
/**
 * helpers.js
 *
 * A helper for aligning text layers
 */

function format() {
	var app = NSApplication.sharedApplication();

	if (selection.count() < 2) {
		app.displayDialog('Please select at least 2 text layers');
		return;
	}

	var scale = parseFloat(doc.askForUserInput_initialValue('Input your expected line-height (unit em)', '1.5'));
	if (!scale) {
		return;
	}

	var prevLayer, prevFrame;

	for (var i = selection.count() - 1; i >= 0; i--) {
		var layer = selection[i];

		if (layer.className() != 'MSTextLayer') {
			continue;
		}

		if (!prevLayer) {
			prevLayer = layer;
			continue;
		}

		var pos = position(prevLayer, scale);
		align(layer, pos);

		prevLayer = layer;
	};
};

function position(layer, scale) {
	var frame = layer.frame();
	var pos = {};
	pos.x = frame.x(); 
	pos.y = frame.y() + layer.fontSize() * scale; 

	return pos;
};

function align(layer, pos) {
	var frame = layer.frame();
	frame.setX(pos.x);
	frame.setY(pos.y);
};
