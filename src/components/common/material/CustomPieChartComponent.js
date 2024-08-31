import React from "react";
import { useTheme } from "@material-ui/core/styles";

import PieChart, { Series, Legend, Size, Label, Connector } from "devextreme-react/pie-chart";
import PropTypes from "prop-types";

//formats the number to the float points
const formatNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
}).format;

//calculates the total of counts
const calculateTotal = (pieChart) => {
    return formatNumber(
        pieChart
            .getAllSeries()[0]
            .getVisiblePoints()
            .reduce((s, p) => s + p.originalValue, 0)
    );
}

//centerTemplate for Chart center description
const CenterTemplate = ({pieChart, pieChartCenterText}) => {
    /**
    |--------------------------------------------------
    | To use color palette and styles theming
    |--------------------------------------------------
    */
    const theme = useTheme();
    return (
        <svg>
            <text textAnchor="middle" style={{ fontSize: 11, fill:  theme.palette.grey.light, fontFamily:"Roboto"}}>
                <tspan x="100" dy="20px" style={{ fontSize: 24, fontWeight: 700 }}>
                    {calculateTotal(pieChart)}
                </tspan>
                <tspan x="100" dy="10px">
                    {pieChartCenterText ? pieChartCenterText : ""}
                </tspan>
            </text>
        </svg>
    );
};

// Legend Marker count template
const MarkerTemplate = (item) => {
    var color = item?.visible ? (item?.marker?.fill ? item.marker.fill : "#888") : "#888";
    return (
        <svg width="45" height="30" viewBox="0 5 39 44">
            <text
                fontSize="20"
                fill={color ? color : "black"}
                fontFamily="Roboto"
                textAnchor="middle"
                fontWeight={"900"}
                alignmentBaseline="baseline"
                dx="0.6em"
                dy="1.05em"
            >
                {item && item.markerValue ? item.markerValue.toString().length === 1 ? "0" + item.markerValue : item.markerValue : "00"}
            </text>
        </svg>
    );
};

const CustomPieChartComponent = (props) => {
    const { seriesArgumentNameString, seriesValueNameString, statusData, pieChartPalette, pieChartCenterText, pieChartIdentifier } = props;
    /**
    |--------------------------------------------------
    | To use color palette and styles theming
    |--------------------------------------------------
    */
    const theme = useTheme();
    //pie chart status data
    const [state, setState] = React.useState({
        data: statusData,
        pieChartCenterText,
    });

    const customizePoint = (args) => {
        return {
            size:20
        };
    }

    React.useEffect(() => {
        setState((prevState) => {
            if (!statusData) {
                return { data: prevState };
            } else {
                return { data: statusData };
                // [{ argumentFieldLabel: 'Pending', count: this.props.totalReferralCount.pending }, { argumentFieldLabel: 'Accepted', count: this.props.totalReferralCount.accepted }, { argumentFieldLabel: 'Rejected', count: this.props.totalReferralCount.rejected },]
            }
        });
    }, [statusData]);

    return (
        <div>
            <PieChart
                id={pieChartIdentifier? pieChartIdentifier :"pie-chart-".concat(seriesArgumentNameString,"-",seriesValueNameString)}
                dataSource={state.data}
                sizeGroup="piesGroup"
                innerRadius={0.75}
                redrawOnResize={true}
                palette={pieChartPalette ? pieChartPalette : "Bright"}
                centerRender={(pieChartData) => {
                    return <CenterTemplate pieChart={pieChartData} pieChartCenterText={pieChartCenterText} />;
                }}
                type="doughnut"
                // pathModified={true}
                customizePoint={customizePoint}
            >
                <Size height={90} width={220} />
                <Series
                    argumentField={seriesArgumentNameString ? seriesArgumentNameString : "argumentFieldLabel"}
                    valueField={seriesValueNameString ? seriesValueNameString : "count"}
                    hoverMode="none"
                    border={{
                        dashStyle: "solid",
                    }}
                    
                >
                    <Label visible={false} format="fixedPoint" backgroundColor="none">
                        <Connector visible={true} width={1} />
                    </Label>
                    
                </Series>
                <Legend
                    visible={true}
                    margin={10}
                    horizontalAlignment="right"
                    verticalAlignment="center"
                    markerSize={25}
                    hoverMode={"none"}
                    font={{
                        family:"Roboto",
                        color:theme.palette.grey.light
                    }}
                    markerRender={(data) => {
                        let markerValue = state.data.find((pieChartData) => pieChartData && data && pieChartData[`${seriesArgumentNameString}`] === data.argument)?.[`${seriesValueNameString}`];
                        let propsData = { ...data, markerValue };
                        return (
                            <>
                                <MarkerTemplate {...propsData} />
                            </>
                        );
                    }}
                />
            </PieChart>
        </div>
    );
};

const defaultData = [
    { argumentFieldLabel: "Status 1", count: 0 },
    { argumentFieldLabel: "Status 2", count: 0 },
    { argumentFieldLabel: "Status 3", count: 0 },
];

CustomPieChartComponent.defaultProps = {
    statusData: defaultData,
    seriesArgumentNameString: "argumentFieldLabel",
    seriesValueNameString: "count",
};

CustomPieChartComponent.propTypes = {
    statusData: PropTypes.any,
    seriesArgumentNameString: PropTypes.any,
    seriesValueNameString: PropTypes.any,
    pieChartPalette: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]).isRequired,
    pieChartIdentifier:PropTypes.any
};

export default CustomPieChartComponent;
