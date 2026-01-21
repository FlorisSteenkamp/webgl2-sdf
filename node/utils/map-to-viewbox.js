function mapToViewbox(viewbox, width, height, psss) {
    if (viewbox[0] === 0 && viewbox[1] === 0 &&
        viewbox[2] === width && viewbox[3] === height) {
        return psss;
    }
    const [vx, vy, vw, vh] = viewbox;
    const scaleX = width / vw;
    const scaleY = height / vh;
    const psss_ = [];
    for (let i = 0; i < psss.length; i++) {
        const pss = psss[i];
        const pss_ = [];
        for (let j = 0; j < pss.length; j++) {
            const ps = pss[j];
            const ps_ = [];
            for (let k = 0; k < ps.length; k++) {
                const [x, y] = ps[k];
                const x_ = scaleX * x - vx;
                const y_ = scaleY * y - vy;
                ps_.push([x_, y_]);
            }
            pss_.push(ps_);
        }
        psss_.push(pss_);
    }
    return psss_;
}
export { mapToViewbox };
//# sourceMappingURL=map-to-viewbox.js.map