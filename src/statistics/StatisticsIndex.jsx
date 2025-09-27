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
import {apiGet} from "../utils/api";

import StatisticsTable from "./StatisticsTable";

const StatisticsIndex = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setStatistics(data));
    }, []);

    return (
        <div>
            <h1>Statistiky osob</h1>
            <StatisticsTable
                items={statistics}
                label="Počet osob:"
            />
        </div>
    );
};

export default StatisticsIndex;
