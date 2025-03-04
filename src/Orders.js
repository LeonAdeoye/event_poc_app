import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useState} from "react";
import {Button} from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

const Orders = () => {
    const [rowData] = useState([
        { symbol: "0001.HK", quantity: 1000, price: 64950, side: "BUY" },
        { symbol: "0002.HK", quantity: 100000, price: 33850, side: "SELL" },
        { symbol: "0005.HK", quantity: 5000, price: 29600, side: "BUY" },
    ]);

    const [colDefs] = useState([
        { field: "symbol" },
        { field: "quantity" },
        { field: "price" },
        { field: "side" }
    ]);

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
            <Button variant="contained">Add</Button>
        </div>
    )
}

export default Orders;
