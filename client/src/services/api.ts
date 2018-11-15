import axios from "axios";

export const fetchVariableNames =  () => {
    return axios.get("/api/census/column-names");
};

export const fetchVariableData = async (variableName: string, pageNumber = 1) => {
    return axios.get(`/api/census/${variableName}/data`);
};

export const fetchRemainingUniqueValuesCount = (variableName: string, pageNumber = 1) => {
    return axios.get(`/api/census/${variableName}/remaining-unique-values-count`);
};

export const fetchRemainingTotalCount = (variableName: string, pageNumber = 1)  => {
    return axios.get(`/api/census/${variableName}/remaining-total-count`);
};
