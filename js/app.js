"use strict";

main();
function main() {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");

    if(!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    //creat program for face
    const program = initShaderProgram(gl, vsSource, fsSource);

    const numOfComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    const vertexCount = 3;


    gl.clearColor(1.0,1.0,1.0,1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

    //face
    for(var i = 0; i<72;i++){

        const positions = [0.0, 0.0, Math.cos((Math.PI/36)*i), Math.sin((Math.PI/36)*i), Math.cos((Math.PI/36)*(i+1)), Math.sin((Math.PI/36)*(i+1))];

        const buffer = initBuffer(gl, positions);

        gl.useProgram(program);
        gl.enableVertexAttribArray(gl.getAttribLocation(program, "a_position"));
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
        gl.vertexAttribPointer(gl.getAttribLocation(program, "a_position"), numOfComponents, type, normalize, stride, offset);
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

    }


    //creat program for eyes
    const programEye = initShaderProgram(gl, vsSourceEyes, fsSourceEyes);
    //eyes
    for(var i = 0; i<72;i++){

        // right eye
        const positions = [(0.0)+0.35, (0.0)+0.35, Math.cos((Math.PI/36)*i)/6+0.35, Math.sin((Math.PI/36)*i)/6+0.35, Math.cos((Math.PI/36)*(i+1))/6+0.35, Math.sin((Math.PI/36)*(i+1))/6+0.35];

        const buffer = initBuffer(gl, positions);

        gl.useProgram(programEye);
        gl.enableVertexAttribArray(gl.getAttribLocation(programEye, "a_position"));
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
        gl.vertexAttribPointer(gl.getAttribLocation(programEye, "a_position"), numOfComponents, type, normalize, stride, offset);
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

        // left eye
        const positions1 = [(0.0)-0.35, (0.0)+0.35, Math.cos((Math.PI/36)*i)/6-0.35, Math.sin((Math.PI/36)*i)/6+0.35, Math.cos((Math.PI/36)*(i+1))/6-0.35, Math.sin((Math.PI/36)*(i+1))/6+0.35];

        const buffer1 = initBuffer(gl, positions1);

        gl.useProgram(programEye);
        gl.enableVertexAttribArray(gl.getAttribLocation(programEye, "a_position"));
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer1.position);
        gl.vertexAttribPointer(gl.getAttribLocation(programEye, "a_position"), numOfComponents, type, normalize, stride, offset);
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

    }

    //creat program for mask
    const programMask = initShaderProgram(gl,vsSourceMask,fsSourceMask);
    const positionsMask = [ -0.6, 0.0,
                             0.6, 0.0,
                            -0.6, -0.6,
                             0.6, -0.6];
    const bufferMask = initBuffer(gl, positionsMask);
    const vertexCountMask = 4;
    gl.useProgram(programMask);
    gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask.position);
    gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask);

    for(var t = -0.6; t<0.6; t+=0.01){
        var Qx = t;
        var Qy = (-5/9)*t*t + 0.2;

        const positionsMask1 = [ 0.6, 0.0,
                                 Qx, Qy,
                                 -0.6, 0.0];

        const bufferMask1 = initBuffer(gl, positionsMask1);
        const vertexCountMask1 = 3;


        gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask1.position);
        gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask1);
    }
    for(var t = -0.6; t<0.6; t+=0.01){
        var Qxx = t;
        var Qyy = (5/9)*t*t - 0.8;

        const positionsMask1 = [ -0.6, -0.6,
                                  Qxx, Qyy,
                                  0.6, -0.6];

        const bufferMask1 = initBuffer(gl, positionsMask1);
        const vertexCountMask1 = 3;

        gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask1.position);
        gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask1);
    }

    const positionsMask2 = [  0.6, 0.0,
                              0.99, 0.15,
                              0.6, -0.09,
                              0.999, 0.07,];
    const bufferMask2 = initBuffer(gl, positionsMask2);
    gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask2.position);
    gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask);
    const positionsMask3 = [  -0.6, 0.0,
        -0.99, 0.15,
        -0.6, -0.09,
        -0.999, 0.07,];
    const bufferMask3 = initBuffer(gl, positionsMask3);
    gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask3.position);
    gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask);
    const positionsMask4 = [  0.6, -0.51,
        0.79, -0.613,
        0.6, -0.6,
        0.74, -0.674];
    const bufferMask4 = initBuffer(gl, positionsMask4);
    gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask4.position);
    gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask);
    const positionsMask5 = [  -0.6, -0.51,
        -.79, -0.613,
        -0.6, -0.6,
        -0.74, -0.674];
    const bufferMask5 = initBuffer(gl, positionsMask5);
    gl.enableVertexAttribArray(gl.getAttribLocation(programMask, "a_position"));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferMask5.position);
    gl.vertexAttribPointer(gl.getAttribLocation(programMask, "a_position"), numOfComponents, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCountMask);

}