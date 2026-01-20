
/**
 * Just a general texture width for our textures holding general data.
 * * width cannot be too small otherwise width or height might exceed
 * `gl.getParameter(gl.MAX_TEXTURE_SIZE)`
 * * if width is too large we might need to pad too many zeros so `256` is a
 * good balance since we are guaranteed at least 4096 for MAX_TEXTURE_SIZE
 * so we can store 256 * 4096 = 1_048_576 values per texture, more than
 * adequate for our purposes
 */
const TEX_WIDTH = 256;


export { TEX_WIDTH }
