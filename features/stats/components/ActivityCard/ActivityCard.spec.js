import React from 'react';
import {mount} from 'enzyme';

import ActivityCard from './ActivityCard';

describe('Test ActivityCard component', () => {
    const user = {
        activity_trend: [0, 1, 2, 3],
        week_tda: 2,
        streak: 5,
    }

    it('renders without crashing', () => {
        mount(<ActivityCard user={user}/>);
    });
    
});