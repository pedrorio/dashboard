import * as express from "express";
import * as censusServices from "../services/census";

export const columnNames = async (request: express.Request, response: express.Response) => {

  const columns = await censusServices.columnNames();

  response.status(columns.status).send(columns);
};

export const data = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;
  const page = await censusServices.data(columnName);
  response.status(page.status).send(page);
};

export const remainingTotalCount = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;
  const total = await censusServices.remainingTotalCount(columnName);
  response.status(total.status).send(total);
};

export const remainingUniqueValuesCount = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;

  const uniqueCount = await censusServices.remainingUniqueValuesCount(columnName);

  response.status(uniqueCount.status).send(uniqueCount);
};

export const notFound = async (request: express.Request, response: express.Response) => {
  response.sendStatus(404);
};
