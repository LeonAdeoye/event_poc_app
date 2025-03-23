import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeOrderDialog } from "./orderDialogSlice.js";
import {addOrder} from "./ordersSlice";
import {useState} from "react";

const OrderDialog = () => {
    const [symbol, setSymbol] = useState("");
    const [side, setSide] = useState("");
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);

    const isOpen = useSelector((state) => state.orderDialog.isOpen);
    const dispatch = useDispatch();

    const handleAddOrder = () => {
        dispatch(addOrder({ symbol: symbol, quantity: quantity, price: price, side: side }));
        dispatch(closeOrderDialog());
    };

    const handleCancel = () => {
        dispatch(closeOrderDialog());
    };

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value);
    }

    const handleSideChange = (event) => {
        setSide(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogTitle>Add New Order</DialogTitle>
                <DialogContent  style={{ height: '250px', width: '400px'}}>
                    <div className="my-2">
                        <TextField style={{ width: '350px'}} size="small" required label="Symbol" variant="outlined" onChange={handleSymbolChange}/>
                    </div>
                    <div className="my-2">
                        <TextField style={{ width: '350px'}} size="small" required label="Side" variant="outlined" onChange={handleSideChange} />
                    </div>
                    <div className="my-2">
                        <TextField style={{ width: '350px'}} size="small" required label="Price" variant="outlined" onChange={handlePriceChange}/>
                    </div>
                    <div>
                        <TextField style={{ width: '350px'}} size="small" required label="Quantity" variant="outlined" onChange={handleQuantityChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default OrderDialog;
