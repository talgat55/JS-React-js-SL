import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

const Spinner = () => (
    <Dimmer active>
        <Loader size="huge" content={"Preparing Chat..."}/>
    </Dimmer>
);
export default Spinner;
