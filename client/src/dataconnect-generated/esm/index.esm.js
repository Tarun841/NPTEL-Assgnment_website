import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'nptel-answer-share',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const listCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCourses');
}
listCoursesRef.operationName = 'ListCourses';

export function listCourses(dc) {
  return executeQuery(listCoursesRef(dc));
}

export const updateAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAssessment', inputVars);
}
updateAssessmentRef.operationName = 'UpdateAssessment';

export function updateAssessment(dcOrVars, vars) {
  return executeMutation(updateAssessmentRef(dcOrVars, vars));
}

export const getAssessmentsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssessmentsForCourse', inputVars);
}
getAssessmentsForCourseRef.operationName = 'GetAssessmentsForCourse';

export function getAssessmentsForCourse(dcOrVars, vars) {
  return executeQuery(getAssessmentsForCourseRef(dcOrVars, vars));
}

