import { Button, Slider } from '@mui/material'
import { sum } from 'mathjs';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react';
import CostSavingsTable from '../components/CostSavingsTable';
import executeIndexedValuesScenario from '../compression/IndexedValuesScenario';
import executeScenario from '../compression/ScenarioExecutor';
import executeSortedValuesNoMissingValuesScenario from '../compression/SortedValuesNoMissingValuesScenario';
import executeSortedValuesScenario from '../compression/SortedValuesScenario';
import summarize from '../compression/Summary';

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
      <p>This tool allows you to calculate how much you could save by using delta and/or run-length encoding. The data is randomly generated and can be parameterized to approximate your use case.</p>
      <h2>How many values do you expect?</h2>
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
      <Button sx={{ marginTop: 3, marginBottom: 5 }} variant="contained" onClick={handleExecute}>Calculate</Button>
      <h2>Savings (in bytes)</h2>
      {results.length > 0 ? <CostSavingsTable results={results}/> : <p>No savings calculated yet.</p>}
    </div>
  )
}

export default Home
