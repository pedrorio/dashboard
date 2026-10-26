import styled from "styled-components";

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
`;

export const TableFrame = styled.div`
  background: #1D1F26;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 560px;
  overflow: auto;
`;

export const Caption = styled.caption`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const Th = styled.th`
  background-color: #f7f7f7;
  border-top: 2px solid #CF7693;
  color: #CF7693;
  font-size: 14px;
  font-weight: 700;
  padding: 20px 15px;
  position: sticky;
  text-align: center;
  text-transform: capitalize;
  top: 0;
  z-index: 1;

  &:first-child {
    border-left: 2px solid #CF7693;
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-right: 2px solid #CF7693;
    border-top-right-radius: 4px;
  }
`;

export const Td = styled.td`
  border-bottom: solid 1px rgba(255,255,255,0.1);
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  padding: 15px;
  text-align: center;
  vertical-align: middle;
`;

export const Div = styled.div`
  padding: 40px;
`;
