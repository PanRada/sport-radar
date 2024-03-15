# Intro
The project is based on a recruitment assignment for Sxxxx(secret :) )
It was created in monorepo for the latest versions of Nest.js and React(Vite) using the turbo library.*.
*needed downgrade to version 1.10.4 : issues vercel/turbo/issues/5331

## Requirements

### Functional Requirements

1. **User Interactions**: Users should be able to start, finish, and restart the simulation at any time.
2. **Simulation Duration**: Each match simulation lasts 90 seconds unless manually concluded earlier by the user.
3. **Scoring Mechanism**: Every 10 seconds, a random team scores exactly one goal. The first goal is scored at the 10th second, and the last goal can be scored at the 90th second.
4. **Restart Capability**: After a simulation finishes, it can be restarted by the user, which resets the results and starts the simulation anew.

###### Non-functional requirements
- name simulator
- component styling
- security and performance

##### Creation process
[x ] selection of the technology stack for the implementation of the task 
[x] creation of component structure and business logic (schemas)
[x ] writing pseudo code for the business logic on the FE and BE side
[ ] preparation of tests for core functionalities
[x ] creation of ui elements
[x ] refactoring and creating documentation
[ ]completion

##### Rules for launching applications


```
**git pull** 

**install global**
npm install -D turbo

**install dependencies in folders**
apps/client
npm install

apps/api
npm install

**run app in root**
npm run dev

```

###### Technology stack

**Nest.js = > 10.0.0**
**React => 18.2.0**
**Vite => 5.1.6**

*Basic and standard linting and priettier toolkit provided with Nest.js and Vite*.

#### What went wrong ?
- creating a test-ready environment in Vite.js. Early on, the standard settings and library usage in Vite allowed me to add freely. At 4 hours, I didn't want to spend time on this. However, I prepared the code for the test but untested and wrote from a belief of good practice.
- 



