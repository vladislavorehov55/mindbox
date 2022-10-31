import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import FormAdd from "../FormAdd";

let mockValue = 'Buy a cake';
const mockSetValue = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: () => ([mockValue, mockSetValue])
}))

describe('FormAdd component', () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    const addTask = jest.fn();

    const getWrapper = () => mount(<FormAdd addTask={addTask}/>);

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = getWrapper();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should call setValue with correct todo', () => {
        const todo = 'Watch movie';
        const input = wrapper.find('input')
        input.simulate('change', { target: { value: todo}});
        expect(mockSetValue).toHaveBeenCalledWith(todo);
    })

    it('should call addTask and setValue', () => {
        wrapper.find('form').simulate('submit');
        expect(addTask).toHaveBeenCalled();
        expect(mockSetValue).toHaveBeenCalledWith('');
    })

    it('should not call addTask', () => {
        mockValue = '';
        wrapper = getWrapper();
        wrapper.find('form').simulate('submit');
        expect(addTask).not.toHaveBeenCalled();
    })
})
