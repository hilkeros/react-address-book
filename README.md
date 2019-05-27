This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Some remarks about the challenge and my solution

There are still a lot of aspects that I am not happy about. I spend a lot of time on finding the best solution for prefetching the users from the API independently from showing them. I always ran into problems bcause updating the users in the state always interfered with updating the amount of shown users in the infite scroll logic. I tried many approaches and thought about using Redux and having two independent stores, but that was also problematic. In the end I chose a very simple approach, which does prefetch 50 users, but actually still blocks showing more users during the API call, which is not good.<br>

I didn't want to write to much unused boilerplate and avoided Redux as long as possible. I chose to only use Redux to set the nationality setting and share the state between the Settings Component and the UserList Component.
