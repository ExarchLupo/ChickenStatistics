# Copilot Instructions for ChickenStatistics

## General Guidelines
- Follow the existing project structure and conventions.
- Ensure all code adheres to TypeScript and .NET 9 best practices.
- Use Redux for state management in the WebApp.
- Use MongoDB for data storage in the API.

## Structure
- The WebApp should be located in the `WebApp` folder.
- The API should be located in the `Api` folder.

## WebApp Development
- Use Vite as the build tool.
- Ensure all components are functional and typed with TypeScript.
- Use React and Material-UI for the UI.
- Fetch data from the API using REST endpoints.
- Maintain state using Redux Toolkit.

## API Development
- Use .NET 9 and ASP.NET Core for the API.
- Follow the structure defined in the `chickenstatistic-api.prompt.md` file.
- Implement the `IChickenRepository` interface for MongoDB access.
- Ensure all endpoints are versioned and documented with Swagger.

## Docker and Deployment
- Create Docker containers for both the WebApp and API.
- Use Docker Compose to orchestrate the containers.
- Ensure the `docker-compose.yml` file is properly configured for local development and production.

## Testing and Debugging
- Write unit tests for critical components and API endpoints.
- Use the provided `launch.json` and `tasks.json` for debugging and running the application.

## Additional Notes
- Refer to the `.github/prompts` folder for detailed feature requirements.
- Ensure all code changes are well-documented and follow the MIT license.