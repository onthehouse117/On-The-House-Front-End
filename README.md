# On The House

## Redux Update PLEASE READ!!

**Make sure you use Redux Developer Tools for the following**

### Folder Structure
*Based on opinions from others online, I've decided to keep our reducers (and states within them) separate since we are creating a big application.

*All the states are combined into one store in the root directory file **index.js**.

*There is a **store** folder, which includes the **actions** and **reducers** folder.  These contain actions and reducers for **auths**, **posts**, and **errors**.

  *There is another **index.js** file inside the actions folders, which allows you to import all asynchronous actions to your component.    You can import this file by typing **import star as actionMethods from "../store/actions/index"**.  Afterwards, you can return an   
   asynchronous dispatch from the function **mapDispatchToProps = dispatch => {}** which can then be used to call your action creator 
   function. (See LoginForm.js for examples of these implementations)

### Redux Developer Tools Middleware 
*Because the reducers are separated into multiple js files, they each will contain their own intial state.  This helps the reducers become more neat and organized especially when referring back to the action creator functions that you've dispatched.

*In addition, the states will have a better structure on React Developer Tools while debugging the web application.  On React Developer Tools, under **State** and **Tree**, you will see that the initial states are organized under 3 reducers: **error**, **auth**, and **post**.  As each action is dispatched, this structure will make it easier for you to see the changes that occur in each state.

---------------------------------------------------------------------------------------


## Objective

On The House is a web application that allows UCI students to find solutions for UCI housing. Students can find subleasing opportunities and cost evaluations to meet their housing needs.

## Background

Finding affordable housing for people is quite a struggle at the UCI campus. It may be difficult for new students to find housing solutions, if they do not know people living in the area. Currently, a new student has three options for housing: 

1. Apply for ACC housing and accept an assigned housing community on campus.
2. Sign a new lease with one of the multiple Irvine Company Apartment communities.   
3. Find lease-holders looking for new roommates/subletters via social media.

Given the cost of ACC housing, and the cost and competition of signing a new lease, new students looking for affordable housing turn to various Facebook groups to look for roommates. The problem with this approach, however, is that posts on leasing and housing groups on Facebook cannot be organized, filtered or searched based on personal preferences. 

On The House provides the simple option of categorizing housing posts for UCI students. Posters can list their sublease information using options such as community, price, and floor plan.

## Scope

The purpose of our application is to cater to UCI students looking for housing options. The application will specifically include all the housing communities near UCI. In order to verify a user as a student, the application will require a valid UCI email address for a registering user.

## Running the Application

