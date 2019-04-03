![CF](http://i.imgur.com/7v5ASc8.png) OAuth Comparative Analysis
================================================================

## Amazon 

### Research Conducted By: 
Billy Bunn, Aaron Ferris, Jon Gentry, & Alexander White

### Overall Score and Comments
#### Score (Out of 10): 6
#### General Comments
##### The Stack
###### Implicit Grant
Initially, the set-up for **Login With Amazon** (**LWA**) was front-end only. Using their _Implicit Grant_ [described here](https://developer.amazon.com/docs/login-with-amazon/authorization-grants.html), the access token was embedded directly in the URI that redirects the user-agent back to the client website. Meaning it was up to the browser to receive and store the access token. 

The Amazon docs explained that there are two main disadvantage of this authorization method:
1. user is exposed to the access token
2. when an access token expires, the user must re-authenticate to continue accessing the resources

###### Authorization Code Grant
This authorization method involves a front-end and back-end stack. The _Authorization Code Grant_ relies on server-side scripting and involves more handshakes between the client, Amazon, and our authorization server. This is much more secure and allows for refresh tokens.

However, as the Amazon docs stated:
> The disadvantage to the Authorization Code Grant is that it can be harder to implement.

We learned that this was very true. 


##### Usability and Learnability
###### Implicit Grant
The general set-up of OAuth with **LWA** was very easy; most of the work to get the actual LWA button on our client-facing site involved copying and pasting code from Amazon's docs. 

The docs themselves had clear steps and were easy to read. In under an hour, we successfully had a token in the browser using this method.

###### Authorization Code Grant
The documentation for this authorization method was poorly written with very few examples. A much greater knowledge of OAuth was needed to implement the server-side scripting. Code examples in various languages would make this method much easier for junior to mid-level developers.

### Our Initial Steps
#### Connecting our app to Amazon
1. Added a new application in the Amazon App Console
   * After creating an Amazon developer account 
2. Registered our application with a **Name**, **Description**, and **Privacy Notice URL**
   * Had to register a "Security Profile" in Amazon dev console to do this. [Amazon docs on creating a security profile](https://developer.amazon.com/docs/login-with-amazon/register-web.html#create-a-new-security-profile)
3. Entered our URL and callback URL to register our application:
   * **Allowed Javascript Origins**: `http://localhost:3000`
   * **Allowed Return URLs**: `http://localhost:3000/oauth`
4. Saved our **Client ID** and **Client Secret** from the Amazon App Console
   * Saved these in our `.env`
5. Added a "Login with Amazon" button to our client-side website (`www-server/public/index.html`). 
   * Just copy/pasted a button provided in their docs [here](https://developer.amazon.com/docs/login-with-amazon/add-a-button-web.html).
6. Added the "JavaScript Amazon SDK" (Software Development Kit) before the button 
   * It looks like a `div` and a `script` provided by Amazon in step 1[here](https://developer.amazon.com/docs/login-with-amazon/install-sdk-javascript.html).
   * Added our **Client ID** variable (from our `.env`) to the SDK pasted in.
7. Added another `script` to our `index.html` file to make our site return an `AuthorizeRequest` object. 
   * This was another piece of JavaScript provided by Amazon in step 4 of the docs [here](https://developer.amazon.com/docs/login-with-amazon/install-sdk-javascript.html).
   * Per their docs:
   > …the object will contain properties detailing the response (such as an access token or authorization code, which you can use to obtain customer profile information)
##### At this point…
* We could successfully `nodemon` our site (`www-server/public/index.html`) and see a **Login with Amazon** button
* Clicking on the button redirected the user to an Amazon login page, which asked the user if they wanted to grant our app access to their Amazon information.
* We realized that amazon was doing everything for us, but then doing it in a very unsafe way, and needed to be refactored.
* After reading [the docs](https://developer.amazon.com/docs/login-with-amazon/authorization-grants.html), we learned that Amazon allows two types of "Authorization Grants": **Implicit** (what we were using by default) and **Authorization Code Grants**—a more complicated but more secure method of authorization. 

#### Pros
* _Many_ people have an existing Amazon account, so it's a great candidate for using OAuth. Especially useful for online store fronts and/or sites relying on other Amazon services like [Amazon Pay](https://pay.amazon.com/us).
* Gives the source images in multiple formats and themes to create a good link to sign in
* Gives decent YML visuals for how the Oauth process should work to get the token to you

#### Cons
* Documentation
  * Gives starter code that is not best practices (Implicit Grant)
  * Does not explicity list all of the required steps
  * In order to find correct docs for Authorization Code Grant, you must navigate into subfolders that are only accessable by the overview, no links in the main content


### Ratings and Reviews
#### Documentation
There is opportunity here for services that could assist websites and businesses with adding Login With Amazon and also for resources that could provide better step-by-step documentation. 

#### Systems Requirements
This framework would obviously play well with AWS and there are no forseen issues wtih Heroku. 

#### Ramp-Up Projections
Our conservative estimate is that it would take a group of midlevel developers a few hours to be productive using Login With Amazon. 

#### Community Support and Adoption levels
Potentially the adoption level is huge as there are over 250 million Amazon customers and this login method can be utilized over web, Android, and iOS apps. However, there were not a lot of resources to be found to assist in the implementation.  
The majority of users are retail websites and one estimate was around 17,000 sites were currently using Amazon Login and Pay.  
  


### Links and Resources
<!-- * [framework](http://xyz.com) -->
* [Official docs](https://developer.amazon.com/docs/login-with-amazon/documentation-overview.html)
* [Amazon's older step-by-step tutorial](https://login.amazon.com/website) (implicit auth)
* [Tutorial by hugtech.io](https://hugtech.io/2018/12/09/account-linking-with-amazon-cognito-by-authorization-code-grant/)

### Code Demos
<!-- * [live/running application](http://xyz.com) -->
* [code repository](https://github.com/d29-oauth-aws) (organization with 2 repos)

### Operating Instructions
* Clone both repositories
* open up each repository in their own terminal console
* run the `npm i` command for both
* Create .env files that have amazon client ID and amazon secret ID
* Ensure that whichever ports you are using for this are whitelisted, ours are 8080 and 3000 
* On the page, click the link.
* When redirected to amazon, it will request your password
* Once logged in, give access to application
* User should be redirected to home page (at this point our implementation hits the limit of its coverage)


### UML Diagram
Based on our understanding of the [Amazon documentation](https://developer.amazon.com/docs/login-with-amazon/authorization-grants.html) of the _Authorization Code Grant_ method.
![UML Diagram](https://i.imgur.com/DzS5Chb.jpg)


Amazon's Diagram:

![Amazon's Diagram](https://i.imgur.com/xm8ioKy.png)
