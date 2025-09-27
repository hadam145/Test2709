/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *
 *                      ___ ___ ___
 *                     | . |  _| . |  LICENCE
 *                     |  _|_| |___|
 *                     |_|
 *
 *    REKVALIFIKAČNÍ KURZY  <>  PROGRAMOVÁNÍ  <>  IT KARIÉRA
 *
 * Tento zdrojový kód je součástí profesionálních IT kurzů na
 * WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci PRO obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na https://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [persons, setPersons] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [statistics, setStatistics] = useState();
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined,
        fromYear: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/invoices/statistics").then((data) => setStatistics(data));
    }, []);

    const deleteInvoice = async (id) => {
        await apiDelete("/api/invoices/" + id);
        setInvoices(invoices.filter((invoice) => invoice._id !== id));
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
        if (
            e.target.value === "false" ||
            e.target.value === "true" ||
            e.target.value === ""
        ) {
            setFilter((prevState) => {
                return {...prevState, [e.target.name]: undefined};
            });
        } else {
            setFilter((prevState) => {
                return {...prevState, [e.target.name]: e.target.value};
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await apiGet("/api/invoices", filterState);
        setInvoices(data);
    };

    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr/>

            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                persons={persons}
                filter={filterState}
                confirm="Filtrovat faktury"
            />

            <hr/>
            <div className="d-flex gap-3">
                <div className={"d-flex flex-column"}>
                    <label className={"fw-bold"}>Bilance za celé období:</label>
                    {statistics && statistics.allTimeSum} Kč
                </div>
                <div className={"d-flex flex-column"}>
                    <label className={"fw-bold"}>Bilance za tento rok:</label>
                    {statistics && statistics.currentYearSum} Kč
                </div>
            </div>

            <hr/>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;
