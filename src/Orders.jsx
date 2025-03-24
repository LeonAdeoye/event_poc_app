import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState} from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { clearAll } from "./ordersSlice";
import { openOrderDialog } from "./orderDialogSlice.js";
import OrderDialog from "./OrderDialog.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

const Orders = () => {
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    const [colDefs] = useState([
        { field: "symbol" },
        { field: "quantity" },
        { field: "price" },
        { field: "side" }
    ]);

    const handleAddOrder = () => {
        dispatch(openOrderDialog());
    }

    const handleClearAll = () => {
        dispatch(clearAll());
    }

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact
                rowData={orders}
                columnDefs={colDefs}
            />
            <Button sx={{textTransform: 'capitalize', marginTop: 1, marginRight: 1}} variant="contained" onClick={handleAddOrder}>Add Order</Button>
            <Button sx={{textTransform: 'capitalize', marginTop: 1, marginRight: 1}} variant="contained" onClick={handleClearAll} disabled={orders.length === 0}>Clear All</Button>
            <OrderDialog/>
        </div>
    )
}

export default Orders;
