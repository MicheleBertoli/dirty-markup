
module.exports = (function () {

	var DirtyMarkup = function () {

		this.css = [];

		this.regex = {
			style: /(<[^>]+(style="(.*?)")[^>]*>)/gi,
			cssClass: /class="(.*?)"/i,
			space: /\s{2,}/g,
		};

	};

	DirtyMarkup.prototype.getCSS = function () {

		return this.css;	
	
	};

	DirtyMarkup.prototype.clean = function (input) {

		var output = input;
		var styleMatch;

		while ((styleMatch = this.regex.style.exec(input)) !== null) {

			var index = this.css.indexOf(styleMatch[3]);
			if (index === -1) {
				this.css.push(styleMatch[3]);
				index = this.css.length - 1;
			}
			var className = "class-" + index;
			
			var cssClassMatch = this.regex.cssClass.exec(styleMatch[0]);
			if (cssClassMatch !== null) {
				var tag = styleMatch[1].replace(cssClassMatch[1], cssClassMatch[1] + " " + className);
				output = output.replace(styleMatch[1], tag);
				output = output.replace(styleMatch[2], "");
				output = output.replace(this.regex.space, " ");
			} else {
				output = output.replace(styleMatch[2], "class=\"" + className + "\"");
			}

		}

		return output;	
	
	};

	return DirtyMarkup;

})();