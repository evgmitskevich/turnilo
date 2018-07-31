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

import { CollectionTileFixtures } from "../collection-tile/collection-tile.fixtures";
import { Collection, CollectionContext, CollectionJS } from "./collection";

export class CollectionFixtures {
  public static testOneOnlyJS(): CollectionJS {
    return {
      title: "The Links Will Rise Again!",
      name: "the_links_will_rise_again",
      tiles: [
        CollectionTileFixtures.testOneJS()
      ]
    };
  }

  public static testOneTwoJS(): CollectionJS {
    return {
      title: "The Links Will Be Reloaded!",
      name: "the_links_will_be_reloaded",
      tiles: [
        CollectionTileFixtures.testOneJS(),
        CollectionTileFixtures.testTwoJS()
      ]
    };
  }

  static getContext(): CollectionContext {
    return CollectionTileFixtures.getContext();
  }

  static testOneOnly() {
    return Collection.fromJS(CollectionFixtures.testOneOnlyJS(), CollectionFixtures.getContext());
  }

  static testOneTwo() {
    return Collection.fromJS(CollectionFixtures.testOneTwoJS(), CollectionFixtures.getContext());
  }
}