import styled from "styled-components";

export const Table = styled.table`
  width:100%;
  table-layout: fixed;
`;

export const TableHeaderWrapper = styled.div`
  background-color: rgba(255,255,255,0.3);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border: 2px solid #CF7693;
  border-bottom: none;
`;

export const Th = styled.th`
  padding: 20px 15px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: #CF7693;
  text-transform: capitalize;
`;

export const TableBodyWrapper = styled.div`
  height:500px;
  overflow-x:auto;
  margin-top: 0px;
  background: #1D1F26;
  border-bottom-right-radius:4px;
  border-bottom-left-radius: 4px;
`;
export const Td = styled.td`
  padding: 15px;
  text-align: center;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
`;

export const Div = styled.div`
  padding: 40px;
`;
