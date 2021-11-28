---
page_type: development purposes
languages:
- javascript
- html
- css
products:
- azure-active-directory
- microsoft-identity-platform
- azure-app-service
- web-app by azure
- azure-maps
description: "Disaster Delineation API Tool for public use. The web app uses the EONET APv3 by NASA recorded data and visualizes the data based on the real time disaster events occuring from around the world."
urlFragment: "ms-identity-javascript-v2"
---

# Disaster Delineation API Tool

Disaster Delineation API Tool as a web app uses the EONET APv3 by NASA recorded data and visualizes the data based on the real time disaster events occuring from around the world. The web app has a feature to identify the users by configuring [MSAL.JS 2.x](https://www.npmjs.com/package/@azure/msal-browser) to login, logout, and acquire an access token for a protected resource such as the **Microsoft Graph API**. This version of the MSAL.js library uses the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow).

**Note:** A quickstart guide covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory/develop/quickstart-v2-javascript-auth-code).

**Note:** A more detailed tutorial covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory/develop/tutorial-v2-javascript-auth-code).

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `src`             | Contains source code files                  |
| `index.html`      |  Contains the UI and azure maps services modules and css.            |
| `index.css`      |  Contains the UI designs stylesheets type in css.            |
| `index.js`      |  Contains the azure maps functionality, operability and fetching API calls and filter the resuls logic resides here.            |
| `.gitignore`      | Define what to ignore at commit time.      |

## Prerequisites

[Ms Azure Account](https://azure.microsoft.com/en-in/free/)

## Setup for authentication and authorisation.

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
2. Open the [/app/authConfig.js](./app/authConfig.js) file and provide the required configuration values.
3. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Setup for MS Azure Maps Services

Check out the reference docs [here](https://docs.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app)

## Running the code

### For adding authentication follow the below steps:
1. Configure authentication and authorization parameters:
   1. Open `authConfig.js`
   2. Replace the string `"Enter_the_Application_Id_Here"` with your app/client ID on AAD Portal.
   3. Replace the string `"Enter_the_Cloud_Instance_Id_HereEnter_the_Tenant_Info_Here"` with `"https://login.microsoftonline.com/common/"` (*note*: This is for multi-tenant applications located on the global Azure cloud. For more information, see the [documentation](https://docs.microsoft.com/azure/active-directory/develop/quickstart-v2-javascript-auth-code)).
   4. Replace the string `"Enter_the_Redirect_Uri_Here"` with the redirect uri you setup on AAD Portal.
2. Configure the parameters for calling MS Graph API:
   1. Open `graphConfig.js`.
   2. Replace the string `"Enter_the_Graph_Endpoint_Herev1.0/me"` with `"https://graph.microsoft.com/v1.0/me"`.
   3. Replace the string `"Enter_the_Graph_Endpoint_Herev1.0/me/messages"` with `"https://graph.microsoft.com/v1.0/me/messages"`.
3. To start the sample application, run `npm start`.
4. Finally, open a browser and navigate to [http://localhost:3000](http://localhost:3000).

### Static Web app - Disaster Delineation API Tool 
1. Just deploy the static web app to the azure app service by creating the azure static web app.
2. Locally, use the popular VSCode live-server for interacting with the app.

> How did we do? Consider [sharing your experience with us](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUNzlSS1hSVFBRU0pGNlBDRjY4UkRRNjBFMyQlQCN0PWcu).

## Key concepts

This sample demonstrates the following MSAL workflows:

* How to configure application parameters.
* How to sign-in with popup and redirect methods.
* How to sign-out.
* How to get user consent incrementally.
* How to acquire an access token.
* How to make an API call with the access token.

## Conclusion
This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
# ms_azure_disaster_delineation
