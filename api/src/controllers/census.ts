import * as express from "express";
import * as censusServices from "../services/census";

export const columnNames = async (request: express.Request, response: express.Response) => {

  const columnNames = await censusServices.columnNames();

  response.status(columnNames.status).send(columnNames);
};

export const data = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;
  const data = await censusServices.data(columnName);
  response.status(data.status).send(data);
};

export const remainingTotalCount = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;
  const remainingTotalCount = await censusServices.remainingTotalCount(columnName);
  response.status(remainingTotalCount.status).send(remainingTotalCount);
};

export const remainingUniqueValuesCount = async (request: express.Request, response: express.Response) => {
  const { columnName } = request.params;

  const remainingUniqueValuesCount = await censusServices.remainingUniqueValuesCount(columnName);

  response.status(remainingUniqueValuesCount.status).send(remainingUniqueValuesCount);
};

export const notFound = async (request: express.Request, response: express.Response) => {
  response.sendStatus(404);
};
