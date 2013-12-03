
var fs = require("fs");
var recursive = require("recursive-readdir");
var DirtyMarkup = require("./libs/dirty-markup.js");

var dir = "example/";
var style = dir + "style.css";
var dirtyMarkup = new DirtyMarkup();

function writeStyle (css) {

	var content = "";
	for (var i = 0; i < css.length; i++) {
		content += ".class-" + i + "{" + css[i] + "}\n";
	}	

	fs.writeFile(style, content, "utf8", function (err) {
		if (err) {
			console.log(err);
			return;
		}
	});

}

recursive(dir, function (err, files) {

	if (err) {
		console.log(err);
		return;
	}

	var count = files.length;

	files
		.filter(function (file) {
			return file.substr(-4) === ".htm"; 
		})
		.forEach(function (file) { 

			fs.readFile(file, "utf-8", function (err, data) { 

				if (err) {
					console.log(err);
					return;
				}

				var output = dirtyMarkup.clean(data);

				fs.writeFile(file, output, "utf8", function (err) {
					if (err) {
						console.log(err);
						return;
					}
				});

				count--;
				if (count === 0) {
					writeStyle(dirtyMarkup.getCSS());
				}

			});

        });

});