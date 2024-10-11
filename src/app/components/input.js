import React from "react";
import styled from "styled-components";

const Input = ({ value, onChange, label, type = "text" }) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input
          required
          type={type}
          value={value}
          onChange={onChange}
          className="input"
          placeholder=" "
        />
        <label className="user-label">{label}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .input {
    border: solid 1.5px #9e9e9e;
    border-radius: 0.75rem;
    background: none;
    padding: .75rem;
    font-size: 1rem;
    color: #f5f5f5;
    width: 100%;
    transition: all 0.3s ease;
  }

  .input:focus {
    border-color: #1a73e8;
    outline: none;
  }

  .user-label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #e8e8e8;
    pointer-events: none;
    transition: all 0.2s ease;
  }

  .input:focus ~ .user-label,
  .input:not(:placeholder-shown) ~ .user-label {
    transform: translateY(-150%) scale(0.8);
    color: #1a73e8;
    background: #1c1c1e;
    padding: 0 0.2em;
  }
`;

export default Input;
