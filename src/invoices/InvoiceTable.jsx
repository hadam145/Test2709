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

import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice, renderActions = true}) => {
    return (
        <div>
            <p>
                <strong>{label}</strong> {items.length}
            </p>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Částka</th>
                    {renderActions && (<th colSpan={3}>Akce</th>)}
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.price}</td>
                        {renderActions && (
                            <td>
                                <div className="btn-group">
                                    <div className="btn-group">
                                        <Link
                                            to={"/invoices/show/" + item._id}
                                            className="btn btn-sm btn-info"
                                        >
                                            Zobrazit
                                        </Link>
                                        <Link
                                            to={"/invoices/edit/" + item._id}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Upravit
                                        </Link>
                                        <button
                                            onClick={() => deleteInvoice(item._id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Odstranit
                                        </button>
                                    </div>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            {renderActions && (
                <Link to={"/invoices/create"} className="btn btn-success">
                    Nová faktura
                </Link>
            )}
        </div>
    );
};

export default InvoiceTable;
