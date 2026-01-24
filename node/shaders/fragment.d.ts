declare const GLSL_PATTERN1 = "\n    float exponent = uCustom.x;\n    res = pow(1.0 - res, exponent);\n    float alpha = res <= 0.0 ? 0.0 : 0.5;\n    float red = inside ? 0.2 : 0.8;\n    float green = abs(sin(25.0 * res));\n    float blue = 0.5;\n";
declare const GLSL_DEFAULT = "\n    float exponent = uCustom.x;\n    res = (pow(1.0 - res, exponent) * 0.5) * (inside ? -1.0 : 1.0);\n    float red = res;\n    float green = res;\n    float blue = res;\n    float alpha = res;\n";
declare function getFragment(colCount: number, padCount: number, calcFragColorStr: string, hash: number): string;
export { getFragment, GLSL_PATTERN1, GLSL_DEFAULT };
