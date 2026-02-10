import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Assessment_Key {
  id: UUIDString;
  __typename?: 'Assessment_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetAssessmentsForCourseData {
  assessments: ({
    id: UUIDString;
    title: string;
    dueDate: TimestampString;
    score?: number | null;
    maxMarks: number;
  } & Assessment_Key)[];
}

export interface GetAssessmentsForCourseVariables {
  courseId: UUIDString;
}

export interface ListCoursesData {
  courses: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Course_Key)[];
}

export interface UpdateAssessmentData {
  assessment_update?: Assessment_Key | null;
}

export interface UpdateAssessmentVariables {
  id: UUIDString;
  score?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
  operationName: string;
}
export const listCoursesRef: ListCoursesRef;

export function listCourses(): QueryPromise<ListCoursesData, undefined>;
export function listCourses(dc: DataConnect): QueryPromise<ListCoursesData, undefined>;

interface UpdateAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
  operationName: string;
}
export const updateAssessmentRef: UpdateAssessmentRef;

export function updateAssessment(vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;
export function updateAssessment(dc: DataConnect, vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface GetAssessmentsForCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssessmentsForCourseVariables): QueryRef<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssessmentsForCourseVariables): QueryRef<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
  operationName: string;
}
export const getAssessmentsForCourseRef: GetAssessmentsForCourseRef;

export function getAssessmentsForCourse(vars: GetAssessmentsForCourseVariables): QueryPromise<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
export function getAssessmentsForCourse(dc: DataConnect, vars: GetAssessmentsForCourseVariables): QueryPromise<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;

