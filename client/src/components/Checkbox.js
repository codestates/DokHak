import React, { useCallback } from 'react';

import './checkbox.scss';

export default function Checkbox({ stacks, onChange }) {
  return (
    <>
      <form>
        <div className="control-group">
          {stacks.map((stack, idx) => (
            <label key={stack} className="control control--checkbox">
              {stack}
              <input type="checkbox" onChange={() => onChange(idx)} />
              <div className="control__indicator"></div>
            </label>
          ))}
        </div>
      </form>
    </>
  );
}
