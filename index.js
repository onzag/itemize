// Hack file to call the nodejs itemize index executable because
// npm will attempt to use the index file before it even exists
// and there seems no way to tell npm not to do so
require("./nodejs/index");