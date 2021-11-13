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
 */

//@ts-expect-error
import cockpit from 'cockpit';
import React from 'react';
import { Alert, Card, CardTitle, CardBody } from '@patternfly/react-core';

const _ = cockpit.gettext;

interface Props {
}

interface State {
  hostname: string;
}

export class Application extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = { hostname: _("Unknown") };

    cockpit.file('/etc/hostname').watch((content: string) => {
      this.setState({ hostname: content.trim() });
    });
  }

  render() {
    return (
      <Card>
        <CardTitle>Web Hosting</CardTitle>
        <CardBody>
          <Alert
            variant="info"
            title={`Running on ${this.state.hostname}`}
          />
        </CardBody>
      </Card>
    );
  }
}
