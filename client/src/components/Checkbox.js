import React from 'react';
import styled from 'styled-components';

import './checkbox.scss';

export default function Checkbox() {
  return (
    <>
      <form>
        <div className="control-group">
          <label className="control control--checkbox">
            React
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            Vue
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            Angular
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            Node.js
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>

          <label className="control control--checkbox">
            Django
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            Spring
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            Flutter
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          <label className="control control--checkbox">
            React Native
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
        </div>
      </form>
    </>
  );
}
