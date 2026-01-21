import { GlContext } from '../types/gl-context.js';


function freeGlContext(
        glContext: GlContext | undefined) {

    if (glContext === undefined) { return; }

    const { gl, programs, textures } = glContext;

    for (let key in programs) {
        const { attributes, fragmentShader, vertexShader, uniformBlocks, program } = programs[key];

        for (let key in uniformBlocks) {
            const { buf } = uniformBlocks[key];
            gl.deleteBuffer(buf);
        }
        for (let key in attributes) {
            const { buf } = attributes[key];
            gl.deleteBuffer(buf);
        }
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        gl.deleteProgram(program);
    }

    for (let key in textures) {
        const { tex } = textures[key];
        gl.deleteTexture(tex);

    }
}


export { freeGlContext }
