import React from 'react';

import ConsoleHelper from '../ConsoleHelper';

import './checkbox.scss';

export default function Checkbox({ stacks, onChange, checkedStacks }) {
  return (
    <>
      <div className="control-group">
        {stacks.map((stack, idx) => (
          <label key={stack} className="control control--checkbox">
            {stack}
            <input
              type="checkbox"
              checked={checkedStacks?.[idx]}
              onChange={() => onChange(idx)}
            />
            <div className="control__indicator"></div>
          </label>
        ))}
      </div>
    </>
  );
}
