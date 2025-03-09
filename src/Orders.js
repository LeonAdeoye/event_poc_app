import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState} from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { clearAll } from "./ordersSlice";
import { openOrderDialog } from "./orderDialogSlice";
import OrderDialog from "./OrderDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

const Orders = () => {
    const orders = useSelector((state) => state.orders.orders);
    const canClearAll = useSelector((state) => state.orders.length === 0);
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
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={orders}
                columnDefs={colDefs}
            />
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleAddOrder}>Add Order</Button>
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleClearAll} disabled={canClearAll}>Clear All</Button>
            <OrderDialog/>
        </div>
    )
}

export default Orders;
