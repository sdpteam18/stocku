import { render } from 'react-dom';

/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { chartData } from './indicator-data';
import { SampleBase } from './sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export let tooltipRender = (args) => {
    if (args.text.split('<br/>')[4]) {
        let target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
        let value = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
};
export default class HistoricalStockChart extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <StockChartComponent id='stockchartdefault' primaryXAxis={{
            valueType: 'DateTime',
            majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' },
            crosshairTooltip: { enable: true }
        }} primaryYAxis={{
            labelFormat: 'n0',
            lineStyle: { width: 0 }, rangePadding: 'None',
            majorTickLines: { width: 0 }
        }} border={{border: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} tooltipRender={tooltipRender} crosshair={{ enable: true }}
        >
                        <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={chartData} xName='x' type='Candle' animation={{ enable: true }}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
            </div>);
    }
    
    // load(args) {
    //     let selectedTheme = location.hash.split('/')[1];
    //     selectedTheme = selectedTheme ? selectedTheme : 'Material';
    //     args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
    //         replace(/-dark/i, "Dark");
    // }
}

// render(<Default />, document.getElementById('sample'));