import styled from "styled-components";
import { Input, Button, Card, Table, Modal, Select, Pagination } from "antd";

// ...existing code...

export const StyledInput = styled(Input)`
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 0;
  color: var(--color-text-secondary) !important;

  &::placeholder {
    color: var(--color-text-primary) !important;
    opacity: 0.6;
  }

  /* Disable all hover effects */
  &:hover,
  &:focus,
  &:active,
  &.ant-input:hover,
  &.ant-input:focus,
  &.ant-input-focused,
  &.ant-input-active,
  &.ant-input-affix-wrapper:hover,
  &.ant-input-affix-wrapper:focus,
  &.ant-input-affix-wrapper-focused,
  &.ant-input-group-wrapper:hover,
  &.ant-input-group-wrapper:focus,
  &.ant-input-group-wrapper-focused,
  .ant-input:hover,
  .ant-input:focus,
  .ant-input-focused,
  .ant-input-active,
  .ant-input-affix-wrapper:hover,
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused,
  .ant-input-group-wrapper:hover,
  .ant-input-group-wrapper:focus,
  .ant-input-group-wrapper-focused {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    border-color: transparent !important;
    transition: none !important;
  }

  /* Disable hover effects for input wrapper */
  &.ant-input-affix-wrapper,
  &.ant-input-group-wrapper,
  .ant-input-affix-wrapper,
  .ant-input-group-wrapper {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* Disable autofill effects */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  .ant-input:-webkit-autofill,
  .ant-input:-webkit-autofill:hover,
  .ant-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: var(--color-text-secondary) !important;
    outline: none !important;
    border: none !important;
    border-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
  }

  /* Additional overrides for Ant Design's internal styles */
  .ant-input-affix-wrapper > input.ant-input {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .ant-input-affix-wrapper:hover > input.ant-input,
  .ant-input-affix-wrapper:focus > input.ant-input,
  .ant-input-affix-wrapper-focused > input.ant-input {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
`;
export const StyledButton = styled(Button)`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);

  &:hover,
  &:focus {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
  }

  &.ant-btn-text {
    background-color: transparent;
    border-color: transparent;
    color: var(--color-text);

    &:hover {
      background-color: var(--color-background-hover);
    }
  }
`;

export const StyledCard = styled(Card)`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);

  .ant-card-head {
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
  }

  .ant-card-body {
    color: var(--color-text);
  }
`;

export const StyledTable = styled(Table)`
  .ant-table {
    background-color: var(--color-background-secondary);
    color: var(--color-text);
  }

  .ant-table-thead > tr > th {
    background-color: var(--color-background-tertiary);
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border);
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid var(--color-border);
  }

  .ant-table-tbody > tr:hover > td {
    background-color: var(--color-background-hover);
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: var(--color-background-secondary);
    color: var(--color-text);
  }

  .ant-modal-header {
    background-color: var(--color-background-secondary);
    border-bottom: 1px solid var(--color-border);
  }

  .ant-modal-title {
    color: var(--color-text);
  }

  .ant-modal-close {
    color: var(--color-text);
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: var(--color-background-secondary) !important;
    border: 1px solid var(--color-border) !important;
    color: var(--color-text) !important;
  }

  .ant-select-selection-placeholder {
    color: var(--color-text-secondary) !important;
  }

  .ant-select-arrow {
    color: var(--color-text-secondary);
  }
`;

export const StyledPagination = styled(Pagination)`
  .ant-pagination-item {
    background-color: #f8fafc !important;
    border: 1px solid #cbd5e1 !important;
    color: #1e293b !important;
    transition: background 0.2s, color 0.2s !important;
  }

  .ant-pagination-item-active {
    background-color: #2563eb !important;
    border-color: #2563eb !important;
    color: #fff !important;
  }

  .ant-pagination-item:hover,
  .ant-pagination-item-active:hover {
    background-color: #e0e7ef !important;
    color: #2563eb !important;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    background: #f8fafc !important;
    color: #1e293b !important;
    border: 1px solid #cbd5e1 !important;
    transition: background 0.2s, color 0.2s !important;
  }

  .ant-pagination-prev:hover,
  .ant-pagination-next:hover {
    background: #e0e7ef !important;
    color: #2563eb !important;
  }

  .ant-pagination-item-link {
    background: #f8fafc !important;
    color: #1e293b !important;
    border-radius: 4px !important;
    border: none !important;
    transition: background 0.2s, color 0.2s !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-pagination-item-link:hover {
    background: #e0e7ef !important;
    color: #2563eb !important;
  }

  .ant-pagination-disabled .ant-pagination-item-link {
    color: #cbd5e1 !important;
    background: #f1f5f9 !important;
  }

  .ant-pagination-options {
    color: #1e293b !important;
    background: #f8fafc !important;
  }

  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    color: #64748b !important;
  }
`;
