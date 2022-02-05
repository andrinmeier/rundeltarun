import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ICostSavingsTableProps {
    results: any[]
}

const CostSavingsTable = (props: ICostSavingsTableProps) => {
    return (<TableContainer component={Paper}>
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
                {props.results.map((result: any) => (
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
    </TableContainer>);
}

export default CostSavingsTable;