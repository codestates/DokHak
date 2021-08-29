import styled from "styled-components";
import "./checkbox.scss";

const Form = styled.div`
  max-width: 400px;
`;

export default function Checkbox() {
  return (
    <>
      <Form class="form">
        <div class="control-group">
          <label class="control control--checkbox">
            React
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            Vue
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            Angular
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            Node.js
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>

          <label class="control control--checkbox">
            Django
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            Spring
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            Flutter
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
          <label class="control control--checkbox">
            React Native
            <input type="checkbox" />
            <div class="control__indicator"></div>
          </label>
        </div>
      </Form>
    </>
  );
}
