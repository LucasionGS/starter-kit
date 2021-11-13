/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 * 
 * TypeScript configuration and cockpit types by:
 * Lucasion
 * 
 */

const cockpit: typeof import("../declarations/cockpit").cockpit = require('cockpit');
import React from 'react';
import { Alert, Card, CardTitle, CardBody } from '@patternfly/react-core';

interface Props {

}

interface State {
  vhosts: string[];
}

export class Application extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      vhosts: [],
    };

    // Fetch virtual hosts
    cockpit.spawn(["ls", "-1", "/var/www/vhosts"]).then((output) => {
      this.setState({ vhosts: output.split("\n") });
    }).catch((ex) => {
      this.setState({ vhosts: [] });
      console.error(ex);
    });
  }

  render() {
    return (
      <Card>
        <CardTitle>TypeScript Starter Kit - Virtual webhost list</CardTitle>
        <CardBody>
          {/* <Alert
            variant="info"
            title={`Running on nginx`}
          /> */}
          <div>
            {this.state.vhosts.map((vhost) => {
              return (
                <div key={vhost}>
                  <a onClick={e => {
                    e.preventDefault();
                    window.open(`//${vhost}`, "_blank");
                  }} href={`//${vhost}`}>{vhost}</a>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    );
  }
}
