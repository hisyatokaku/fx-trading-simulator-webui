import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

// Use the "basic" bundle (scatter/bar/pie only) to keep the bundle size down.
const Plot = createPlotlyComponent(Plotly);

export default Plot;
