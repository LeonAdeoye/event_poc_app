import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState} from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { addOrder, clearAll } from "./ordersSlice";
import { open, close } from "./orderDialogSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Orders = () => {
    const orders = useSelector((state) => state.orders);
    const isOpen = useSelector((state) => state.isOpen);
    const canClearAll = useSelector((state) => state.orders.length === 0);
    const dispatch = useDispatch();

    const [colDefs] = useState([
        { field: "symbol" },
        { field: "quantity" },
        { field: "price" },
        { field: "side" }
    ]);

    const handleAddOrder = () => {
        dispatch(open());
        dispatch(addOrder({ symbol: "0005.HK", quantity: 5000, price: 29600, side: "BUY" }));
    }

    const handleClearAll = () => {
        dispatch(clearAll());
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={orders.orders}
                columnDefs={colDefs}
            />
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleAddOrder}>Add Order</Button>
            <Button sx={{textTransform: 'capitalize'}} variant="contained" onClick={handleClearAll} disabled={canClearAll}>Clear All</Button>
        </div>
    )
}

export default Orders;
