import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import BottomPanel from "../BottomPanel";
import {FilterType} from "../../../enums";

describe('BottomPanel component', () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    const clearCompleted = jest.fn()
    const filterTasks = jest.fn()

    const getWrapper = () => mount(<BottomPanel clearCompleted={clearCompleted} filterTasks={filterTasks} activeTasksCount={1} filteredType={FilterType.all}/>);
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = getWrapper();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should call clearCompleted function', () => {
        const clearCompletedBtn = wrapper.find('button').at(3)
        clearCompletedBtn.simulate('click')
        expect(clearCompleted).toHaveBeenCalled()
    });
    it('should call filterTasks with correct options', () => {
        const allBtn = wrapper.find('button').at(0);
        allBtn.simulate('click');
        expect(filterTasks).toHaveBeenCalledWith(FilterType.all);

        const activeBtn = wrapper.find('button').at(1);
        activeBtn.simulate('click');
        expect(filterTasks).toHaveBeenCalledWith(FilterType.active);

        const completeBtn = wrapper.find('button').at(2);
        completeBtn.simulate('click');
        expect(filterTasks).toHaveBeenCalledWith(FilterType.completed)
    });
})