import * as express from "express";
import * as censusController from "../controllers/census";

export const censusRouter = (app: express.Application) => {

    app.get("/census/column-names", censusController.columnNames);

    app.get("/census/:columnName/data", censusController.data);

    app.get("/census/:columnName/remaining-total-count", censusController.remainingTotalCount);

    app.get("/census/:columnName/remaining-unique-values-count", censusController.remainingUniqueValuesCount);

    app.get("*", censusController.notFound);
};
