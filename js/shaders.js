const vsSource = `
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`;

const fsSource = `
    void main() {
        gl_FragColor = vec4(0.929, 0.831, 0.090, 1.0);
    }
`;

const vsSourceEyes = `
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`;

const fsSourceEyes = `
    void main() {
        gl_FragColor = vec4(0.31, 0.211, 0.078, 1.0);
    }
`;

const vsSourceMask = `
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`;

const fsSourceMask = `
    void main() {
        gl_FragColor = vec4(0.839, 0.878, 0.921, 1.0);
    }
`;