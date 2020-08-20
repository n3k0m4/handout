import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from 'react-bootstrap';
import Company from "./Company";



function Companies() {


    const [items, setItems] = useState([]);
    const All_data = [];
    const fetchItems = async () => {

        for (let index = 1; index < 88; index++) {
            const data = await fetch(`http://localhost:3000/api/companies-${index}.json`);
            const items = await data.json();
            items.results.forEach(element => {
                All_data.push(element);
            });

            setItems(All_data);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const columns = [
        {
            dataField: "id",
            text: "id",
            headerAttrs: { width: 250 },
            attrs: { width: 250, className: "EditRow" }
        },
        {
            dataField: "name",
            text: "Company name",
        },
        {
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatter,
            headerAttrs: { width: 250 },
            attrs: { width: 250, className: "EditRow" }
        }
    ];

    return (
        <Router>
            <Switch>
                <Route path='/companies/:id' component={Company} />
                <BootstrapTable
                    keyField="id"
                    data={items}
                    columns={columns}
                    pagination={paginationFactory()}
                />
            </Switch>
        </Router>
    )
}
function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (

        <div style={{
            textAlign: "center",
            cursor: "pointer",
            lineHeight: "normal"
        }}>
            <Link to={`/companies/${rowIndex + 1}`}>
                <Button key={rowIndex} style={{
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal"
                }} color="primary">Info</Button>{}
            </Link>

            <Button style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal"
            }} color="primary">Hide</Button>{}
        </div >



    );
};



export default Companies;