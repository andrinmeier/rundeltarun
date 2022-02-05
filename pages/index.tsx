import { Button, Slider } from '@mui/material'
import { sum } from 'mathjs';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react';
import executeIndexedValuesScenario from '../compression/IndexedValuesScenario';
import executeScenario from '../compression/ScenarioExecutor';
import executeSortedValuesNoMissingValuesScenario from '../compression/SortedValuesNoMissingValuesScenario';
import executeSortedValuesScenario from '../compression/SortedValuesScenario';
import summarize from '../compression/Summary';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Home: NextPage = () => {
  const [numberOfValues, setNumberOfValues] = useState(10);
  const [rangeValue, setRangeValue] = useState([0, 10]);
  const [results, setResults] = useState<any>([]);

  const handleNumberOfValuesChange = useCallback((event: any, newValue: any) => {
    setNumberOfValues(newValue);
  }, []);

  const handleRangeChange = useCallback((event: any, newValue: any) => {
    setRangeValue(newValue);
  }, []);

  const handleExecute = useCallback(() => {
    const scenario1 = executeScenario(executeSortedValuesScenario, 100, numberOfValues, rangeValue[0], rangeValue[1]);
    const scenario2 = executeScenario(executeSortedValuesNoMissingValuesScenario, 100, numberOfValues, rangeValue[0], rangeValue[1]);
    const scenario3 = executeScenario(executeIndexedValuesScenario, 100, numberOfValues, rangeValue[0], rangeValue[1]);
    const basisValues = scenario1.map(e => e["none"]);
    const basisTotal = sum(basisValues);
    const scenario1Summary = summarize(scenario1, basisTotal, "Sorted");
    const scenario2Summary = summarize(scenario2, basisTotal, "Sorted, no missing values");
    const scenario3Summary = summarize(scenario3, basisTotal, "Sorted and indexed");
    setResults(scenario1Summary.concat(scenario2Summary).concat(scenario3Summary));
  }, [numberOfValues, rangeValue]);

  return (
    <div>
      <Head>
        <title>Delta Run-Length Encoding Savings Calculator</title>
        <link
          rel="canonical"
          href="https://rundeltarun.com"
          key="canonical"
        />
        <meta
          name="description"
          content="Find out how much space you can save by compressing your data with delta and run-length encoding."
          key="desc"
        />
      </Head>
      <h1>Delta Run-Length Encoding Savings Calculator</h1>
      <p>This tool allows you to calculate how much you would save if you were to use delta and/or run-length encoding. The data is randomly generated and can be parameterized to approximated your use case.</p>
      <h2>How many values do you expected?</h2>
      <Slider
        aria-label="Number of values"
        value={numberOfValues}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={100}
        onChange={handleNumberOfValuesChange}
      />
      <h2>In what range are these values?</h2>
      <Slider
        getAriaLabel={() => 'Range'}
        value={rangeValue}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={255}
        onChange={handleRangeChange}
      />
      <Button variant="contained" onClick={handleExecute}>Calcuate savings</Button>
      <h2>Calculated savings</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">0.25</TableCell>
              <TableCell align="right">0.5</TableCell>
              <TableCell align="right">0.75</TableCell>
              <TableCell align="right">Std</TableCell>
              <TableCell align="right">Mean</TableCell>
              <TableCell align="right">Savings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results && results.map((result: any) => (
              <TableRow
                key={result.name}
              >
                <TableCell component="th" scope="row">
                  {result.name}
                </TableCell>
                <TableCell align="right">{result["0.25"]}</TableCell>
                <TableCell align="right">{result["0.50"]}</TableCell>
                <TableCell align="right">{result["0.75"]}</TableCell>
                <TableCell align="right">{result["std"]}</TableCell>
                <TableCell align="right">{result["mean"]}</TableCell>
                <TableCell align="right">{result["savings"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
