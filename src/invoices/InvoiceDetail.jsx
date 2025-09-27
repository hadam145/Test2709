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
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceDetail = () => {
    const [invoice, setInvoice] = useState({});

    const {id} = useParams();

    useEffect(() => {
        apiGet("/api/invoices/" + id)
            .then((data) => setInvoice(data))
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const genres = invoice.genres?.map((item) => Genre[item]);

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <h3>
                #{invoice.invoiceNumber} <small>({invoice.product})</small>
            </h3>
            <p>{genres?.join(" / ")}</p>
            <p>
                <strong>Dodavatel: </strong>
                {invoice.seller?.name}
                <br/>
                <strong>Odběratel: </strong>
                {invoice.buyer?.name}
                <br/>
                <strong>Vystaveno: </strong>
                {dateStringFormatter(invoice.issued, true)}
                <br/>
                <strong>Datum splatnosti: </strong>
                {dateStringFormatter(invoice.dueDate, true)}
                <br/>
                <strong>Částka: </strong>
                {invoice.price}
                <br/>
                <strong>DPH: </strong>
                {invoice.vat}
                <br/>
                <strong>Poznámka: </strong>
                {invoice.note}
            </p>
        </div>
    );
};

export default InvoiceDetail;
