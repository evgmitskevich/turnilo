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

import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import { DataSeries } from "../../../common/models/data-series/data-series";
import { MeasureFixtures } from "../../../common/models/measure/measure.fixtures";
import { SeriesDerivation } from "../../../common/models/series/series";
import { Delta, formatDelta } from "./delta";

const dataSeries = new DataSeries({ measure: MeasureFixtures.wikiCount() });

const makeDatum = (current: number, previous: number) => ({
  [dataSeries.fullName()]: current,
  [dataSeries.fullName(SeriesDerivation.PREVIOUS)]: previous
});

const makeDelta = (current: number, previous: number, lowerIsBetter = false) =>
  lowerIsBetter ?
    <Delta series={dataSeries.set("measure", MeasureFixtures.wikiCountLowerIsBetter())} datum={makeDatum(current, previous)} /> :
    <Delta series={dataSeries} datum={makeDatum(current, previous)} />;

describe("Delta", () => {

  describe("formatDelta", () => {
    it("should handle nil values", () => {
      expect(formatDelta(makeDatum(null, 5), dataSeries)).to.equal(null);
      expect(formatDelta(makeDatum(undefined, 5), dataSeries)).to.equal(null);
      expect(formatDelta(makeDatum(5, undefined), dataSeries)).to.equal(null);
      expect(formatDelta(makeDatum(5, null), dataSeries)).to.equal(null);
    });

    it("should calculate delta attributes correctly", () => {
      expect(formatDelta(makeDatum(10, 5), dataSeries)).to.deep.equal({ delta: 5, deltaPercentage: 100, deltaSign: 1 });
      expect(formatDelta(makeDatum(5, 10), dataSeries)).to.deep.equal({ delta: -5, deltaPercentage: -50, deltaSign: -1 });
      expect(formatDelta(makeDatum(10, 10), dataSeries)).to.deep.equal({ delta: 0, deltaPercentage: 0, deltaSign: 0 });
    });
  });

  describe("<Delta>", () => {
    it("should handle cases with empty values", () => {
      const emptyCurrent = shallow(makeDelta(undefined, 2));
      const emptyPrevious = shallow(makeDelta(2, undefined));

      expect(emptyCurrent.find("span").hasClass("delta-neutral")).to.be.true;
      expect(emptyCurrent.find("span").contains("-")).to.be.true;

      expect(emptyPrevious.find("span").hasClass("delta-neutral")).to.be.true;
      expect(emptyPrevious.find("span").contains("-")).to.be.true;
    });

    it("should render properly positive delta", () => {
      const delta = shallow(makeDelta(100, 50));

      const deltaNode = delta.find("span");

      expect(deltaNode.hasClass("delta-positive")).to.be.true;
      expect(deltaNode.text()).to.be.equal("▲50 (100%)");
    });

    it("should render properly positive delta for lower-is-better measure", () => {
      const delta = shallow(makeDelta(100, 50, true));

      const deltaNode = delta.find("span");

      expect(deltaNode.hasClass("delta-negative")).to.be.true;
      expect(deltaNode.text()).to.be.equal("▲50 (100%)");
    });

    it("should render properly negative delta", () => {
      const delta = shallow(makeDelta(100, 200));

      const deltaNode = delta.find("span");

      expect(deltaNode.hasClass("delta-negative")).to.be.true;
      expect(deltaNode.text()).to.be.equal("▼100 (50%)");
    });

    it("should render properly negative delta for lower-is-better measure", () => {
      const delta = shallow(makeDelta(100, 200, true));

      const deltaNode = delta.find("span");

      expect(deltaNode.hasClass("delta-positive")).to.be.true;
      expect(deltaNode.text()).to.be.equal("▼100 (50%)");
    });

    it("should render properly neutral delta", () => {
      const delta = shallow(makeDelta(100, 100));

      const deltaNode = delta.find("span");

      expect(deltaNode.hasClass("delta-neutral")).to.be.true;
      expect(deltaNode.text()).to.be.equal("0 (0%)");
    });

    it("should handle infinite cases for delta percentage", () => {
      const positive = shallow(makeDelta(100, 0));
      const negative = shallow(makeDelta(-100, 0));

      const positiveNode = positive.find("span");
      const negativeNode = negative.find("span");

      expect(positiveNode.hasClass("delta-positive")).to.be.true;
      expect(positiveNode.text()).to.be.equal("▲100");

      expect(negativeNode.hasClass("delta-negative")).to.be.true;
      expect(negativeNode.text()).to.be.equal("▼100");
    });
  });
});
