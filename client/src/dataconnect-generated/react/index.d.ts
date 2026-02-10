import { CreateUserData, ListCoursesData, UpdateAssessmentData, UpdateAssessmentVariables, GetAssessmentsForCourseData, GetAssessmentsForCourseVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListCourses(options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;
export function useListCourses(dc: DataConnect, options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;

export function useUpdateAssessment(options?: useDataConnectMutationOptions<UpdateAssessmentData, FirebaseError, UpdateAssessmentVariables>): UseDataConnectMutationResult<UpdateAssessmentData, UpdateAssessmentVariables>;
export function useUpdateAssessment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAssessmentData, FirebaseError, UpdateAssessmentVariables>): UseDataConnectMutationResult<UpdateAssessmentData, UpdateAssessmentVariables>;

export function useGetAssessmentsForCourse(vars: GetAssessmentsForCourseVariables, options?: useDataConnectQueryOptions<GetAssessmentsForCourseData>): UseDataConnectQueryResult<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
export function useGetAssessmentsForCourse(dc: DataConnect, vars: GetAssessmentsForCourseVariables, options?: useDataConnectQueryOptions<GetAssessmentsForCourseData>): UseDataConnectQueryResult<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
