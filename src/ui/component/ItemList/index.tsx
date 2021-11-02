import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Table} from "react-bootstrap";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import QuantityInput from "../QuantityInput";
import "./index.css";

export type Item = {
    id: number | string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number,
    subtotal: number
}

type Props = {
    items: Item[],
    updateItemQuantity?: (id: number | string, quantity: number) => void,
    deleteItem?: (id: number | string) => void,
    editable: boolean
};

export default function ItemList(props: Props) {
    return (
        <Table striped bordered hover className="itemList">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name (Unit Price)</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                {
                    (props.editable) && <th>Action</th>
                }
            </tr>
            </thead>
            <tbody>
            {
                props.items.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td><img src={item.imageUrl}/></td>
                            <td>{item.name} (${item.price})</td>
                            <td>
                                <QuantityInput
                                    quantity={item.quantity}
                                    updateQuantity={(quantity) => {
                                        props.updateItemQuantity && props.updateItemQuantity(item.id, quantity);
                                    }}
                                />
                            </td>
                            <td>${item.subtotal}</td>
                            {
                                (props.editable) && (
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => props.deleteItem && props.deleteItem(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                    </td>
                                )
                            }
                        </tr>
                    )
                })
            }

            </tbody>
        </Table>
    );
}