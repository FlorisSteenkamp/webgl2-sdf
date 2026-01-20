import type { GlContext } from "../types/gl-context.js";


/**
 * 
 * @param glContext 
 * @param textureIndex the texture index to use on the GPU
 * @param name a custom name to give to the texture for caching
 */
function useTexture(
        glContext: GlContext,
        textureIndex: number,
        name: string) {

    const { gl, textures } = glContext;
    gl.activeTexture(gl.TEXTURE0 + textureIndex);
    let texture = textures[name];
    
    if (!texture) {
        texture = textures[name] = { tex: gl.createTexture() };
        gl.bindTexture(gl.TEXTURE_2D, texture.tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
        gl.bindTexture(gl.TEXTURE_2D, texture.tex);
    }

    return texture;
}


export { useTexture }
