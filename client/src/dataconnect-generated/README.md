# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListCourses*](#listcourses)
  - [*GetAssessmentsForCourse*](#getassessmentsforcourse)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateAssessment*](#updateassessment)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListCourses
You can execute the `ListCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCourses(): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCourses(dc: DataConnect): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursesRef:
```typescript
const name = listCoursesRef.operationName;
console.log(name);
```

### Variables
The `ListCourses` query has no variables.
### Return Type
Recall that executing the `ListCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCoursesData {
  courses: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Course_Key)[];
}
```
### Using `ListCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCourses } from '@dataconnect/generated';


// Call the `listCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
listCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursesRef } from '@dataconnect/generated';


// Call the `listCoursesRef()` function to get a reference to the query.
const ref = listCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetAssessmentsForCourse
You can execute the `GetAssessmentsForCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAssessmentsForCourse(vars: GetAssessmentsForCourseVariables): QueryPromise<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;

interface GetAssessmentsForCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssessmentsForCourseVariables): QueryRef<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
}
export const getAssessmentsForCourseRef: GetAssessmentsForCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssessmentsForCourse(dc: DataConnect, vars: GetAssessmentsForCourseVariables): QueryPromise<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;

interface GetAssessmentsForCourseRef {
  ...
  (dc: DataConnect, vars: GetAssessmentsForCourseVariables): QueryRef<GetAssessmentsForCourseData, GetAssessmentsForCourseVariables>;
}
export const getAssessmentsForCourseRef: GetAssessmentsForCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssessmentsForCourseRef:
```typescript
const name = getAssessmentsForCourseRef.operationName;
console.log(name);
```

### Variables
The `GetAssessmentsForCourse` query requires an argument of type `GetAssessmentsForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssessmentsForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssessmentsForCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssessmentsForCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAssessmentsForCourseData {
  assessments: ({
    id: UUIDString;
    title: string;
    dueDate: TimestampString;
    score?: number | null;
    maxMarks: number;
  } & Assessment_Key)[];
}
```
### Using `GetAssessmentsForCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssessmentsForCourse, GetAssessmentsForCourseVariables } from '@dataconnect/generated';

// The `GetAssessmentsForCourse` query requires an argument of type `GetAssessmentsForCourseVariables`:
const getAssessmentsForCourseVars: GetAssessmentsForCourseVariables = {
  courseId: ..., 
};

// Call the `getAssessmentsForCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssessmentsForCourse(getAssessmentsForCourseVars);
// Variables can be defined inline as well.
const { data } = await getAssessmentsForCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssessmentsForCourse(dataConnect, getAssessmentsForCourseVars);

console.log(data.assessments);

// Or, you can use the `Promise` API.
getAssessmentsForCourse(getAssessmentsForCourseVars).then((response) => {
  const data = response.data;
  console.log(data.assessments);
});
```

### Using `GetAssessmentsForCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssessmentsForCourseRef, GetAssessmentsForCourseVariables } from '@dataconnect/generated';

// The `GetAssessmentsForCourse` query requires an argument of type `GetAssessmentsForCourseVariables`:
const getAssessmentsForCourseVars: GetAssessmentsForCourseVariables = {
  courseId: ..., 
};

// Call the `getAssessmentsForCourseRef()` function to get a reference to the query.
const ref = getAssessmentsForCourseRef(getAssessmentsForCourseVars);
// Variables can be defined inline as well.
const ref = getAssessmentsForCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssessmentsForCourseRef(dataConnect, getAssessmentsForCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assessments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assessments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateAssessment
You can execute the `UpdateAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAssessment(vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface UpdateAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
}
export const updateAssessmentRef: UpdateAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAssessment(dc: DataConnect, vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface UpdateAssessmentRef {
  ...
  (dc: DataConnect, vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
}
export const updateAssessmentRef: UpdateAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssessmentRef:
```typescript
const name = updateAssessmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAssessmentVariables {
  id: UUIDString;
  score?: number | null;
}
```
### Return Type
Recall that executing the `UpdateAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssessmentData {
  assessment_update?: Assessment_Key | null;
}
```
### Using `UpdateAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAssessment, UpdateAssessmentVariables } from '@dataconnect/generated';

// The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`:
const updateAssessmentVars: UpdateAssessmentVariables = {
  id: ..., 
  score: ..., // optional
};

// Call the `updateAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAssessment(updateAssessmentVars);
// Variables can be defined inline as well.
const { data } = await updateAssessment({ id: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAssessment(dataConnect, updateAssessmentVars);

console.log(data.assessment_update);

// Or, you can use the `Promise` API.
updateAssessment(updateAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.assessment_update);
});
```

### Using `UpdateAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssessmentRef, UpdateAssessmentVariables } from '@dataconnect/generated';

// The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`:
const updateAssessmentVars: UpdateAssessmentVariables = {
  id: ..., 
  score: ..., // optional
};

// Call the `updateAssessmentRef()` function to get a reference to the mutation.
const ref = updateAssessmentRef(updateAssessmentVars);
// Variables can be defined inline as well.
const ref = updateAssessmentRef({ id: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssessmentRef(dataConnect, updateAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assessment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assessment_update);
});
```

