const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'nptel-answer-share',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCourses');
}
listCoursesRef.operationName = 'ListCourses';
exports.listCoursesRef = listCoursesRef;

exports.listCourses = function listCourses(dc) {
  return executeQuery(listCoursesRef(dc));
};

const updateAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAssessment', inputVars);
}
updateAssessmentRef.operationName = 'UpdateAssessment';
exports.updateAssessmentRef = updateAssessmentRef;

exports.updateAssessment = function updateAssessment(dcOrVars, vars) {
  return executeMutation(updateAssessmentRef(dcOrVars, vars));
};

const getAssessmentsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssessmentsForCourse', inputVars);
}
getAssessmentsForCourseRef.operationName = 'GetAssessmentsForCourse';
exports.getAssessmentsForCourseRef = getAssessmentsForCourseRef;

exports.getAssessmentsForCourse = function getAssessmentsForCourse(dcOrVars, vars) {
  return executeQuery(getAssessmentsForCourseRef(dcOrVars, vars));
};
