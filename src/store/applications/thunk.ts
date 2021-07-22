import axios from 'axios';
import { Company } from '../../types';
import { AppThunk } from '../store';
import {
  addApplications,
  addApplicationsError,
  addApplicationsRequest,
  setApplications,
  setApplicationsError,
  setApplicationsRequest,
} from './actions';

const getCompanies = (authKey: string) => {
  return axios.get(`/Companies?key=${authKey}`);
};

export function getApplicationDetails(authKey: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(setApplicationsRequest());
      const response = await getCompanies(authKey);
      dispatch(setApplications(response.data));
    } catch (err) {
      dispatch(setApplicationsError());
    }
  };
}

/**
 * Posts an applications to the API.
 */

const postCompany = (postData: Company | {}, authKey: string) => {
  return axios.post(`/Companies?key=${authKey}`, postData);
};

export function thunkPostApplication(postData: Company | {}, authKey: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(addApplicationsRequest());
      const response = await postCompany(postData, authKey);
      dispatch(addApplications(response.data));
    } catch (err) {
      dispatch(addApplicationsError());
    }
  };
}
