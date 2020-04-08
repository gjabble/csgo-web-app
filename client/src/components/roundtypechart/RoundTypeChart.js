import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{value}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};


export default class RoundTypeChart extends React.Component {

  constructor(props) {
    super(props);
    let fullbuyrounds = [];
    let ecorounds = [];
    let forcebuyrounds = [];
    for (const round of props.data) {
      if (round.amountSpent == 0) {
        ecorounds.push(round.roundNumber);
      } else if (round.amountSpent < 3000) {
        forcebuyrounds.push(round.roundNumber);
      } else {
        fullbuyrounds.push(round.roundNumber);
      }
    }
    const data = [
      { name: 'Full Buy', value: fullbuyrounds.length },
      { name: 'Force Buy', value: forcebuyrounds.length },
      { name: 'Eco', value: ecorounds.length },
    ];
    this.state = {
      data: {
        rounds: [{
          type: 'Force Buy',
          rounds: forcebuyrounds
        }, {
          type: 'Full Buy',
          rounds: fullbuyrounds
        }, {
          type: 'Eco',
          rounds: ecorounds
        }],
        piechartdata: data
      },
      activeIndex: 0,

    }
    console.log(this.state);
  }

  componentDidMount() {
    let piechart = [...document.querySelectorAll('.recharts-surface')].find((e) => e.viewBox.baseVal.height == 230 && e.viewBox.baseVal.width == 500);
    piechart.viewBox.baseVal.x = -40;
    piechart.viewBox.baseVal.y = 90;
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <Container>
        <Container>
          <Typography align="center" variant="subtitle2">Round Type Table</Typography>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Round Type</TableCell>
                  <TableCell align="center">Rounds</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.rounds ? (this.state.data.rounds.map(round => (
                  <TableRow key={round.type}>
                    <TableCell align="center" component="th" scope="row">
                      {round.type}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{round.rounds.toString()}</Typography>
                    </TableCell>
                  </TableRow>
                ))) : (<TableRow></TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>

        </Container>
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: "40px" }}>
          <Typography align="center" variant="subtitle2">Round Type Distribution Pie Chart</Typography>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={500} height={230}>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.data.piechartdata}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              />
            </PieChart>
          </Container>

        </Container>


      </Container>
    );
  }
}
