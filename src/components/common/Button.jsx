import React from "react";
import styled, { css } from "styled-components";

// 버튼 사이즈 스타일
const sizeStyles = {
  small: css`
    height: 30px;
    font-size: 0.875rem;
    padding: 0 0.875rem;
  `,
  medium: css`
    height: 40px;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  large: css`
    height: 50px;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
};

// 버튼 타입별 스타일
const variantStyles = {
  primary: css`
    background-color: #ff6b6b;
    color: white;
    &:hover {
      background-color: #ff8787;
    }
  `,
  secondary: css`
    background-color: #339af0;
    color: white;
    &:hover {
      background-color: #4dabf7;
    }
  `,
  outline: css`
    background-color: transparent;
    color: #ff6b6b;
    border: 1px solid #ff6b6b;
    &:hover {
      background-color: rgba(255, 107, 107, 0.1);
    }
  `,
};

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;

  /* 크기 */
  ${({ size }) => sizeStyles[size] || sizeStyles.medium}

  /* 버튼 종류 */
  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  
  /* 비활성화 스타일 */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        transform: none;
      }
    `}
`;

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
