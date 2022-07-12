const req = (require as any).context(process.env.VUE_APP_SVG, false, /\.svg$/);

const requireAllFile = (requireContext: any) => requireContext.keys().map(requireContext);
requireAllFile(req);

const re = /\.\/(.*)\.svg/;

const requireAll = (requireContext: any) => requireContext.keys();

let svgIcons = requireAll(req).map((i: any) => {
    return "#" + i.match(re)[1]
});

export default svgIcons

