/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"portale_fornitori/portale_fornitori/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
