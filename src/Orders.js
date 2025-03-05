import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { addOrder, clearAll } from "./ordersSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Orders = () => {
    const orders = useSelector((state) => state.orders);
    const canClearAll = useSelector((state) => state.orders.length === 0);
    const dispatch = useDispatch();

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

    const handleAddOrder = () => {
        dispatch(addOrder());
    }

    const handleClearAll = () => {
        dispatch(clearAll());
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleAddOrder}>Add Order</Button>
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleClearAll} disabled={canClearAll}>Clear All</Button>
        </div>
    )
}

export default Orders;
