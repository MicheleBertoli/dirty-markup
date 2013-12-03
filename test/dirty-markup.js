
var assert = require("assert");
var DirtyMarkup = require("../libs/dirty-markup");

describe("DirtyMarkup", function () {

	var dirtyMarkup;

	beforeEach(function () {
		dirtyMarkup = new DirtyMarkup();
	});

	it("should not replace a tag without the style attribute", function () {
		var input = '<div id="dirty-markup"></div>';
		assert.equal(dirtyMarkup.clean(input), input);
	});

	it("should replace the style attribute with class-0", function () {
		var input = '<div style="color:#000"></div>';
		var output = '<div class="class-0"></div>';
		assert.equal(dirtyMarkup.clean(input), output);
	});

	it("should append class-0 to the class attribute", function () {
		var input = '<div style="color:#000" class="dirty-markup"></div>';
		var output = '<div class="dirty-markup class-0"></div>';
		assert.equal(dirtyMarkup.clean(input), output);
	});

	it("should append class-0 to the first element's class attribute", function () {
		var input = '<div style="color:#000" class="dirty-markup"></div><div class="dirty-markup"></div>';
		var output = '<div class="dirty-markup class-0"></div><div class="dirty-markup"></div>';
		assert.equal(dirtyMarkup.clean(input), output);
	});

	it("should append class-0 to the first element's class attribute and class-1 to the second", function () {
		var input = '<div style="color:#000" class="dirty-markup"></div><div style="color:#fff" class="dirty-markup"></div>';
		var output = '<div class="dirty-markup class-0"></div><div class="dirty-markup class-1"></div>';
		assert.equal(dirtyMarkup.clean(input), output);
	});

	it("should return an array containing the replaced rule", function () {
		var input = '<div style="color:#000"></div>';
		dirtyMarkup.clean(input);
		var css = dirtyMarkup.getCSS();
		assert.equal(css[0], "color:#000");
	});

});