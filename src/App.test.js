import React from 'react';
import App from './App';
import {shallow} from 'enzyme';


describe('App', ()=>{

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      //setup virtual context
      <App />
    );
  });

  /* Start assertions below */

  it('should have the `th` "Items"', () => {
    expect(
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });

  it('should have a "button" element',()=>{
    expect(
      //containsMatchingElement will not find the similar buttonbecause we didn't define the className and other attributes
      wrapper.containsMatchingElement(
      <button>Add item</button>
      )
    ).toBe(true);
  });

  it('button should be disabled',()=>{
    const wrapper =shallow(<App/>);
    //find() is another EnzymeWrapper method, it behaves a bit lke an array, contains a list of all matching elements
    const button = wrapper.find('button').first();
    //first() is about returning the first matching element
    expect(button.props().disabled).toBe(true);
  });

  /* Group another spec that belongs to App spec
    this spec test user input and button enabled
  */
  describe('test user input and button enalbe', () => {
    const item = 'Van'

    beforeEach(()=>{
      const input = wrapper.find('input').first()
      //simulate() is how we simulate user interactions on components the first premeter can be 'change' or 'click', second premeter is an event object
      input.simulate('change',{
        target:{value:item}
      })
    });

    it('should update the state property "item" ', ()=>{
      expect( wrapper.state().item ).toEqual(item)
    });

    it('should have the button enabled',()=>{
      const button = wrapper.find('button').first()
      expect(button.props().disabled).toBe(false);
    })

  });

  /* Group another spec that belongs to App spec
    this spec test input clear and button disabled
  */
  describe('test user can clear the default',()=>{
    beforeEach(()=>{
      const input= wrapper.find('input').first();
      input.simulate('change',{
        target: ''
      })
    })
    //test button disabled
    it('button should be disabled',()=>{
      const button = wrapper.find('button').first()
      expect(button.props().disabled).toBe(true);
    })

  });

});

