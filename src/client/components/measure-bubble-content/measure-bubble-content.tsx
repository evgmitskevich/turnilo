/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Datum } from "plywood";
import * as React from "react";
import { DataSeries } from "../../../common/models/data-series/data-series";
import { SeriesDerivation } from "../../../common/models/series/series";
import { Delta } from "../delta/delta";
import "./measure-bubble-content.scss";

export interface MeasureBubbleContentProps {
  datum: Datum;
  series: DataSeries;
}

export const MeasureBubbleContent: React.SFC<MeasureBubbleContentProps> = ({ series, datum }) => {
  const formatter = series.datumFormatter();
  const currentValue = formatter(datum);
  const previousValue = formatter(datum, SeriesDerivation.PREVIOUS);
  return <React.Fragment>
    <strong className="current-value">{currentValue}</strong>
    <span className="previous-value">{previousValue}</span>
    <Delta series={series} datum={datum} />
  </React.Fragment>;
};
