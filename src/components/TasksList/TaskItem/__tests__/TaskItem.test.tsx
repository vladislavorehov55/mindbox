import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import TaskItem from "../TaskItem";
import {TaskType} from "../../../../enums";

describe('TaskItem component', () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    const completeTask = jest.fn()
    const getWrapper = () => mount(<TaskItem key={1} completeTask={completeTask} taskItem={{id: 1, text: 'Watch', type: TaskType.all}} />);
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = getWrapper();
    });
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('should call completeTask function', () => {
        wrapper.find('li').simulate('click');
        expect(completeTask).toHaveBeenCalled();
    })
})