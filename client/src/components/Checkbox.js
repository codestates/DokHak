import React, { useCallback, useEffect } from 'react';

import './checkbox.scss';

export default function Checkbox({ stacks, onChange, checkedStacks }) {
  return (
    <>
      <form>
        <div className="control-group">
          {stacks.map((stack, idx) => (
            <label key={stack} className="control control--checkbox">
              {stack}
              <input
                type="checkbox"
                checked={checkedStacks?.[idx - 1]}
                onChange={() => onChange(idx)}
              />
              <div className="control__indicator"></div>
            </label>
          ))}
        </div>
      </form>
    </>
  );
}
