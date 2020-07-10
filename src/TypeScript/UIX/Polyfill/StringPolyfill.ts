if(!String.prototype.startsWith){
    String.prototype.startsWith = function(search, rawPos:number) {
        var pos = rawPos > 0 ? rawPos|0 : 0;
        return this.substring(pos, pos + search.length) === search;
    };
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}
if (!String.prototype.trim) {
	String.prototype.trim = function () {
	  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

if (!String.prototype.trimStart) {
	String.prototype.trimStart = function () {
	  return this.replace(/^[\s\uFEFF\xA0]+/g, '');
	};
}

if (!String.prototype.trimEnd) {
	String.prototype.trimEnd = function () {
	  return this.replace(/[\s\uFEFF\xA0]+$/g, '');
	};
}

if (!String.prototype.trimLeft) {
	String.prototype.trimLeft = String.prototype.trimStart;
}

if (!String.prototype.trimRight) {
	String.prototype.trimRight = String.prototype.trimEnd;
}