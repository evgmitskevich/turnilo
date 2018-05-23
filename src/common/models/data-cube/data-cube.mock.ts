/*
 * Copyright 2015-2016 Imply Data, Inc.
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

import { Dataset, basicExecutorFactory } from 'plywood';
import { DimensionsFixtures } from "../dimension/dimensions.fixtures";
import { MeasuresFixtures } from "../measure/measures.fixtures";
import { DataCube, DataCubeJS } from './data-cube';

var executor = basicExecutorFactory({
  datasets: {
    wiki: Dataset.fromJS([]),
    twitter: Dataset.fromJS([])
  }
});

export class DataCubeMock {
  public static get WIKI_JS(): DataCubeJS {
    return {
      name: 'wiki',
      title: 'Wiki',
      description: 'Wiki description',
      clusterName: 'druid-wiki',
      source: 'wiki',
      introspection: 'none',
      attributes: [
        { name: 'time', type: 'TIME' },
        { name: 'articleName', type: 'STRING' },
        { name: 'page', type: 'STRING' },
        { name: 'userChars', type: 'SET/STRING' },
        { name: 'count', type: 'NUMBER', unsplitable: true, maker: { op: 'count' } }
      ],
      dimensions: DimensionsFixtures.wikiJS(),
      measures: MeasuresFixtures.wikiJS(),
      timeAttribute: 'time',
      defaultTimezone: 'Etc/UTC',
      defaultFilter: { op: 'literal', value: true },
      defaultDuration: 'P3D',
      defaultSortMeasure: 'count',
      defaultPinnedDimensions: ['articleName'],
      defaultSelectedMeasures: ['count'],
      refreshRule: {
        time: new Date('2016-04-30T12:39:51.350Z'),
        rule: "fixed"
      }
    };
  }

  public static get TWITTER_JS(): DataCubeJS {
    return {
      name: 'twitter',
      title: 'Twitter',
      description: 'Twitter description should go here',
      clusterName: 'druid-twitter',
      source: 'twitter',
      introspection: 'none',
      dimensions: DimensionsFixtures.twitterJS(),
      measures: MeasuresFixtures.twitterJS(),
      timeAttribute: 'time',
      defaultTimezone: 'Etc/UTC',
      defaultFilter: { op: 'literal', value: true },
      defaultDuration: 'P3D',
      defaultSortMeasure: 'count',
      defaultPinnedDimensions: ['tweet'],
      refreshRule: {
        rule: "realtime"
      }
    };
  }

  static wiki() {
    return DataCube.fromJS(DataCubeMock.WIKI_JS, { executor });
  }

  static twitter() {
    return DataCube.fromJS(DataCubeMock.TWITTER_JS, { executor });
  }
}
